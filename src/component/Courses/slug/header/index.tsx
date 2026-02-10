"use client"; // << important!
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'
import type { CourseStructure as SliceCourseStructure } from '@/redux/slices/detailCourseSlice'

type CourseStructureWithHero = SliceCourseStructure & {
  hero_content?: string | null
  hero_button_1_name?: string | null
  hero_button_1_link?: string | null
  hero_button_2_name?: string | null
  hero_button_2_link?: string | null
}

interface CourseDetailHeaderProps {
  name: string;
  bgImage: string;
  courseStructure?: CourseStructureWithHero | null;
  heroTitle?: string;
  heroDescription?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  courseId?: number | string; // Added courseId prop
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  name,
  bgImage,
  courseStructure = null,
  heroTitle,
  heroDescription,
  button1Text,
  button1Link,
  button2Text,
  button2Link,
  courseId // Added courseId parameter
}) => {
  const router = useRouter();

  // Normalize and validate bgImage for use in CSS background
  const getSafeBg = (img?: string | null) => {
    if (!img) return undefined;
    const trimmed = img.trim();
    if (!trimmed) return undefined;

    // If already absolute or protocol-relative or root-relative, return as-is
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;

    // Otherwise, make it absolute using current origin (client-side)
    if (typeof window !== 'undefined' && window.location) {
      return window.location.origin + (trimmed.startsWith('/') ? '' : '/') + trimmed;
    }

    return trimmed;
  };

  const safeBg = getSafeBg(bgImage);

  // Helpful debug when running locally
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    // console.log('[CourseDetailHeader] bgImage:', bgImage, 'safeBg:', safeBg);
  }

  const handleButtonClick = (link?: string | null) => {
    if (!link) return
    try {
      // If it's an internal path, use router.push; otherwise open in new tab
      const isInternal = link.startsWith('/')
      if (isInternal) router.push(link)
      else window.open(link, '_blank')
    } catch {
      // fallback: open in same tab
      window.location.href = link
    }
  }

  // Added handler for Apply Now button
  const handleApplyNow = () => {
    if (courseId) {
      const applyUrl = `https://new.uecampus.com/student-application-form?&course_id=${courseId}`;
      window.open(applyUrl, '_blank');
    }
  };

  // Determine which content to use - props take precedence over courseStructure
  const title = heroTitle || courseStructure?.hero_content;
  const description = heroDescription;
  const btn1Text = button1Text || courseStructure?.hero_button_1_name;
  const btn1Link = button1Link || courseStructure?.hero_button_1_link;
  const btn2Text = button2Text || courseStructure?.hero_button_2_name;
  const btn2Link = button2Link || courseStructure?.hero_button_2_link;

  // Check if we have any content to show
  const hasContent = title || description || btn1Text || btn2Text;

  return (
    <div
      className="h-auto min-h-[400px] flex items-center justify-center p-4 sm:p-6 m-3 rounded-2xl lg:p-16 bg-cover bg-center relative overflow-hidden"
      style={safeBg ? { backgroundImage: `url("${safeBg}")` } : undefined}
    >
      {/* Add an overlay for better text readability. Use an inline RGBA background so it works reliably without Tailwind bg color classes */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      />

      <div className="flex flex-col lg:flex-row w-full relative z-10 gap-6 lg:gap-8 max-w-7xl mx-auto items-center">
        {/* Left section - title */}
        <div className="w-full lg:flex-1 lg:pr-8 rounded-2xl p-6 sm:p-8 lg:p-0 flex items-center justify-center lg:justify-start">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight text-center lg:text-left break-words">
            {name}
          </h1>
        </div>

        {/* Right section - purple card - only show if we have content */}
        {hasContent && (
          <div className="w-full lg:w-[24rem] lg:flex-shrink-0">
            <div className="bg-[#6A1B9A] w-full rounded-2xl px-4 sm:px-5 md:px-7 py-6 sm:py-8 md:py-10 text-center flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 shadow-2xl">
              {/* Heading */}
              <div className="text-center">
                {title ? (
                  <div
                    className="prose prose-invert m-0 max-w-none"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                ) : description ? (
                  <>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-2 sm:mb-3 leading-tight">
                      {description}
                    </h1>
                  </>
                ) : null}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 sm:gap-2.5 max-w-xs mx-auto w-full">
                {btn1Text && (
                  <Button
                    onClick={() => handleButtonClick(btn1Link)}
                    className="w-full border-0 bg-white cursor-pointer text-purple-700 hover:bg-gray-100 font-medium py-3 sm:py-4 md:py-5 rounded-lg text-xs sm:text-sm"
                  >
                    {btn1Text}
                  </Button>
                )}

                {btn2Text && (
                  <Button
                    variant="outline"
                    onClick={() => handleButtonClick(btn2Link)}
                    className="w-full border-2 border-white cursor-pointer font-semibold py-3 sm:py-4 md:py-5 text-white bg-transparent hover:bg-white hover:text-purple-700 transition-colors rounded-lg text-xs sm:text-sm"
                  >
                    {btn2Text}
                  </Button>
                )}

                {/* Modified Apply Now button */}
                <Button
                  onClick={handleApplyNow}
                  className="w-full border-2 border-white cursor-pointer font-semibold py-3 sm:py-4 md:py-5 text-white bg-transparent hover:bg-white hover:text-purple-700 transition-colors rounded-lg text-xs sm:text-sm"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetailHeader