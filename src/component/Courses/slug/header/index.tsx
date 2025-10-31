import { Button } from '@/components/ui/button'
import React from 'react'

const CourseDetailHeader = () => {
  return (
    <>
     <div className="flex-1 pr-12">
        <h1 className="text-6xl font-semibold text-white leading-tight text-balance">
          Level 7 Diploma in Health and Social Care
        </h1>
      </div>
       <div className="flex-1 bg-purple-700 rounded-2xl p-10 text-center flex flex-col gap-8">
        {/* Heading */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-balance">
            Accredited by Qualifi a prestigious UK awarding body regulated by Ofqual.
          </h2>

          {/* Description */}
          <p className="text-white text-sm leading-relaxed">
            Take the first step towards a globally recognised degree. Fill out the form to get personalised guidance,
            programme details, and admissions support from our team.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold py-6 text-base">
            Enquire Now
          </Button>

          <Button
            variant="outline"
            className="w-full border-2 border-white text-white hover:bg-purple-800 font-semibold py-6 text-base bg-transparent"
          >
            Request Info
          </Button>
        </div>
      </div>
    </>
  )
}

export default CourseDetailHeader