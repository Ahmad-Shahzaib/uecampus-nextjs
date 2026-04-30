import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | UECampus",
  description:
    "Thank you for your enquiry. Our admissions team will reach out to you shortly.",
};

const ThankYouPage = () => {
  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#6A1B9A]/10 rounded-full p-4">
            <CheckCircle2 className="h-14 w-14 text-[#6A1B9A]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#6A1B9A] mb-4">
          Thank You!
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Your enquiry has been submitted successfully. Our admissions team will
          reach out to you shortly to help you take the next step in your
          learning journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-[#6A1B9A] hover:bg-purple-800 text-white px-8 py-5 rounded-full w-full sm:w-auto"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#6A1B9A] text-[#6A1B9A] hover:bg-purple-50 px-8 py-5 rounded-full w-full sm:w-auto"
          >
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
