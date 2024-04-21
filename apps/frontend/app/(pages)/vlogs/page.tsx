"use client";
import Header from "@/components/ui/header";
import UploadBox from "@/components/ui/upload";
import {useRouter} from "next/navigation";
import {useUpload} from "@/components/upload/useUpload";
import {useCallback, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CornerDownLeft, Loader2} from "lucide-react";
import {Thumbnails} from "@/components/upload/Thumbnails";

export default function Vlog() {
  const router = useRouter();
  const {videoThumbnails, getRootProps, getInputProps, isDragActive} = useUpload();
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const submit = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:8000/vlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        hashes: videoThumbnails?.map(({hash}) => hash)
      })
    }).then(res => res.json()).then(() => {
      router.push("/");
    }).catch(console.error).finally(() => setLoading(false))
  }, [prompt, videoThumbnails, router])
  return (
    <>
      <Header route="Highlights Editor"/>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
          <h1 className="text-4xl font-medium">
            Highlights Editor
          </h1>
          <div
            className="relative overflow-hidden py-2 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Input
              id="message"
              placeholder="Create an epic highlight reel"
              className="min-h-2 max-h-8 overflow-hidden resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

          </div>
          <div {...getRootProps()}
               className={`w-full transition-colors duration-300 ease-in-out rounded ${isDragActive ? 'bg-green-100' : 'bg-white'}`}>
            <input {...getInputProps()} />
            <UploadBox
              title="Add Videos"
              desc="Click to browse or drag & drop long videos to be made into a highlight reel."
            />
          </div>
          <div className="flex items-center p-3 pt-0">
            <Button disabled={loading || !videoThumbnails?.length || !prompt} type="submit" size="sm"
                    className="ml-auto gap-1.5"
                    onClick={submit}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Send Prompt
              <CornerDownLeft className="size-3.5"/>
            </Button>
          </div>
          <Thumbnails videoThumbnails={videoThumbnails}/>
        </div>
      </main>
    </>
  )
}
