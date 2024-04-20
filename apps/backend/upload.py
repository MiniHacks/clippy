from tiktok_uploader.upload import upload_video

# exports a video to tiktok
def upload(filename, desc):
    upload_video(filename, description=desc, cookies="cookies.txt")

# example usage:
# upload_video(
#     "1.mp4",
#     description="This is a video I just downloaded",
#     cookies="cookies.txt"
# )
