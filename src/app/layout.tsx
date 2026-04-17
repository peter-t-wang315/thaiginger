import type { Metadata } from "next";
import { Noto_Sans_Thai, Antonio } from "next/font/google";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-thai",
  display: "block",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
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
    <html lang="en" className={`${notoThai.variable} ${antonio.variable}`}>
      <body
        className="antialiased flex flex-col min-h-screen bg-background"
      >
        {children}
      </body>
    </html>
  );
}
