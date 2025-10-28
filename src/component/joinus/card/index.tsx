"use client"

import { Button } from "@/components/ui/button"

export function CTACard() {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl max-w-md w-full">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-900 text-center">Open Intake, Apply Anytime!</h2>
      </div>

      {/* Card Description */}
      <p className="text-center text-gray-700 mb-8 text-sm md:text-base">
        Enquire today or contact our admissions team
      </p>

      {/* Buttons */}
      <div className="space-y-4">
        <Button
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-6 text-base rounded-lg transition-colors"
          onClick={() => console.log("Enquire Now clicked")}
        >
          Enquire Now
        </Button>

        <Button
          variant="outline"
          className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold py-6 text-base rounded-lg transition-colors bg-transparent"
          onClick={() => console.log("Book A Meeting clicked")}
        >
          Book A Meeting
        </Button>
      </div>
    </div>
  )
}
