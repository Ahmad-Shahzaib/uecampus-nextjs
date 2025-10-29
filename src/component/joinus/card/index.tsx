"use client"

import { Button } from "@/components/ui/button"

export function CTACard() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl max-w-md w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-900 text-center">
          Open Intake, Apply Anytime!
        </h2>
      </div>

      {/* Description */}
      <p className="text-center text-gray-700 mb-8 text-sm sm:text-base">
        Enquire today or contact our admissions team
      </p>

      {/* Buttons */}
      <div className="space-y-4">
        <Button
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-5 sm:py-6 text-base rounded-xl transition-colors"
          onClick={() => console.log("Enquire Now clicked")}
        >
          Enquire Now
        </Button>

        <Button
          variant="outline"
          className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-100 font-semibold py-5 sm:py-6 text-base rounded-xl transition-colors bg-transparent"
          onClick={() => console.log("Book A Meeting clicked")}
        >
          Book A Meeting
        </Button>
      </div>
    </div>
  )
}
