"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Facebook, Mail } from "lucide-react";

interface FormData {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  program: string[];
  specializations: string[];
  university: string[];
  academicYear: string;
  additionalInfo: string;
}

export function ScholarshipForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    program: [],
    specializations: [],
    university: [],
    academicYear: "",
    additionalInfo: "",
  });

  // Options
  const programOptions: string[] = ["Diploma", "BBA", "MBA", "DBA", "PhD"];
  const specializationOptions: string[] = [
    "Marketing",
    "International Business",
    "Human Resource",
    "Accounting & Finance",
    "Information Technology",
    "Cyber Security",
    "Data Analytics",
  ];
  const universityOptions: string[] = [
    "Qualifi Diplomas",
    "PPA Business School",
    "Walsh College",
  ];
  const academicYearOptions: string[] = [
    "March 2025",
    "September 2025",
    "January 2026",
    "March 2026",
    "September 2026",
  ];

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter((item) => item !== value)
        : [...(prev[field] as string[]), value],
    }));
  };

  const handleRadioChange = (value: string): void => {
    setFormData((prev) => ({ ...prev, academicYear: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-indigo-100 flex p-4 md:p-8">
      <div className="w-full">
        {/* Modified grid container: removed fixed height on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white lg:h-[680px]">
          {/* Left Side - Image */}
          <div className="relative h-64 lg:h-full">
            <img
              src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-9.jpg"
              alt="Student with books"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
          </div>

          {/* Right Side - Form */}
          {/* Modified: removed height constraints and overflow on mobile */}
          <div className="bg-gradient-to-b from-[#6A1B9A] to-purple-800 p-6 md:p-8 lg:overflow-y-auto lg:h-full">
            <div>
              <div className="mb-6">
                <h1 className="text-white lg:text-4xl md:text-2xl font-semibold leading-tight">
                  Enquire Today & Get a Scholarship Discount!
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                {/* Full Name */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your First name"
                    className="w-full bg-white text-gray-900 border-0 h-10 text-sm"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Your Last name"
                    className="w-full bg-white text-gray-900 border-0 h-10 text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-white text-gray-900 border-0 h-10 text-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+123 456 7890"
                    className="w-full bg-white text-gray-900 border-0 h-10 text-sm"
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 border-0 h-10 text-sm"
                    required
                  />
                </div>

                {/* Program Interested */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Program Interested
                  </label>
                  <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto border border-purple-400/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-900">
                    {programOptions.map((prog) => (
                      <div key={prog} className="flex items-center space-x-2">
                        <Checkbox
                          id={`prog-${prog}`}
                          checked={formData.program.includes(prog)}
                          onCheckedChange={() =>
                            handleCheckboxChange("program", prog)
                          }
                        />
                        <label
                          htmlFor={`prog-${prog}`}
                          className="text-white text-xs md:text-sm cursor-pointer"
                        >
                          {prog}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Specializations
                  </label>
                  <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto border border-purple-400/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-900">
                    {specializationOptions.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spec-${spec}`}
                          checked={formData.specializations.includes(spec)}
                          onCheckedChange={() =>
                            handleCheckboxChange("specializations", spec)
                          }
                        />
                        <label
                          htmlFor={`spec-${spec}`}
                          className="text-white text-xs md:text-sm cursor-pointer"
                        >
                          {spec}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* University Interested */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    University Interested In
                  </label>
                  <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto border border-purple-400/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-900">
                    {universityOptions.map((uni) => (
                      <div key={uni} className="flex items-center space-x-2">
                        <Checkbox
                          id={`uni-${uni}`}
                          checked={formData.university.includes(uni)}
                          onCheckedChange={() =>
                            handleCheckboxChange("university", uni)
                          }
                        />
                        <label
                          htmlFor={`uni-${uni}`}
                          className="text-white text-xs md:text-sm cursor-pointer"
                        >
                          {uni}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Joining Academic Year
                  </label>
                  <RadioGroup
                    value={formData.academicYear}
                    onValueChange={handleRadioChange}
                  >
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto border border-purple-400/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-900">
                      {academicYearOptions.map((year) => (
                        <div key={year} className="flex items-center space-x-2">
                          <RadioGroupItem value={year} id={`year-${year}`} />
                          <Label
                            htmlFor={`year-${year}`}
                            className="text-white text-xs md:text-sm cursor-pointer"
                          >
                            {year}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    className="w-full bg-white rounded-2xl text-gray-900 border-0 h-24 p-2 text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-white text-purple-700 hover:bg-gray-100 font-bold h-11 text-sm md:text-base mt-4 shadow-lg"
                >
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}