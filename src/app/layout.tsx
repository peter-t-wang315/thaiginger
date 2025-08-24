import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const herculanum = localFont({
  src: "../../public/HerculanumLTProRoman.ttf",
  display: "block", // prevent fallback rendering
  variable: "--font-herculanum",
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
        className={`${herculanum.variable} antialiased flex flex-col min-h-screen bg-background`}
      >
        hello
        {children}
      </body>
    </html>
  );
}
