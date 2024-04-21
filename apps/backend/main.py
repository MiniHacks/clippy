from processor import Processor
from utils import preview
from typing import Union, Annotated
from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}

# do we wanna load in chunks?
@app.post("/videos/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}

