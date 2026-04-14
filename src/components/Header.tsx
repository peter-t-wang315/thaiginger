"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuNavRef = useRef<HTMLButtonElement>(null);
  const callNavRef = useRef<HTMLButtonElement>(null);
  const aboutNavRef = useRef<HTMLButtonElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (isOpen) {
      gsap.to(dropdown, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          dropdown.style.display = "none";
        },
      });
    } else {
      dropdown.style.display = "flex";
      gsap.fromTo(
        dropdown,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
      );
    }
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    const heroMenuBtn = document.querySelector(".hero-menu-btn");

    // ── No hero on this page: show header immediately ─────────────────
    if (!heroMenuBtn) {
      gsap.set(headerRef.current, { yPercent: 0 });

      gsap.from(headerRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.2,
      });

      return;
    }

    // ── Hero exists: original scroll-triggered behaviour ──────────────
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
        const navAbout = aboutNavRef.current;

        if (!heroMenu || !heroCall || !navMenu || !navCall) return;

        const heroMenuRect = heroMenu.getBoundingClientRect();
        const heroCallRect = heroCall.getBoundingClientRect();

        gsap.set(headerRef.current, { yPercent: 0 });

        const navMenuRect = navMenu.getBoundingClientRect();
        const navCallRect = navCall.getBoundingClientRect();

        const menuDx = heroMenuRect.left - navMenuRect.left;
        const menuDy = heroMenuRect.top - navMenuRect.top;
        const callDx = heroCallRect.left - navCallRect.left;
        const callDy = heroCallRect.top - navCallRect.top;

        gsap.set(headerRef.current, { yPercent: -100 });

        gsap.set([aboutNavRef.current, hoursRef.current, brandRef.current], {
          opacity: 1,
        });

        const tl = gsap.timeline();

        tl.to(headerRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        })
          .from(
            navMenu,
            { x: menuDx, y: menuDy, duration: 0.5, ease: "power3.out" },
            "<",
          )
          .from(navAbout, { y: -40, duration: 0.5, ease: "power3.out" }, "<")
          .from(
            navCall,
            { x: callDx, y: callDy, duration: 0.5, ease: "power3.out" },
            "<",
          )
          .from(
            [hoursRef.current, brandRef.current],
            { opacity: 0, duration: 0.3, stagger: 0.07, ease: "power2.out" },
            "-=0.2",
          );
      },

      onLeaveBack: () => {
        if (dropdownRef.current) {
          dropdownRef.current.style.display = "none";
        }
        setIsOpen(false);

        gsap.to(headerRef.current, {
          yPercent: -100,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(
              [aboutNavRef.current, hoursRef.current, brandRef.current],
              { opacity: 1, clearProps: "opacity" },
            );
          },
        });
      },
    });
  });

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-sm shadow-sm"
      >
        <Link href="/">
          <span
            ref={brandRef}
            className="text-primary font-semibold tracking-[.25em] text-sm md:text-base cursor-pointer hover:opacity-70 transition-opacity"
          >
            THAI GINGER
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-16">
          <Button
            ref={menuNavRef}
            variant="link"
            className="text-base tracking-widest text-primary"
            asChild
          >
            <Link href="/menu">Menu</Link>
          </Button>
          <Button
            ref={aboutNavRef}
            variant="link"
            className="text-base tracking-widest text-primary"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>
          <Button
            ref={callNavRef}
            variant="link"
            className="text-base tracking-widest text-primary"
            asChild
          >
            <a href="tel:+15093340477">Call</a>
          </Button>
        </nav>

        {/* Mobile: hamburger + hidden GSAP target buttons */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleDropdown}
            className="text-primary p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          {/* Invisible but still exist as GSAP animation targets */}
          <button
            ref={menuNavRef}
            className="absolute opacity-0 pointer-events-none"
            aria-hidden
          />
          <button
            ref={aboutNavRef}
            className="absolute opacity-0 pointer-events-none"
            aria-hidden
          />
          <button
            ref={callNavRef}
            className="absolute opacity-0 pointer-events-none"
            aria-hidden
          />
        </div>

        <div
          ref={hoursRef}
          className="hidden md:flex flex-col items-end text-xs tracking-widest text-gray-500 leading-relaxed"
        >
          <span>Tue – Sun</span>
          <span>11AM – 9PM</span>
        </div>
      </header>

      {/* Mobile dropdown */}
      <div
        ref={dropdownRef}
        className="fixed top-[48px] left-0 right-0 z-40 hidden flex-col items-center gap-2 py-4 bg-white/95 backdrop-blur-sm shadow-md md:hidden"
      >
        <Button
          variant="link"
          className="text-lg tracking-widest text-primary"
          asChild
        >
          <Link href="/menu">Menu</Link>
        </Button>
        <Button
          variant="link"
          className="text-lg tracking-widest text-primary"
          asChild
        >
          <Link href="/about">About</Link>
        </Button>
        <Button
          variant="link"
          className="text-lg tracking-widest text-primary"
          asChild
        >
          <a href="tel:+15093340477">Call</a>
        </Button>
        <p className="text-xs tracking-widest text-gray-400 pt-2">
          Tue – Sun · 11AM – 9PM
        </p>
      </div>
    </>
  );
}
