"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useSelector } from "@/redux/store"
import { RootState } from "@/redux/rootReducer"

interface FeatureCard {
  title: string
  description: string
}

const fallbackFeatures: FeatureCard[] = [
  {
    title: "Accredited Diploma",
    description:
      "Awarded by Qualifi, a UK-based awarding body regulated by Ofqual, this internationally recognised qualification provides a strong academic and practical foundation for senior roles.",
  },
  {
    title: "8 Months to Complete",
    description:
      "Complete your diploma in as little as eight months, positioning yourself for quicker career advancement or further studies.",
  },
  {
    title: "£2,500",
    description:
      "Take advantage of budget-friendly fees and scholarship options, making quality education accessible to learners across the globe.",
  },
  {
    title: "100% Online Diploma",
    description:
      "Study fully online from anywhere, enjoying flexible learning without compromising the quality or recognition of your diploma.",
  },
]

export default function CoursesFeaturesCards() {
  const { data } = useSelector((state: RootState) => state.detailCourse)
  const highlightedStructure = data?.course?.course_structures?.find((structure) => {
    return (
      structure.section_3_title_1 ||
      structure.section_3_title_2 ||
      structure.section_3_title_3 ||
      structure.section_3_title_4 ||
      structure.section_3_title_5
    )
  })

  const features = useMemo<FeatureCard[]>(() => {
    if (!highlightedStructure) {
      return fallbackFeatures
    }

    const dynamicFeatures: FeatureCard[] = [
      {
        title: highlightedStructure.section_3_title_1 ?? "",
        description: highlightedStructure.section_3_title_2 ?? "",
      },
      {
        title: highlightedStructure.section_3_title_1_content?? "",
        description: highlightedStructure.section_3_title_2_content ?? "",
      },
      {
        title: highlightedStructure.section_3_title_3 ?? "",
        description: highlightedStructure.section_3_title_4 ?? "",
      },
      {
        title: highlightedStructure.section_3_title_3_content ?? "",
        description: highlightedStructure.section_3_title_4_content ?? "",
      },
      
    ].filter((feature) => feature.title && feature.description)

    return dynamicFeatures.length ? dynamicFeatures : fallbackFeatures
  }, [highlightedStructure])

  return (
    <main className="h-full bg-background p-4">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-300 bg-white">
              <CardContent className="p-6">
                <h1 className="mb-4 text-3xl font-semibold text-[#6a1b9a]">{feature.title}</h1>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
