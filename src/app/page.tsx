"use client";
import TestimonialCarousel from "@/component/common/Carousal";
import CouresSection from "@/component/Courses";
import { AboutSection } from "@/component/education/sections/about";
import { EducationSection } from "@/component/education/sections/education";
import Faqs from "@/component/faqs/Faqs";
import { GlobalCampusSection } from "@/component/global";
import HeroSection from "@/component/HeroSection";
import JoinUs from "@/component/joinus";
import { LogoCarousel } from "@/component/partners";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import {
  CoursesSection_ue,
  studentLocations,
} from "@/constants";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { fetchTestinomialsData } from "@/redux/thunk/testinomials";
import { fetchFeatureCardsData } from "@/redux/thunk/featureCards";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAboutSectionData } from "@/redux/thunk/aboutSection";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useSelector((state) => state.courses);
  const { data: testimonials, isLoading: testimonialsLoading } = useSelector(
    (state) => state.testinomials
  );
  const featureState = useSelector((state) => (state as any).featureCards);
  const featureCards = featureState?.data ?? [];
  const featureCardsLoading = featureState?.isLoading ?? false;
  const featureCardsError = featureState?.error ?? null;
  const {
    data: cards,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.featureCards);
  const {
    data: about,
    isLoading: aboutLoading,
    error: aboutError,
  } = useSelector((state: RootState) => state.aboutSection);

  useEffect(() => {
    dispatch(fetchCoursesData({}));
    dispatch(fetchTestinomialsData());
    dispatch(fetchFeatureCardsData());
    dispatch(fetchFeatureCardsData());
    dispatch(fetchAboutSectionData());
  }, [dispatch]);

  const cardData = {
    backgroundClass: "text-[#6a1b9a]",
    backgroundImage:
      "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.png",
    about: {
      secondCardTitle: about?.secondCardTitle,
      secondCardDescription: about?.secondCardDescription,
    },
  };

  const cardData1 = {
    backgroundClass: "text-[#6a1b9a]",
    title: "Vision",
    description:
      "Our vision is to be a global leader in online education, recognized for creating pathways to opportunity and success. UeCampus envisions a future where every learner, regardless of circumstance, has the chance to learn, grow, and achieve their goals through inclusive and innovative education.",
    about: {
      secondCardTitle: about?.secondCardTitle,
      secondCardDescription: about?.secondCardDescription,
    },
    backgroundImage: "",
  };

  return (
    <div>
      <div className="py-6 bg-gray-800 flex flex-col space-y-8">
        <div className="sm:px-10 px-4">
          <HeroSection />
        </div>

        <div className="sm:px-10 px-4">
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards?.map((section: any, index: number) => (
              <FeatureCard
                key={section.id || `feature-${index}`}
                section={section}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="sm:px-10 px-4">
          <LogoCarousel logos={testimonials} />
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
          <AboutSection
            about={about}
            isLoading={aboutLoading}
            error={aboutError}
          />
          <EducationSection
            cardData1={cardData}
            cardData2={cardData1}
            link={true}
          />
        </div>
      </div>

      <div>
        <div>
          <TestimonialCarousel />
        </div>
        <GlobalCampusSection
          title=""
          description=""
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
