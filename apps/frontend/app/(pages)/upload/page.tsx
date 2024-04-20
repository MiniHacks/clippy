"use client"

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from "@/components/ui/header";

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

function getVideoDuration(file: Blob): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = function() {
      reject('Invalid video. Please select a valid video file.');
    };
    video.src = URL.createObjectURL(file);
  });
}

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatFileSize(size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (+((size / Math.pow(1024, i)).toFixed(2))) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export default function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(undefined);
  const [videoThumbnails, setVideoThumbnails] = useState<{ thumbnail: Blob | null, name: string, duration: number, size: number }[] | undefined>(undefined);

  const { toast } = useToast();
  const getVideoCovers = async () => {
    if (selectedFiles) {
      const videoThumbnails: Promise<{ thumbnail: Blob | null, name: string, duration: number, size: number }>[] = selectedFiles.map(async (file: File) => {
        const thumbnail = await getVideoCover(file, 1.5);
        const duration = await getVideoDuration(file);
        const size = file.size;
        return { thumbnail, name: file.name, duration, size };
      });
      const results: { thumbnail: Blob | null, name: string, duration: number, size: number }[] = await Promise.all(videoThumbnails);
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

    <>
      <Header route="Video Upload"/>
        <main className="flex flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

              <div {...getRootProps()} className={`w-full transition-colors duration-300 ease-in-out rounded ${isDragActive ? 'bg-green-100' : 'bg-white'}`}>
                <input {...getInputProps()} />
                <CardHeader>
                  <CardTitle>Upload Videos Here</CardTitle>
                  <CardDescription>Click or Drag N' Drop to Add Videos</CardDescription>
                </CardHeader>

              </div>

              {videoThumbnails && videoThumbnails.map((file, index) => (
                <>
                  {file && file.thumbnail && (
                    <Card className="flex-shrink-0 w-full">
                      <div key={index} className="flex items-center space-x-4 rounded relative">
                        <img src={URL.createObjectURL(file.thumbnail)} alt={`Cover of video ${index + 1}`} className="w-[200px] p-4 rounded"/>
                        <div className="absolute top-0 bg-black bg-opacity-50 text-white p-1 m-5 text-xs rounded">
                          {formatDuration(file.duration)}
                        </div>

                        <div>
                          <p className="text-md pt-1">{file.name}</p>
                          <p className="text-gray-600">{formatFileSize(file.size)}</p>

                          <div className="w-full h-2 bg-gray-200 rounded mt-2">
                            <div className="h-full bg-black rounded" style={{ width: `${(1 / 5) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 text-xl p-2">&#8942;</div>
                      </div>
                    </Card>
                  )}
                </>
              ))}


        </main>
        
      </>

    // <>
    //   <Header route="Video Upload"/>
    //     <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Upload Video</CardTitle>
    //           <CardDescription>Click or Drag N' Drop Below to Add Videos</CardDescription>
    //         </CardHeader>
            
    //         {isLoading ? (
    //           <div>Loading...</div>
    //         ) : (
    //           <>
    //             <div {...getRootProps()} className={`transition-colors duration-300 ease-in-out text-center mx-3 mb-2 -mt-3 py-3 rounded ${isDragActive ? 'bg-green-100' : 'bg-white'}`}>
    //               <input {...getInputProps()} />
    //               <CardContent className="min-h-[200px]">
    //                 <div className="flex flex-row flex-wrap">
    //                   {videoThumbnails && videoThumbnails.map((file, index) => (
    //                     <div key={index} className="w-1/4 p-1 rounded">
    //                       {file && file.thumbnail && <img src={URL.createObjectURL(file.thumbnail)} alt={`Cover of video ${index + 1}`} className="rounded"/>}
    //                       <p className="text-center text-xs pt-1">{file.name}</p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </CardContent>
    //             </div>
    //             <CardFooter className="flex justify-between">
    //               <Button
    //                   onClick={handleUpload}
    //               >
    //                   Upload
    //               </Button>
    //             </CardFooter>
    //           </>
    //         )}
    //       </Card>
    //     </main>
        
    //   </>
  )
}