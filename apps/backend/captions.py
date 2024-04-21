import os
import re
import time
import subprocess
import shlex
from utils import preview, ffmpeg

import assemblyai as aai
    
class Processor:
    def __init__(self, _dir="videos"):
        aai.settings.api_key = os.environ['ASSEMBLY_AI_API_KEY']
        self.dir = _dir
    
    def extract_audio(self, video_file, audio_file):
        """
        extract audio from a video file
        """
        ffmpeg([
            "-i", video_file,
            "-vn",
            "-acodec", "libmp3lame",
            audio_file
        ])

    def generate_captions(self, words, time_gap=1000, max_length=3):
        clauses = []
        current_clause = []

        for i, word in enumerate(words):
            if not current_clause:
                # Start a new clause if none
                current_clause.append(word)
            elif i == len(words) - 1 or word.start - current_clause[-1].end > time_gap or len(current_clause) == max_length:
                # End clause if conditions met
                clause_text = ' '.join([w.text for w in current_clause])
                start_time = current_clause[0].start

                if word.start - current_clause[-1].end < time_gap:
                    # If the gap is less than time_gap, set the previous clause's end_time to the current start_time
                    end_time = word.start
                else:
                    end_time = current_clause[-1].end

                clauses.append({ 'text': clause_text, 'start': start_time, 'end': end_time})
                current_clause = [word] if i != len(words) - 1 else []
            else:
                # Otherwise, add to current clause
                current_clause.append(word)

        # Add the last clause
        if current_clause:
            clause_text = ' '.join([w.text for w in current_clause])
            start_time = current_clause[0].start
            end_time = current_clause[-1].end
            clauses.append({ 'text': clause_text, 'start': start_time, 'end': end_time})

        return clauses
    
    def overlay_captions(self, video_file, captions, output_file):
        """
        Overlay captions on a video file
        """

        for i, caption in enumerate(captions):
            temp_file = f"{self.dir}/tmp/caption-temp-{i % 2}.mp4"
            prev_file = f"{self.dir}/tmp/caption-temp-{(i - 1) % 2}.mp4"

            text = caption['text'] 
            text = re.sub('[^a-zA-Z0-9 .,?!;:]', '', text)
            start_time = caption['start'] / 1000
            end_time = caption['end'] / 1000

            ffmpeg([
                "-i", prev_file if i > 0 else video_file,
                "-vf", f"drawtext=enable='between(t,{start_time},{end_time})':text={shlex.quote(text)}:fontfile=/fonts/ProximaSoft-Regular.otf:fontcolor=white:fontsize=24:borderw=3:bordercolor=black:x=(w-text_w)/2:y=(h-text_h)/2",
                "-codec:a", "copy",
                output_file if i == len(captions) - 1 else temp_file
            ])          

    def caption(self, a, output="output"):
        """
        extract audio from a video file
        """
        
        print(f"Creating captions for video {a}")

        outfile = f"{self.dir}/{output}.mp4"
        infile = f"{self.dir}/{a}.mp4"

        audiofile = f"{self.dir}/tmp/audio.mp3"

        self.extract_audio(infile, audiofile)

        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audiofile)

        if transcript.status == aai.TranscriptStatus.error:
            print(transcript.error)
        else:
            captions = self.generate_captions(transcript.words)
            
            print(f"Captions generated: {captions}")

            start_time = time.time()
            self.overlay_captions(infile, captions, outfile)
            end_time = time.time()

            print(f"Time taken to overlay captions: {end_time - start_time} seconds")
    
    
if __name__ == "__main__":
  

    processor = Processor()

    processor.caption("shortest-video")

    preview("videos/output.mp4")