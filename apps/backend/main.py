import os
from typing import List
import shutil
import subprocess
import json

from fastapi import FastAPI, UploadFile
from gemini import upload_file
from pathlib import Path
from pydantic import BaseModel
from tqdm import tqdm
from videohash import VideoHash
import ffmpeg
import google.generativeai as genai
from google.generativeai.types import File
import redis

from dotenv import load_dotenv

from utils import (extract_mp3_from_mp4, convert_to_mkv, get_frames, 
    generate_timestamp, get_audio, seconds_from_timestamp, get_clip_path, 
    ffmpeg_concat)

load_dotenv()

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel('gemini-pro-vision')

r = redis.Redis(
    host=os.environ['REDIS_HOST'],
    port=33171,
    password=os.environ['REDIS_PASSWORD'],
    ssl=True
)

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}

class Clip(BaseModel):
    start_timestamp: int
    end_timestamp: int
    description: str
    hash: str

def extract_clips_helper(hashes: List[str], prompt: str) -> List[Clip]:
    prompt = f"""\
You are an expert video editor, helping us select clips for a video.
The client gave you this directive for clip selection: {prompt}
Double check your work to ensure that the timestamps are correct.

You must return a list of clips formatted as follows:
[
    {
        "start_timestamp": (HH:)MM:SS,
        "end_timestamp": (HH:)MM:SS,
        "description": str,
    }, ...
]
"""
    all_clips: List[Clip] = []
    for video_hash in hashes:
        frames = get_frames(video_hash)
        video_request: List[str | File] = [prompt]
        for sec, frame in enumerate(frames):
            video_request.append(generate_timestamp(sec))
            video_request.append(frame)
        response = model.generate_content(video_request, request_options={"timeout": 600}) # type: ignore
        clips_from_video = json.loads(response.text)

        audio = get_audio(video_hash)
        audio_request = [prompt, audio]
        reponse = model.generate_content(audio_request, request_options={"timeout": 600}) # type: ignore
        clips_from_audio = json.loads(reponse.text)

        # TODO: merge clips from audio and video gracefully
        # just using len for now because most tasks are based on either video or audio
        clips = clips_from_video if len(clips_from_video) > len(clips_from_audio) else clips_from_audio
        for clip in clips:
            clip_obj = Clip(
            start_timestamp=seconds_from_timestamp(clip['start_timestamp']),
            end_timestamp=seconds_from_timestamp(clip['end_timestamp']),
            description=clip['description'],
            hash=video_hash
            )
            all_clips.append(clip_obj)
    return all_clips


@app.post("/clips")
async def extract_clips(hashes: List[str], prompt: str):
    # TODO: update return 
    return json.dumps(extract_clips_helper(hashes, prompt))

@app.post("/construct_vlog")
async def construct_vlog(hashes: List[str], prompt: str):
    # TODO: music plan
    clips = extract_clips_helper(hashes, prompt)
    prompt = """\
You are an expert video editor, helping us plan how we're going to combine clips into a video.
The client gave you this directive for the plan: {prompt}

Given a list of clips, you must give us a plan formatted as follows:
{
    outline: [
        {
            clip_id: <id>,
            effects: [
                { 
                    type: 
                    offset: how far into the clip to apply the effect
                }
            ],
            area_of_interest: left | middle-left | middle | middle-right | right,
            music_volume: 0-100, 
        }, ...
    ],
    music: str
}
"""
    request: List[str | File] = [prompt]
    clip_lookup = {}
    for clip_id, clip in enumerate(clips, start=1):
        frames: List[File] = get_frames(clip.hash, 
                            clip.start_timestamp, 
                            clip.end_timestamp)
        request.append(f"clip_id: {clip_id}")
        for sec, frame in enumerate(frames):
            request.append(generate_timestamp(sec))
            request.append(frame)
        
        clip_lookup[clip_id] = clip

    response = model.generate_content(request, request_options={"timeout": 600}) # type: ignore
    response = json.loads(response.text)
    outline = response['outline']
    music = response['music']

    clip_order = []
    for entry in outline:
        clip_info = clip_lookup[entry['clip_id']]

        clip_path = get_clip_path(clip_info.hash, clip_info.start_timestamp, clip_info.end_timestamp)
        clip_order.append(clip_path)

    # TODO: apply effects and update json maybe
    # TODO: update file path to make sense, maybe we need job ids
    final_path = "output.mkv"
    ffmpeg_concat([str(x) for x in clip_order] + ["-c", "copy", final_path])
    return final_path