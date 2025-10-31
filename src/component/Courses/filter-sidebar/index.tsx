"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    programmeType: {
      "Full-time": false,
      "Part-time": false,
      Online: false,
    },
    areaOfStudy: {
      Business: false,
      "Cyber Security": false,
      Engineering: false,
      Finance: false,
      Health: false,
      Information: false,
      Technology: false,
      Management: false,
      Policing: false,
      Tourism: false,
    },
    university: {
      "Staffordshire University": false,
      "Coventry University": false,
      "University of Hertfordshire": false,
      "University of Salford": false,
      "Open College": false,
      "Other College": false,
    },
    level: {
      Foundation: false,
      Undergraduate: false,
      Postgraduate: false,
    },
  })

  const handleFilterChange = (category: string, option: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof filters],
        [option]: !prev[category as keyof typeof filters][option as never],
      },
    }))
  }

  return (
    <aside className="w-56 flex-shrink-0">
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-bold text-foreground mb-6">Filter Courses</h2>

        {/* Programme Type */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-3">Programme Type</h3>
          <div className="space-y-3">
            {Object.keys(filters.programmeType).map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={`programme-${option}`}
                  checked={filters.programmeType[option as keyof typeof filters.programmeType]}
                  onCheckedChange={() => handleFilterChange("programmeType", option)}
                />
                <label htmlFor={`programme-${option}`} className="text-sm text-foreground cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Area of Study */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-3">Area of Study</h3>
          <div className="space-y-3">
            {Object.keys(filters.areaOfStudy).map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={`area-${option}`}
                  checked={filters.areaOfStudy[option as keyof typeof filters.areaOfStudy]}
                  onCheckedChange={() => handleFilterChange("areaOfStudy", option)}
                />
                <label htmlFor={`area-${option}`} className="text-sm text-foreground cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* University */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-3">University</h3>
          <div className="space-y-3">
            {Object.keys(filters.university).map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={`uni-${option}`}
                  checked={filters.university[option as keyof typeof filters.university]}
                  onCheckedChange={() => handleFilterChange("university", option)}
                />
                <label htmlFor={`uni-${option}`} className="text-sm text-foreground cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-3">Level</h3>
          <div className="space-y-3">
            {Object.keys(filters.level).map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={`level-${option}`}
                  checked={filters.level[option as keyof typeof filters.level]}
                  onCheckedChange={() => handleFilterChange("level", option)}
                />
                <label htmlFor={`level-${option}`} className="text-sm text-foreground cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white mb-2">Apply Filters</Button>
        <Button variant="outline" className="w-full bg-transparent">
          Clear Filters
        </Button>
      </Card>
    </aside>
  )
}
