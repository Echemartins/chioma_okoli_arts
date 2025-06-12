"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightModeOn, setlightModeOn] = useState(true);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    // { label: "store", href: "/store" },
    // { label: "Upcoming shows", href: "/upcoming-shows" },
    // { label: "Exhibitions", href: "/exhibitions" },
    { label: "Contact Us", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

const lightmode = (
  <div className="bg-white flex flex-col items-center md:mb-32 text-gray-800">
    {/* Header Section */}
    <header className="flex justify-between items-center py-4 px-6 md:px-20 w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="object-contain w-24 md:w-40"
          src="/IMG-20250610-WA0017_1_-removebg-preview (1).png"
          alt="chioma-home-image"
          width={140}
          height={80}
        />
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-3xl text-orange-500 focus:outline-none"
        aria-label="Toggle navigation"
      >
        &#9776;
      </button>

      {/* Navigation Menu for larger screens */}
      <nav className="hidden md:flex gap-8 ml-10 items-center">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium hover:text-orange-500 transition ${
              pathname === href ? "text-orange-600 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>

    {/* Mobile Menu */}
    <div
      className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-95 text-xl text-gray-800 z-50 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
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
          onClick={closeMenu}
          className="text-3xl text-gray-800 focus:outline-none"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>
      <nav className="flex flex-col items-center mt-10 space-y-6">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            className={`text-lg hover:text-orange-500 transition ${
              pathname === href ? "text-orange-600 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  </div>
);

  // const lightmode = (
  //   <div className="bg-gradient-to-b from-gray-400 to-gray-700 flex flex-col items-center md:mb-32 ">
  //     {/* Header Section */}
  //     <header className="flex justify-between items-center py-4 px-6 md:px-20 w-full bg-gray-900  text-white shadow-lg fixed top-0 left-0 z-50">
  //       {/* <h1 className="text-2xl md:text-3xl font-bold text-center">CHIOMZY CREATIONS</h1> */}

  //       <Image
  //         className="object-cover w-30"
  //         src="/IMG-20250610-WA0017_1_-removebg-preview (1).png"
  //         alt="chioma-home-image"
  //         width={200}
  //         height={150}
  //       />

  //       {/* Mobile Menu Button */}
  //       <button
  //         onClick={toggleMenu}
  //         className="md:hidden text-3xl text-white focus:outline-none"
  //       >
  //         &#9776; {/* Hamburger icon */}
  //       </button>

  //       {/* Navigation Menu for larger screens */}
  //       <nav className="hidden md:flex gap-6 md:flex-row md:gap-10 ml-10">
  //         <ul className="flex space-x-6 mt-2 sm:mt-0">
  //           {navLinks.map(({ label, href }) => (
  //             <li key={href}>
  //               <Link
  //                 href={href}
  //                 className={`hover:text-purple-400 transition ${
  //                   pathname === href ? "text-purple-500 font-semibold" : ""
  //                 }`}
  //               >
  //                 {label}
  //               </Link>
  //             </li>
  //           ))}
  //         </ul>
  //         {/* <Link href="/" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`}>Home</Link>
  //     <Link href="/about" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`} >About</Link>
  //     <Link href="/gallery" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`} >Gallery</Link>
  //     <Link href="/store" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`} >Store</Link>
  //     <Link href="/upcoming-shows" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`} >Upcoming Shows</Link>
  //     <Link href="/exhibitions" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`}>Exhibitions</Link>
  //     <Link href="/contact" className={`hover:text-purple-400 transition ${pathname === href ? "text-purple-500 font-semibold" : ""}`} >Contact</Link> */}
  //       </nav>
  //     </header>

  //     {/* Mobile Menu */}
  //     <div
  //       className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white text-2xl text-black bg-opacity-80 z-70 transition-transform duration-300 ease-in-out ${
  //         isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
  //       }`}
  //     >
  //       <div className="flex justify-between items-center p-6 bg-black text-white z-80 shadow-lg">
  //         <h1 className="text-2xl font-bold">CHIOMZY CREATIONS</h1>
  //         <button
  //           onClick={closeMenu}
  //           className="text-3xl text-white focus:outline-none"
  //         >
  //           &#10005;
  //         </button>
  //       </div>
  //       <nav className="flex h-screen bg-black text-white flex-col items-center py-10 space-y-6">
  //         <ul className="flex flex-col items-center py-10 space-y-6">
  //           {navLinks.map(({ label, href }) => (
  //             <li key={href}>
  //               <Link
  //                 href={href}
  //                 onClick={closeMenu}
  //                 className={`hover:text-purple-400 transition ${
  //                   pathname === href ? "text-purple-500 font-semibold" : ""
  //                 }`}
  //               >
  //                 {label}
  //               </Link>
  //             </li>
  //           ))}
  //         </ul>
  //         {/* <Link href="/" onClick={closeMenu}>Home</Link>
  //     <Link href="/about" onClick={closeMenu}>About</Link>
  //     <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
  //     <Link href="/store" onClick={closeMenu}>Store</Link>
  //     <Link href="/upcoming-shows" onClick={closeMenu}>Upcoming Shows</Link>
  //     <Link href="/exhibitions" onClick={closeMenu}>Exhibitions</Link>
  //     <Link href="/contact" onClick={closeMenu}>Contact</Link> */}
  //       </nav>
  //     </div>
  //   </div>
  // );
  const darkMode = (
    <div className="mt-12 bg-black flex flex-col items-center text-white">
      {/* Header Section */}
      <header className="flex justify-between items-center px-6 md:px-20 w-full py-12 bg-gray-900 text-white shadow-lg fixed top-0 left-0 z-50">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          CHIOMZY CREATIONS
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl text-black focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-6 md:flex-row md:gap-10 ml-10">
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link href="/gallery" className="text-white hover:text-gray-400">
            Gallery
          </Link>
          <Link href="/store" className="text-white hover:text-gray-400">
            Store
          </Link>
          {/* <Link href="/favorites" className="text-white hover:text-gray-400">Favorites</Link> */}
          {/* <Link href="/experiences" className="text-white hover:text-gray-400">Experiences</Link> */}
          <Link
            href="/upcoming-shows"
            className="text-white hover:text-gray-400"
          >
            Upcoming Shows
          </Link>
          <Link href="/exhibitions" className="text-white hover:text-gray-400">
            Exhibitions
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black text-2xl text-white bg-opacity-80 z-70 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 bg-black text-white z-80 shadow-lg">
          <h1 className="text-3xl font-bold">CHIOMZY CREATIONS</h1>
          <button
            onClick={closeMenu}
            className="text-3xl text-white focus:outline-none"
          >
            &#10005; {/* Close icon */}
          </button>
        </div>
        <nav className="flex flex-col items-center py-10 space-y-6">
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            About
          </Link>
          <Link
            href="/gallery"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            Gallery
          </Link>
          <Link
            href="/store"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            Store
          </Link>
          {/* <Link href="/favorites" onClick={closeMenu} className="text-white hover:text-gray-400">Favorites</Link> */}
          {/* <Link href="/experiences" onClick={closeMenu} className="text-white hover:text-gray-400">Experiences</Link> */}
          <Link
            href="/upcoming-shows"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            Upcoming Shows
          </Link>
          <Link
            href="/exhibitions"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            Exhibitions
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="text-white hover:text-gray-400"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Main Section */}

      {/* Footer Section */}
    </div>
  );

  return <div>{lightModeOn ? lightmode : darkMode}</div>;
}
