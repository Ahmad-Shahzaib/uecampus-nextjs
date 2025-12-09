import React from "react";
import AccreditationImage from "./Accreditation";
import Seo from "@/component/common/Seo";

const Page = () => {
  return (
    <div>
      <Seo pageKey="accreditation-partners" />

      <AccreditationImage />
    </div>
  );
};

export default Page;
