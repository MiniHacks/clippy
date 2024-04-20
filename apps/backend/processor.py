import subprocess


def ffmpeg(args):
    """
    call ffmpeg with the given arguments
    """
    subprocess.run(["ffmpeg"] + args)


class Processor:
    def __init__(self, _input, _output_dir):
        self.input = _input
        self.output_dir = _output_dir

    def clip(self, start, end, output="output"):
        """
        clip the video from start to end and save it to output suing the
        """
        outfile = f"{self.output_dir}/{output}.mp4"
        ffmpeg(["-ss", str(start), "-to", str(end), "-i", self.input, "-c", "copy", outfile])
