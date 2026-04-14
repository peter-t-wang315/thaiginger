"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      // ── PAGE TITLE: animate in on mount ──────────────────────────────
      const titleTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      titleTl
        .from(".about-title", { opacity: 0, y: -32, duration: 0.7 })
        .from(".about-subtitle", { opacity: 0, y: -20, duration: 0.6 }, "-=0.4")
        .from(
          ".about-divider-top",
          { opacity: 0, scaleX: 0, duration: 0.5, transformOrigin: "center" },
          "-=0.2",
        );

      // ── PHOTO ROW 1: three photos ─────────────────────────────────────
      const row1 = document.querySelector(".a-row1") as Element;
      gsap.from(".a-photo-1", {
        opacity: 0,
        x: -40,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: row1, start: "top 88%", once: true },
        delay: 0.1,
      });
      gsap.from(".a-photo-2", {
        opacity: 0,
        y: 30,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: row1, start: "top 88%", once: true },
        delay: 0.25,
      });
      gsap.from(".a-photo-3", {
        opacity: 0,
        x: 40,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: row1, start: "top 88%", once: true },
        delay: 0.4,
      });

      // ── TEXT BLOCKS ───────────────────────────────────────────────────
      fadeUp(".a-text-1", ".a-text-1");
      fadeUp(".a-text-2", ".a-text-2");
      fadeUp(".a-text-3", ".a-text-3");

      // ── COLLAGE ───────────────────────────────────────────────────────
      const collage = document.querySelector(".a-collage") as Element;
      gsap.from(".a-red-banner", {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: collage, start: "top 88%", once: true },
        delay: 0.1,
      });
      gsap.from(".a-photo-4", {
        opacity: 0,
        y: 30,
        scale: 0.92,
        duration: 0.75,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: collage, start: "top 88%", once: true },
        delay: 0.2,
      });
      gsap.from(".a-photo-5", {
        opacity: 0,
        x: 30,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: collage, start: "top 88%", once: true },
        delay: 0.35,
      });

      // ── BOTTOM BANNER ─────────────────────────────────────────────────
      fadeUp(".a-bottom-banner", ".a-bottom-banner", { y: 24, duration: 0.7 });
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
        {/* ─── PAGE TITLE ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-20 px-4 text-center">
          <h1 className="about-title text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px] leading-none tracking-[.35em] sm:tracking-[.45em] text-primary">
            OUR STORY
          </h1>
          <p className="about-subtitle mt-8 sm:mt-10 md:mt-12 text-xl sm:text-2xl md:text-3xl tracking-[.25em] sm:tracking-[.35em] text-secondary font-thai">
            ขิงไทย — Thai Ginger
          </p>
          <div className="about-divider-top mt-10 sm:mt-14 w-16 h-[2px] bg-secondary opacity-60" />
        </div>

        {/* ─── BODY ───────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center">
          {/* ── Photo Row 1: circle + wide + circle ── */}
          <section className="a-row1 w-full flex justify-center items-center gap-4 sm:gap-6 px-6 sm:px-10 pb-20 sm:pb-28 md:pb-32 flex-wrap sm:flex-nowrap">
            {/* Photo 1 — circle */}
            <div className="a-photo-1 relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src="/HomePictures/buddah.png"
                alt="Thai decor"
                fill
                className="object-cover"
              />
            </div>

            {/* Photo 2 — wide center */}
            <div className="a-photo-2 relative w-full sm:w-[320px] md:w-[440px] lg:w-[520px] h-48 sm:h-64 md:h-72 overflow-hidden shadow-md flex-shrink-0">
              <Image
                src="/HomePictures/thaiGingerOutside.png"
                alt="Thai Ginger restaurant exterior"
                fill
                className="object-cover"
              />
            </div>

            {/* Photo 3 — circle */}
            <div className="a-photo-3 relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src="/HomePictures/cooking.png"
                alt="Cooking in the kitchen"
                fill
                className="object-cover"
              />
            </div>
          </section>

          {/* ── Text 1 ── */}
          <section className="a-text-1 w-full flex justify-center px-8 sm:px-12 pt-2 pb-20 sm:pb-28 md:pb-32">
            <p className="max-w-[600px] text-center text-base sm:text-lg md:text-xl leading-loose tracking-widest uppercase text-[#5a4030]">
              Born from a love of Northern Thai cooking and a desire to share it
              with the Palouse, Thai Ginger opened its doors over 11 years ago.
              What started as a small family dream became a beloved cornerstone
              of the Pullman community — one bowl of Pad Thai at a time.
            </p>
          </section>

          <div className="w-16 h-[2px] bg-secondary opacity-50 mb-20 sm:mb-28 md:mb-32" />

          {/* ── Photo Collage: banner + photo 4 left, photo 5 tall right ── */}
          <section className="a-collage relative w-full flex justify-center px-6 sm:px-10 pb-20 sm:pb-28 md:pb-32 overflow-x-clip">
            {/* Mobile: stack vertically. sm+: side by side */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch w-full max-w-[640px]">
              {/* Left column: red banner + photo 4 */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="a-red-banner bg-[#b84c38] text-white px-5 py-4 text-sm sm:text-base tracking-[.18em] font-semibold leading-relaxed uppercase text-center">
                  Family recipes.
                  <br />
                  Made fresh every day.
                </div>
                <div className="a-photo-4 relative w-full h-52 sm:h-60 md:h-64 overflow-hidden shadow-md">
                  <Image
                    src="/HomePictures/PadThai.png"
                    alt="Pad Thai dish"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Photo 5 — tall right */}
              <div className="a-photo-5 relative w-full sm:w-56 md:w-64 h-52 sm:h-auto overflow-hidden shadow-md flex-shrink-0">
                <Image
                  src="/HomePictures/PhadKeeMao.png"
                  alt="Phad Kee Mao dish"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* ── Text 2 ── */}
          <section className="a-text-2 w-full flex justify-center px-8 sm:px-12 pt-2 pb-20 sm:pb-28 md:pb-32">
            <p className="max-w-[600px] text-center text-base sm:text-lg md:text-xl leading-loose tracking-widest uppercase text-[#5a4030]">
              Every dish on our menu carries the flavors of home — fragrant
              lemongrass, toasted galangal, fresh Thai basil, and chilies picked
              for their fire. Our recipes are rooted in tradition and prepared
              with care, the same way they have been since we first opened.
            </p>
          </section>

          <div className="w-16 h-[2px] bg-secondary opacity-50 mb-20 sm:mb-28 md:mb-32" />

          {/* ── Text 3 ── */}
          <section className="a-text-3 w-full flex flex-col items-center px-8 sm:px-12 pt-2 pb-20 sm:pb-28 md:pb-32 gap-6 sm:gap-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl tracking-[.35em] text-primary">
              PULLMAN&apos;S TABLE
            </h3>
            <p className="max-w-[600px] text-center text-base sm:text-lg md:text-xl leading-loose tracking-widest uppercase text-[#5a4030]">
              We are proud to call the Palouse home. Whether you&apos;re a local
              or passing through, our door is always open. Come hungry, leave
              happy — and know that every plate is made with the same love
              we&apos;d give family.
            </p>
          </section>

          {/* ── Bottom tan banner ── */}
          <section className="w-full flex justify-center px-8 pb-44 sm:pb-52 md:pb-60">
            <div className="a-bottom-banner bg-[#b8956a] text-white text-center px-8 py-5 sm:py-6 text-sm sm:text-base tracking-[.18em] font-semibold leading-relaxed uppercase w-full max-w-[500px]">
              Tuesday – Sunday &nbsp;·&nbsp; 11AM – 9PM
              <br />
              Pullman, Washington
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
