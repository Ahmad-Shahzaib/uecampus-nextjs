"use client";

import React, { useState, ChangeEvent, FormEvent, JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useDispatch } from "@/redux/store";
import { fetchProgramsData, ProgramType, University, AcademicYear } from "@/redux/thunk/programsThunk";
import { sendEnquiry } from "@/redux/thunk/enquiryThunk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  program: number | null;
  programType: number | null;
  university: number | null;
  // store academic year id when selected from dropdown
  academicYear: number | null;
  additionalInfo: string;
}

export function ScholarshipForm(): JSX.Element {
  const dispatch = useDispatch();
  const programsData = useSelector((state: RootState) => state.programs.data);

  // Define initial form data
  const initialFormData: FormData = {
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    program: null,
    programType: null,
    university: null,
    academicYear: null,
    additionalInfo: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    // If there's no programs data OR academicYears is empty/missing,
    // re-fetch so the select can populate. Persisted store may have
    // an older shape without academicYears, so check the array too.
    const needsFetch =
      !programsData || !(Array.isArray(programsData.academicYears) && programsData.academicYears.length > 0);
    if (needsFetch) dispatch(fetchProgramsData());

    // Debug: show what arrived from the store in the browser console
    // (remove this once verified)
    // eslint-disable-next-line no-console
    console.log("programsData (enquire-now):", programsData);
  }, [dispatch, programsData]);

  // Options from store (fallback to empty arrays)
  // prefer actual `programs` (id + name) from `/programs` if available;
  // otherwise fall back to `programTypes` returned from filters
  const programOptions: ProgramType[] = programsData?.programs ?? programsData?.programTypes ?? [];
  const specializationOptions: ProgramType[] = programsData?.programTypes ?? [];
  const universityOptions: University[] = programsData?.universities ?? [];
  const academicyearOptions: AcademicYear[] = programsData?.academicYears ?? [];

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const nameKey = e.target.name as keyof FormData;
    const parsed = e.target.value ? Number(e.target.value) : null;
    setFormData((prev) => ({ ...prev, [nameKey]: parsed } as unknown as FormData));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const payload = {
      full_name: formData.fullName,
      last_name: formData.lastName,
      email: formData.email,
      number: formData.phone,
      dob: formData.dob,
      program_id: formData.program,
      program_type_id: formData.programType,
      university_id: formData.university,
      // send the academic year name (string) — fallback to id string if name not found
      joining_academic_year: formData.academicYear
        ? (academicyearOptions.find((y) => y.id === formData.academicYear)?.name || String(formData.academicYear))
        : "",
      Info: formData.additionalInfo,
    };

    try {
      const result = await dispatch(sendEnquiry(payload));
      console.log("Enquiry result:", result);

      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (err) {
      console.error("Failed to send enquiry", err);
    }
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
          <div className="bg-linear-to-b from-[#6A1B9A] to-purple-800 p-6 md:p-8 lg:overflow-y-auto lg:h-full">
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

                {/* Program Interested (select from API) */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Program Interested
                  </label>
                  <select
                    name="program"
                    aria-label="Program Interested"
                    value={formData.program ?? ""}
                    onChange={handleSelectChange}
                    className={`w-full rounded-md p-2 text-sm ${formData.program ? 'text-white ' : 'text-gray-900 bg-white'}`}
                  >
                    <option value="" className="text-gray-900">Select program</option>
                    {programOptions.map((prog: ProgramType) => (
                      <option key={prog.id} value={prog.id} className="text-gray-900">
                        {prog.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Specializations / Program Type (select) */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Specializations
                  </label>
                  <select
                    name="programType"
                    aria-label="Specializations"
                    value={formData.programType ?? ""}
                    onChange={handleSelectChange}
                    className={`w-full rounded-md p-2 text-sm ${formData.programType ? 'text-white ' : 'text-gray-900 bg-white'}`}
                  >
                    <option value="" className="text-gray-900">Select specialization</option>
                    {specializationOptions.map((spec: ProgramType) => (
                      <option key={spec.id} value={spec.id} className="text-gray-900">
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University Interested In (select) */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    University Interested In
                  </label>
                  <select
                    name="university"
                    aria-label="University Interested In"
                    value={formData.university ?? ""}
                    onChange={handleSelectChange}
                    className={`w-full rounded-md p-2 text-sm ${formData.university ? 'text-white ' : 'text-gray-900 bg-white'}`}
                  >
                    <option value="" className="text-gray-900">Select university</option>
                    {universityOptions.map((uni: University) => (
                      <option key={uni.id} value={uni.id} className="text-gray-900">
                        {uni.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Academic Year (select from dynamic API) */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Joining Academic Year
                  </label>
                  <select
                    name="academicYear"
                    aria-label="Joining Academic Year"
                    value={formData.academicYear ?? ""}
                    onChange={handleSelectChange}
                    className={`w-full rounded-md p-2 text-sm ${formData.academicYear ? 'text-white ' : 'text-gray-900 bg-white'}`}
                  >
                    <option value="" className="text-gray-900">Select academic year</option>
                    {academicyearOptions.map((year: AcademicYear) => (
                      <option key={year.id} value={year.id} className="text-gray-900">
                        {year.name}
                      </option>
                    ))}
                  </select>
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
                  className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold h-11 text-sm md:text-base mt-4 shadow-lg"
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