import Banner from "@/component/about-us/Banner";
import CircularImage from "@/component/about-us/Banner/CommonImage";
import React from "react";
import InternationalPartnerships from "./common/InternationalPartnerships";
import JoinUs from "@/component/joinus";

const AccreditationImage = () => {
  return (
    <div>
      <div className="m-5 rounded-2xl">
        <Banner
          imageUrl="	https://newwebsite.uecampus.com/wp-content/uploads/2025/08/thumbnail-3.jpg"
          title="Accreditation & Partners"
        />
      </div>
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <CircularImage imageUrl="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-10.jpg" />
        <InternationalPartnerships />
      </div>
      <div className="py-4" >
        <JoinUs />
      </div>
    </div>
  );
};

export default AccreditationImage;
