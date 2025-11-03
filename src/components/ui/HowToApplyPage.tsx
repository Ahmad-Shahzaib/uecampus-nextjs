'use client';

import React from 'react';

const HowToApplyPage: React.FC = () => {
  return (
    <div className=" ">
      {/* Main Content Section */}
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
        

          {/* YouTube Video Embed */}
          <div className=" w-full h-96 mx-auto">
            <iframe
              className="w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual "How to Apply" video URL
              title="How to Apply - Level 7 Diploma in Health and Social Care"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default HowToApplyPage;