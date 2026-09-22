import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Airbnb",
  description:
    "Entire serviced apartment in Candolim, India. 4 guests · 1 bedroom · 2 beds · 1 bath. Enjoy a private Jacuzzi hot tub, shared pool, high-speed WiFi and stunning views from the balcony.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
