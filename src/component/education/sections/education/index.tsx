"use client"

import { EducationCard } from "../../cards/education"
import { VideoCard } from "../../cards/video"


export function EducationSection() {
  return (
    <section className="flex flex-col gap-6">
      {/* Education Card */}
      <EducationCard />

      {/* Video Card */}
      <VideoCard />
    </section>
  )
}
