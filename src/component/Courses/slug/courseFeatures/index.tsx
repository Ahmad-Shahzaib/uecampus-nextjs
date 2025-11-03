import { Card, CardContent } from "@/components/ui/card"

interface FeatureCard {
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    title: "Accredited Diploma",
    description:
      "Awarded by Quali, a leading UK-based awarding body and regulated by Ofqual, this internationally recognised qualification provides a strong academic and practical foundation for senior roles in health and social care sectors.",
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
  return (
    <main className="h-full bg-background p-4">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-300 bg-white">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-purple-600">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
