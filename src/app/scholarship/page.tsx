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
import {
  CoursesSection_ue,
  FEATURE_CARDS,
  HeroSection_ue,
  PARTNER_LOGOS,
  studentLocations,
} from "@/constants";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { useEffect } from "react";
import Banner from "@/component/about-us/Banner";
import { StatCard } from "@/component/about-us/stats/card";
export default function Page() {
  return (
    <div>
      <div className=" rounded-2xl overflow-hidden m-5">
        <Banner
          imageUrl="https://newwebsite.uecampus.com/wp-content/uploads/2025/08/thumbnail-5.jpg"
          title="Scholarships at UeCampus"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
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
      <div className="bg-gray-900 rounded-2xl m-5">
        <LogoCarousel logos={PARTNER_LOGOS} />
      </div>
      <div>
        <TestimonialCarousel />
      </div>
    </div>
  );
}
