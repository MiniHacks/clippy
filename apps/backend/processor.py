import os
import subprocess


def ffmpeg(args):
    """
    call ffmpeg with the given arguments
    """
    subprocess.run(["ffmpeg", "-y"] + args)

def ffmpeg_concat(args):
    """
    call ffmpeg-concat with the given arguments
    """
    subprocess.run(["ffmpeg-concat"] + args)


class Processor:
    def __init__(self, _dir="videos"):
        self.dir = _dir

    def clip(self, a, start, end=0., output="output"):
        """
        clip the video from start to end and save it to output suing the
        """

        print(f"Clipping video from {start} to {end}")
        outfile = f"{self.dir}/{output}.mp4"
        infile = f"{self.dir}/{a}.mp4"
        args = ([
                    "-ss", str(start),
                ]
                + ([
                       "-to", str(end),
                   ] if end else []) +
                [
                    "-i", infile,
                    "-c", "copy",
                    "-timecode", "00:00:00:00",
                    outfile
                ])
        ffmpeg(args)

        print(f"Video clipped and saved to {outfile}")
        return output

    def clip_end(self, a, seconds, output="output"):
        """
        clip the video from start to end and save it to output suing the
        """
        print(f"Clipping the last {seconds} seconds of video {a}")

        infile = f"{self.dir}/{a}.mp4"
        outfile = f"{self.dir}/{output}.mp4"

        args = [
            "-sseof", str(-seconds),
            "-i", infile,
            "-c", "copy",
            "-timecode", "00:00:00:00",
            outfile
        ]

        ffmpeg(args)

        print(f"Video clipped and saved to {outfile}")
        return output

    def duration(self, a) -> float:
        """
        get the duration of the video
        """
        args = [
            "ffprobe",
            "-v", "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            f"{self.dir}/{a}.mp4",
        ]

        return float(subprocess.run(args, capture_output=True).stdout.decode("utf-8"))

    def cross_fade(self, a, b, output="output"):
        """
        cross-fade the video from a to b and save it to output
        :param a: str video name in output directory
        :param b: str video name in output directory
        :param output: str output video name
        :return: str output video path
        """
        # first, clip the two videos to -0.5s from the end of the first and the 0.5s of the start of the next
        dur_a = self.duration(a)
        fade_dur = 2
        start_a = self.clip(a, 0, dur_a - fade_dur, "tmp/start_a")
        end_a = self.clip_end(a, fade_dur, "tmp/clip_end_a")

        start_b = self.clip(b, 0, fade_dur, "tmp/start_b")
        end_b = self.clip(b, start=fade_dur, output="tmp/clip_end_b")

        # cross-fade the two videos

        args = [
            "-o", f"{self.dir}/tmp/combined.mp4"
            f"{self.dir}/{end_a}.mp4",
            f"{self.dir}/{start_b}.mp4",
            # "-filter_complex", f"xfade=transition=fade:duration={fade_dur}:offset={fade_dur / 2}",
            # "-timecode", "00:00:00:00",
            # "-c", "copy",
            # "-map", "[v]",
            # "-vcodec", "libvpx-vp9"
        ]

        print("Cross fading video from {} to {}".format(end_a, start_b))
        ffmpeg_concat(args)

        print(f"cross faded and saved to {self.dir}/tmp/combined.mp4")

        # combine all into outfile
        self.combine(start_a, "tmp/combined", end_b, output=output)

        return output

    def combine(self, *videos, output="output"):
        """
        combine two videos
        """
        print(f"Combining videos {videos}")

        for vid in list(videos):
            print(f"file '{self.dir}/{vid}.mp4'", file=open("concat.txt", "a"))

        args = [
            "-f", "concat",
            # "-safe", "0",
            "-i", "concat.txt",
            "-c", "copy",
            f"{self.dir}/{output}.mp4"
        ]

        ffmpeg(args)

        # clean up
        os.remove("concat.txt")

        print(f"Videos combined and saved to {self.dir}/output.mp4")
        return "output"
