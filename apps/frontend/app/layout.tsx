import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Film, Home, LayoutDashboard, Clapperboard, Upload} from "lucide-react";
import Navlink from "@/components/ui/_nav/navlink";

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clippy",
  description: "Life highlight reels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-6 px-2 sm:py-8">
          <Navlink route="/" title="Home">
            <Home className="h-4 w-4 transition-all group-hover:scale-110"/>
          </Navlink>

          <Navlink route="/dashboard" title="Dashboard">
            <LayoutDashboard className="h-4 w-4 transition-all group-hover:scale-110"/>
          </Navlink>

          <Navlink route="/vlogs" title="Highlights">
            <Clapperboard className="h-4 w-4 transition-all group-hover:scale-110"/>
          </Navlink>

          <Navlink route="/clips" title="Clips">
            <Film className="h-4 w-4 transition-all group-hover:scale-110"/>
          </Navlink>

          <Navlink route="/upload" title="Upload">
            <Upload className="h-4 w-4 transition-all group-hover:scale-110"/>
          </Navlink>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 fixed inset-0 backdrop-blur-2xl bg-[url('../public/gradient.png')] bg-cover bg-center overflow-y-auto">
        {children}
      </div>
    </div>
    <Toaster />
    </body>
    </html>
  );
}
