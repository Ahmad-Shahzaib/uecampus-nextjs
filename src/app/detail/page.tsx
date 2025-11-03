import ContactUsSection from '@/component/contact-us/contact/ContactUsSection'
import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures'
import ProgramPage from '@/component/Courses/slug/courses-programs'
import CourseDetailHeader from '@/component/Courses/slug/header'
import JoinUs from '@/component/joinus'
import React from 'react'

const DetailPage = () => {
  return (
    <div className="space-y-4">
      <CourseDetailHeader />
      <CoursesFeaturesCards />
      <ProgramPage />
      <ContactUsSection />
      <JoinUs />
    </div>
  )
}

export default DetailPage
