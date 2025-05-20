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
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MotionPathHelper);

export default function HomePage() {
  const gingerRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const ginger = gingerRef.current;
    const vh = window.innerHeight;
    if (!ginger) return;

    const motionPaths = [
      [
        { x: 100, y: vh * 0.5 },
        { x: 200, y: vh * 1.5 },
        { x: 300, y: vh * 3 },
      ],
      [
        { x: 200, y: vh * 0.5 },
        { x: 50, y: vh * 1.5 },
        { x: 100, y: vh * 3 },
      ],
      [
        { x: 25, y: vh * 0.5 },
        { x: 175, y: vh * 1.5 },
        { x: 340, y: vh * 3 },
      ],
      [
        { x: 150, y: vh * 0.5 },
        { x: 400, y: vh * 1.5 },
        { x: 225, y: vh * 3 },
      ],
    ];

    MotionPathHelper.create("#thePath");

    // slicesRef.current.forEach((slice, i) => {
    //   if (!slice) return;

    //   gsap.to(slice, {
    //   ease: "power1.inOut",
    //   motionPath: {
    //     path: motionPaths[i],
    //     align: "self",
    //     alignOrigin: [0.5, 0.5],
    //   },
    //   rotation: gsap.utils.random(-1080, 1080),
    //   scrollTrigger: {
    //     trigger: document.body,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: true,
    //     markers: true,
    //   },
    // });
    // });

    const what =
      "M206,-2747 C206,-2719.1 -126.098,-515.799 -164.655,-54.225 -168.939,-2.94 -89.6,70.3 -88,72 -77.6,81.75 -58.386,119.654 -6.899,124.694 20.824,127.407 89.15,100 100,100 ";

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom center",
          scrub: true,
          markers: true,
        },
      })
      .to(
        slicesRef.current[0],
        {
          ease: "power1.inOut",
          motionPath: {
            path: what,
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          rotation: gsap.utils.random(-1080, 1080),
        },
        0
      )
      .to(
        slicesRef.current[1],
        {
          ease: "power1.inOut",
          motionPath: {
            path: motionPaths[1],
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          rotation: gsap.utils.random(-1080, 1080),
        },
        0
      )
      .to(
        slicesRef.current[2],
        {
          ease: "power1.inOut",
          motionPath: {
            path: motionPaths[2],
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          rotation: gsap.utils.random(-1080, 1080),
        },
        0
      )
      .to(
        slicesRef.current[3],
        {
          ease: "power1.inOut",
          motionPath: {
            path: motionPaths[3],
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          rotation: gsap.utils.random(-1080, 1080),
        },
        0
      );
  }, []);

  return (
    <main className="relative min-h-[300vh] bg-white font-sans text-gray-800 overflow-hidden">
      <section className="h-screen flex flex-col items-center justify-center relative z-10">
        <Card className="p-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Thai Ginger</h1>
          <p className="text-xl max-w-xl mx-auto">
            Experience the vibrant flavors of Thailand in every bite.
          </p>
          <div className="relative mt-12" ref={gingerRef}>
            <Image
              src={gingerRoot}
              alt="Ginger Root"
              width={300}
              height={300}
            />
            {[slice, slice, slice, slice].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Ginger Slice ${i + 1}`}
                width={60}
                height={60}
                className="absolute left-1/2 top-0 -translate-x-1/2"
                ref={(el) => {
                  if (el) slicesRef.current[i] = el;
                }}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="min-h-screen px-8 py-24 bg-orange-50 flex flex-col justify-center items-center text-center">
        <Card className="p-6 max-w-xl">
          <h2 className="text-4xl font-semibold mb-4">
            Authentic Thai Cuisine
          </h2>
          <CardContent>
            <p>
              From Pad Thai to Tom Yum soup, our dishes are crafted with
              traditional recipes and fresh ingredients.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="min-h-screen px-8 py-24 bg-yellow-100 flex flex-col justify-center items-center text-center">
        <Card className="p-6 max-w-xl">
          <h2 className="text-4xl font-semibold mb-4">
            Locally Sourced Ingredients
          </h2>
          <CardContent>
            <p>
              We prioritize fresh, local produce to ensure every bite is
              bursting with flavor and authenticity.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="min-h-screen px-8 py-24 bg-orange-100 flex flex-col justify-center items-center text-center">
        <Card className="p-6 max-w-xl">
          <h2 className="text-4xl font-semibold mb-4">
            Warm, Inviting Atmosphere
          </h2>
          <CardContent>
            <p>
              Our restaurant is designed to give you a relaxing and culturally
              rich dining experience.
            </p>
          </CardContent>
        </Card>
      </section>

      <svg width="100%" height="600" viewBox="0 0 600 600" id="svg">
        <path
          id="thePath"
          d="M100,100 C200,300 400,300 500,100"
          stroke="black"
          fill="none"
          strokeWidth="2"
        />
      </svg>
    </main>
  );
}
