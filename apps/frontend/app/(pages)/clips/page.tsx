import Header from "@/components/ui/header";
import Prompt from "@/components/ui/prompt";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Upload, Video} from "lucide-react";

export default function Clips() {
    return (
        <>
            <Header route="Clips Editor"/>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
                    <h1 className="text-4xl font-medium">
                        Clips Editor
                    </h1>
                    <Card className="border-dashed pt-8 pb-4">
                        <CardHeader className="flex flex-col items-center text-center">
                            <Upload className="h-6 w-6 text-muted-foreground"/>
                            <CardTitle className="text-xl font-medium text-slate-600">
                                Upload some Clips
                            </CardTitle>
                            <div className="text-sm w-[254px] text-wrap text-slate-400">
                                Not sure whether we're dragging these
                                or gathering them from the existing upload
                                UI.
                            </div>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Prompt/>
                </div>
            </main>
        </>
    )
}