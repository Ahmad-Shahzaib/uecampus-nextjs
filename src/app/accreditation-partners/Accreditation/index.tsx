"use client";

import Banner from "@/component/about-us/Banner";
import CircularImage from "@/component/about-us/Banner/CommonImage";
import React, { useEffect } from "react";
import InternationalPartnerships from "./common/InternationalPartnerships";
import JoinUs from "@/component/joinus";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccreditationData } from "@/redux/thunk/accreditationThunk";
import { RootState } from "@/redux/rootReducer";
import AccreditationBanner from "./AccreditationBanner";

const AccreditationImage = () => {
  const dispatch = useDispatch();
  const { data: accreditationData, isLoading, error } = useSelector(
    (state: RootState) => state.accreditation
  );

  useEffect(() => {
    dispatch(fetchAccreditationData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading accreditation data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="m-5 rounded-2xl">
        <AccreditationBanner
          imageUrl={accreditationData?.hero_image || ""}
          title={accreditationData?.title || "Accreditation & Partners"}
        />
      </div>
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <CircularImage imageUrl="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-10.jpg" />
        <InternationalPartnerships />
      </div>
      <div className="py-4">
        <JoinUs />
      </div>
    </div>
  );
};

export default AccreditationImage;