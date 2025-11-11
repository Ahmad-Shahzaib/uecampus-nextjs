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
    if (!data) {
      dispatch(fetchEducationCardsData());
    }
  }, [dispatch, data]);

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
      <div className="flex justify-center items-center ">
        <div className="text-xl text-white">No partners found.</div>
      </div>
    );

  return (
    <div className="  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 px-4 py-8 text-center md:px-6 lg:px-8">
          <h1 className="font-semibold text-[#6a1b9a] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Our Academic Partners
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our partners are at the heart of UeCampus’s commitment to delivering
            quality education. We collaborate with reputable universities and
            educational institutions worldwide to co-create and validate our
            programs, ensuring they meet the highest academic standards.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((partner: any) => (
            <div
              key={partner.id}
              className="bg-[#181818] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6"
            >
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <img
                  src={partner.logo}
                  alt={partner.title}
                  className="h-48 rounded object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `<span class='text-purple-500 font-bold text-3xl'>${partner.title.charAt(
                      0
                    )}</span>`;
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{partner.title}</h3>

              {/* Description */}
              <div
                className="text-sm text-gray-300 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: partner.content }}
              />

              {/* Button */}
              <Button className="w-full mt-auto bg-[#6A1B9A] text-white border-0 hover:text-black  py-2.5 rounded-lg font-semibold transition-colors duration-300">
                {partner.button_name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCards;
