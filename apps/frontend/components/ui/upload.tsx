import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Upload as UploadIcon} from "lucide-react";

interface UploadProps {
    title: string,
    desc: string
}

export default function UploadBox({title, desc}: UploadProps) {
    return (
        <Card className="border-dashed pt-8 pb-4 hover:cursor-pointer">
            <CardHeader className="flex flex-col items-center text-center">
                <UploadIcon className="h-6 w-6 text-muted-foreground"/>
                <CardTitle className="text-xl font-medium text-slate-600">
                    {title}
                </CardTitle>
                <div className="text-sm w-[254px] text-wrap text-slate-400">
                    {desc}
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}