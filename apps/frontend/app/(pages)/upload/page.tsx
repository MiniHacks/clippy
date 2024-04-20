"use client"

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { SquarePlus } from 'lucide-react';


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
  const [videoThumbnails, setVideoThumbnails] = useState<{ thumbnail: Blob | null, name: string }[] | undefined>(undefined);

  const { toast } = useToast();
  const getVideoCovers = async () => {
    if (selectedFiles) {
      const videoThumbnails: Promise<{ thumbnail: Blob | null, name: string }>[] = selectedFiles.map(async (file: File) => {
        const thumbnail = await getVideoCover(file, 1.5);
        return { thumbnail, name: file.name };
      });
      const results: { thumbnail: Blob | null, name: string }[] = await Promise.all(videoThumbnails);
      setVideoThumbnails(results);
      console.log(results)
      toast({
        title: "Video uploaded!",
      })
    }
  }

  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
     },
    onDrop: (acceptedFiles: File[]) => {
      setIsLoading(true);
      setSelectedFiles(prevFiles => [...(prevFiles || []), ...acceptedFiles]);
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

    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>Click or Drag N' Drop Below to Add Videos</CardDescription>
          </CardHeader>
          
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div {...getRootProps()} className={`transition-colors duration-300 ease-in-out text-center mx-3 mb-2 -mt-3 pt-3 rounded ${isDragActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                <input {...getInputProps()} />
                <CardContent className="min-h-[200px]">
                  <div className="flex flex-row flex-wrap">
                    {videoThumbnails && videoThumbnails.map((file, index) => (
                      <div key={index} className="w-1/4 p-2 rounded">
                        {file && file.thumbnail && <img src={URL.createObjectURL(file.thumbnail)} alt={`Cover of video ${index + 1}`} className="rounded"/>}
                        <p className="text-center text-xs pt-1">{file.name}</p>
                      </div>
                    ))}
                  </div>
                  {!videoThumbnails && (
                    <div className="flex flex-col items-center justify-center min-h-[200px]">
                      <p className="text-xs">No videos at the moment...</p>
                    </div>
                  )}
                </CardContent>
              </div>

                <CardFooter className="flex justify-between">
                  <Button 
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </CardFooter>
            </>
          )}
        </Card>
    </div>
  )
}