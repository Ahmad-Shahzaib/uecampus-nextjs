"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CareerPathwaysSection from "@/components/ui/CareerPathwaysSection";
import HealthSocialCareDiplomaPage from "@/components/ui/HealthSocialCareDiplomaPage";
import HealthSocialCarePage from "@/components/ui/HealthSocialCarePage";
import HowToApplyPage from "@/components/ui/HowToApplyPage";
import TuitionFeesSection from "@/components/ui/TuitionFeesSection";
import { useState } from "react";

export default function ProgramPage() {
  const tabs = [
    "OVERVIEW",
    "ADMISSIONS",
    "ACADEMICS",
    "TUITION & FINANCING",
    "CAREER",
    "HOW TO APPLY",
  ];
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const benefits = [
    "Comprehensive Foundation",
    "Flexible Learning",
    "One-on-One Tutor Support",
    "Globally Recognised Qualification",
    "Assessment-Based Structure",
    "Accelerated Completion",
    "Affordable and Accessible",
  ];

  const courses = [
    { id: 1, category: "Health & Social Care", title: "Level 7 Diploma" },
    { id: 2, category: "Business Management", title: "MBA Programme" },
    { id: 3, category: "Education", title: "PGCE Certificate" },
    { id: 4, category: "IT & Computing", title: "Cyber Security" },
  ];

  // Tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "OVERVIEW":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg">
                  Advance your career in the vital and rewarding field of{" "}
                  <span className="font-bold">Health and Social Care</span> with
                  our <span className="font-bold">Level 7 Diploma</span>,
                  designed for professionals seeking to develop leadership,
                  management, and policy expertise. Awarded by Qualifi, a
                  UK-based awarding body and regulated by{" "}
                  <span className="font-bold">Ofqual</span>, this
                  internationally recognised qualification provides a strong
                  academic and practical foundation for senior roles in health
                  and social care sectors.
                </p>

                <p className="text-gray-700 text-base sm:text-lg">
                  This 100% online programme equips learners with advanced
                  knowledge in health care management, strategic
                  decision-making, and evidence-based practice—empowering you to
                  make a real difference in the lives of individuals and
                  communities.
                </p>
              </div>
            </div>

            {/* Impact Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Make an Impact in Health and Social Care
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>
                    Become a catalyst for change in communities and care
                    systems.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-base sm:text-lg">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>
                    Apply today for the{" "}
                    <span className="font-bold text-purple-600">
                      Level 7 Diploma in Health and Social Care
                    </span>{" "}
                    and lead with compassion, strategy, and vision.
                  </span>
                </li>
              </ul>
            </div>

            {/* View Other Courses Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                View Other Courses
              </h2>
              <p className="text-gray-700 text-base sm:text-lg">
                Explore our wide range of online programs and advance your
                career
              </p>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-gray-900 border-0 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6 space-y-4">
                      {/* Badge */}
                      <Badge className="bg-white text-purple-600 hover:bg-white/90 w-fit rounded-full text-xs sm:text-sm">
                        {course.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {course.title}
                      </h3>

                      {/* Course Image */}
                      <div className="mt-4 rounded-lg overflow-hidden h-40">
                        <img
                          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                          alt="Course preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "ADMISSIONS":
        return (
          <div className="space-y-8">
            <HealthSocialCareDiplomaPage />
          </div>
        );

      case "ACADEMICS":
        return (
          <div className="space-y-8">
            <HealthSocialCarePage />
          </div>
        );

      case "TUITION & FINANCING":
        return (
          <div className="space-y-8">
            <TuitionFeesSection />
          </div>
        );

      case "CAREER":
        return (
          <div className="space-y-8">
            <CareerPathwaysSection />
          </div>
        );

      case "HOW TO APPLY":
        return (
          <div className="space-y-8">
            <HowToApplyPage />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Bar - Horizontal on large screens, scrollable on mobile */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex items-center gap-6 sm:gap-8 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors flex-shrink-0 ${
                    activeTab === tab
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content (full width on mobile) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {renderTabContent()}
          </div>

          {/* Right Column - Benefits Card (top on mobile, sticky on large) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="bg-gray-900 border-0 rounded-xl p-6 sm:p-8 text-white sticky top-20 lg:top-8">
              <div className="space-y-6">
                <div>
                  <p className="text-white font-medium text-lg sm:text-xl mb-2">
                    Programme Highlight
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold">Key Benefits</h3>
                </div>

                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-white font-bold mt-1">•</span>
                      <span className="text-white font-medium text-sm sm:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Optional: Hide scrollbar on mobile nav */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}