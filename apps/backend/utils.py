import hashlib
import os
import subprocess


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


def hash_video(filepath):
    """
    fake hash: just a sha256 of the "{filename}{filesize}"
    :param filepath: string
    :return:
    """
    filesize = os.stat(filepath).st_size
    filename = os.path.basename(filepath)
    return hashlib.sha256(f"{filename}{filesize}".encode()).hexdigest()
