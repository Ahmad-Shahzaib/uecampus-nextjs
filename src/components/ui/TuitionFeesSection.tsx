'use client';

import React, { useState } from 'react';

const TuitionFeesSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordions = [
    { title: 'Full Payment Upfront', content: 'Detailed pricing and benefits for full upfront payment will appear here.' },
    { title: 'Semi-Annual Installments', content: 'Information on semi-annual payment plans, including amounts and schedules.' },
    { title: 'Quarterly Installments', content: 'Quarterly payment options with flexible terms to suit your budget.' },
  ];

  return (
    <div className=" ">
      {/* Main Content Section */}
      <div className=" ">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-lg leading-relaxed text-gray-800">
            We offer transparent and competitive tuition fees designed to make quality education accessible to students from around the world. Our fee structure is crafted to provide value while supporting your academic journey, ensuring you can focus on learning and personal growth without financial uncertainty.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {accordions.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none hover:bg-purple-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`accordion-content-${index}`}
              >
                <h2 className="text-xl font-normal ">{item.title}</h2>
                <svg
                  className={`w-6 h-6  transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Accordion Content */}
              <div
                id={`accordion-content-${index}`}
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
              >
                <div className="px-6 pb-6 pt-2 text-gray-700">
                  <p>{item.content}</p>
                  {/* Add more details, pricing tables, or lists here as needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TuitionFeesSection;