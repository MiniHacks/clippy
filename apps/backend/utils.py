import os
import subprocess
from google.generativeai.types import File
from typing import List


def preview(filename):
    if os.name == "nt":
        os.startfile(filename)
    elif os.name == "posix":
        os.system(f"open {filename}")
    else:
        raise Exception("Unsupported operating system")


def ffmpeg(args):
    """
    call ffmpeg with the given arguments
    """
    subprocess.run([
                       "ffmpeg",
                       "-hide_banner",
                       # "-loglevel", "error",
                       "-y"
                   ] + args)


def ffmpeg_concat(args):
    """
    call ffmpeg-concat with the given arguments
    """
    subprocess.run(["ffmpeg-concat"] + args)

def extract_mp3_from_mp4(video_file_name, audio_file_name):
    ffmpeg(["-i", video_file_name, audio_file_name])

def convert_to_mkv(video_file_name, mkv_file_name):
    ffmpeg(["-i", str(video_file_name), "-c", "copy", str(mkv_file_name)])

def get_frames(video_hash) -> List[File]:
    """returns an ordered list of URIs"""
    raise NotImplementedError()

def get_audio(video_hash) -> File:
    """returns the audio URI"""
    raise NotImplementedError()

def generate_timestamp(seconds: int) -> str:
    """turns seconds into HH:MM:SS format """
    return f"{seconds // 3600:02}:{seconds // 60 % 60:02}:{seconds % 60:02}"

