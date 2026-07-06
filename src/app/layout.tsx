import type { Metadata } from "next";
import { Noto_Sans_Thai, Antonio } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Thai Ginger | Authentic Thai Restaurant in Pullman, WA",
  description:
    "Family-owned Thai restaurant in downtown Pullman, WA. Authentic Pad Thai, curries & drunken noodles on the Palouse for 11+ years. Open Tue–Sun, 11AM–9PM.",
  keywords: [
    "Thai Ginger",
    "Thai restaurant Pullman WA",
    "Thai food Pullman",
    "Pad Thai Pullman",
    "restaurants near WSU",
    "Palouse Thai food",
  ],
  openGraph: {
    title: "Thai Ginger | Authentic Thai Restaurant in Pullman, WA",
    description:
      "Authentic Thai cuisine in downtown Pullman for 11+ years. Dine-in & takeout, Tue–Sun 11AM–9PM. 300 S Grand Ave.",
    type: "website",
    locale: "en_US",
    images: ["/thaigingerlogo.png"],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Thai Ginger",
  servesCuisine: "Thai",
  telephone: "+1-509-334-0477",
  address: {
    "@type": "PostalAddress",
    streetAddress: "300 S Grand Ave",
    addressLocality: "Pullman",
    addressRegion: "WA",
    postalCode: "99163",
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "21:00",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
