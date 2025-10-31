import { Card } from "@/components/ui/card";
import React from "react";
import { BookOpen, GraduationCap, FileText } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Step 1: Choose Your Course",
    description:
      "Browse our wide range of online programs and select the one that fits your goals.",
  },
  {
    icon: FileText,
    title: "Step 2: Fill Application Form",
    description:
      "Complete the online application form with your personal and academic details.",
  },
  {
    icon: GraduationCap,
    title: "Step 3: Start Learning",
    description:
      "Once enrolled, access your classes and start your learning journey immediately!",
  },
];

const ContactUsSection = () => {
  return (
    <div>
      <div className="py-8 px-6 rounded-2xl mb-10 ">
        {/* Section heading and description */}
        <h1 className="leading-[1.4] text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl">
          How to Apply in Our <br /> Course?
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Getting started with UeCampus is quick and easy. Follow our simple
          three-step <br /> process to begin your journey toward globally recognized
          online education.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <Card
                key={index}
                className="border bg-white py-5 px-6 shadow-none transition-transform
                 duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center justify-start rounded-lg bg-[#6A1B9A] w-11 p-3 ">
                  <FeatureIcon className="h-4 w-4 text-white" />
                </div>
                <div className="text-lg font-semibold text-[#6A1B9A] ">
                  {feature.title}
                </div>
                <div className="text-base text-gray-600">
                  {feature.description}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
