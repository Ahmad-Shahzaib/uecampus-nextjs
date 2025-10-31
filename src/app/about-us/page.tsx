import AdvanceCareer from '@/component/about-us/advance-career'
import AboutUsStats from '@/component/about-us/stats'
import { AboutSection } from '@/component/education/sections/about'
import { EducationSection } from '@/component/education/sections/education'
import JoinUs from '@/component/joinus'
import React from 'react'

const Page = () => {
    const cardData = {
        backgroundClass: "bg-[#1b232a] text-[#FFFFFF]",
        title: "Mission",
        description:
            "At UeCampus, our mission is to expand access to higher education by providing flexible, affordable, and high-quality online learning opportunities for students worldwide. We are dedicated to breaking down barriers and empowering individuals from all backgrounds to unlock their full potential through knowledge, skills, and opportunity-driven education.",
        backgroundImage:
            "",
    }

    const cardData1 = {
        backgroundClass: "bg-[#2B303A] text-[#FFFFFF]",
        title: "Vision",
        description:
            "Our vision is to be a global leader in online education, recognized for creating pathways to opportunity and success. UeCampus envisions a future where every learner, regardless of circumstance, has the chance to learn, grow, and achieve their goals through inclusive and innovative education.",
        backgroundImage:
            "",
    }

    return (
        <div>
            <div>
                <AboutUsStats />
            </div>
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8 mx-auto">
                    <AboutSection 
                    label="About Us"
                    title="Why Study at UeCampus?"
                    highlight=''
                    buttonText=''
                    description='Founded in 2020, UeCampus is a global online education platform dedicated to making quality education accessible to all. Partnering with prestigious universities, we offer diverse programs designed to meet the needs of a global student community. UeCampus combines flexibility and innovation, providing interactive, technology-driven learning experiences that foster growth and career advancement.'
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