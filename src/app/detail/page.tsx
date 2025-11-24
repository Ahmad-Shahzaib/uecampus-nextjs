import ContactUsSection from '@/component/contact-us/contact/ContactUsSection'
import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures'
import ProgramPage from '@/component/Courses/slug/courses-programs'
import CourseDetailHeader from '@/component/Courses/slug/header'
import JoinUs from '@/component/joinus'
import React from 'react'

const DetailPage = () => {
  const courseName = "Level 7 Diploma in Health and Social Care";
  const courseBgImage = "/path/to/your/image.jpg"; // Replace with actual image path
  return (
    <div className="space-y-4">
      <CourseDetailHeader name={courseName}
        bgImage={courseBgImage} />
      <CoursesFeaturesCards />
      <ProgramPage />
      <ContactUsSection />
      <JoinUs />
    </div>
  )
}

export default DetailPage
