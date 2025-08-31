import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const herculanum = localFont({
  src: "../../public/HerculanumLTProRoman.ttf",
  display: "block", // prevent fallback rendering
  variable: "--font-herculanum",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"], // ✅ makes sure Thai glyphs are included
  weight: ["400", "700"], // pick the ones you need
  variable: "--font-thai",
  display: "block", // prevent fallback rendering
});

export const metadata: Metadata = {
  title: "Thai Ginger Pullman",
  description: "Thai Ginger Pullman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${herculanum.variable} ${notoThai.variable} antialiased flex flex-col min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
