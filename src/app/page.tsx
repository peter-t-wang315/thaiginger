// app/page.tsx (Next.js 13+ with app directory)
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import gingerRoot from "../../public/temp-ginger-root.png";
import slice from "../../public/slice.png";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex flex-col min-h-screen items-center justify-between px-4">
        <div
          className="flex flex-col items-center justify-center space-y-6 flex-1
             tracking-[.5em] md:tracking-[.75em] text-center"
        >
          <h1 className="text-[86px] leading-none lg:text-9xl text-primary">
            THAI GINGER
          </h1>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-thai text-primary">
            ขิงไทย
          </h1>
          <Image
            src={gingerRoot}
            alt="Ginger Root"
            width={400}
            height={400}
            className="my-[32px] w-[50%]  h-auto"
          />
          <div className="flex flex-row w-[80%] justify-between gap-4 sm:gap-0 mt-6">
            <Button variant="link" className="text-2xl md:text-3xl lg:text-4xl">
              Menu
            </Button>
            <Button
              variant="link"
              className="underline-swipe-right text-2xl md:text-3xl lg:text-4xl"
            >
              Call
            </Button>
          </div>
        </div>
        <div className="pb-6 text-center sm:text-xl md:text-2xl">
          <h3>Tuesday - Sunday</h3>
          <h3>11AM - 9PM</h3>
        </div>
      </div>
      <div className="flex min-h-screen"></div>
    </main>
  );
}
