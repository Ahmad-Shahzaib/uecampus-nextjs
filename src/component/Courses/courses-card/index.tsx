"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface CourseCardProps {
  course: {
    id: number
    title: string
    image: string
    credits: string
    duration: string
    level: string
    type: string
    description: string
    userInfo: string
    timeInfo: string
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-none
    ">
      <div className="flex gap-6 px-4">
        {/* Image */}
        <div className="flex-shrink-0 w-86 h-64">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-medium text-[#3E3E63] mb-2">{course.title}</h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-[#F0F8FF] rounded  text-gray-700 px-3 py-2">{course.type}</span>
              <span className="text-xs bg-[#F0F8FF] rounded  text-gray-700 px-3 py-2">{course.duration}</span>
              <span className="text-xs bg-[#F0F8FF] rounded  text-gray-700 px-3 py-2">{course.credits}</span>
              <span className="text-xs bg-[#F0F8FF] rounded  text-gray-700 px-3 py-2">Cyber Sec</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
          </div>

          {/* Footer */}
          <hr />
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              <p>{course.userInfo}</p>
              <p className="text-gray-500 font-semibold">{course.timeInfo}</p>
            </div>
            <Button variant="ghost" className="text-gray-500 hover:bg-purple-50 gap-1">
              Course Details
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
