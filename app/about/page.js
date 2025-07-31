"use client";

import React from "react";
import Header from "../../components/header";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="w-[90%] max-w-6xl py-30 sm:py20 flex flex-col gap-20 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Artist Bio */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Artist Bio
          </h1>
          <p className="text-lg leading-relaxed text-justify">
            Chioma Favour Okoli, born in Enugu State, Nigeria, is a full-time
            artist and curator at Awka Museum Foundation. She earned a Higher
            National Diploma in Painting at the Institute of management and
            Technology (IMT) Enugu and a Postgraduate Diploma in fine and
            applied arts (painting) at Nnamdi Azikiwe University Awka Anambra
            State. Deeply connected to African tradition, Chioma uses her role
            and creative practice to document and reflect cultural stories,
            focusing on the Igbo cultural legacy and African lifestyle. Over the
            past five years, she has championed education and cultural awareness
            through personal projects, local and International exhibitions.
          </p>
        </section>

        {/* Artist Statement */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Artist Statement
          </h1>
          <p className="text-lg leading-relaxed text-justify">
            As an artist, I explore the beauty of culture, identity, and
            resilience. My paintings are rooted in deep research and often
            reinterpret the essence of everyday life in African communities. My
            work focusses more on gender roles, spiritual beliefs and emotional
            strength especially amongst African women and children. I work with
            acrylics, pastels, oils, and found materials, transforming waste
            into meaningful 2D and 3D forms. My mission is to inspire dialogue,
            advocate for change, give voice to the unheard voices, and promote
            sustainable art practice.
          </p>
        </section>

        {/* Work Experience */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Work Experience
          </h1>
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              <span className="font-semibold">2012:</span> Industrial Trainee,
              Department of Fine Arts, IMT, Enugu
            </p>
            <p>
              <span className="font-semibold">2019–Present:</span> Curator and
              Resident Artist, Awka Museum Foundation
            </p>
            <p>
              <span className="font-semibold">2018–2019:</span> Artist & Trainee
              Curator, National Gallery of Arts, Anambra
            </p>
            <p>
              <span className="font-semibold">2022:</span> Gallery manager and
              creative director - ZIMIFE Harris-Eze Foundation(ZHF Gallery)
            </p>
            <p>
              <span className="font-semibold">2023 - 2025:</span> Zonal
              Coordinator Life in My City Art Festival (Anambra Zone)
            </p>
            <p>
              Co-curator/organizer , xx art exhibition (IWD) supported by Awka
              Museum Foundation, Hab hessen Germany, Rice University,USA.
            </p>
            <p>
              Works with colours, fabrics, waste-to-art, and pictorial
              narratives.
            </p>
            <p>
              Member of Pan African Circle of Artists, Society of Nigerian
              Artists, and Zeearts Gallery Dubai
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Education
          </h1>
          <div className="text-lg leading-relaxed space-y-3">
            <p>
              <span className="font-semibold">2019–2023:</span> PGD Fine Art
              (Painting), Nnamdi Azikiwe University
            </p>
            <p>
              <span className="font-semibold">2014–2016:</span> HND, Fine &
              Applied Arts, IMT Enugu
            </p>
            <p>
              <span className="font-semibold">2009–2011:</span> OND, Fine &
              Applied Arts, IMT Enugu
            </p>
          </div>
        </section>

        {/* Exhibitions */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Art Exhibitions
          </h1>
          <div className="text-lg leading-relaxed space-y-2">
            <p>
              <span className="font-semibold">2025:</span> Things fall apart art
              exhibition, Center for memories Enugu. / Life in my City Art
              festival/Society of Nigerian artists exhibition, shaky gallery
              Anambra State
            </p>
            <p>
              <span className="font-semibold">2024:</span> XX art exhibition (IWD) , AMF, Anambra State .

            </p>
            <p>
              <span className="font-semibold">2023:</span> Anambra Art and craft
              Expo / infiltration of blue exhibition,AAF Lagos./ Art Arising
              Festival, National museum Lagos.
            </p>
            <p>
              <span className="font-semibold">2022:</span> Global Media and
              Information Literacy Week ,UNESCO.
            </p>
            <p>
              <span className="font-semibold">2022:</span> 5thEdition Art
              connects women exhibition ,Zeearts gallery Dubai ,UAE./ Art
              connects women Expo 2020 Dubai./ Art connects women Conference QE2
              Dubai.
            </p>
            <p>
              <span className="font-semibold">2022:</span>Professor Bruce
              Onobrakpeya Foundation Harmattan workshop
            </p>
            <p>
              <span className="font-semibold">2022-2024:</span>XX Art exhibition. (Yearly Exhibition)
            </p>
            <p>
              <span className="font-semibold">2021:</span>Female Artists
              association of Nigeria Exhibition (girl child initiative).
            </p>
            <p>
              <span className="font-semibold">2020:</span> Art is Everywhere,
              Covid-19
            </p>
            <p>
              <span className="font-semibold">2020:</span> Life in my City Art
              festival Enugu.
            </p>
            <p>
              <span className="font-semibold">2020:</span> National Gallery of
              Arts Annual Exhibition / Ije Movement, Awka / Life in my City/ One
              Self at Chashama Gala by Seeme, USA/ Awka Art Exhibition , ZHF
              Gallery Awka .
            </p>
            <p>
              <span className="font-semibold">2018:</span> National Gallery of
              art exhibition Igboukwu./ Iroko International Adire Festival.
            </p>
            <p>
              <span className="font-semibold">2011:</span> life in my city art festival.
            </p>
          </div>
        </section>

        {/* Publications */}
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">
            Publications
          </h1>
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
                I Use My Artwork to Inspire the African Girl Child – Tribune
                Online
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
