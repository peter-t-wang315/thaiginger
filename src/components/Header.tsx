"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuNavRef = useRef<HTMLButtonElement>(null);
  const callNavRef = useRef<HTMLButtonElement>(null);
  const aboutNavRef = useRef<HTMLButtonElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.set(headerRef.current, { yPercent: -100 });

    ScrollTrigger.create({
      trigger: ".hero-menu-btn",
      start: "bottom top",

      onEnter: () => {
        const heroMenu = document.querySelector(
          ".hero-menu-btn",
        ) as HTMLElement;
        const heroCall = document.querySelector(
          ".hero-call-btn",
        ) as HTMLElement;
        const navMenu = menuNavRef.current;
        const navCall = callNavRef.current;

        if (!heroMenu || !heroCall || !navMenu || !navCall) return;

        // 1. Capture hero positions BEFORE header moves
        const heroMenuRect = heroMenu.getBoundingClientRect();
        const heroCallRect = heroCall.getBoundingClientRect();

        // 2. Force header to final position instantly (no animation yet)
        //    so we can measure where nav buttons will land
        gsap.set(headerRef.current, { yPercent: 0 });

        const navMenuRect = navMenu.getBoundingClientRect();
        const navCallRect = navCall.getBoundingClientRect();

        // 3. Calculate deltas
        const menuDx = heroMenuRect.left - navMenuRect.left;
        const menuDy = heroMenuRect.top - navMenuRect.top;
        const callDx = heroCallRect.left - navCallRect.left;
        const callDy = heroCallRect.top - navCallRect.top;

        // 4. Push header back off screen, then animate everything together
        gsap.set(headerRef.current, { yPercent: -100 });

        const tl = gsap.timeline();

        tl.to(headerRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        })
          .from(
            navMenu,
            {
              x: menuDx,
              y: menuDy,
              duration: 0.5,
              ease: "power3.out",
            },
            "<",
          )
          .from(
            navCall,
            {
              x: callDx,
              y: callDy,
              duration: 0.5,
              ease: "power3.out",
            },
            "<",
          )
          .from(
            [aboutNavRef.current, hoursRef.current, brandRef.current],
            {
              opacity: 0,
              duration: 0.3,
              stagger: 0.07,
              ease: "power2.out",
            },
            "-=0.2",
          );
      },

      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          yPercent: -100,
          duration: 0.3,
          ease: "power3.in",
        });
      },
    });
  });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/20 backdrop-blur-sm shadow-sm"
    >
      <span
        ref={brandRef}
        className="text-primary font-semibold tracking-[.25em] text-sm md:text-base"
      >
        THAI GINGER
      </span>

      <nav className="flex items-center gap-2 md:gap-6">
        <Button
          ref={menuNavRef}
          variant="link"
          className="text-sm md:text-base tracking-widest text-primary"
        >
          Menu
        </Button>
        <Button
          ref={aboutNavRef}
          variant="link"
          className="text-sm md:text-base tracking-widest text-primary"
        >
          About
        </Button>
        <Button
          ref={callNavRef}
          variant="link"
          className="text-sm md:text-base tracking-widest text-primary"
        >
          Call
        </Button>
      </nav>

      <div
        ref={hoursRef}
        className="hidden md:flex flex-col items-end text-xs tracking-widest text-gray-500 leading-relaxed"
      >
        <span>Tue – Sun</span>
        <span>11AM – 9PM</span>
      </div>
    </header>
  );
}
