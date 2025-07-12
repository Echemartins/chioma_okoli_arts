"use client";

import React from "react";
import Header from "../header";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="w-[90%] max-w-6xl py-30 sm:py20 flex flex-col gap-20 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artist Bio */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Artist Bio</h1>
          <p className="text-lg leading-relaxed text-justify">
            Chioma Okoli (1991), born in Enugu State, Nigeria, is a full-time artist and curator at Awka Museum Foundation. She earned a Higher National Diploma in Painting at IMT and a Postgraduate Diploma at Nnamdi Azikiwe University. Deeply connected to African tradition, Chioma uses her role and creative practice to document and reflect cultural stories—especially focusing on the Awka blacksmith legacy. Over the past five years, she has championed education and cultural awareness through exhibitions and personal projects.
          </p>
        </section>

        {/* Artist Statement */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Artist Statement</h1>
          <p className="text-lg leading-relaxed text-justify">
            As an artist, I explore the beauty of culture, identity, and resilience. My paintings are rooted in deep research and often reinterpret the essence of day-to-day life in African communities. I spotlight gender roles, spiritual beliefs, and emotional strength—especially among African women and the girl child. I work with acrylics, pastels, oils, and found materials, transforming waste into meaningful 2D and 3D forms. My mission is to inspire dialogue, amplify unheard voices, and promote sustainable art practice.
          </p>
        </section>

        {/* Work Experience */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Work Experience</h1>
          <div className="text-lg leading-relaxed space-y-4">
            <p><span className="font-semibold">2019–Present:</span> Creative Director & Resident Artist, Awka Museum Foundation</p>
            <p><span className="font-semibold">2018–2019:</span> Artist & Trainee Curator, National Gallery of Arts, Anambra</p>
            <p><span className="font-semibold">2012:</span> Industrial Trainee, Department of Fine Arts, IMT, Enugu</p>
            <p>Project Manager – ZHF Gallery | Curator – Life in My City (Anambra Zone)</p>
            <p>Organizer – XX Art Exhibition (Intl. Women’s Day), supported by HAB Hessen, Germany</p>
            <p>Works with textile art, cultural symbols, waste-to-art, and pictorial narratives</p>
            <p>Member of Pan African Circle of Artists, Society of Nigerian Artists, and Zeearts Gallery Dubai</p>
          </div>
        </section>

        {/* Education */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Education</h1>
          <div className="text-lg leading-relaxed space-y-3">
            <p><span className="font-semibold">2019–2023:</span> PGD Fine Art (Painting), Nnamdi Azikiwe University</p>
            <p><span className="font-semibold">2014–2016:</span> HND, Fine & Applied Arts, IMT Enugu</p>
            <p><span className="font-semibold">2009–2011:</span> OND, Fine & Applied Arts, IMT Enugu</p>
          </div>
        </section>

        {/* Exhibitions */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Art Exhibitions</h1>
          <div className="text-lg leading-relaxed space-y-2">
            <p><span className="font-semibold">2023:</span> Anambra Art & Craft Expo | Infiltration of Blue (AAF, Lagos) | Art Arising Festival, National Museum Lagos</p>
            <p><span className="font-semibold">2022:</span> ZeeArts Dubai – Art Connects Women Conference, Expo & Display</p>
            <p><span className="font-semibold">2021:</span> XX Art Exhibition (FAAN Girl Child Initiative)</p>
            <p><span className="font-semibold">2020:</span> Art is Everywhere | Life in My City Festival</p>
            <p><span className="font-semibold">2019:</span> Ije Movement | One Self (USA) | National Gallery (Awka, Igboukwu)</p>
            <p><span className="font-semibold">2011:</span> Life in My City – Enugu</p>
          </div>
        </section>

        {/* Publications */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">Publications</h1>
          <div className="text-lg leading-relaxed space-y-3 text-blue-600">
            <p>
              <a
                href="https://guardian.ng/art/when-young-artists-deconstruct-concept-of-blue/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                When Young Artists Deconstruct Concept of Blue – The Guardian
              </a>
            </p>
            <p>
              <a
                href="https://guardian.ng/art/13-young-artists-deepen-infiltration-of-the-blues/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                13 Young Artists Deepen Infiltration of the Blues – The Guardian
              </a>
            </p>
            <p>
              <a
                href="https://drive.google.com/file/d/145_frIEm0Ez8KC7bq4OByH6iDstNBtaj/view"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Curated Group Exhibition Document – Google Drive
              </a>
            </p>
            <p>
              <a
                href="https://thisage.com.ng/awka-onslaught-of-female-artists/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Awka Onslaught of Female Artists – ThisAge
              </a>
            </p>
            <p>
              <a
                href="https://tribuneonlineng.com/i-use-my-artwork-to-inspire-african-girl-child-female-artist/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                I Use My Artwork to Inspire the African Girl Child – Tribune Online
              </a>
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-orange-200 text-orange-900 mt-24">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Contact</h3>
                <p className="text-sm">261 Zik Avenue, Awka, Anambra State</p>
                <p className="text-sm mt-2">Email: <a href="mailto:Favourchomzy69@gmail.com" className="hover:underline text-orange-500">Favourchomzy69@gmail.com</a></p>
                <p className="text-sm mt-1">
                  Phone: <a href="tel:+2347089277261" className="hover:underline text-orange-500">+2347089277261</a>,{" "}
                  <a href="tel:+2348165685370" className="hover:underline text-orange-500">+2348165685370</a>
                </p>
              </div>
      
              {/* Socials */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Connect With Me</h3>
                <div className="flex justify-center md:justify-start items-center gap-4 text-2xl text-orange-600">
                  <a href="https://instagram.com/chomzyart_" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/chioma-okoli" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
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
  );
};

export default AboutPage;
