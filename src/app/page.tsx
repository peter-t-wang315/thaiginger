// app/page.tsx (Next.js 13+ with app directory)
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import gingerRoot from "../../public/temp-ginger-root.png";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const callButtonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      // ── Helper: fade + slide up, fires once ──────────────────────────
      const fadeUp = (
        target: gsap.TweenTarget,
        trigger: Element | string,
        overrides: gsap.TweenVars = {},
        stOffset = "top 88%",
      ) =>
        gsap.from(target, {
          opacity: 0,
          y: 48,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger,
            start: stOffset,
            once: true,
          },
          ...overrides,
        });

      // ── HERO: animate in on mount (no scroll trigger) ─────────────────
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-title-en", { opacity: 0, y: -32, duration: 0.7 })
        .from(".hero-title-th", { opacity: 0, y: -24, duration: 0.6 }, "-=0.4")
        .from(
          ".hero-image",
          { opacity: 0, scale: 0.92, duration: 0.8 },
          "-=0.3",
        )
        .from(
          menuButtonRef.current,
          { opacity: 0, x: -24, duration: 0.5 },
          "-=0.3",
        )
        .from(callButtonRef.current, { opacity: 0, x: 24, duration: 0.5 }, "<")
        .from(".hero-hours", { opacity: 0, y: 16, duration: 0.5 }, "<-=0.5");

      // ── SECTION 1: exterior photo + banners ───────────────────────────
      const s1Photo = document.querySelector(".s1-photo") as Element;
      const s1RedBanner = document.querySelector(".s1-red-banner") as Element;
      const s1TanBanner = document.querySelector(".s1-tan-banner") as Element;

      fadeUp(s1Photo, s1Photo);
      gsap.from(s1RedBanner, {
        opacity: 0,
        x: -40,
        y: -20,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: s1Photo, start: "top 80%", once: true },
        delay: 0.25,
      });
      gsap.from(s1TanBanner, {
        opacity: 0,
        x: 40,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: s1Photo, start: "top 80%", once: true },
        delay: 0.45,
      });

      // ── SECTION 2: kitchen photo + Buddha ────────────────────────────
      const s2Kitchen = document.querySelector(".s2-kitchen") as Element;
      const s2Buddha = document.querySelector(".s2-buddha") as Element;

      fadeUp(s2Kitchen, s2Kitchen);
      gsap.from(s2Buddha, {
        opacity: 0,
        y: -36,
        scale: 0.88,
        duration: 0.75,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: s2Kitchen, start: "top 80%", once: true },
        delay: 0.35,
      });

      // ── SECTION 3: Phad Kee Mao card + plate ─────────────────────────
      const s3Card = document.querySelector(".s3-card") as Element;
      const s3Plate = document.querySelector(".s3-plate") as Element;

      gsap.from(s3Card, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: s3Card, start: "top 88%", once: true },
      });
      gsap.from(s3Plate, {
        opacity: 0,
        x: -40,
        scale: 0.85,
        duration: 0.75,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: s3Card, start: "top 88%", once: true },
        delay: 0.2,
      });

      // ── SECTION 4: Pad Thai card + plate ─────────────────────────────
      const s4Card = document.querySelector(".s4-card") as Element;
      const s4Plate = document.querySelector(".s4-plate") as Element;

      gsap.from(s4Card, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: s4Card, start: "top 88%", once: true },
      });
      gsap.from(s4Plate, {
        opacity: 0,
        x: 40,
        scale: 0.85,
        duration: 0.75,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: s4Card, start: "top 88%", once: true },
        delay: 0.2,
      });

      // ── SECTION 5: map ────────────────────────────────────────────────
      const s5Map = document.querySelector(".s5-map") as Element;
      gsap.from(s5Map, {
        opacity: 0,
        scale: 0.93,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: s5Map, start: "top 88%", once: true },
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <Header />
      <main
        ref={containerRef}
        className="flex flex-col flex-1 w-full overflow-x-hidden"
      >
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col min-h-screen items-center justify-between px-4 mb-8">
          <div
            className="flex flex-col items-center justify-center space-y-6 flex-1
             tracking-[.5em] md:tracking-[.75em] text-center"
          >
            <h1 className="hero-title-en text-[86px] leading-none lg:text-9xl text-primary">
              THAI GINGER
            </h1>
            <h1 className="hero-title-th text-6xl md:text-7xl lg:text-8xl font-thai text-primary">
              ขิงไทย
            </h1>
            <Image
              src={gingerRoot}
              alt="Ginger Root"
              width={400}
              height={400}
              className="hero-image my-[32px] w-[50%] h-auto"
            />
            <div className="flex flex-row w-[100%] justify-between xs:justify-around sm:justify-between gap-0 mt-6">
              <div ref={menuButtonRef}>
                <Button
                  variant="link"
                  className="hero-menu-btn text-2xl md:text-3xl lg:text-4xl"
                  onClick={() => router.push("/menu")}
                >
                  Menu
                </Button>
              </div>

              <div ref={callButtonRef}>
                <Button
                  variant="link"
                  className="hero-call-btn underline-swipe-right text-2xl md:text-3xl lg:text-4xl"
                  onClick={() => (window.location.href = "tel:+15093340477")}
                >
                  Call
                </Button>
              </div>
            </div>
          </div>
          <div className="hero-hours pb-6 text-center sm:text-xl md:text-2xl tracking-widest">
            <h3>Tuesday - Sunday</h3>
            <h3>11AM - 9PM</h3>
          </div>
        </div>

        {/* ─── BODY ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center">
          {/* ── Section 1: Exterior photo + overlapping banners ── */}
          <section className="relative w-full flex justify-center pt-24 sm:pt-16 md:pt-24 lg:pt-32 pb-24 sm:pb-16 md:pb-24 lg:pb-32 px-8 overflow-x-clip">
            <div className="relative w-[90%] max-w-[700px] flex justify-center">
              <div className="s1-photo relative w-[100%] self-center shadow-md">
                <Image
                  src="/HomePictures/thaiGingerOutside.png"
                  alt="Thai Ginger Outside"
                  width={800}
                  height={600}
                  className="w-full h-auto xs:aspect-[16/10] aspect-[16/12] sm:aspect-auto object-cover"
                />

                {/* Top-left red banner */}
                <div
                  className="s1-red-banner absolute -top-16 -left-2 xs:-top-12 sm:-top-[8%] sm:-left-4 md:-top-[14%] md:-left-[12%] lg:-top-[10%] lg:-left-[14%] z-10
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
                  className="s1-tan-banner absolute -bottom-10 -right-2 xs:-bottom-12 sm:-bottom-[8%] sm:-right-4 md:-bottom-[14%] md:-right-[12%] lg:-bottom-[10%] lg:-right-[14%] z-10
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
          <section className="relative w-full flex justify-center pt-12 sm:pt-30 md:pt-24 lg:pt-32 pb-18 sm:pb-16 md:pb-24 lg:pb-32 overflow-x-clip">
            <div className="relative w-[66%] sm:w-[60%] md:w-[45%] max-w-[500px]">
              {/* Kitchen photo */}
              <div className="s2-kitchen relative w-full aspect-[9/6] xs:aspect-[16/9] overflow-hidden shadow-md z-10">
                <Image
                  src="/HomePictures/cooking.png"
                  alt="Kitchen"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Buddha photo */}
              <div className="s2-buddha absolute -top-[35%] -right-[14%] xs:-top-[25%] sm:-top-[35%] sm:-right-[12%] md:-top-[40%] md:-right-[15%] w-[38%] xs:w-[30%] sm:w-[32%] md:w-[35%] aspect-[2/3] xs:aspect-[3/5] overflow-hidden shadow-xl z-20">
                <Image
                  src="/HomePictures/buddah.png"
                  alt="Thai Decor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* ── Section 3: Phad Kee Mao ── */}
          <section className="relative w-[70%] sm:w-[80%] flex justify-center sm:pr-[6%] pt-16 sm:pt-26 md:pt-24 lg:pt-24 pb-20 sm:pb-16 md:pb-24 lg:pb-32">
            <div className="relative w-full sm:w-[52%] sm:max-w-[460px]">
              {/* Plate */}
              <div className="s3-plate z-10 flex justify-center sm:block absolute -top-16 sm:-top-20 md:-top-[36%] left-0 -translate-x-[45%] sm:-translate-x-[50%] md:-translate-x-[70%] mb-4 sm:mb-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src="/HomePictures/PhadKeeMao.png"
                    alt="Phad Kee Mao"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text card */}
              <div className="s3-card bg-[#e8ddd0] px-5 pt-5 pb-4 sm:pl-8 z-0 tracking-widest shadow-sm text-right">
                <p className="text-[#b84c38] font-bold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-[.2em]">
                  PHAD <br className="block lg:hidden" />
                  KEE MAO
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

          {/* ── Section 4: Pad Thai ── */}
          <section className="relative w-[70%] sm:w-[80%] flex justify-center sm:pl-[6%] pt-16 sm:pt-26 md:pt-24 lg:pt-20 pb-20 sm:pb-16 md:pb-24 lg:pb-32">
            <div className="relative w-full sm:w-[52%] sm:max-w-[460px]">
              {/* Plate */}
              <div className="s4-plate z-10 flex justify-center sm:block absolute -top-16 sm:-top-20 md:-top-[36%] right-0 translate-x-[45%] sm:translate-x-[50%] md:translate-x-[70%] mb-4 sm:mb-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src="/HomePictures/PadThai.png"
                    alt="Pad Thai"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text card */}
              <div className="s4-card bg-[#b84c38] px-5 pt-5 pb-4 sm:pr-8 z-0 tracking-widest shadow-sm">
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
          <section className="w-full flex justify-center pt-16 sm:pt-16 md:pt-24 lg:pt-18 pb-32 sm:pb-24 md:pb-32 lg:pb-40">
            <div className="s5-map relative w-[52%] max-w-[460px] aspect-[4/3] overflow-hidden shadow-md">
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
    </>
  );
}
