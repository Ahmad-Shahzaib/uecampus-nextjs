import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const HeroSection = ({
  title,
  description,
  variant,
}: {
  title: string
  description: string
  variant: 'primary' | 'secondary' | 'destructive' | any
}) => {
  return (
    <div className="bg-black w-full flex justify-center rounded-lg">
      <div className="relative w-[calc(100%-24px)] h-[500px] flex items-center justify-center mx-auto overflow-hidden rounded-lg">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://newwebsite.uecampus.com/wp-content/uploads/2025/09/video-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-2 sm:px-8 sm:max-w-4xl w-full mx-auto">
          <div className="sm:w-1/2 w-full mx-auto">
            <h1
              className={`text-2xl font-semibold sm:text-3xl lg:text-4xl whitespace-pre-line ${
                variant === 'primary' || variant === 'secondary'
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {title}
            </h1>
          </div>

          <p
            className={`mt-6 text-lg whitespace-pre-line max-w-2xl mx-auto ${
              variant === 'primary' || variant === 'secondary'
                ? 'text-white/90'
                : 'text-gray-700'
            }`}
          >
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
            <Input
              className="w-full py-6 sm:w-[600px] rounded-[0px] bg-white/90 backdrop-blur-sm border-white/20"
              placeholder="Search courses..."
            />
            <Button
              variant="destructive"
              className="px-8 py-6 w-full rounded-md sm:w-auto"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
