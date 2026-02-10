import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface InternationalPartnershipsProps {
  title?: string;
  description?: string;
  features?: Feature[];
}

const InternationalPartnerships = ({
  title = "About Our International Partnerships",
  description = "International cooperation is at the core of our educational mission. We collaborate with top universities and institutions worldwide to provide diverse educational opportunities and foster global citizenship.",
  features = [],
}: InternationalPartnershipsProps) => {
  // Default icons
  const defaultIcons = [
    // eslint-disable-next-line react/jsx-key
    <svg className="w-8 h-8 text-[#6a1b9a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>,
    // eslint-disable-next-line react/jsx-key
    <svg className="w-8 h-8 text-[#6a1b9a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
    </svg>,
    // eslint-disable-next-line react/jsx-key
    <svg className="w-8 h-8 text-[#6a1b9a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
    </svg>
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-6xl leading-tight font-medium text-[#6a1b9a] mb-4">
            {title}
          </h1>
          <p className="text-gray-700 text-base">{description}</p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                {defaultIcons[index] || defaultIcons[0]}
              </div>
              <h1 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h1>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalPartnerships;