"use client";

import React from "react";
import Header from "../header";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <Header />
      <main className="w-[90%] max-w-5xl py-30 sm:py20 flex flex-col gap-20">
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
    </div>
  );
};

export default AboutPage;
