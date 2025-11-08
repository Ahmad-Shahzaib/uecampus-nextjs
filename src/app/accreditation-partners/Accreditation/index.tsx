"use client";

import CircularImage from "@/component/about-us/Banner/CommonImage";
import React, { useEffect } from "react";
import InternationalPartnerships from "./common/InternationalPartnerships";
import JoinUs from "@/component/joinus";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccreditationData } from "@/redux/thunk/accreditationThunk";
import { fetchInternationalPartnershipData } from "@/redux/thunk/internationalPartnershipThunk";
import { RootState } from "@/redux/rootReducer";
import AccreditationBanner from "./AccreditationBanner";
import EducationCards from "@/component/educationcard/EducationCards";
import { AppDispatch } from "@/redux/store"; // Import AppDispatch type

const AccreditationImage = () => {
  // Use the typed dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { data: accreditationData, isLoading: accreditationLoading, error: accreditationError } = useSelector(
    (state: RootState) => state.accreditation
  );
  const { data: partnershipData, isLoading: partnershipLoading, error: partnershipError } = useSelector(
    (state: RootState) => state.internationalPartnership
  );

  useEffect(() => {
    dispatch(fetchAccreditationData());
    dispatch(fetchInternationalPartnershipData());
  }, [dispatch]);

  // Handle loading states
  if (accreditationLoading || partnershipLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading data...</div>
      </div>
    );
  }

  // Handle error states
  if (accreditationError || partnershipError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">
          Error: {accreditationError || partnershipError}
        </div>
      </div>
    );
  }

  // Transform partnership data for InternationalPartnerships component
  const partnershipFeatures = partnershipData ? [
    {
      title: partnershipData.feature1_title,
      description: partnershipData.feature1_description,
    },
    {
      title: partnershipData.feature2_title,
      description: partnershipData.feature2_description,
    },
    {
      title: partnershipData.feature3_title,
      description: partnershipData.feature3_description,
    }
  ] : [];

  return (
    <div>
      <div className="m-5 rounded-2xl">
        <AccreditationBanner
          imageUrl={accreditationData?.hero_image || ""} // Pass empty string if no image
          title={accreditationData?.title || "Accreditation & Partners"}
        />
      </div>
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <CircularImage imageUrl={partnershipData?.hero_image || ""} />
        <InternationalPartnerships 
          title={partnershipData?.title || "About Our International Partnerships"}
          description={partnershipData?.description || "International cooperation is at the core of our educational mission. We collaborate with top universities and institutions worldwide to provide diverse educational opportunities and foster global citizenship."}
          features={partnershipFeatures}
        />
      </div>
       <div className="py-4">
        <EducationCards/>
      </div>
      <div className="py-4">
        <JoinUs />
      </div>
    </div>
  );
};

export default AccreditationImage;