"use client";

import {LampContainer} from "@/components/ui/lamp";
import { motion } from "framer-motion";
import {AuroraBackground} from "@/components/ui/aurora-background";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Landing() {
  return (
      <>
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
                      <Link href="/upload" className="tracking-tight">
                          Get started
                          <ArrowUpRight className="h-6 w-6" />
                      </Link>
                  </Button>

              </motion.h2>
          </LampContainer></>
  );
}