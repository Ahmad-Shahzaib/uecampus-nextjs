"use client"; // << important!
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

interface CourseDetailHeaderProps {
  name: string;
  bgImage: string;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({ name, bgImage }) => {
   const router = useRouter();

  const enqureNavigation = () => {
    router.push("/enquire-now"); // navigate to /about page
  };
  return (
    <div 
      className="h-auto min-h-[400px] lg:h-[70vh] lg:max-h-[500px] flex items-center justify-center bg-[#999999] p-4 sm:p-6 m-3 rounded-2xl lg:p-16 bg-cover bg-center relative "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Add an overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-40 rounded-2xl"></div>
      
      <div className="flex flex-col lg:flex-row w-full relative items-center lg:items-start z-10 gap-6 lg:gap-0">
        {/* Left section - title (semi-transparent card on mobile) */}
        <div className="w-full lg:flex-1 lg:pr-20  lg:bg-transparent rounded-2xl lg:rounded-none p-6 sm:p-8 lg:p-0 shadow-lg lg:shadow-none lg:max-w-[calc(100%-26rem)]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight text-center lg:text-left break-words">
            {name}
          </h1>
        </div>

        {/* Right section - purple card */}
        <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:z-10 w-full lg:w-[24rem] lg:flex-shrink-0">
          <div className="bg-[#6A1B9A] w-full rounded-2xl px-4 sm:px-5 md:px-7 py-6 sm:py-8 md:py-10 text-center flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 shadow-2xl">
            {/* Heading */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-2 sm:mb-3 leading-tight">
                Accredited by Qualifi a prestigious UK awarding body regulated by Ofqual.
              </h2>

              {/* Description */}
              <p className="text-white font-normal leading-relaxed text-xs sm:text-sm">
                Take the first step towards a globally recognised degree.
                Fill out the form to get personalised guidance,
                programme details, and admissions support from our team.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:gap-2.5 max-w-xs mx-auto w-full">
              <Button
              onClick={enqureNavigation}
              
              className="w-full border-0 bg-white cursor-pointer text-purple-700 hover:bg-gray-100 font-medium py-3 sm:py-4 md:py-5 rounded-lg text-xs sm:text-sm">
                Enquire Now
              </Button>

              <Button
                variant="outline"
                className="w-full border-2 border-white cursor-pointer font-semibold py-3 sm:py-4 md:py-5 text-white bg-transparent hover:bg-white hover:text-purple-700 transition-colors rounded-lg text-xs sm:text-sm"
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