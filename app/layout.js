import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Head from 'next/head'; // Optional but helpful for older support

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
    icon: "/IMG-20250610-WA0017_1_-removebg-preview (1).png", // Make sure this exists in the `public/` folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Optional fallback for older browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
