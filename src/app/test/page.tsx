// src/app/page.js
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const gingerRef = useRef(null);
  const containerRef = useRef(null);
  const slicesRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const sectionsRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const ginger = gingerRef.current;
    const slices = slicesRefs.map((ref) => ref.current);
    const sections = sectionsRefs.map((ref) => ref.current);

    // Set initial positions
    gsap.set(slices, {
      opacity: 0,
      scale: 0,
      rotation: 0,
      x: 0,
      y: 0,
    });

    gsap.set(sections, {
      opacity: 0,
      y: 100,
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate the ginger root to stay in view while scrolling
    tl.to(ginger, {
      y: -50,
      scale: 0.9,
      duration: 0.5,
    });

    // Create cutting animations and sections for each slice
    slices.forEach((slice, index) => {
      // Time spacing between slices
      const timeDelay = index * 0.25;

      // Make slice appear and fall with sway effect
      tl.to(
        slice,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        },
        0.5 + timeDelay
      );

      // Create a unique swaying falling motion for each slice
      tl.to(
        slice,
        {
          y: window.innerHeight * 0.7,
          x: `random(-100, 100)`,
          rotation: `random(-45, 45)`,
          ease: "power1.inOut",
          duration: 1.5,
          onUpdate: function () {
            // Add some oscillation to the x position for swaying effect
            const progress = this.progress();
            const swayAmount = 20 * Math.sin(progress * 10);
            // Parse the current x position as a number
            const currentX = parseFloat(gsap.getProperty(slice, "x") as string);
            gsap.set(slice, {
              x: currentX + swayAmount * (index % 2 ? 1 : -1) * 0.05,
            });
          },
        },
        0.5 + timeDelay
      );

      // Fade in the corresponding section
      tl.to(
        sections[index],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        0.7 + timeDelay
      );
    });

    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-4">
          Thai Ginger
        </h1>
        <p className="text-xl md:text-2xl text-amber-900 max-w-2xl mx-auto mb-8">
          Experience authentic Thai flavors with a modern twist
        </p>
        <Button
          size="lg"
          className="bg-red-700 hover:bg-red-800 text-white px-8"
        >
          Reserve a Table
        </Button>
        <div className="absolute bottom-8 text-amber-900 animate-bounce">
          <p>Scroll to explore</p>
          <div className="flex justify-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Scrolling Animation Container */}
      <div ref={containerRef} className="relative h-[400vh]">
        {/* Fixed elements */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-12 overflow-hidden">
          {/* Ginger Root */}
          <div ref={gingerRef} className="relative z-10">
            <svg
              width="200"
              height="180"
              viewBox="0 0 200 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M90 30C110 10 150 20 160 50C170 80 120 90 130 120C140 150 170 150 180 130"
                stroke="#CD8032"
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#E9B171"
              />
              <path
                d="M70 60C40 70 30 130 70 140"
                stroke="#CD8032"
                strokeWidth="20"
                strokeLinecap="round"
                fill="#E9B171"
              />
              <path
                d="M110 70C90 80 100 110 120 100"
                stroke="#CD8032"
                strokeWidth="15"
                strokeLinecap="round"
                fill="#E9B171"
              />
            </svg>
          </div>

          {/* Ginger Slices - will be animated to fall */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`slice-${i}`}
              ref={slicesRefs[i]}
              className="absolute top-40 left-1/2 transform -translate-x-1/2"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="#E9B171"
                  stroke="#CD8032"
                  strokeWidth="2"
                />
                <path
                  d="M20 30C20 25 25 20 30 20C35 20 40 25 40 30C40 35 35 40 30 40C25 40 20 35 20 30Z"
                  fill="#F3DDB3"
                  fillOpacity="0.6"
                />
                <path
                  d="M25 30C25 27.5 27.5 25 30 25C32.5 25 35 27.5 35 30"
                  stroke="#CD8032"
                  strokeWidth="1"
                />
              </svg>
            </div>
          ))}

          {/* Content Sections */}
          <div className="absolute top-1/4 w-full max-w-4xl px-6">
            <div
              ref={sectionsRefs[0]}
              className="bg-white bg-opacity-90 rounded-lg p-6 mb-24 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-red-800 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-700">
                Founded in 2010, Thai Ginger brings the authentic flavors of
                Thailand to your neighborhood. Our chefs use traditional
                techniques and the freshest ingredients to create dishes that
                balance the five fundamental flavors of Thai cuisine: sweet,
                sour, salty, spicy, and umami.
              </p>
            </div>

            <div
              ref={sectionsRefs[1]}
              className="bg-white bg-opacity-90 rounded-lg p-6 mb-24 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-red-800 mb-4">
                Our Cuisine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Signature Dishes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>Mango Sticky Rice</li>
                      <li>Pad Thai with Fresh Herbs</li>
                      <li>Green Curry with Bamboo Shoots</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Chef's Specials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our rotating menu features seasonal ingredients and
                      innovative takes on Thai classics.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div
              ref={sectionsRefs[2]}
              className="bg-white bg-opacity-90 rounded-lg p-6 mb-24 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-red-800 mb-4">Visit Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hours</h3>
                  <p>Monday - Thursday: 11am - 10pm</p>
                  <p>Friday - Saturday: 11am - 11pm</p>
                  <p>Sunday: 12pm - 9pm</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p>123 Spice Avenue</p>
                  <p>Flavor District</p>
                  <p>Culinary City, TC 98765</p>
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-red-700 hover:bg-red-800 text-white">
                  Get Directions
                </Button>
              </div>
            </div>

            <div
              ref={sectionsRefs[3]}
              className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-red-800 mb-4">
                Contact Us
              </h2>
              <Alert className="mb-4">
                <AlertTitle>Join Our Mailing List</AlertTitle>
                <AlertDescription>
                  Sign up to receive updates about special events and
                  promotions.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Call Now
                </Button>
                <Button className="bg-red-700 hover:bg-red-800 text-white">
                  Make a Reservation
                </Button>
                <Button
                  variant="outline"
                  className="text-red-700 border-red-700 hover:bg-red-50"
                >
                  View Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Thai Ginger</h3>
            <p>Authentic Thai cuisine made with love and tradition.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>Menu</li>
              <li>Reservations</li>
              <li>Private Events</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <span className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </span>
              <span className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-white text-opacity-60">
          <p>© 2025 Thai Ginger Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
