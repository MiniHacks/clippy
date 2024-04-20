import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)

FRAME_EXTRACTION_DIRECTORY = "frames"
FRAME_PREFIX = "_frame"


def list_models():
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)


if __name__ == '__main__':
    pro = genai.GenerativeModel('gemini-1.5-pro-latest')
    vision = genai.GenerativeModel('gemini-1.0-pro-vision-latest')

    response = pro.generate_content("omg hi!")

    print(response.text)
