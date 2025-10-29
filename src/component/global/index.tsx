"use client"

import { HeroCard } from "./cards/hero"
import InteractiveGlobe from "./cards/worldmap"


interface GlobalCampusSectionProps {
  title?: string
  description?: string
  locations?: Array<{
    id: string
    country: string
    lat: number
    lng: number
    color: string
  }>
}

export function GlobalCampusSection({
  title = "Bringing the World Into Our Classrooms",
  description = "UECampus is home to a vibrant community of international students who represent a wide range of countries and cultural backgrounds. Their presence strengthens our mission to provide globally relevant education and fosters an environment of academic exchange and cross-cultural learning. Our international students are shaping the future—locally and globally.",
  locations = [],
}: GlobalCampusSectionProps) {
  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Hero Card */}
          <div className="flex items-center justify-center w-full">
            <HeroCard title={title} description={description} className="w-full h-full min-h-96 lg:min-h-full" />
          </div>

          {/* Right: World Map */}
          <div className="flex items-center justify-center w-full">
            <div className="w-full aspect-square lg:aspect-auto lg:h-96 xl:h-full">
              <InteractiveGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
    
  )
}
