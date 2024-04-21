import {Card} from "@/components/ui/card";
import {formatDuration} from "@/lib/video/formatDuration";
import {formatFileSize} from "@/lib/video/formatFileSize";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";
import React, {useEffect, useState} from "react";

export const ThumbnailRow = ({file }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if(!file) return;

    // randomly increase progress until 100
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + Math.floor(Math.random() * 100000000000 / file.size)));
    }, 200);
    return () => clearInterval(interval);
  })
  if (!file) return null;

  return <Card className="flex-shrink-0 w-full">
    <div className="flex space-x-4 rounded relative px-4 py-4">
      <div className={"relative"}>

        {file.thumbnail && <img src={URL.createObjectURL(file.thumbnail)} alt={`Cover of video ${file.name}`}
                                className="w-[200px] rounded"/>}
        <div
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 text-xs rounded">
          {formatDuration(file.duration)}
        </div>
      </div>

      <div className={"w-full flex flex-col justify-evenly h-full space-y-4"}>
        <div className="flex justify-between pr-2">
          <p className="text-md pt-1">
            {file.name}
          </p>
          <p className={"text-gray-400 text-sm"}>
            {formatFileSize(file.size)}
          </p>
        </div>
        <div className={"flex space-x-2"} title={file.hash}>
          <Badge variant={progress===100 ? "secondary" : "outline"}>{progress === 100 ? "Uploaded!" : "Uploading..."}</Badge>
          {/*{file.hash && <Badge variant={"outline"}>{file.hash}</Badge>}*/}
        </div>
        <Progress value={progress}/>
      </div>

      <div className="absolute top-0.5 right-0 text-xl p-2">&#8942;</div>
    </div>
  </Card>
}

export const Thumbnails = ({videoThumbnails}) => {
  if (!videoThumbnails) return null;
  return <>
    {videoThumbnails && videoThumbnails.map((file, i) => (
      <ThumbnailRow file={file} key={file.name} />
    ))}
  </>
}
