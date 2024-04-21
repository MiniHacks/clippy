"use client";

import {LampContainer} from "@/components/ui/lamp";
import { motion } from "framer-motion";
import {AuroraBackground} from "@/components/ui/aurora-background";

export default function Landing() {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    Clippy: highlights for your life.
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                    And this, is chemical burn.
                </div>
                <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                    Debug now
                </button>
            </motion.div>
        </AuroraBackground>
    // <LampContainer>
    //     <motion.h1
    //         initial={{ opacity: 0.5, y: 100 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         transition={{
    //             delay: 0.3,
    //             duration: 0.8,
    //             ease: "easeInOut",
    //         }}
    //         className="mt-8 bg-gradient-to-br from-slate-500 to-slate-800 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    //     >
    //         Clippy: highlights <br /> for your life
    //     </motion.h1>
    // </LampContainer>
    );
}