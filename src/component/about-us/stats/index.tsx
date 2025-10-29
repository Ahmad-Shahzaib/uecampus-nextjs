import { StatCard } from "./card"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Online Learning Platform",
  description: "Your Online Learning Platform, For the Community, For You.",
  url: "https://yourplatform.com",
  logo: "https://yourplatform.com/logo.png",
  sameAs: [
    "https://www.facebook.com/yourplatform",
    "https://www.twitter.com/yourplatform",
    "https://www.linkedin.com/company/yourplatform",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "100",
  },
}

export default function AboutUsStats() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-600 mb-12 leading-tight text-balance">
              Your Online Learning Platform, For the Community, For You.
            </h1>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                stat="36+"
                title="Online Courses"
                description="Our degrees are recognized internationally, opening doors to global careers."
                variant="dark"
              />

              <StatCard
                stat="4.9"
                title="Course Rating"
                description="Learn from industry experts who bring real-world experience to the classroom."
                variant="light"
              />

              <StatCard
                stat="100"
                title="Students"
                description="Study at your own pace with courses designed for busy lifestyles."
                variant="light"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
