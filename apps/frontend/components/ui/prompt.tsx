import { CornerDownLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Prompt() {
    return (
        <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <Textarea
                id="message"
                placeholder="No commentary mukbang but if MrBeast made it"
                className="resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Prompt
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </form>
    )
}
