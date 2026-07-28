import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Builder by hotcode.ai — AI Website Generator",
  description:
    "Describe your idea in plain English and watch Builder by hotcode.ai turn it into a fully functional, production-ready website in under 60 seconds.",
  openGraph: {
    title: "Builder by hotcode.ai — AI Website Generator",
    description:
      "Generate production-ready Next.js websites with AI in under 60 seconds. No design skills required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}