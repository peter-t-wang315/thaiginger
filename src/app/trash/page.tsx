// app/page.tsx (Next.js 13+ with app directory)
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import gingerRoot from "../../../public/temp-ginger-root.png";

export default function HomePage() {
  const landingSectionRef = useRef<HTMLDivElement>(null);
  const bodySectionRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const callButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <main className="flex flex-col flex-1">
      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col min-h-screen items-center justify-between px-4">
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
        <section className="relative w-full flex justify-center py-40">
          {/*
            Outer container is wider than the photo so banners
            can overflow left/right without clipping.
          */}
          <div className="relative w-[72%] max-w-[600px] flex justify-center">
            {/* Photo — centered within outer container, ~75% of outer width */}
            <div className="relative w-[75%] aspect-[4/3] overflow-hidden shadow-md self-center">
              <Image
                src="/HomePictures/thaiGingerOutside.png"
                alt="Thai Ginger Outside"
                fill
                className="object-cover"
              />
            </div>

            {/* Top-left red banner — anchored to top-left of outer container */}
            <div
              className="absolute top-[6%] left-0 z-10
                          bg-[#b84c38] text-white
                          px-4 py-2.5
                          text-[8px] sm:text-[9px] md:text-[10px]
                          tracking-[.15em] font-semibold leading-relaxed
                          shadow-sm"
            >
              FROM THE ROLLING HILLS OF NORTHERN THAILAND,
              <br />
              TO THE ROLLING WHEAT FIELDS OF PULLMAN
            </div>

            {/* Bottom-right tan banner — anchored to bottom-right */}
            <div
              className="absolute bottom-[6%] right-0 z-10
                          bg-[#c9a055] text-white
                          px-4 py-2.5
                          text-[8px] sm:text-[9px] md:text-[10px]
                          tracking-[.15em] font-semibold leading-relaxed
                          text-right shadow-sm"
            >
              FOR 11+ YEARS THAI GINGER BRINGS
              <br />
              AUTHENTIC THAI CUISINE TO THE PALOUSE
            </div>
          </div>
        </section>

        {/* ── Section 2: Kitchen + Buddha collage ── */}
        <section className="relative w-full flex justify-center py-40">
          <div className="relative w-[52%] max-w-[460px] flex items-end">
            {/* Kitchen photo — wider, sits left */}
            <div className="relative w-[70%] aspect-[4/3] overflow-hidden shadow-md z-10">
              <Image
                src="/HomePictures/fillerpic.png"
                alt="Kitchen"
                fill
                className="object-cover"
              />
            </div>

            {/* Decor / Buddha photo — taller, overlaps right edge of kitchen photo */}
            <div className="relative w-[38%] aspect-[3/4] overflow-hidden shadow-md -ml-5 mb-3 z-20">
              <Image
                src="/HomePictures/fillerpic2.png"
                alt="Thai Decor"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── Section 3: Dish card — plate left, text right ── */}
        <section className="relative w-full flex justify-center py-40">
          <div className="relative w-[52%] max-w-[460px] flex items-center">
            {/* Circular plate — overhangs left of card */}
            <div
              className="relative flex-shrink-0
                          w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
                          rounded-full overflow-hidden
                          border-[3px] border-[#c0392b]
                          shadow-lg z-10 -ml-6"
            >
              <Image
                src="/HomePictures/dish1.png"
                alt="Phad Kee Mao"
                fill
                className="object-cover"
              />
            </div>

            {/* Text card */}
            <div className="bg-[#e8ddd0] px-5 py-4 -ml-3 z-0 flex-1 tracking-widest shadow-sm">
              <p className="text-[#b84c38] font-bold text-[10px] sm:text-[11px] md:text-xs mb-2 tracking-[.2em]">
                PHAD KEE MAO
              </p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed text-gray-600 uppercase tracking-widest">
                AKA: Drunken Noodles
                <br />
                Spicy stir fried rice noodles
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

        {/* ── Section 4: Dish card — text left, plate right ── */}
        <section className="relative w-full flex justify-center py-40">
          <div className="relative w-[52%] max-w-[460px] flex items-center">
            {/* Text card */}
            <div className="bg-[#b84c38] px-5 py-4 -mr-3 z-0 flex-1 tracking-widest shadow-sm">
              <p className="text-white font-bold text-[10px] sm:text-[11px] md:text-xs mb-2 tracking-[.2em]">
                PHAD KEE MAO
              </p>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed text-red-100 uppercase tracking-widest">
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

            {/* Circular plate — overhangs right of card */}
            <div
              className="relative flex-shrink-0
                          w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
                          rounded-full overflow-hidden
                          border-[3px] border-[#c9a055]
                          shadow-lg z-10 -mr-6"
            >
              <Image
                src="/HomePictures/dish2.png"
                alt="Pad Thai"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── Section 5: Map ── */}
        <section className="w-full flex justify-center py-40 pb-52">
          <div className="relative w-[52%] max-w-[460px] aspect-[4/3] overflow-hidden shadow-md">
            <Image
              src="/HomePictures/map.png"
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
