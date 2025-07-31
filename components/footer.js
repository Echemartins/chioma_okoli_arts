import React from 'react'
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="bg-white border-t border-orange-200 text-orange-900 mt-15">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">

          <div>
            <h3 className="text-xl font-semibold mb-3 text-orange-600">Contact</h3>
            {/* <p className="text-sm">261 Zik Avenue, Awka, Anambra State</p> */}
            <p className="text-sm mt-2">Email: <a href="mailto:Favourchomzy69@gmail.com" className="hover:underline text-orange-500">info@chiomaokoliart.com</a></p>
            {/* <p className="text-sm mt-1">
                    Phone: <a href="tel:+2347089277261" className="hover:underline text-orange-500">+2347089277261</a>,{" "}
                    <a href="tel:+2348165685370" className="hover:underline text-orange-500">+2348165685370</a>
                  </p> */}
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-3 text-orange-600">Connect With Me</h3>
            <div className="flex justify-center md:justify-start items-center gap-4 text-2xl text-orange-600">
              <a href="https://instagram.com/chomzyart_" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/chioma-favour-7631791a2?trk=contact-info" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-sm mt-3 text-orange-700">Instagram: @chomzyart_</p>
            <p className="text-sm text-orange-700">LinkedIn: Chioma Okoli</p>
          </div>
        </div>

        <div className="bg-orange-100 text-center text-sm text-orange-800 py-4">
          &copy; {new Date().getFullYear()} Chioma-Okoli Arts. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

