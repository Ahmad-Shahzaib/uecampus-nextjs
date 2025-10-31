"use client";
import TestimonialCarousel from "@/component/common/Carousal";
import CouresSection from "@/component/Courses";
import { AboutSection } from "@/component/education/sections/about";
import { EducationSection } from "@/component/education/sections/education";
import Faqs from "@/component/faqs";
import { GlobalCampusSection } from "@/component/global";
import HeroSection from "@/component/HeroSection";
import JoinUs from "@/component/joinus";
import { LogoCarousel } from "@/component/partners";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import { CoursesSection_ue, FEATURE_CARDS, HeroSection_ue, PARTNER_LOGOS, studentLocations } from "@/constants";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.courses);
  console.log("courses data", data)

  useEffect(() => {
    dispatch(fetchCoursesData({}));
  }, [dispatch]);

      const cardData = {
        backgroundClass: "text-[#6a1b9a]",
        title: "Quality Education That’s Affordable — Because Your Future Matters",
        description:
            "Quality Education That’s Affordable — Because Your Future Matters At UeCampus, we believe that access to top-tier education should never be limited by cost. That’s why we’re committed to offering internationally accredited degree programmes that don’t break the bank — making your dream of earning a quality degree achievable and affordable at the comfort of your home.",
        backgroundImage:
            "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.png",
    }

    const cardData1 = {
        backgroundClass: "text-[#6a1b9a]",
        title: "Vision",
        description:
            "Our vision is to be a global leader in online education, recognized for creating pathways to opportunity and success. UeCampus envisions a future where every learner, regardless of circumstance, has the chance to learn, grow, and achieve their goals through inclusive and innovative education.",
        backgroundImage:
            "",
    }

  return (
    <div>
      <div className="py-6  bg-gray-800 flex flex-col space-y-8">
        <div className="sm:px-10 px-4">
    {HeroSection_ue.map((section, index) => (
          <HeroSection key={index} title={section.title} description={section.description} variant={section.variant} />
        )
        )}
        </div>
    
        <div className="flex h-auto justify-center sm:px-10 px-4">
         <div className="grid gap-4 md:gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full">

            {FEATURE_CARDS.map((card, index) => (
              <FeatureCard
                key={index}
                title={card.title}
                description={card.description}
                variant={card.variant}
              />
            ))}
          </div>
        </div>

        <div className="sm:px-10 px-4">
          <LogoCarousel logos={PARTNER_LOGOS} />
        </div>
      </div>
     
      <div>
        <CouresSection />
      </div>
      <div className="min-h-screen bg-gray-800 py-8 px-8">
        <div
          className="
      grid 
      gap-6 
      mx-auto 
     
      grid-cols-1 
      md:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)]
    "
        >
          <AboutSection />
          <EducationSection cardData1={cardData} cardData2={cardData1} link={true} />
        </div>
      </div>

      <div>
        <div>
        <TestimonialCarousel />
      </div>
        <GlobalCampusSection
          title="Bringing the World Into Our Classrooms"
          description="UECampus is home to a vibrant community of international students who represent a wide range of countries and cultural backgrounds. Their presence strengthens our mission to provide globally relevant education and fosters an environment of academic exchange and cross-cultural learning. Our international students are shaping the future—locally and globally."
          locations={studentLocations}
        />
      </div>
      <div>
        <Faqs />
      </div>
      
      <div>
        <JoinUs />
      </div>
    </div>
  );
}




