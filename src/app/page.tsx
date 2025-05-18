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
  const gingerRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const ginger = gingerRef.current;
    if (!ginger) return;

    // const totalHeight = document.body.scrollHeight + document.body.scrollHeight/2;
    const totalHeight =
      document.body.scrollHeight + document.body.scrollHeight * 2;

    slicesRef.current.forEach((slice, i) => {
      if (!slice) return;

      gsap.to(slice, {
        y: totalHeight,
        opacity: 1,
        ease: "none",
        // rotation: `random(-45, 45)`,
        scrollTrigger: {
          trigger: ginger,
          start: `top+=${i * 100} center`,
          end: `bottom+=${totalHeight} top`,
          scrub: 0.5,
          onUpdate: (self) => {
            // Add some oscillation to the x position for swaying effect
            const progress = self.progress;
            const swayAmount = 20 * Math.sin(progress * 10);
            // Parse the current x position as a number
            const currentX = parseFloat(gsap.getProperty(slice, "x") as string);
            gsap.set(slice, {
              x: currentX + swayAmount * (i % 2 ? 1 : -1) * 0.05,
            });
          },
        },
        // x: 800, // move right
      });
    });
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
    </main>
  );
}
