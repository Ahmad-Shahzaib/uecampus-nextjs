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
  email: string;
  phone: string;
  program: string[];
  specializations: string[];
  university: string[];
  academicYear: string;
}

export function ScholarshipForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    program: [],
    specializations: [],
    university: [],
    academicYear: "",
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
    <main className=" bg-gradient-to-br from-purple-50 to-indigo-100 flex  p-4 md:p-8">
      <div className="w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white h-[680px] ">
          {/* Left Side - Image (50% width) */}
          <div className="relative h-64 lg:h-full">
            <img
              src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-9.jpg"
              alt="Student with books"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
          </div>

          {/* Right Side - Form (50% width + scrollable) */}
          <div className="bg-gradient-to-b from-[#6A1B9A] to-purple-800 p-6 md:p-8 overflow-y-auto lg:max-h-screen">
            <div className="">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-white lg:text-4xl md:text-2xl font-semibold leading-tight">
                  Enquire Today & Get a Scholarship Discount!
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                {/* First Name */}
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
                {/* last name  */}
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

                {/*  DOB */}
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
                {/* Program Interested - Scrollable */}
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
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
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

                {/* Specializations - Scrollable */}
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
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                        />
                        <label
                          htmlFor={`spec-${spec}`}
                          className="text-white text-xs md:text-sm cursor-pointer leading-tight"
                        >
                          {spec}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* University Interested In */}
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
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
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

                {/* Joining Academic Year */}
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
                          <RadioGroupItem
                            value={year}
                            id={`year-${year}`}
                            className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                          />
                          <Label
                            htmlFor={`year-${year}`}
                            className="text-white text-xs md:text-sm cursor-pointer font-normal"
                          >
                            {year}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* text area */}
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
                <div>
                  <p className="text-white py-1 text-xs md:text-sm">
                    UeCampus is committed to protecting and respecting your
                    privacy, and we’ll only use your personal information to
                    administer your account and to provide the products and
                    services you requested from us. From time to time, we would
                    like to contact you about our products and services, as well
                    as other content that may be of interest to you. If you
                    consent to us contacting you for this purpose, please tick
                    below to say how you would like us to contact you:
                  </p>
                  <Checkbox
                    id="consent-email"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                  />
                  <label
                    htmlFor="consent-email"
                    className="text-white text-xs md:text-sm cursor-pointer ml-2"
                  >
                    I agree to receive other communications from UeCampus.
                  </label>
                  <p className="text-white py-1 text-xs md:text-sm">
                    You can unsubscribe from these communications at any time.
                    For more information on how to unsubscribe, our privacy
                    practices, and how we are committed to protecting and
                    respecting your privacy, please review our Privacy Policy.
                    By clicking submit below, you consent to allow UeCampus to
                    store and process the personal information submitted above
                    to provide you the content requested.
                  </p>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9 text-xs md:text-sm"
                  >
                    <Facebook className="w-4 h-4 mr-1" />
                    Facebook
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-900 h-9 text-xs md:text-sm"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Google
                  </Button>
                </div>

                {/* Submit */}
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
