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

      const cardData = {
      backgroundClass: "bg-[#1b232a] text-[#FFFFFF]",
        title: "Quality Education That’s Affordable — Because Your Future Matters",
        description:
            "This scholarship is awarded to outstanding students who demonstrate exceptional academic achievement. Whether you're a high-performing high school graduate or a top-ranking university student, UeCampus recognizes your hard work and dedication. Eligible applicants may receive partial or full tuition support based on their academic performance and qualifications.",
        backgroundImage:
            "",
    }

    const cardData1 = {
       backgroundClass: "bg-[#2B303A] text-[#FFFFFF]",
        title: "Scholarships for Residents of Developing Countries",
        description:
            "We are committed to creating global learning opportunities, especially for students from regions with limited access to higher education. This scholarship is specifically designed to support residents of developing countries by offering substantial tuition reductions. It aims to empower talented individuals who are eager to advance their education and make a positive impact in their communities.",
        backgroundImage:
            "",
    }

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
      <div className="min-h-screen  py-8 px-8">
        <div
          className="
      grid 
      gap-6 
      mx-auto 
     
      grid-cols-1  
      md:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)]
    "
        >
          <AboutSection 
          buttonText="Apply For Scholorship"
          label="Scholarships"
          title="at UeCampus"
          highlight=""
          description="At UeCampus, we believe that education should be a right, not a privilege. To support our mission of making higher education accessible to all, we offer a range of scholarships designed to reward achievement and reduce financial barriers."
          buttonStyles="border-white text-[#6a1b9a] cursor-pointer hover:text-[#6a1b9a] bg-white transition-all duration-200"
          />
          <EducationSection 
          cardData1={cardData}
          cardData2={cardData1}
          link={false}
          />  
        </div>
      </div>
      <div>
        <CouresSection />
      </div>
     
      <div>
        <TestimonialCarousel />
      </div>
       <div className="bg-gray-900 rounded-2xl m-5">
        <LogoCarousel logos={PARTNER_LOGOS} />
      </div>
    </div>
  );
}
