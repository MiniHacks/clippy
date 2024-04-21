import os
import sys

import redis
from dotenv import load_dotenv

from gemini import upload_folder, upload_file
from processor import Processor, ffmpeg
from utils import hash_video

load_dotenv()

rd = redis.Redis(
    host=os.environ.get('REDIS_HOST'),
    port=33171,
    password=os.environ.get('REDIS_PASSWORD'),
    ssl=True
)

# get folder of videos to process
if len(sys.argv) < 2:
    raise Exception("Please provide the folder of videos to process")

VIDEOS_FOLDER = sys.argv[1]
OUTPUT_FOLDER = "videos"

if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

processor = Processor()


def all_frames_exist(vh):
    print("looking for frames @ " + vh)
    return rd.get(vh) is not None


def create_frames(video_path, vh):
    if all_frames_exist(vh):
        print(f"Skipping {video_path}")
        return

    print(f"Creating Frames {video_path}")
    folder = f"{OUTPUT_FOLDER}/{vh}"
    if not os.path.exists(folder):
        os.makedirs(folder)

    ffmpeg_args = [
        "-i", video_path,
        "-vf", "fps=1",
        "-qscale:v", "31",
        f"{folder}/{vh}-%d.jpg"
    ]

    ffmpeg(ffmpeg_args)

    # upload the frames to the cloud
    upload_folder(folder)

    # strip the audio out
    audio_path = f"{folder}/{vh}.mp3"
    ffmpeg_args = [
        "-i", video_path,
        audio_path
    ]
    ffmpeg(ffmpeg_args)

    audio_uri = upload_file(audio_path)
    rd.set(f"{vh}_audio", audio_uri)

    rd.set(vh, video_path)


for video in os.listdir(VIDEOS_FOLDER):
    video_path = os.path.join(VIDEOS_FOLDER, video)
    vh = hash_video(video_path)

    create_frames(video_path, vh)

# rd.connection_pool.disconnect()
