"use client";

import React from "react";
import Header from "../header";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <Header />
      <main className="w-[90%] max-w-5xl py-28 md:py-10 flex flex-col gap-20">
        {/* Artist Bio Section */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Artist Bio
          </h1>
          <p className="text-lg leading-relaxed text-justify">
            Chioma Okoli (1991), born and raised in Enugu State, Nigeria, is a full-time artist and curator at Awka Museum Foundation, a private artifact museum in Anambra State. She studied painting at the Institute of Management and Technology (IMT), where she earned a Higher National Diploma, and later obtained a Postgraduate Diploma at Nnamdi Azikiwe University.
            <br /><br />
            Her role as a museum curator deepened her love for culture and tradition. Fascinated by the past, she questions and documents stories of various African cultures through her art and research, particularly focusing on the Awka blacksmith tradition.
            <br /><br />
            Devoted to both art and curatorship, Chioma spends most of her time managing the museum and creating in her studio. Over five years, she has used her platform to educate and raise cultural awareness across Eastern Nigeria. The encouragement she received from family, friends, and colleagues helped her thrive in this challenging yet fulfilling path.
          </p>
        </section>

        {/* Artist Statement Section */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Artist Statement
          </h1>
          <p className="text-lg leading-relaxed text-justify">
            As an artist who finds beauty in all things, I develop paintings that reflect the rich traditions and contemporary experiences of African cultures. My work involves extensive research, pictorial documentation, and creative reinterpretation of day-to-day activities across Nigerian tribes.
            <br /><br />
            Before I begin a piece, I dive into the history and essence of the subject. Through colorful strokes and layered textures, I reflect on gender issues, religion, and the evolving roles of African women—particularly their strength, resilience, and emotional balance.
            <br /><br />
            I advocate for change, acceptance, and inclusion of the voiceless girl child and African women through my work, especially in pieces like “Last Supper.” I find joy in transforming what society deems useless—using industrial waste and found materials to create meaningful 2D and 3D works.
            <br /><br />
            My medium includes acrylics, pastels, oils, inks, and experimental textures. Art, to me, knows no limits—so I continue creating with purpose and passion.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
