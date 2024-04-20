"use client"

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from "@/components/ui/header";

function getVideoCover(file : File, seekTo = 0.0) : Promise<Blob | null> {
  console.log("getting video cover for file: ", file);
  return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
          reject(`error when loading video file: ${ex}`);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
          // seek to user defined timestamp (in seconds) if possible
          if (videoPlayer.duration < seekTo) {
              reject("video is too short.");
              return;
          }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          // extract video thumbnail once seeking is complete
          videoPlayer.addEventListener('seeked', () => {
              console.log('video is now paused at %ss.', seekTo);
              // define a canvas to have the same dimension as the video
              const canvas = document.createElement("canvas");
              canvas.width = videoPlayer.videoWidth;
              canvas.height = videoPlayer.videoHeight;
              // draw the video frame to canvas
              const ctx = canvas.getContext("2d");

              if (!ctx) {
                  reject("cannot get 2d context");
                  return;
              }

              ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
              // return the canvas image as a blob
              ctx.canvas.toBlob(
                  blob => {
                      resolve(blob);
                  },
                  "image/jpeg",
                  0.75 /* quality */
              );
          });
      });
  });
}

export default function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(undefined);
  const [videoCovers, setVideoCovers] = useState<(Blob | null)[] | undefined>(undefined);
  // const [previewUrl, setPreviewUrl] = useState<string[] | undefined>(undefined);


  const getVideoCovers = async () => {
    if (selectedFiles) {
      const videoCovers: Promise<Blob | null>[] = selectedFiles.map((file: File) => getVideoCover(file, 1.5));
      const results: (Blob | null)[] = await Promise.all(videoCovers);
      setVideoCovers(results);
      console.log(results)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
     },
    onDrop: (acceptedFiles: File[]) => {
      setIsLoading(true);

      setSelectedFiles(prevFiles => [...(prevFiles || []), ...acceptedFiles]);
      // setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
      setIsLoading(false);
    },
  });

  useEffect(() => {
    getVideoCovers();
  }, [selectedFiles]);

  const handleUpload = async () => {
    return;
  }

  return (
      <>
          <Header route="Upload"/>
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
              {isLoading ? (
                  <div>Loading...</div>
              ) : (
                  <div className="flex flex-col items-center justify-center min-h-screen py-2">
                      <div className="p-12 bg-white rounded shadow-md w-full max-w-2xl">
                          <h2 className="text-2xl font-bold mb-2">Upload Video</h2>

                          <div className="flex flex-row flex-wrap">
                              {videoCovers && videoCovers.map((file, index) => (
                                  <div key={index} className="w-1/4 p-1">
                                      {file &&
                                          <img src={URL.createObjectURL(file)} alt={`Cover of video ${index + 1}`}/>}
                                  </div>
                              ))}
                          </div>
                          <div {...getRootProps()}
                               className="border-dashed border-2 border-gray-400 py-2 px-4 text-center my-3">
                              <input {...getInputProps()} />
                              <p>Drag 'n' drop some files here, or click to select files</p>
                          </div>
                          {/* {previewUrl && (
              <div className="mt-4">
                <video src={previewUrl} controls width="100%" />
              </div>
            )} */}
                          <button
                              onClick={handleUpload}
                              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
                          >
                              Upload
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </>
  )
}