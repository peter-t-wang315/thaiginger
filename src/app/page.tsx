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
          {/* TODO: These colors ain't workin bruh */}
          <h1 className="text-9xl">THAI GINGER</h1>
          <h1 className="text-9xl font-thai">ขิงไทย</h1>
        </div>
      </div>
    </main>
  );
}
