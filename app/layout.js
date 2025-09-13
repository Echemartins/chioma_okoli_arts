import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Footer from "../components/footer";
import HeaderWrapper from "@/components/headerwrapper"; // ✅ New wrapper component
import AnalyticsTracker from "@/components/analyticsTracker";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chioma Okoli Art",
  description: "Chioma's Art Gallery and Portfolio",
  icons: {
    icon: "/IMG-20250610-WA0017_1_-removebg-preview (1).png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <HeaderWrapper />  {/* ✅ Client component handles route logic */}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
