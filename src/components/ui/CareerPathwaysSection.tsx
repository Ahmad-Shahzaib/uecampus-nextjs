'use client';

import React from 'react';

const CareerPathwaysSection: React.FC = () => {
  return (
    <div className=" ">
      {/* Main Content Section */}
      <div className=" ">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Graduates of the Level 7 Diploma in Health and Social Care are well-prepared for senior leadership and management roles, such as:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-800 text-base mb-8">
            <li>Healthcare Manager</li>
            <li>Social Care Manager</li>
            <li>Policy Analyst</li>
            <li>Health Service Director</li>
            <li>Community Health Leader</li>
          </ul>
          <p className="text-lg leading-relaxed text-gray-800">
            Our <strong>Career Services Centre</strong> provide focused support with CV reviews, interview preparation, and career guidance to help graduates confidently advance their careers. This diploma equips students with advanced knowledge and skills to lead and innovate in health and social care sectors, offering pathways to senior roles or further study at Master&apos;s level.
          </p>
        </div>

        {/* Optional: Subtle note if needed (matches "No accordion items found for Career.") */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          No accordion items found for Career.
        </p>
      </div>
    </div>
  );
};

export default CareerPathwaysSection;