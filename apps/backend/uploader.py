import os
import sys
from tqdm import tqdm
from gemini import get_frames, upload_file
from dotenv import load_dotenv
import redis

load_dotenv()

r = redis.Redis(
    host=os.environ.get('REDIS_HOST'),
    port=33171,
    password=os.environ.get('REDIS_PASSWORD'),
    ssl=True
)


if __name__ == "__main__":
    # get argv
    args = sys.argv[1:]
    if len(args) != 3:
        print("Usage: python uploader.py <folder> <start> <end>")

    folder, start, end = args

    files = sorted(get_frames(folder))[int(start):int(end)]

    for f in tqdm(files):
        uri = upload_file(f)
        # get filename without extension
        name = f.split("/")[-1].split(".")[0]
        r.set(name, uri)
        print(f"Uploaded {f} to {uri}")

