from fastapi import FastAPI, UploadFile
from videohash import VideoHash
from gemini import upload_file
import redis
import os

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
        await r.set(hashed_vid, file_path)
        upload_file(file_path)
    os.rename(file_path, f"./videos/{hashed_vid}")

    return {"filename": upload.filename}
