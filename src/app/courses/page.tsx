"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/component/Courses/courses-card"
import FilterSidebar from "@/component/Courses/filter-sidebar"
import PaginationComponent from "@/component/Courses/pagination"


const courses = [
  {
    id: 1,
    title: "Level 7 Diploma in Health and Social Care",
    image: "/health-and-social-care-diploma.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 7",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Level 7 Diploma in Health and Social Care at UniCampus.",
    userInfo: "User: Guest User",
    timeInfo: "2 months",
  },
  {
    id: 2,
    title: "Level 7 Diploma in Data Science",
    image: "/data-science-diploma-technology.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 7",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Level 7 Diploma in Data Science at UniCampus.",
    userInfo: "User: Guest User",
    timeInfo: "2 months",
  },
  {
    id: 3,
    title: "Level 7 Diploma in Accounting and Finance",
    image: "/accounting-finance-diploma-business.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 7",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Level 7 Diploma in Accounting and Finance at UniCampus.",
    userInfo: "User: Guest User",
    timeInfo: "2 months",
  },
  {
    id: 4,
    title: "Extended Level 5 Diploma in Business Management",
    image: "/business-management-diploma-professional.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 5",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Extended Level 5 Diploma in Business Management at UniCampus.",
    userInfo: "User: Coordinator Level",
    timeInfo: "3 months",
  },
  {
    id: 5,
    title: "Level 5 Diploma in Cyber Security",
    image: "/cyber-security-diploma-technology-lock.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 5",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Level 5 Diploma in Cyber Security at UniCampus.",
    userInfo: "User: Guest",
    timeInfo: "3 months",
  },
  {
    id: 6,
    title: "Level 5 Diploma in Information Technology",
    image: "/information-technology-diploma-computer.jpg",
    credits: "120 Credits",
    duration: "Duration: 1 year",
    level: "Level 5",
    type: "Online-Open-Access",
    description:
      "Engage on a transformative educational journey with our Level 5 Diploma in Information Technology at UniCampus.",
    userInfo: "User: Guest",
    timeInfo: "3 months",
  },
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6
  const totalPages = Math.ceil(courses.length / coursesPerPage)

  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage
  const displayedCourses = courses.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with Search */}
      <header className="bg-white border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-8 p-6">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Course List */}
        <div className="flex-1">
          <div className="space-y-6">
            {displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
