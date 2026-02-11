import React from "react";
import AccreditationImage from "./Accreditation";
import Seo from "@/component/common/Seo";


// Example FAQ data for accreditation partners
const acc = [
  {
    question: "What is accreditation?",
    answer: "Accreditation is a process of validation in which colleges, universities and other institutions of higher learning are evaluated.",
  },
  {
    question: "Who are the accreditation partners?",
    answer: "Our accreditation partners are recognized organizations that ensure the quality of our programs.",
  },
];

const accreditation = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: acc.map((f: any) => ({
    "@type": "Question",
    name: f.question || f.title || "",
    acceptedAnswer: {
      "@type": "Answer",
      text: (f.answer || f.description || "").replace(/<[^>]*>/g, ""),
    },
  })),
};


const Page = () => {
  return (
    <div>
   <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(accreditation),
      }}
    />
      <Seo pageKey="accreditation-partners" />

      <AccreditationImage />
    </div>
  );
};

export default Page;
