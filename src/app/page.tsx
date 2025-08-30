// app/page.tsx (Next.js 13+ with app directory)
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import gingerRoot from "../../public/ginger-root.png";
import slice from "../../public/slice.png";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-9xl text-primary">THAI GINGER</h1>
          <h1 className="text-8xl font-thai text-primary">ขิงไทย</h1>
          <Image
            src={gingerRoot}
            alt="Ginger Root"
            width={400}
            height={400}
            className="-mt-10"
          />
          <div className="flex w-[80%] justify-between">
            <Button variant="link">Menu</Button>
            <Button variant="link" className="underline-swipe-right">
              Call
            </Button>
          </div>
        </div>
        <div className="justify-self-end">
          <h3>Tuesday - Sunday</h3>
          <h3>11AM - 9PM</h3>
        </div>
      </div>
      <div className="flex min-h-screen"></div>
    </main>
  );
}
