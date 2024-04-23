[![Landing Page](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/857/389/datas/original.png)](https://devpost.com/software/clippy-b5mitf)

LAHacks Submission: https://www.youtube.com/embed/gZA5P_POJaI

We got 2nd ($1.5k) in Google's Gemini prize!

## Inspiration
We were excited at the prospect of attaching cameras to ourselves and seeing what Gemini would determine as the highlights. 

Over the course of this hackathon, we filmed as much of ourselves having fun as we could—programming, talking to others, playing with a dog named Jackson, trying to remember names, food review, everything—to use as input for Google's Gemini. With the help of Gemini, our project auto-curated a selection of highlights from the many hours of filming complete with selecting transitions, music (generated as well!), and timing.

---

## What it does
1. Clippy is first given a video and a prompt for how it should style the highlights in the video. For example: we gave Clippy the videos of us roaming Pauly and asked it to make a reel of all the times we asked for names (and whether we forgot/remembered them later).

2. It then breaks the video into clips it deems interesting and relevant to the given prompt, adding transitions, captions, and generated music in the process. 

3. A vlog is born! It can then be exported to TikTok in a single click. 

---

## How we built it
### Backend
The crux of our backend is Gemini Ultra 1.5 (Latest)! Given a very large prompt Sasha wrote, Gemini outputs JSON including timestamps of the cuts of each clip, captions, and transitions to associate with it. A second prompt is then used to compile the clips back together in an order.

Redis is our database. The music is generated using Udio.

### Frontend
We developed our frontend with Next.js and React in Typescript. Our component library is mainly based off of ShadCN and has liberal use of animations with Framer motion because we think it looks fun. We used tiktok-uploader to seamlessly add our generated clips to TikTok.

---

## Challenges we ran into
Our infrastructure fell down and we started integration late when everyone was sleepy. We often found ourselves at odds with the wifi! Sometimes the total length of the video would be hallucinated. 

## Acks
Thanks to the Google Notebook & Gemini team for letting us bounce ideas and for troubleshooting Gemini with us!

## Accomplishments that we're proud of / What we Learned
- Many hours spent exploring Gemini.
- Getting to know a lot of cool people in the process! This project really encouraged us (me) out of our comfort zones to meet new people; I got to pet a lot of dogs too :)
- Exporting generated clips to Tiktok seamlessly (it's also the first time I touched TikTok)
- Samyok handrolling video transitions with ffmpeg

## What's next for Clippy
- Generating a focused narrative
