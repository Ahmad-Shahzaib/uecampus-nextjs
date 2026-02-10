"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchEducationCardsData } from "@/redux/thunk/educationCardsThunk";
import { Button } from "@/components/ui/button";

const EducationCards = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.educationCards
  );

  useEffect(() => {
    // Always fetch to ensure we have fresh data
    dispatch(fetchEducationCardsData());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-white">Loading partners...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-white">No partners found.</div>
      </div>
    );

  // console.log("Rendering partners:", data.length, data);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 ">
      <div className="w-full mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 px-4 py-8 text-center md:px-6 lg:px-8">
          <h1 className="font-medium text-[#6a1b9a] text-2xl sm:text-3xl md:text-4xl lg:text-[90px] lg:font-normal">
            Our Academic Partners
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-700  mx-auto leading-relaxed">
            Our partners are at the heart of UeCampus's commitment to delivering
            quality education. We collaborate with reputable universities and <br />
            educational institutions worldwide to co-create and validate our
            programs, ensuring they meet the highest academic standards.
          </p>
        </div>
        
        {/* Card grid - shows all partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#181818] py-4  px-4 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Logo container */}
              <div className="flex justify-center pt-5 pb-8">
                <img
                  src={partner.logo}
                  alt={partner.title}
                  loading="lazy" 
                  className="h-32 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* Content container */}
              <div className="flex text-left flex-col flex-grow px-6 pb-6 text-center">
                {/* Title */}
                <h1 className="text-xl font-semibold mb-3">{partner.title}</h1>

                {/* Description */}
                <div
                  className=" text-white font-normal text-base mb-6 leading-relaxed flex-grow"
                  dangerouslySetInnerHTML={{ __html: partner.content }}
                />

                {/* Button */}
                {partner.link ? (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="canonical"
                    className="w-full"
                  >
                    <Button className="w-full bg-[#6A1B9A] text-white border-0 hover:bg-white hover:text-[#5a1782] py-3 rounded-lg font-semibold transition-colors duration-300">
                      {partner.button_name}
                    </Button>
                  </a>
                ) : (
                  <Button className="w-full bg-[#6A1B9A] text-white border-0 hover:bg-white hover:text-[#5a1782] py-3 rounded-lg font-semibold transition-colors duration-300">
                    {partner.button_name}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCards;