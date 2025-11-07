"use client"

import { EducationCard } from "../../cards/education"
import { VideoCard } from "../../cards/video"

interface CardData1Props {
  cardData1: {
    title: string;
    description: string;
    backgroundImage: string;
    backgroundClass?: string
    about?: {
      title?: string;
      description?: string;
    }
  },
  cardData2: {
    title: string;
    description: string;
    backgroundImage: string;
    backgroundClass?: string,
    about?: {
      title?: string;
      description?: string;
    }

  },
  link: Boolean
}


export function EducationSection({ cardData1, cardData2, link = true }: any) {

  return (
    <section className="flex flex-col gap-6">
      <EducationCard
        backgroundImage={cardData1?.backgroundImage}
        backgroundClass={cardData1?.backgroundClass}
        about={cardData1.about}
        bg={false}
        bgStyles="bg-black text-white"
      />
      {
        link ? (
          <>
            <VideoCard />
          </>
        ) : (
          <>  <EducationCard
            backgroundImage={cardData2?.backgroundImage}
            backgroundClass={cardData2?.backgroundClass}
            about={cardData2.about}
            bg={false}
            bgStyles="bg-black text-white"


          /></>
        )
      }


    </section>
  )
}
