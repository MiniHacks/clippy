import os
import subprocess
import json

from utils import ffmpeg

class Processor:
    def __init__(self, _dir="videos"):
        self.dir = _dir

    def convert_mp4_to_mkv(self, input_file, output_file):
        ffmpeg([
            "-i", f"{self.dir}/{input_file}.mp4",
            "-codec", "copy",
            f"{self.dir}/{output_file}.mkv"
        ])

    def get_video_resolution(self, video_path):
        command = [
            "ffprobe",
            "-v", "quiet",
            "-print_format", "json",
            "-show_streams",
            f"{self.dir}/{video_path}.mkv"
        ]
        
        output = subprocess.run(command, capture_output=True, text=True)
        info = json.loads(output.stdout)

        for stream in info["streams"]:
            if stream["codec_type"] == "video":
                return (stream["width"], stream["height"])

        return None

    def clip(self, a, start, end=0., output="output"):
        """
        clip the video from start to end and save it to output suing the
        """

        print(f"Clipping video from {start} to {end}")
        outfile = f"{self.dir}/{output}.mkv"
        infile = f"{self.dir}/{a}.mkv"
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

        infile = f"{self.dir}/{a}.mkv"
        outfile = f"{self.dir}/{output}.mkv"

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
            f"{self.dir}/{a}.mkv",
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
        fade_dur = 7

        start_a = self.clip(a, 0, dur_a - fade_dur, "tmp/start_a")
        end_a = self.clip(a, start=dur_a - fade_dur, output="tmp/clip_end_a")


        start_b = self.clip(b, 0, fade_dur, "tmp/start_b")
        end_b = self.clip(b, start=fade_dur, output="tmp/clip_end_b")

        width_a, height_a = self.get_video_resolution(end_a)
        width_b, height_b = self.get_video_resolution(start_b)

        # Calculate the scale
        scale_width = min(width_a, width_b)
        scale_height = min(height_a, height_b)
        

        args = [
            "-vsync", "0",
            "-i", f"{self.dir}/{end_a}.mkv",
            "-i", f"{self.dir}/{start_b}.mkv",
            "-filter_complex",
            f"[0:v]fade=out:st=5:d=1:alpha=1[fadeout];[1:v]fade=in:st=0:d=1:alpha=1[fadein];[fadeout][fadein]blend=all_expr='A*(if(gte(T,5),1,T/5))+B*(1-(if(gte(T,5),1,T/5)))'[outv]",
            "-map", "[outv]",
            "-map", "0:a",
            "-c:v", "libx264",
            "-c:a", "copy",
            f"{self.dir}/tmp/_combined.mkv",
        ]


        ffmpeg(args)

        # cross-fade the two videos

        # print("Cross fading video from {} to {}".format(end_a, start_b))
        # ffmpeg_concat(args)
        #
        print(f"cross faded and saved to {self.dir}/tmp/_combined.mkv")
        print(f"Combining videos {start_a} and {end_b} with cross-faded _combined.mkv")
        #
        # # combine all into outfile
        self.combine(start_a, "tmp/_combined", end_b, output=output)
        #
        print(f"Cross-faded video saved to {self.dir}/{output}.mkv")
        return output

    def combine(self, *videos, output="output"):
        """
        combine two videos
        """
        print(f"Combining videos {videos}")

        for vid in list(videos):
            print(f"file '{self.dir}/{vid}.mkv'", file=open("concat.txt", "a"))

        args = [
            "-f", "concat",
            # "-safe", "0",
            "-i", "concat.txt",
            "-c", "copy",
            f"{self.dir}/{output}.mkv"
        ]

        ffmpeg(args)

        # clean up
        os.remove("concat.txt")

        print(f"Videos combined and saved to {self.dir}/output.mkv")
        return "output"


if __name__ == "__main__":
    processor = Processor()

    # convert_mp4_to_mkv("videoplayback", "videoplayback")
    # convert_mp4_to_mkv("videoplayback2", "videoplayback2")

    processor.cross_fade("videoplayback", "videoplayback2")
    # processor.clip("shortest-video", 0, 5)
    # processor.clip_end("shortest-video", 5)
    # processor.duration("shortest-video")