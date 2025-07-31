"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Upload Artwork", href: "/admin/upload" },
    { label: "Manage Artworks", href: "/admin/manageartworks" },
    { label: "Subscribers", href: "/admin/subscribers" },
    { label: "Contact Messages", href: "/admin/contacts" },
    { label: "Purchase Requests", href: "/admin/requests" },
  ];

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="object-contain w-24 md:w-40"
            src="/IMG-20250610-WA0017_1_-removebg-preview (1).png"
            alt="chioma-home-image"
            width={140}
            height={80}
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-3xl text-orange-500 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors font-medium ${pathname === href
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-500"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 shadow-md">
          <h2 className="text-lg font-bold text-orange-600">Admin Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl text-gray-600"
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <nav className="px-6 py-6 space-y-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-medium transition-colors ${pathname === href
                ? "text-orange-400"
                : "text-gray-700 hover:text-orange-500"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
