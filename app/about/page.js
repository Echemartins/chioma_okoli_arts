import React from 'react'
import Header from '../header' 

const page = () => {
  return (
    <div className='bg-black text-white flex flex-col items-center'>
      <Header/>
        <main className=' my-42 w-[90%] max-w-6xl flex flex-col gap-20 items-center justify-center text-[20px]'> 
            <div className='flex flex-col gap-5'>
                <h1 className='text-5xl'>
                    Artist Bio
                </h1>
                <p className='text-justify'>
                Chioma Okoli (1991) born and raised in Enugu State Nigeria , She is a full time Artist and acurator at Awka Museum Foundation, a private artifact museum in Anambra state Nigeria. She Studied painting in the Institute of Management and Technology where she obtained aHigher national diploma in Art and post graduate diploma in Nnamdi Azikwe University. Working as a museum curator, she developed a love for culture /tradition . Chioma Okoli Her curiosity about the past stories of different culture heightened as she questions some of these stories and try’s to document them in her works and with some other documented visuals on Awka blacksmith and tradition . In other to devote her time and life to Art and curation, she spends most of her time in the museum space where she manages the museum and her art studio. Her 5 years working experience in the museum improved her life, as she created awareness to the community, sensitizing and educating different individuals about arts and culture within the eastern region of Nigeria , actualizing these to some extent gave her a sense of belonging, challenging but worth pushing for, her journey into being a full time artist and curator balanced with the encouragement and love she got from family, friends and colleagues.
                </p>
            </div>
            <div className='flex flex-col gap-5'>
                <h1 className='text-5xl'>
                    Artist Statement
                </h1>
                <p className='text-justify'>
                As an Artist who sees beauty in everything, in different styles/techniques, i try to develop paintings that speak both to me and to others about the beauty that exists in the African /ancient cultures as a part of my study, I do pictorial documentation of events as it relates to day by day activities around the different African/ Nigerian tribes which is transferred to my canvas. Part of my process before I start my paintings is to research these different cultures , recreate them on canvas as they relate to these contemporary era , I do not merely capture images with my brushes; rather, with careful and colorful strokes, and the lifestyles in the recent age, Gender pertaining issues and religion . I acknowledge the movement of time especially in the lives of African women who work hard to be relevant and responsible in managing power, family ,emotions and passions and with my works I preach for change , acceptance and inclusion to the voiceless girl child /women in Africa which can be seen more in most of my paintings “ last supper “ . I nd pleasure to explore and experiment in what people tag as USELESS. I am an Artist who nds happiness in creating from nothing, while trying to bring solutions to the planet and mankind challenges . I work mostly with Acrylic paints , pastels, oil paints, inks and other found materials, (industrial wastes) creating 2 and 3 dimensional works respectively with the use of pallet knives and brushes. Even with some challenges, to me Art has no limitations , so I keep on creating
                </p>
            </div>
        </main>
    </div>
  )
}

export default page
