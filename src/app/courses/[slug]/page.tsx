import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures'
import ProgramPage from '@/component/Courses/slug/courses-programs'
import CourseDetailHeader from '@/component/Courses/slug/header'
import React from 'react'

const Page = () => {
    // Provide the required props
    const courseName = "Level 7 Diploma in Health and Social Care";
    const courseBgImage = "/path/to/your/image.jpg"; // Replace with actual image path

    return (
        <main className="min-h-screen space-y-8 bg-gray-400 rounded-3xl m-8 flex items-center justify-between px-12 py-20">
            <CourseDetailHeader 
                name={courseName}
                bgImage={courseBgImage}
            />
            <CoursesFeaturesCards />
            <ProgramPage />
        </main>
    )
}

export default Page