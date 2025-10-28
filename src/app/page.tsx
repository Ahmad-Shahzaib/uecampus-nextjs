"use client";
import HeaderSection from "@/component/Header";
import HeroSection from "@/component/HeroSection";
import { LogoCarousel } from "@/component/partners";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import { FEATURE_CARDS, HeroSection_ue, PARTNER_LOGOS } from "@/constants";
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
      <div className="py-6 px-10">
        <HeaderSection />
      </div>
      <div className="py-6 px-10 bg-gray-800 ">
        {HeroSection_ue.map((section, index) => (
          <HeroSection key={index} title={section.title} description={section.description} variant={section.variant} />
        )
        )}
      </div>
      <div className="py-6 px-10">
        <div className="grid gap-4 md:gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard key={index} title={card.title} description={card.description} variant={card.variant} />
          ))}
        </div>
      </div>
      <div className="py-6 px-10">
        <LogoCarousel logos={PARTNER_LOGOS} />
      </div>
    </div>
  );
}

