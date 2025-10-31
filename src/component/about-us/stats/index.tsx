import StatsCards from "@/component/common/StatsCards";
import BannerImage from "../Banner";
import { StatCard } from "./card";

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
};

const statsData = [
    {
      stat: "36+",
      title: "Online Courses",
      description:
        "Explore a wide range of flexible, career-focused programs.",
      variant: "dark",
    },
    {
      stat: "4.9",
      title: "Course Rating",
      description:
        "Trusted and highly rated by our students worldwide.",
      variant: "light",
    },
    {
      stat: "100",
      title: "Students",
      description:
        "A growing global community of engaged learners.",
      variant: "light",
    },
  ];


export default function AboutUsStats() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white">
        <div className="m-5 rounded-2xl">
          <BannerImage
            imageUrl="https://newwebsite.uecampus.com/wp-content/uploads/2025/08/thumbnail-1.jpg"
            title="About UeCampus"
          />
        </div>
        {/* Hero Section */}
        <section className="px-6 py-12">
          <div className="w-full mx-auto">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.4]  font-semibold text-[#6A1B9A] mb-12  text-balance">
              Your Online Learning
              <br />
              Platform, For the
              <br />
              Community, For You.
            </h1>

            {/* Stats Cards Grid */}
         <StatsCards data={statsData} />
          </div>
        </section>
      </main>
    </>
  );
}
