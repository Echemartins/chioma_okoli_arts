"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightModeOn, setlightModeOn] = useState(true)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };  

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const lightmode = 
  <div className="bg-gradient-to-b from-gray-400 to-gray-700 flex flex-col items-center md:mb-32 ">
  {/* Header Section */}
  <header className="flex justify-between items-center px-6 md:px-20 w-full py-12 bg-gray-900  text-white shadow-lg fixed top-0 left-0 z-50">
    <h1 className="text-2xl md:text-3xl font-bold text-center">CHIOMZY CREATIONS</h1>
          {/* <Image className="object-cover h-32 rounded-2xl" src="/chioma-logo-edited.jpg" alt="chioma-home-image" width={200} height={150} /> */}
    

    {/* Mobile Menu Button */}
    <button
      onClick={toggleMenu}
      className="md:hidden text-3xl text-white focus:outline-none"
    >
      &#9776; {/* Hamburger icon */}
    </button>

    {/* Navigation Menu for larger screens */}
    <nav className="hidden md:flex gap-6 md:flex-row md:gap-10 ml-10">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/store">Store</Link>
      {/* <Link href="/favorites">Favorites</Link> */}
      {/* <Link href="/experiences">Experiences</Link> */}
      <Link href="/upcoming-shows">Upcoming Shows</Link>
      <Link href="/exhibitions">Exhibitions</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </header>

  {/* Mobile Menu */}
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
        &#10005; {/* Close icon */}
      </button>
    </div>
    <nav className="flex h-screen bg-black text-white flex-col items-center py-10 space-y-6">
      <Link href="/" onClick={closeMenu}>Home</Link>
      <Link href="/about" onClick={closeMenu}>About</Link>
      <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
      <Link href="/store" onClick={closeMenu}>Store</Link>
      {/* <Link href="/favorites" onClick={closeMenu}>Favorites</Link> */}
      {/* <Link href="/experiences" onClick={closeMenu}>Experiences</Link> */}
      <Link href="/upcoming-shows" onClick={closeMenu}>Upcoming Shows</Link>
      <Link href="/exhibitions" onClick={closeMenu}>Exhibitions</Link>
      <Link href="/contact" onClick={closeMenu}>Contact</Link>
    </nav>
  </div>

</div>
 const darkMode =

 <div className="mt-12 bg-black flex flex-col items-center text-white">
  {/* Header Section */}
  <header className="flex justify-between items-center px-6 md:px-20 w-full py-12 bg-gray-900 text-white shadow-lg fixed top-0 left-0 z-50">
    <h1 className="text-3xl md:text-4xl font-bold text-center">CHIOMZY CREATIONS</h1>

    {/* Mobile Menu Button */}
    <button
      onClick={toggleMenu}
      className="md:hidden text-3xl text-black focus:outline-none"
    >
      &#9776; {/* Hamburger icon */}
    </button>

    {/* Navigation Menu */}
    <nav className="hidden md:flex gap-6 md:flex-row md:gap-10 ml-10">
      <Link href="/" className="text-white hover:text-gray-400">Home</Link>
      <Link href="/about" className="text-white hover:text-gray-400">About</Link>
      <Link href="/gallery" className="text-white hover:text-gray-400">Gallery</Link>
      <Link href="/store" className="text-white hover:text-gray-400">Store</Link>
      {/* <Link href="/favorites" className="text-white hover:text-gray-400">Favorites</Link> */}
      {/* <Link href="/experiences" className="text-white hover:text-gray-400">Experiences</Link> */}
      <Link href="/upcoming-shows" className="text-white hover:text-gray-400">Upcoming Shows</Link>
      <Link href="/exhibitions" className="text-white hover:text-gray-400">Exhibitions</Link>
      <Link href="/contact" className="text-white hover:text-gray-400">Contact</Link>
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
      <button onClick={closeMenu} className="text-3xl text-white focus:outline-none">
        &#10005; {/* Close icon */}
      </button>
    </div>
    <nav className="flex flex-col items-center py-10 space-y-6">
      <Link href="/about" onClick={closeMenu} className="text-white hover:text-gray-400">About</Link>
      <Link href="/gallery" onClick={closeMenu} className="text-white hover:text-gray-400">Gallery</Link>
      <Link href="/store" onClick={closeMenu} className="text-white hover:text-gray-400">Store</Link>
      {/* <Link href="/favorites" onClick={closeMenu} className="text-white hover:text-gray-400">Favorites</Link> */}
      {/* <Link href="/experiences" onClick={closeMenu} className="text-white hover:text-gray-400">Experiences</Link> */}
      <Link href="/upcoming-shows" onClick={closeMenu} className="text-white hover:text-gray-400">Upcoming Shows</Link>
      <Link href="/exhibitions" onClick={closeMenu} className="text-white hover:text-gray-400">Exhibitions</Link>
      <Link href="/contact" onClick={closeMenu} className="text-white hover:text-gray-400">Contact</Link>
    </nav>
  </div>

  {/* Main Section */}
  

  {/* Footer Section */}
  
</div>

  return (
    <div>
      {lightModeOn ? lightmode: darkMode}
    </div>
      
  );
}

