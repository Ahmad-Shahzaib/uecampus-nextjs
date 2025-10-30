import AdvanceCareer from '@/component/about-us/advance-career'
import AboutUsStats from '@/component/about-us/stats'
import { AboutSection } from '@/component/education/sections/about'
import { EducationSection } from '@/component/education/sections/education'
import JoinUs from '@/component/joinus'
import React from 'react'

const Page = () => {
    return (
        <div>
            <div>
                <AboutUsStats />
            </div>
            <div className="min-h-screen bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8 mx-auto">
                    <AboutSection />
                    <EducationSection />
                </div>
            </div>
           
            <div>
                <AdvanceCareer />
            </div>
             <div>
                <JoinUs />
            </div>
        </div>
    )
}

export default Page