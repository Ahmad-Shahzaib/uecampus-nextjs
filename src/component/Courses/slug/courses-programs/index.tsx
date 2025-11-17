"use client";
import { Card } from "@/components/ui/card";
import { RootState } from "@/redux/rootReducer";
import { useSelector } from "@/redux/store";
import { useMemo, useState } from "react";

const fallbackBenefits = [
  "Comprehensive Foundation",
  "Flexible Learning",
  "One-on-One Tutor Support",
  "Globally Recognised Qualification",
  "Assessment-Based Structure",
  "Accelerated Completion",
  "Affordable and Accessible",
];

export default function ProgramPage() {
  const { data } = useSelector((state: RootState) => state.detailCourse);
  const courseTables = useMemo(
    () => data?.course?.course_table ?? [],
    [data?.course?.course_table]
  );

  const tabs = useMemo(
    () =>
      courseTables.map((table) => ({
        id: String(table.id),
        title: table.title,
        content: table.content,
      })),
    [courseTables]
  );

  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);

  const activeTabId = useMemo(() => {
    if (!tabs.length) {
      return "";
    }

    if (selectedTabId && tabs.some((tab) => tab.id === selectedTabId)) {
      return selectedTabId;
    }

    return tabs[0].id;
  }, [tabs, selectedTabId]);

  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  const paymentContent = useMemo(() => {
    return (
      data?.course?.course_structures?.find(
        (structure) => structure.payment_content
      )?.payment_content ?? null
    );
  }, [data?.course?.course_structures]);

  function autoEmbedHTML(content: string | null | undefined) {
    if (!content) return "";

    let updated = content;

    // --- Image URLs ---
    updated = updated.replace(
      /(https?:\/\/[^\s"']+\.(png|jpg|jpeg|gif|webp))/gi,
      `<img src="$1" class="w-full rounded-lg my-4" />`
    );

    // --- Video URLs ---
    updated = updated.replace(
      /(https?:\/\/[^\s"']+\.(mp4|mov|webm|ogg))/gi,
      `<video src="$1" controls class="w-full rounded-lg my-4"></video>`
    );

    // --- YouTube link ---
    updated = updated.replace(
      /(https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s"']+)/gi,
      (url) => {
        let videoId = "";

        // youtube.com/watch?v=xxxx
        if (url.includes("watch?v=")) {
          videoId = url.split("watch?v=")[1].split("&")[0];
        }
        // youtu.be/xxxx
        else if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0];
        }

        return `
        <iframe
          class="w-full h-64 rounded-lg my-4"
          src="https://www.youtube.com/embed/${videoId}"
          allowfullscreen
        ></iframe>
      `;
      }
    );

    return updated;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Bar - Horizontal on large screens, scrollable on mobile */}
      {tabs.length > 0 && (
        <nav className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex items-center gap-6 sm:gap-8 py-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTabId(tab.id)}
                    className={`text-sm font-medium pb-2 border-b-2 transition-colors shrink-0 ${
                      activeTabId === tab.id
                        ? "text-[#6a1b9a] border-purple-600"
                        : "text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-300"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content (full width on mobile) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {tabs.length ? (
              <article
                className="prose lg:prose-lg max-w-none  text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: autoEmbedHTML(activeTabContent ?? ""),
                }}
              />
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Programme information coming soon
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  We&apos;re preparing detailed course content. Please check
                  back soon for the latest overview, admissions, and curriculum
                  information.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Benefits Card (top on mobile, sticky on large) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="bg-gray-900 border-0 rounded-xl p-6 sm:p-8 text-white sticky top-20 lg:top-8">
              {paymentContent ? (
                <div
                  className="prose prose-invert max-w-none text-white"
                  dangerouslySetInnerHTML={{ __html: paymentContent }}
                />
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-medium text-lg sm:text-xl mb-2">
                      Programme Highlight
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      Key Benefits
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {fallbackBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-white font-bold mt-1">•</span>
                        <span className="text-white font-medium text-sm sm:text-base">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
