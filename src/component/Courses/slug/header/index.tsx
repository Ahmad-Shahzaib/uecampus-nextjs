import { Button } from '@/components/ui/button'
import React from 'react'

interface CourseDetailHeaderProps {
  name: string;
  bgImage: string;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({ name, bgImage }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-8 m-3 rounded-2xl lg:p-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Add an overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
      
      <div className="flex flex-col lg:flex-row w-full relative items-center lg:items-start z-10">
        {/* Left section - title (semi-transparent card on mobile) */}
        <div className="w-full lg:flex-1 lg:pr-20 bg-black bg-opacity-50 lg:bg-transparent rounded-2xl lg:rounded-none p-8 lg:p-0 shadow-lg lg:shadow-none">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-white leading-tight text-balance text-center lg:text-left">
            {name}
          </h1>
        </div>

        {/* Right section - purple card */}
        <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:z-10 w-full lg:w-[28rem] mt-8 lg:mt-0">
          <div className="bg-[#6A1B9A] w-full rounded-2xl px-6 sm:px-8 py-10 sm:py-14 text-center flex flex-col justify-center gap-6 sm:gap-8 shadow-2xl">
            {/* Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 text-balance leading-tight">
                Accredited<br className="sm:hidden" /> by Qualifi<br className="lg:hidden" /> a<br className="sm:hidden" /> prestigious<br className="lg:hidden" /> UK<br className="lg:hidden" /> awarding<br className="lg:hidden" /> body<br className="lg:hidden" /> regulated<br className="lg:hidden" /> by Ofqual.
              </h2>

              {/* Description */}
              <p className="text-white font-normal leading-6 text-sm sm:text-base">
                Take the first step towards a globally recognised degree.<br className="hidden sm:block" />
                Fill out the form to get personalised guidance,<br className="hidden sm:block" />
                programme details, and admissions support from our team.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto w-full">
              <Button className="w-full border-0 bg-white cursor-pointer text-purple-700 hover:bg-gray-100 font-medium py-5 sm:py-6 rounded-lg text-sm sm:text-base">
                Enquire Now
              </Button>

              <Button
                variant="outline"
                className="w-full border-2 border-white cursor-pointer font-semibold py-5 sm:py-6 text-white bg-transparent rounded-lg text-sm sm:text-base"
              >
                Request Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailHeader