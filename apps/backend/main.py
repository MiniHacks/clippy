import subprocess

print("hi sasha :)")


def ffmpeg(args):
    """
    call ffmpeg with the given arguments
    """
    subprocess.run(["ffmpeg"] + args)


def main():
    ffmpeg(["-i", "input.mp4", "output.mp4"])
