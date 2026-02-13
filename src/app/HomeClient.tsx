"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import Seo from "@/component/common/Seo";
import { studentLocations } from "@/constants";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { fetchTestinomialsData } from "@/redux/thunk/testinomials";
import { fetchFeatureCardsData } from "@/redux/thunk/featureCards";
import { fetchAboutSectionData } from "@/redux/thunk/aboutSection";

const LogoCarousel = dynamic(() => import("@/component/partners").then(mod => mod.default), { ssr: false });
const CouresSection = dynamic(() => import("@/component/Courses"), { ssr: false });
const AboutSection = dynamic(() => import("@/component/education/sections/about").then(mod => ({ default: mod.AboutSection })), { ssr: false });
const EducationSection = dynamic(() => import("@/component/education/sections/education").then(mod => ({ default: mod.EducationSection })), { ssr: false });
const TestimonialCarousel = dynamic(() => import("@/component/common/Carousal"), { ssr: false });
const GlobalCampusSection = dynamic(() => import("@/component/global").then(mod => ({ default: mod.GlobalCampusSection })), { ssr: false });
const Faqs = dynamic(() => import("@/component/faqs/Faqs"), { ssr: false });
const JoinUs = dynamic(() => import("@/component/joinus"), { ssr: false });

export default function HomeClient() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: courses, isLoading: coursesLoading, error: coursesError } = useSelector(
        (state: RootState) => state.courses
    );
    const { data: testimonials, isLoading: testimonialsLoading } = useSelector(
        (state: RootState) => state.testinomials
    );
    const { data: cards, isLoading: cardsLoading, error: cardsError } = useSelector(
        (state: RootState) => state.featureCards
    );
    const { data: about, isLoading: aboutLoading, error: aboutError } = useSelector(
        (state: RootState) => state.aboutSection
    );

    // Fetch data only once on mount
    useEffect(() => {
        const fetchData = async () => {
            if (!courses || courses.length === 0) {
                dispatch(fetchCoursesData({}));
            }
            dispatch(fetchTestinomialsData());
            dispatch(fetchFeatureCardsData());
            dispatch(fetchAboutSectionData());
        };

        fetchData();
    }, [dispatch]);

    // Memoized card data to prevent recreation on every render
    const cardData = useMemo(
        () => ({
            title: "About UE Campus",
            description: "Learn more about our mission and vision.",
            backgroundClass: "text-[#6a1b9a]",
            backgroundImage:
                "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.webp",
            about: {
                secondCardTitle: about?.secondCardTitle,
                secondCardDescription: about?.secondCardDescription,
            },
        }),
        [about?.secondCardTitle, about?.secondCardDescription]
    );

    const cardData1 = useMemo(
        () => ({
            backgroundClass: "text-[#6a1b9a]",
            title: "Vision",
            description:
                "Our vision is to be a global leader in online education, recognized for creating pathways to opportunity and success. UeCampus envisions a future where every learner, regardless of circumstance, has the chance to learn, grow, and achieve their goals through inclusive and innovative education.",
            about: {
                secondCardTitle: about?.secondCardTitle,
                secondCardDescription: about?.secondCardDescription,
            },
            backgroundImage: "",
        }),
        [about?.secondCardTitle, about?.secondCardDescription]
    );

    // Memoize filtered/processed cards if needed
    const processedCards = useMemo(() => cards || [], [cards]);

    return (
        <div className="">
            <Seo pageKey="home" />

            {/* Above-the-fold content - loaded immediately */}
            <div className="py-6 bg-gray-800 flex flex-col space-y-8">
                <div className="sm:px-10 px-4">
                    {/* Hero is provided by server page; client wrapper keeps below-the-fold logic */}
                </div>

                <div className="sm:px-10 px-4">
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-6 md:gap-8">
                        {processedCards.map((section: any, index: number) => (
                            <div
                                key={section.id || `feature-${index}`}
                                className="flex-1 flex"
                            >
                                <FeatureCard section={section} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <LogoCarousel logos={testimonials} />
                </div>
            </div>

            {/* Below-the-fold content - lazy loaded */}
            <div>
                <CouresSection />
            </div>

            <div className="min-h-screen bg-gray-800 py-8 px-8">
                <div className="grid gap-6 mx-auto grid-cols-1 md:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)] min-h-[600px] md:min-h-[700px]">
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
                <TestimonialCarousel />
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
