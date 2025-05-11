"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Upload Artwork", href: "/admin/upload" },
    { label: "Manage Artworks", href: "/admin/manageartworks" },
    { label: "Subscribers", href: "/admin/subscribers" },
    { label: "Contact Messages", href: "/admin/contacts" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }; 

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md py-4 px-6 sticky top-0 z-50">
      <nav className="flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <button
        onClick={toggleMenu}
        className="md:hidden text-3xl text-white focus:outline-none">
          &#9776; {/* Hamburger icon */}
        </button>
        <ul className="hidden md:flex gap-6 md:flex-row md:gap-10 ml-10">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-purple-400 transition ${
                  pathname === href ? "text-purple-500 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
    className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white text-2xl text-black bg-opacity-80 z-70 transition-transform duration-300 ease-in-out ${
      isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
    }`}
  >
    <div className="flex justify-between items-center p-6 bg-black text-white z-80 shadow-lg">
      <h1 className="text-2xl font-bold">CHIOMZY CREATIONS</h1>
      <button
        onClick={closeMenu}
        className="text-3xl text-white focus:outline-none"
      >
        &#10005;
      </button>
    </div>
    <nav className="flex h-screen bg-black text-white flex-col items-center py-10 space-y-6">
    <ul className="flex flex-col items-center py-10 space-y-6">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`hover:text-purple-400 transition ${
                        pathname === href ? "text-purple-500 font-semibold" : ""
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
      {/* <Link href="/" onClick={closeMenu}>Home</Link>
      <Link href="/about" onClick={closeMenu}>About</Link>
      <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
      <Link href="/store" onClick={closeMenu}>Store</Link>
      <Link href="/upcoming-shows" onClick={closeMenu}>Upcoming Shows</Link>
      <Link href="/exhibitions" onClick={closeMenu}>Exhibitions</Link>
      <Link href="/contact" onClick={closeMenu}>Contact</Link> */}
    </nav>
  </div>

      
    </header>
  );
}
