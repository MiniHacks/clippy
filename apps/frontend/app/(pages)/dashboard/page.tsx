import {
    Video,
    File,
    ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link";
import Header from "@/components/ui/header";

export default function Dashboard() {
    // FIXME: we can change this when the endpoint actually exists
    const projects = [
        {
            "project" : "Project Name",
            "title" : "Preview Content",
            "date" : "2024/04/19",
            "size" : "5.3 GB"
        },
        {
            "project" : "Project Name",
            "title" : "Preview Content",
            "date" : "2024/04/19",
            "size" : "5.3 GB"
        },
        {
            "project" : "Project Name",
            "title" : "Preview Content",
            "date" : "2024/04/19",
            "size" : "5.3 GB"
        }
    ];

    return (
        <>
            <Header route="Dashboard" />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card
                            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                        >
                            <CardHeader className="pb-3">
                                <CardTitle>Your Projects</CardTitle>
                                <CardDescription className="max-w-lg text-balance leading-relaxed">
                                    This is where we link to Nathan's epic upload.
                                    Not sure if we want to have this here or on the side.
                                </CardDescription>
                            </CardHeader>
                            <Link href="/upload">
                                <CardFooter>
                                    <Button>Upload New Video</Button>
                                </CardFooter>
                            </Link>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-1">
                            <CardHeader className="pb-2">
                                <CardDescription>Extra Info???</CardDescription>
                                <CardTitle className="text-4xl">20%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    doing embarrassing things...
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={25} aria-label="25% increase"/>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-2">
                            <CardHeader className="pb-2">
                                <CardDescription>Extra Info 2???</CardDescription>
                                <CardTitle className="text-4xl">10%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    being silly
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={12} aria-label="12% increase"/>
                            </CardFooter>
                        </Card>
                    </div>
                    <Tabs defaultValue="projects">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="projects">Projects</TabsTrigger>
                                <TabsTrigger value="month">Settings</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <ListFilter className="h-3.5 w-3.5"/>
                                            <span className="sr-only sm:not-sr-only">Sort</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuCheckboxItem checked>
                                            Ascending
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Descending
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <File className="h-3.5 w-3.5"/>
                                    <span className="sr-only sm:not-sr-only">Export</span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="projects" className="flex">
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                                {/*FIXME: dynamically add cards once endpoint is set up */}
                                {projects &&
                                    projects.map((project) => {
                                        return (
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">{project.project}</CardTitle>
                                                    <Video className="h-4 w-4 text-muted-foreground"/>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-xl font-bold pb-4">{project.title}</div>
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs text-muted-foreground">{project.date}</p>
                                                        <p className="text-xs text-muted-foreground">{project.size}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    )
}