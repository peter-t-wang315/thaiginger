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
      <div className="flex min-h-screen items-center justify-center">
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
            <h2>Menu</h2>
            <h2>Call</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
