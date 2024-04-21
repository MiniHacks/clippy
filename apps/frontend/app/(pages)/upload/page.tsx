"use client"

import UploadBox from "@/components/ui/upload";
import Header from "@/components/ui/header";
import {Thumbnails} from "@/components/upload/Thumbnails";
import {useUpload} from '@/components/upload/useUpload';

export default function Upload() {
  const {selectedFiles, videoThumbnails, getRootProps, getInputProps, isDragActive} = useUpload();

  const handleUpload = async () => {
    return;
  }

  return (

    <>
      <Header route="Video Upload"/>
      <main className="flex flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div {...getRootProps()}
             className={`w-full transition-colors duration-300 ease-in-out rounded ${isDragActive ? 'bg-green-100' : 'bg-white'}`}>
          <input {...getInputProps()} />
          <UploadBox
            title="Upload"
            desc="Click to browse for videos, or drag and drop files here."
          />
        </div>

        <Thumbnails videoThumbnails={videoThumbnails}/>

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
