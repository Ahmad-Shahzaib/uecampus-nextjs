'use client';

import React, { useState } from 'react';

const HealthSocialCareDiplomaPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="  text-center">
        <p className="text-lg leading-relaxed text-gray-800">
          At our learning platform, we warmly welcome students from a variety of international education systems. By embracing diverse academic backgrounds, we foster a truly global learning environment where every student can thrive, connect, and achieve their full potential.
        </p>
      </div>

   

      {/* General Entry Criteria Section - Accordion */}
      <div className=" ">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Accordion Header */}
          <button
            onClick={toggleAccordion}
            className="w-full flex items-center justify-between px-6 py-8 text-left focus:outline-none transition-colors"
            aria-expanded={isOpen}
            aria-controls="accordion-content"
          >
            <h2 className="text-base font-normal text-blue-400 ">General Entry Criteria</h2>
            <svg
              className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Accordion Content */}
          <div
            id="accordion-content"
            className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          >
            <div className="px-6 pb-6 text-gray-800">
              <p className="text-lg font-semibold mb-6">
                To enrol in the Level 7 Diploma in Health and Social Care, you should meet the following criteria:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-base">
                <li>A Level 6 Diploma or equivalent qualification</li>
                <li>
                  A bachelor&apos;s degree in a different discipline and a desire to pursue a career in health and social care.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSocialCareDiplomaPage;