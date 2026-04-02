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
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MotionPathHelper);

export default function HomePage() {
  const landingSectionRef = useRef<HTMLDivElement>(null);
  const bodySectionRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const callButtonRef = useRef<HTMLButtonElement>(null);

  // useGSAP(() => {
  //   // gsap
  //   //   .timeline({
  //   //     scrollTrigger: {
  //   //       trigger: landingSectionRef.current,
  //   //       start: "55% center",
  //   //       end: "bottom 20%",
  //   //       scrub: true,
  //   //       markers: true,
  //   //     },
  //   //   })
  //   //   .to(menuButtonRef.current, {
  //   //     ease: "power1.inOut",
  //   //     x: "-95%",
  //   //   });

  //   // gsap.timeline({
  //   //   scrollTrigger: {
  //   //     trigger: menuButtonRef.current,
  //   //     start: "top center",
  //   //     endTrigger: bodySectionRef.current,
  //   //     end: "bottom bottom",
  //   //     scrub: true,
  //   //     pin: true,
  //   //     markers: true,
  //   //   },
  //   // });
  //   const totalScroll = document.body.scrollHeight - window.innerHeight;

  //   gsap.set(menuButtonRef.current, { x: 0, y: 0 });

  //   gsap.to(menuButtonRef.current, {
  //     scrollTrigger: {
  //       trigger: landingSectionRef.current,
  //       start: "top top",
  //       endTrigger: bodySectionRef.current,
  //       end: "bottom bottom",
  //       scrub: true,
  //       markers: true,
  //     },
  //     motionPath: {
  //       path: [
  //         { x: "-90%", y: 0 },
  //         { x: "-90%", y: totalScroll }, // Move straight down the middle
  //       ],
  //       align: "self",
  //       autoRotate: false,
  //     },
  //     ease: "linear",
  //   });
  // }, []);

  return (
    <main className="flex flex-col flex-1 w-full">
      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col min-h-screen items-center justify-between px-4 mb-8">
        <div
          ref={landingSectionRef}
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
            className="my-[32px] w-[50%] h-auto"
          />
          <div className="flex flex-row w-[80%] justify-between gap-4 sm:gap-0 mt-6">
            <Button
              variant="link"
              className="text-2xl md:text-3xl lg:text-4xl"
              ref={menuButtonRef}
            >
              Menu
            </Button>
            <Button
              variant="link"
              className="underline-swipe-right text-2xl md:text-3xl lg:text-4xl"
              ref={callButtonRef}
            >
              Call
            </Button>
          </div>
        </div>
        <div className="pb-6 text-center sm:text-xl md:text-2xl tracking-widest">
          <h3>Tuesday - Sunday</h3>
          <h3>11AM - 9PM</h3>
        </div>
      </div>

      {/* ─── BODY ────────────────────────────────────────────────────────── */}
      <div ref={bodySectionRef} className="flex flex-col items-center">
        {/* ── Section 1: Exterior photo + overlapping banners ── */}
        <section className="relative w-full flex justify-center pt-12 sm:pt-20 md:pt-28 lg:pt-42 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-8">
          <div className="relative w-[90%] max-w-[700px] flex justify-center">
            <div className="relative w-[100%] self-center shadow-md">
              <Image
                src="/HomePictures/thaiGingerOutside.png"
                alt="Thai Ginger Outside"
                width={800}
                height={600}
                className="w-full h-auto"
              />

              {/* Top-left red banner */}
              <div
                className="absolute -top-[16%] -left-[10%] sm:-top-[8%] sm:-left-[8%] z-10
                    bg-[#b84c38] text-white
                    px-3 py-2 sm:px-5 sm:py-3
                    text-[11px] md:text-sm
                    tracking-[.15em] font-semibold leading-relaxed
                    shadow-sm"
              >
                FROM THE ROLLING HILLS OF NORTHERN THAILAND,
                <br />
                TO THE ROLLING WHEAT FIELDS OF PULLMAN
              </div>

              {/* Bottom-right tan banner */}
              <div
                className="absolute -bottom-[16%] -right-[10%] sm:-bottom-[8%] sm:-right-[8%] z-10
                    bg-[#c9a055] text-white
                    px-3 py-2 sm:px-5 sm:py-3
                    text-[11px] md:text-sm
                    tracking-[.15em] font-semibold leading-relaxed
                    text-right shadow-sm"
              >
                FOR 11+ YEARS THAI GINGER BRINGS
                <br />
                AUTHENTIC THAI CUISINE TO THE PALOUSE
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Kitchen + Buddha collage ── */}
        <section className="relative w-full flex justify-center mt-10 pt-10 sm:pt-20 md:pt-28 lg:pt-42 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="relative w-[60%] sm:w-[60%] md:w-[45%] max-w-[500px]">
            {/* Kitchen photo — centered */}
            <div className="relative w-full aspect-[16/9] overflow-hidden shadow-md z-10">
              <Image
                src="/HomePictures/cooking.png"
                alt="Kitchen"
                fill
                className="object-cover"
              />
            </div>

            {/* Buddha photo — absolutely pinned to top-right of cooking photo */}
            <div className="absolute -top-[25%] -right-[8%] sm:-top-[35%] sm:-right-[12%] md:-top-[40%] md:-right-[15%] w-[30%] sm:w-[32%] md:w-[35%] aspect-[3/5] overflow-hidden shadow-xl z-20">
              <Image
                src="/HomePictures/buddah.png"
                alt="Thai Decor"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── Section 3: Dish card ── */}
        <section className="relative w-[70%] sm:w-[80%] flex justify-center sm:pr-[6%] mt-12 py-6 sm:py-16 md:py-20 lg:py-24">
          <div className="relative w-full sm:w-[52%] sm:max-w-[460px]">
            {/* Circular plate — stacked on mobile, offset on desktop */}
            <div className="flex justify-center sm:block absolute -top-[40%] sm:-top-[36%] left-0 -translate-x-[60%] sm:-translate-x-[50%] md:-translate-x-[70%] mb-4 sm:mb-0">
              <div className="relative w-46 h-46 md:w-60 md:h-60 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/HomePictures/PhadKeeMao.png"
                  alt="Phad Kee Mao"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text card */}
            <div className="bg-[#e8ddd0] px-5 pt-5 pb-4 sm:pl-8 z-0 tracking-widest shadow-sm text-right">
              <p className="text-[#b84c38] font-bold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-[.2em]">
                PHAD KEE MAO
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 uppercase tracking-widest">
                AKA: Drunken Noodles
                <br />
                Spicy stir-fried rice noodles
                <br />
                with Thai basil, garlic, and
                <br />
                chillies — bold, fiery,
                <br />
                and full of flavor
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 4: Dish card ── */}
        <section className="relative w-[70%] sm:w-[80%] flex justify-center sm:pl-[6%] mt-12 py-6 sm:py-16 md:py-20 lg:py-24">
          <div className="relative w-full sm:w-[52%] sm:max-w-[460px]">
            {/* Circular plate — stacked on mobile, offset on desktop */}
            <div className="flex justify-center sm:block absolute -top-[40%] sm:-top-[36%] right-0 translate-x-[60%] sm:translate-x-[50%] md:translate-x-[70%] mb-4 sm:mb-0">
              <div className="relative w-46 h-46 md:w-60 md:h-60 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/HomePictures/PadThai.png"
                  alt="Pad Thai"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text card */}
            <div className="bg-[#b84c38] px-5 pt-5 pb-4 sm:pr-8 z-0 tracking-widest shadow-sm">
              <p className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-[.2em]">
                PAD THAI
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-red-100 uppercase tracking-widest">
                AKA: Thailand's iconic noodles
                <br />
                Sweet, savory, and tangy
                <br />
                with stir-fried rice noodles,
                <br />
                crunchy peanuts, fresh lime,
                <br />
                and a touch of magic
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 5: Map ── */}
        <section className="w-full flex justify-center pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-24 sm:pb-32 md:pb-40 lg:pb-52">
          <div className="relative w-[52%] max-w-[460px] aspect-[4/3] overflow-hidden shadow-md">
            <Image
              src="/HomePictures/cooking.png"
              alt="Thai Ginger Location Map"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
