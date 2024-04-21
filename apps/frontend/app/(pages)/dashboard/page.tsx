"use client";
import {File, ListFilter, Video,} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Progress} from "@/components/ui/progress"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import Link from "next/link";
import Header from "@/components/ui/header";

export default function Dashboard() {
  // FIXME: we can change this when the endpoint actually exists
  const projects = [
    {
      "project": "Vlog Edit",
      "title": "on Tiktok!",
      "date": "2024/04/19",
      "size": `${(Math.random() * 5).toFixed(1)} GB`,
      "href": "https://www.tiktok.com/@clippy.ai.edits?lang=en"
    },
    {
      "project": "processing...",
      "title": "currently processing",
      "date": "2024/04/19",
      "size": `${(Math.random() * 5).toFixed(1)} GB`,
      "href": "https://www.tiktok.com/@clippy.ai.edits?lang=en"
    },
    {
      "project": "uploading...",
      "title": "in queue",
      "date": "2024/04/19",
      "size": `${(Math.random() * 5).toFixed(1)} GB`,
      "href": `https://www.tiktok.com/@clippy.ai.edits?lang=en`
    }
  ];

  return (
    <>
      <Header route="Dashboard"/>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card
              className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>Your Projects</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  View your current projects or create a new one :)<br/>
                  Creating a new video edit is as simple as clicking the button below.
                </CardDescription>
              </CardHeader>
              <Link href="/vlogs">
                <CardFooter>
                  <Button>Upload New Video</Button>
                </CardFooter>
              </Link>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Current Progress</CardDescription>
                <CardTitle className="text-4xl">20%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  embedding frames...
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase"/>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Current Queue Status</CardDescription>
                <CardTitle className="text-4xl">10%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  processing...
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
                      <Card className={"cursor-pointer hover:opacity-75"} onClick={() => window.open(project.href, "_blank")}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{project.project}</CardTitle>
                          <Video className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xl font-bold pb-4 pr-20">{project.title}</div>
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
