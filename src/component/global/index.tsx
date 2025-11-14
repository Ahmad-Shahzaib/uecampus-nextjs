"use client";

import dynamic from "next/dynamic";
import { HeroCard } from "./cards/hero";

// Dynamically import the LeafletMap with SSR disabled
const LeafletMap = dynamic(() => import("@/components/ui/LeafletMap"), {
  ssr: false,
});

interface GlobalCampusSectionProps {
  title?: string;
  description?: string;
  locations?: Array<{
    id: string;
    country: string;
    lat: number;
    lng: number;
    color: string;
  }>;
}

export function GlobalCampusSection({
  title = "",
  description = "",
  locations = [],
}: GlobalCampusSectionProps) {
  return (
    <section className="w-full py-12 md:py-20 px-2 md:px-4 lg:px-8 bg-white">
      <div
        className="
          grid gap-8 lg:gap-12 
          items-center
          grid-cols-1
          md:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)]
        "
      >
        {/* Text Section */}
        <div className="flex items-center justify-center w-full">
          <HeroCard />
        </div>

        {/* Globe Section */}
        <div className="flex items-center justify-center">
          <div className="w-96 aspect-square lg:aspect-auto 
          ">
            <LeafletMap />
          </div>
        </div>
      </div>
    </section>
  );
}
