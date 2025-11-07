"use client";
import AdvanceCareer from '@/component/about-us/advance-career'
import AboutUsStats from '@/component/about-us/stats'
import { AboutSection } from '@/component/education/sections/about'
import { EducationSection } from '@/component/education/sections/education'
import JoinUs from '@/component/joinus'
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { fetchAboutSectionData } from '@/redux/thunk/aboutSection';
import { useEffect } from 'react';


const Page = () => {


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchAboutSectionData());

    }, [dispatch]);


    const { data: about, isLoading, error } = useSelector(
        (state: RootState) => state.aboutSection
    );
    console.log("AboutSection props in Page:", { about, isLoading, error });


    const cardData = {
        backgroundClass: "bg-[#1b232a] text-[#FFFFFF]",
        title: "Mission",
        description:
            "At UeCampus, our mission is to expand access to higher education by providing flexible, affordable, and high-quality online learning opportunities for students worldwide. We are dedicated to breaking down barriers and empowering individuals from all backgrounds to unlock their full potential through knowledge, skills, and opportunity-driven education.",
        backgroundImage:
            "",
        about: {
          secondCardTitle: about?.secondCardTitle,
            secondCardDescription: about?.secondCardDescription,
        }
    }

    const cardData1 = {
        backgroundClass: "bg-[#2B303A] text-[#FFFFFF]",
        title: "Vision",
        description:
            "Our vision is to be a global leader in online education, recognized for creating pathways to opportunity and success. UeCampus envisions a future where every learner, regardless of circumstance, has the chance to learn, grow, and achieve their goals through inclusive and innovative education.",
        backgroundImage:
            "",
        about: {
            secondCardTitle: about?.secondCardTitle,
            secondCardDescription: about?.secondCardDescription,
        }
    }

    return (
        <div>
            <div>
                <AboutUsStats />
            </div>
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8 mx-auto">
                    <AboutSection
                        about={about}
                        isLoading={isLoading}
                        error={error}
                    />
                    <EducationSection
                        cardData1={
                            cardData
                        }
                        cardData2={
                            cardData1
                        }
                        link={false}


                    />
                </div>
            </div>

            <div>
                <AdvanceCareer mainClass="" />
            </div>
            <div>
                <JoinUs />
            </div>
        </div>
    )
}

export default Page