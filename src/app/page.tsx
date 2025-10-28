"use client";
import CouresSection from "@/component/Courses";
import { AboutSection } from "@/component/education/sections/about";
import { EducationSection } from "@/component/education/sections/education";
import HeaderSection from "@/component/Header";
import HeroSection from "@/component/HeroSection";
import { LogoCarousel } from "@/component/partners";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import { CoursesSection_ue, FEATURE_CARDS, HeroSection_ue, PARTNER_LOGOS } from "@/constants";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { useEffect } from "react";

export default function Home() {

  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.courses);
  console.log("courses data", data)

  useEffect(() => {
    dispatch(fetchCoursesData({}));
  }, [dispatch]);

  return (
    <div>
      <div className="py-6 px-10 bg-gray-800 flex flex-col gap-16">
        {HeroSection_ue.map((section, index) => (
          <HeroSection key={index} title={section.title} description={section.description} variant={section.variant} />
        )
        )}
        <div className="">
          <div className="grid gap-4 md:gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {FEATURE_CARDS.map((card, index) => (
              <FeatureCard key={index} title={card.title} description={card.description} variant={card.variant} />
            ))}
          </div>
        </div>
        <div className="">
          <LogoCarousel logos={PARTNER_LOGOS} />
        </div>
      </div>
      <div>
      </div>
      <div>
        {
          CoursesSection_ue.map((section, index) => (
            <CouresSection key={index} heading={section.heading ?? ""} description={section.description ?? ""} variant={section.variant ?? ""} title={section.title} name={section.name} detail={section.detail} />

          ))

        }
      </div>
      <div className="min-h-screen bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8 mx-auto">
          <AboutSection />
          <EducationSection />
        </div>
      </div>
    </div>
  );
}




