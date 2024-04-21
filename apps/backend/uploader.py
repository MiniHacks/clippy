import sys
from tqdm import tqdm
from gemini import get_frames, upload_file

if __name__ == "__main__":
    # get argv
    args = sys.argv[1:]
    if len(args) != 2:
        print("Usage: python uploader.py <start> <end>")

    start, end = args

    files = sorted(get_frames())[int(start):int(end)]

    for f in tqdm(files):
        uri = upload_file(f)
