import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Footer from "../components/footer-wrapper";
import HeaderWrapper from "@/components/headerwrapper"; // ✅ New wrapper component
import AnalyticsTracker from "@/components/analyticsTracker";
import { Suspense } from "react";
import BrandingProvider from "@/components/branding-provider";


export const metadata = {
  title: { default: "Chioma Favour Okoli — Contemporary Artist & Curator", template: "%s | Chioma Favour Okoli" },
  description: "Painting, sculpture, cultural memory and material experimentation. Explore the practice and ongoing EVA foam research of contemporary artist and curator Chioma Favour Okoli.",
  icons: {
    icon: [{url:"/branding/chioma-okoli-olive.png",type:"image/png"}],
    shortcut: "/branding/chioma-okoli-olive.png",
    apple: "/branding/chioma-okoli-olive.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BrandingProvider>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Toaster position="top-center" reverseOrder={false} />
        <HeaderWrapper />  {/* ✅ Client component handles route logic */}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
        <Footer />
        </BrandingProvider>
      </body>
    </html>
  );
}
