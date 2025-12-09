"use client";
import AdvanceCareer from '@/component/about-us/advance-career'
import AboutUsStats from '@/component/about-us/stats'
import { AboutSection } from '@/component/education/sections/about'
import { EducationSection } from '@/component/education/sections/education'
import JoinUs from '@/component/joinus'
import Seo from '@/component/common/Seo'
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { fetchAboutSectionData } from '@/redux/thunk/aboutSection';
import { fetchOnlineDegreeCards } from '@/redux/thunk/onlineDegreeCards';
import { fetchMissionData } from '@/redux/thunk/missionThunk';
import { useEffect } from 'react';


const Page = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAboutSectionData());
        dispatch(fetchOnlineDegreeCards());
        dispatch(fetchMissionData());

    }, [dispatch]);

    const { data: about, isLoading, error } = useSelector((state: RootState) => state.aboutSection);
    const { data: cardsData } = useSelector(
        (state: RootState) => state.onlineDegreeCards
    );
    const { data: missionData } = useSelector(
        (state: RootState) => state.mission
    );


    const cardData = {
        backgroundClass: "bg-[#1b232a] text-[#FFFFFF]",
        title: missionData?.mission_title || "Mission",
        description: missionData?.mission_description || "",
        backgroundImage: "",
        about: {
            secondCardTitle: missionData?.mission_title || "Mission",
            secondCardDescription: missionData?.mission_description || "",
        }
    }

    const cardData1 = {
        backgroundClass: "bg-[#2B303A] text-[#FFFFFF]",
        title: missionData?.vision_title || "Vision",
        description: missionData?.vision_description || "",
        backgroundImage: "",
        about: {
            secondCardTitle: missionData?.vision_title || "Vision",
            secondCardDescription: missionData?.vision_description || "",
        }
    }

    return (
        <div>
            <Seo pageKey="about-us" />
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
                        cardData1={cardData}
                        cardData2={cardData1}
                        link={false}
                    />
                </div>
            </div>

            <div>
                <AdvanceCareer mainClass=""
                    cardsData={cardsData}
                />
            </div>
            <div>
                <JoinUs />
            </div>
        </div>
    )
}

export default Page