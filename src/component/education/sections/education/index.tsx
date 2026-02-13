// src/component/education/sections/education/index.tsx
"use client";

import { EducationCard } from "../../cards/education";
import { VideoCard } from "../../cards/video";

interface CardData {
  title: string;
  description: string;
  backgroundImage?: string;
  backgroundClass?: string;
  about?: {
    secondCardTitle?: string;
    secondCardDescription?: string;
  };
}

interface EducationSectionProps {
  cardData1: CardData;
  cardData2?: CardData;
  link?: boolean;
}

export function EducationSection({
  cardData1,
  cardData2,
  link = true,
}: EducationSectionProps) {
  return (
    <section className="flex flex-col gap-6 h-full">
      <div className="flex-1 min-h-[250px] md:min-h-0">
        <EducationCard
          backgroundImage={cardData1?.backgroundImage}
          backgroundClass={cardData1?.backgroundClass}
          about={cardData1?.about}
          bg={true}
          // Remove bgStyles since we'll control color via isDarkMode
          isDarkMode={!link} // Changed: true when link=false, false when link=true
        />
      </div>

      {link ? (
        <div className="flex-1 min-h-[250px] md:min-h-0">
          <VideoCard />
        </div>
      ) : (
        <div className="flex-1 min-h-[250px] md:min-h-0">
          <EducationCard
            backgroundImage={cardData2?.backgroundImage}
            backgroundClass={cardData2?.backgroundClass}
            about={cardData2?.about}
            bg={false}
            // Remove bgStyles since we'll control color via isDarkMode
            isDarkMode={true}
          />
        </div>
      )}
    </section>
  );
}