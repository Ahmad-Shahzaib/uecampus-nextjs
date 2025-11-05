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
  /* PARTNER_LOGOS, */
  studentLocations,
} from "@/constants";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { fetchTestinomialsData } from "@/redux/thunk/testinomials";
import { useEffect } from "react";
import Banner from "@/component/about-us/Banner";
import { StatCard } from "@/component/about-us/stats/card";
import StatsCards from "@/component/common/StatsCards";
export default function Page() {

  const dispatch = useDispatch();
  const logos = useSelector((state) => state.testinomials?.data ?? []);

  useEffect(() => {
    dispatch(fetchTestinomialsData());
  }, [dispatch]);

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

  return (
    <div>
      <div className=" rounded-2xl overflow-hidden px-6 py-8">
        <Banner
          imageUrl="https://newwebsite.uecampus.com/wp-content/uploads/2025/08/thumbnail-5.jpg"
          title="Scholarships at UeCampus"
        />
      </div>
      <div className="px-6">
        <StatsCards data={statsData} />
      </div>

      <div className="min-h-screen  py-8 px-6">
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
        <LogoCarousel logos={logos} />
      </div>
    </div>
  );
}
