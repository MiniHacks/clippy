import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {getVideoCover} from "@/lib/video/getVideoCover";
import {getVideoDuration} from "@/lib/video/getVideoDuration";
import {useDropzone} from "react-dropzone";
import {hash} from "@/lib/video/hash";

export const useUpload = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(undefined);
  const [videoThumbnails, setVideoThumbnails] = useState<{
    thumbnail: Blob | null,
    name: string,
    duration: number,
    size: number,
    hash: string,
  }[] | undefined>(undefined);

  const {toast} = useToast();
  const getVideoCovers = async () => {
    if (selectedFiles) {
      const videoThumbnails: Promise<{
        thumbnail: Blob | null,
        name: string,
        duration: number,
        size: number,
        hash: string
      }>[] = selectedFiles.map(async (file: File) => {
        const thumbnail = await getVideoCover(file, 1.5);
        const duration = await getVideoDuration(file);
        const h = await hash(file);
        const size = file.size;
        return {thumbnail, name: file.name, duration, size, hash: h};
      });
      const results: {
        thumbnail: Blob | null,
        name: string,
        duration: number,
        size: number,
        hash: string
      }[] = await Promise.all(videoThumbnails);
      setVideoThumbnails(results);
      console.log(results)
      toast({
        title: "Video uploaded!",
      })
    }
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
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


  return {selectedFiles, videoThumbnails, isLoading, getRootProps, getInputProps, isDragActive}
}
