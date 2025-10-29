"use client";
import TestimonialCarousel from "@/component/carousal";
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


export default function Page() {

  return (
    <div> 
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
          <EducationSection />
        </div>
      </div>
      <div>
        <CouresSection />
      </div>
        <div>
        <TestimonialCarousel />
      </div>
    </div>
  );
}




