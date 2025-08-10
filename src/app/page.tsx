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
      <div>test</div>
    </main>
  );
}
