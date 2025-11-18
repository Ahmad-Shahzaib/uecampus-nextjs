"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchHowToApplyData } from "@/redux/thunk/howToApply";

export function CTACard() {
  const dispatch = useDispatch<AppDispatch>();
const { data, isLoading, error } = useSelector((state: RootState) => state.howToApply);

  useEffect(() => {
    dispatch(fetchHowToApplyData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl max-w-md w-full text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl max-w-md w-full text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl max-w-md w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-900 text-center">
          {data?.sectionTitle2}
        </h2>
      </div>

      {/* Description */}
      <p className="text-center text-gray-700 mb-8 text-sm sm:text-base">
        {data?.sectionDescription2}
      </p>

      {/* Buttons */}
      <div className="space-y-4">
        {data.buttonName && (
          <Button
            className="w-full bg-black border-0 hover:bg-gray-900 text-white font-semibold py-5 sm:py-6 text-base rounded transition-colors"
            onClick={() => window.open(data.buttonLink || "#",)}
          >
            {data.buttonName}
          </Button>
        )}

        {data.buttonName2 && (
          <Button
            variant="outline"
            className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-100 font-semibold py-5 sm:py-6 text-base rounded transition-colors bg-transparent"
            onClick={() => window.open(data.buttonLink2 || "#")}
          >
            {data.buttonName2}
          </Button>
        )}
      </div>
    </div>
  );
}
