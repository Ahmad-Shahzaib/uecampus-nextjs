import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures'
import ProgramPage from '@/component/Courses/slug/courses-programs'
import CourseDetailHeader from '@/component/Courses/slug/header'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen space-y-8 bg-gray-400 rounded-3xl m-8 flex items-center justify-between px-12 py-20">
            <CourseDetailHeader />
            <CoursesFeaturesCards />
            <ProgramPage />
        </main>
    )
}

export default page