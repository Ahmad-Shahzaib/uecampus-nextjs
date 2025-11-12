// src/component/about-us/Banner.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchScholarshipData } from "@/redux/thunk/scholarship";
import { RootState } from "@/redux/rootReducer";

interface BannerProps {
  imageUrl?: string;
  title?: string;
}

const Banner = () => {
  const dispatch = useDispatch();
  
  const scholarshipData = useSelector((state: RootState) => state.scholarship?.data);
  const isLoading = useSelector((state: RootState) => state.scholarship?.isLoading);
  const error = useSelector((state: RootState) => state.scholarship?.error);

  useEffect(() => {
    if (!scholarshipData && !isLoading) {
      dispatch(fetchScholarshipData());
    }
  }, [dispatch, scholarshipData, isLoading]);

  const imageUrl = scholarshipData?.backgroundImage ||  "";
  const title = scholarshipData?.leftSectionTitle || "";

  if (isLoading) {
    return (
      <div className="relative rounded-2xl w-full h-[40vh] bg-gray-200 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative rounded-2xl w-full h-[40vh] bg-red-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-2xl w-full h-[40vh] bg-cover bg-center flex items-center justify-start text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute rounded-2xl inset-0 bg-black/50"></div>
      <h1 className="relative text-5xl md:text-7xl font-semibold drop-shadow-lg lg:pl-10 pl-4 ">
        {title}
      </h1>
    </div>
  );
};

export default Banner;