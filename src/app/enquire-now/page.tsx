import StatsCards from "@/component/common/StatsCards";
import { ScholarshipForm } from "@/component/enquire-now";
import JoinUs from "@/component/joinus";
import React from "react";

const page = () => {
  return (
    <div>
      <ScholarshipForm />
      <div className=" px-4 sm:px-6  my-8">
        <StatsCards />
      </div>
      <div>
        <JoinUs />
      </div>
    </div>
  );
};

export default page;
