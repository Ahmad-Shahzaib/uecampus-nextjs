"use client"

import { EducationCard } from "../../cards/education"
import { VideoCard } from "../../cards/video"

interface CardData1Props {
  cardData1: {
    title: string;
    description: string;
    backgroundImage: string;
    backgroundClass?: string
  },
  cardData2: {
    title: string;
    description: string;
    backgroundImage: string;
    backgroundClass?: string

  },
  link: Boolean
}


export function EducationSection({ cardData1, cardData2, link = true }: CardData1Props) {


  return (
    <section className="flex flex-col gap-6">
      {/* Education Card */}
      <EducationCard 
        backgroundImage={cardData1?.backgroundImage}
        backgroundClass={cardData1?.backgroundClass}
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

          /></>
        )
      }


    </section>
  )
}
