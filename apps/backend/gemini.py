import concurrent.futures
import os
import subprocess
import threading
import time

import google.generativeai as genai
import math
from tqdm import tqdm
from dotenv import load_dotenv

from utils import ffmpeg

load_dotenv()  # take environment variables from .env.

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)

FRAME_EXTRACTION_DIRECTORY = "frames"
FRAME_PREFIX = "_frame"


def list_models():
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)


def list_files():
    files = genai.list_files()
    return files


def delete_file(file):
    print("deleting file:", file.uri)
    genai.delete_file(file)
    print("file deleted:", file.uri)


def delete_all_files():
    for f in genai.list_files():
        delete_file(f)
    print("all files deleted")


def get_frames():
    return [f"{FRAME_EXTRACTION_DIRECTORY}/{f}" for f in os.listdir(FRAME_EXTRACTION_DIRECTORY)]


uploaded_files = []


def upload_file(file):
    # print("uploading file:", file)
    uploaded_files.append(file)
    f = genai.upload_file(file)
    # print("file uploaded:", file, f.uri)
    return f.uri


def extract_audio(input_file, output_file):
    args = [
        "-i", input_file,
        "-vn",
        # "-acodec", "copy",
        output_file
    ]

    ffmpeg(args)
    return output_file


# Define your long running function
def long_running_function(a):
    # Simulating a long-running task
    print("starting...", a)
    time.sleep(1)
    return "Task completed"


# Batch size
batch_size = 12


# Function to upload a batch of files
def upload_batch(start, end):
    print("called with args:", start, end)
    subprocess.run(["python", "uploader.py", str(start), str(end)])
    return f"Batch {start}-{end} uploaded"


def delete_many(files):
    pools = 2
    semaphore = threading.BoundedSemaphore(pools)

    def run_with_semaphore(file):
        with semaphore:
            return delete_file(file)

    results = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(run_with_semaphore, file) for file in files]

        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())
            print(len(results) / len(files) * 100, "%")

    return results


# Function to execute long_running_function 1000 times with a limit of 10 queries per second
def upload_many(files):
    pools = math.ceil(len(get_frames()) / batch_size)
    semaphore = threading.BoundedSemaphore(batch_size)

    # Function to execute the long_running_function with semaphore
    def run_with_semaphore(times):
        [start, end] = times
        with semaphore:
            return upload_batch(start, end)

    # List to store results
    results = []

    # Execute tasks asynchronously
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(run_with_semaphore, [i, i + batch_size]) for i in range(0, len(files), pools)]

        # Gather results
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    return results


# Execute tasks

if __name__ == '__main__':
    # audio = extract_audio("videos/dinnerandline.MP4", "videos/dinner_audio.mp3")
    # print(audio)
    # print(upload_file(audio))
    # print("listing files:")
    # f = list_files()
    # uris = [x.uri for x in f]
    # print(len(uris))
    #
    delete_many(genai.list_files())
    # files = get_frames()
    # upload_many(files)

    # results = execute_tasks()
    # print("Results:", results)
    # pro = genai.GenerativeModel('gemini-1.5-pro-latest')
    # vision = genai.GenerativeModel('gemini-1.0-pro-vision-latest')
    #
    # response = pro.generate_content("omg hi!")
    #
    # print(response.text)
