"use client";

import {LampContainer} from "@/components/ui/lamp";
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {ArrowRightFromLine, ArrowUpRight, ChevronDown, CornerDownLeft, Film, Upload } from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {Textarea} from "@/components/ui/textarea";
import {TypewriterEffect, TypewriterEffectSmooth} from "@/components/ui/typewriter";

export default function Landing() {
    const query = "Highlight reel but only of my buddy Ritik"
    const prompts = query.split(' ').map(word => ({ text: word }));
    return (
        <div className="scroll-smooth">
            <LampContainer>
                <motion.h1
                    initial={{opacity: 0.5, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{
                      delay: 0.3,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-sky-700 to-slate-800 p-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
              >
                    Clippy: Highlights <br/> for your life.
              </motion.h1>
              <motion.h2
                  initial={{opacity: 0, y: 100}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{
                      delay: 0.4,
                      duration: 1.2,
                      ease: "easeInOut",
                  }}
                  className="bg-gradient-to-br from-sky-700 to-slate-800 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
              >
                  <Button asChild size="lg" className="ml-auto bg-slate-700 text-lg gap-1">
                      <Link href="/vlogs" className="tracking-tight">
                          Get started
                          <ArrowUpRight className="h-6 w-6"/>
                      </Link>
                  </Button>
              </motion.h2>
              <motion.h2
                  initial={{opacity: 0, y: 150}}
                  whileInView={{opacity: 1, y: 100}}
                  transition={{
                      delay: 0.5,
                      duration: 1.2,
                      ease: "easeInOut",
                  }}
                  className="flex justify-center text-center scroll-smooth"
              >
                  <Link href="#info" className="scroll-smooth">
                      <ChevronDown className="h-6 w-6"/>
                  </Link>
              </motion.h2>
            </LampContainer>
            <div id="info"
                className="grid scroll-smooth flex-1 gap-4 p-4 sm:px-6 sm:py-4 md:gap-8 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <CardContent>
                    <Tabs defaultValue="clips" className="">
                        <TabsList className="grid w-full grid-cols-3 mb-12">
                            <TabsTrigger value="clips">Clips</TabsTrigger>
                            <TabsTrigger value="creativity">Creativity</TabsTrigger>
                            <TabsTrigger value="captions">Captions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="clips">
                            <CardHeader>
                                <CardTitle className="text-5xl mb-2">Keep the <br/> important parts.</CardTitle>
                                <CardDescription className="text-3xl">
                                    Clippy automatically curates <br/>
                                    highlights from your videos.
                                </CardDescription>
                            </CardHeader>
                            <ol className="mx-12 p-4 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">

                                <li className="mb-10 ms-6 flex flex-col justify-center">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                        <Upload className="h-6 w-6 text-cyan-600"/>
                                    </span>
                                    <h3 className="font-medium leading-tight">Upload Video</h3>
                                </li>
                            </ol>
                        </TabsContent>
                        <TabsContent value="creativity">
                            <CardHeader>
                                <CardTitle className="text-5xl mb-2">Your vibes <br/> into your videos.</CardTitle>
                                <CardDescription className="text-3xl">
                                    You can prompt the style of <br/>
                                    your videos however you like.
                                </CardDescription>
                            </CardHeader>
                            <ol className="mx-12 p-4 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <li className="mb-10 ms-6 flex flex-col justify-center">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                        <Upload className="h-6 w-6"/>
                                    </span>
                                    <h3 className="font-medium leading-tight">Upload Video</h3>
                                </li>
                                <li className="mb-8 ms-6">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                    <Film className={"w-6 h-6 text-cyan-600"}/>
                                    </span>
                                    <h3 className="font-medium leading-tight">Give Clippy a Style Prompt</h3>
                                    <p className="text-sm">"No commentary food-only vlog"</p>
                                </li>
                            </ol>
                        </TabsContent>
                        <TabsContent value="captions">
                            <CardHeader>
                                <CardTitle className="text-5xl mb-2">Share your life <br/> outside the
                                    screen.</CardTitle>
                                <CardDescription className="text-3xl">
                                    Export generated reels to TikTok <br/>
                                    with captions with a few clicks.
                                </CardDescription>
                            </CardHeader>
                            <ol className="mx-12 p-4 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <li className="mb-10 ms-6 flex flex-col justify-center">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                        <Upload className="h-6 w-6"/>
                                    </span>
                                    <h3 className="font-medium leading-tight">Upload Video</h3>
                                </li>
                                <li className="mb-8 ms-6">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                    <Film className={"w-6 h-6"}/>
                                    </span>
                                    <h3 className="font-medium leading-tight">Give Clippy a Style Prompt</h3>
                                    <p className="text-sm">"No commentary food-only vlog"</p>
                                </li>
                                <li className="flex flex-col justify-center mb-10 ms-6">
                                    <span
                                        className="absolute flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                    <ArrowRightFromLine className={"w-6 h-6 text-cyan-500"} />
                                    </span>
                                    <h3 className="font-medium leading-tight">Export to TikTok</h3>
                                </li>
                            </ol>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardContainer className="inter-var w-full h-full bg-slate-100 rounded-xl">
                    <CardBody
                        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Beautiful Title
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                          5.63 GB
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                              src=""
                              height="1000"
                              width="1000"
                              className="bg-cyan-100 h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                              alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-20">
                            <CardItem
                              translateZ={20}
                              as={Link}
                              href="#"
                              target="__blank"
                              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                            >
                              2024-04-21
                            </CardItem>
                            <CardItem
                              translateZ={20}
                              as="button"
                              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                              Go to Clip →
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
            <div id="type" className="flex-1 p-12">
                <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                >
                    <TypewriterEffect words={prompts} className="font-mono text-start overflow-hidden resize-none border-0 p-8"/>
                    <div className="flex items-center p-3 pt-0">
                        <Button disabled={true} size="sm" className="ml-auto gap-1.5">
                            Send Prompt
                            <CornerDownLeft className="size-3.5"/>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
