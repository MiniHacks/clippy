import os
import time
from typing import List

import google.generativeai as genai
import redis
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from rq import Queue

from routes import extract_clips, construct_vlog

load_dotenv()

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel('gemini-pro-vision')

r = redis.Redis(
    host=os.environ['REDIS_HOST'],
    port=33171,
    password=os.environ['REDIS_PASSWORD'],
    ssl=True
)
q = Queue(connection=r)

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


class Clip(BaseModel):
    start_timestamp: int
    end_timestamp: int
    frame_locaion: str
    description: str
    hash: str


@app.post("/clips")
async def route_extract_clips(hashes: List[str], prompt: str):
    q.enqueue(extract_clips, hashes, prompt)
    time.sleep(1)
    return {"status": "success"}


# enqueue
@app.post("/construct_vlog")
async def route_construct_vlog(clips: List[Clip], prompt: str):
    q.enqueue(construct_vlog, clips, prompt)
    time.sleep(1)
    return {"status": "success"}
