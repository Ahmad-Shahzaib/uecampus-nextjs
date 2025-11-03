'use client';

import React, { useState } from 'react';

const HealthSocialCarePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* Main Content Section */}
      <div className=" ">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-lg leading-relaxed text-gray-800 mb-6">
            Our Level 7 Diploma in Health and Social Care covers a range of essential subjects, including:
          </p>
          <p className="text-lg leading-relaxed text-gray-800 mb-6">
            Upon successful completion, you will receive the <strong>Level 7 Diploma in Health and Social Care</strong>, awarded by Qualifi (UK). This Ofqual-regulated qualification demonstrates your ability to lead, manage, and innovate in the health and social care sector. It also provides a direct route to:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-800 text-base mb-6">
            <li>Senior or management roles in healthcare and community organisations</li>
            <li>Further study at the Master&apos;s level (e.g., MBA, MSc Health Management)</li>
            <li>Professional development and sector-specific specialisations</li>
          </ul>
        </div>

     

        {/* Units Accordion */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Accordion Header */}
            <button
              onClick={toggleAccordion}
              className="w-full flex items-center justify-end px-6 py-4 text-left focus:outline-none hover:bg-purple-50 transition-colors"
              aria-expanded={isOpen}
              aria-controls="units-accordion-content"
            >
              <svg
                className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Accordion Content - Table */}
            <div
              id="units-accordion-content"
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
            >
              <div className="lg:px-6 pb-8 sm:px-2 ">
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">S/N</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">Unit Name</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-300">UK Credit (RQF) 120</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">European Credit (ECTS) 60</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">1</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Health and Social Care Leadership</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">2</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Managing Finance in Health and Social Care</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">3</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Managing Finance in Health and Social Care</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">4</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Health and Social Care Strategies and Policies</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">5</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Leading Change in Health and Social Care</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">6</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-r border-gray-300">Research Methods for Healthcare Professionals</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800 border-r border-gray-300">20</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-800">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSocialCarePage;