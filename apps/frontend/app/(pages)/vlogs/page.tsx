import Header from "@/components/ui/header";
import Prompt from "@/components/ui/prompt";
export default function Vlog() {
    return (
        <>
            <Header route="Highlights Editor"/>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
                    <h1 className="text-4xl font-medium">
                        Highlights Editor
                    </h1>
                    <h2>
                        (TODO: some get from library/selection component here)
                    </h2>
                    <Prompt/>
                </div>
            </main>
        </>
    )
}