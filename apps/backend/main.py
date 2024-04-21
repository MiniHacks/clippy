from fastapi import FastAPI, UploadFile
from videohash import VideoHash
from gemini import upload_file
import redis
import os
from dotenv import load_dotenv
from typing import List
from pydantic import BaseModel

load_dotenv()

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


# do we wanna load in chunks? + md5?
@app.post("/upload/")
async def upload_video(upload: UploadFile):
    file_path = os.path.realpath(upload.file.name)
    hashed_vid = VideoHash(url=file_path).hash

    if not r.get(hashed_vid):
        r.set(hashed_vid, file_path)
        upload_file(file_path)
    os.rename(file_path, f"./videos/{hashed_vid}")

    return {"filename": upload.filename}

class Clip(BaseModel):
    start_timestamp: str
    end_timestamp: str
    frame_locaion: str
    description: str
    type: str
    hash: str

@app.post("/clips")
async def extract_clips(hashes: List[str], prompt: str):
    # go through video and audio
    # merge windows
    return {"clips": []}

@app.post("/construct_vlog")
async def construct_vlog(clips: List[Clip]):
    # prompt for construction + format
    # pass in frames for each clip w numbers
    # get vlog ops

    # apply vlog ops (simple for now)
    # return file path for modded vlog?
    return "nope"