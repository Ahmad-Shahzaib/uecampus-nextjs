"use client";
import React, { useState, ChangeEvent, FormEvent, JSX, useEffect, useRef } from "react";
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
  countryCode: string;
  dob: string;
  program: number | null;
  programType: number | null;
  university: number | null;
  academicYear: number | null;
  additionalInfo: string;
}

export function ScholarshipForm(): JSX.Element {
  const dispatch = useDispatch();
  const programsData = useSelector((state: RootState) => state.programs.data);

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  const initialFormData: FormData = {
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    dob: "",
    program: null,
    programType: null,
    university: null,
    academicYear: null,
    additionalInfo: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Fetch programs data if not loaded
  useEffect(() => {
    const needsFetch =
      !programsData ||
      !(Array.isArray(programsData.academicYears) && programsData.academicYears.length > 0);
    if (needsFetch) dispatch(fetchProgramsData());
  }, [dispatch, programsData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isCountryDropdownOpen) {
      setTimeout(() => countrySearchRef.current?.focus(), 100);
    }
  }, [isCountryDropdownOpen]);

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isCountryDropdownOpen) {
      setCountrySearch("");
    }
  }, [isCountryDropdownOpen]);

  // Data from Redux
  const programOptions: ProgramType[] = programsData?.programs ?? [];
  const specializationOptions: ProgramType[] = programsData?.programTypes ?? [];
  const universityOptions: University[] = programsData?.universities ?? [];
  const academicyearOptions: AcademicYear[] = programsData?.academicYears ?? [];

  // Country Codes with Flags (Fixed Pakistan flag)
  const countryCodes = [
    { code: "+1", country: "United States", flag: "US" },
    { code: "+44", country: "United Kingdom", flag: "GB" },
    { code: "+91", country: "India", flag: "IN" },
    { code: "+92", country: "Pakistan", flag: "PK" },
    { code: "+61", country: "Australia", flag: "AU" },
    { code: "+86", country: "China", flag: "CN" },
    { code: "+81", country: "Japan", flag: "JP" },
    { code: "+49", country: "Germany", flag: "DE" },
    { code: "+33", country: "France", flag: "FR" },
    { code: "+7", country: "Russia", flag: "RU" },
    { code: "+971", country: "UAE", flag: "AE" },
    { code: "+82", country: "South Korea", flag: "KR" },
    { code: "+55", country: "Brazil", flag: "BR" },
    { code: "+27", country: "South Africa", flag: "ZA" },
    { code: "+64", country: "New Zealand", flag: "NZ" },
    { code: "+65", country: "Singapore", flag: "SG" },
    { code: "+353", country: "Ireland", flag: "IE" },
    { code: "+966", country: "Saudi Arabia", flag: "SA" },
    { code: "+968", country: "Oman", flag: "OM" },
    { code: "+974", country: "Qatar", flag: "QA" },
    { code: "+20", country: "Egypt", flag: "EG" },
    { code: "+234", country: "Nigeria", flag: "NG" },
    { code: "+254", country: "Kenya", flag: "KE" },
    // Add more as needed...
  ];

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value ? Number(e.target.value) : null;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (code: string) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      full_name: formData.fullName,
      last_name: formData.lastName,
      email: formData.email,
      number: `${formData.countryCode}${formData.phone}`,
      dob: formData.dob,
      program_id: formData.program,
      program_type_id: formData.programType,
      university_id: formData.university,
      joining_academic_year: formData.academicYear
        ? academicyearOptions.find(y => y.id === formData.academicYear)?.name || String(formData.academicYear)
        : "",
      Info: formData.additionalInfo,
    };

    try {
      await dispatch(sendEnquiry(payload));
      setFormData(initialFormData);
      // alert("Enquiry sent successfully!");
    } catch (err) {
      console.error("Failed to send enquiry", err);
      alert("Failed to send enquiry. Please try again.");
    }
  };

  return (
    <main className="bg-gradient-to-br from-purple-50 to-indigo-100 flex p-4 md:p-8 min-h-screen">
      <div className="w-full max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* Left Side - Image */}
          <div className="relative h-64 lg:h-full">
            <img
              src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-9.jpg"
              alt="Student with books"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Form */}
          <div className="bg-gradient-to-b from-[#6A1B9A] to-purple-800 p-6 md:p-10 overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                Enquire Today & Get a Scholarship Discount!
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full bg-white text-gray-900 border-0 h-11"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full bg-white text-gray-900 border-0 h-11"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full bg-white text-gray-900 border-0 h-11"
                  required
                />
              </div>

              {/* Phone Number with Searchable Country Code */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(prev => !prev)}
                      className="bg-white text-gray-900 h-11 px-3 rounded-md flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <span className="ml-1">▼</span>
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-full mt-1 w-80 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden border">
                        <div className="p-3 border-b sticky top-0 bg-white z-10">
                          <Input
                            ref={countrySearchRef}
                            type="text"
                            placeholder="Search country or code..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full text-sm"
                          />
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {countryCodes
                            .filter(item => {
                              const q = countrySearch.toLowerCase();
                              return (
                                item.code.includes(q) ||
                                item.country.toLowerCase().includes(q)
                              );
                            })
                            .map(item => (
                              <div
                                key={item.code}
                                onClick={() => handleCountryCodeChange(item.code)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                              >
                                <span className="text-xl">{item.flag}</span>
                                <span className="font-medium w-16">{item.code}</span>
                                <span className="text-gray-700">{item.country}</span>
                              </div>
                            ))}
                          {countryCodes.filter(item =>
                            item.code.includes(countrySearch) ||
                            item.country.toLowerCase().includes(countrySearch.toLowerCase())
                          ).length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 text-sm">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className="flex-1 bg-white text-gray-900 border-0 h-11"
                    required
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Date of Birth</label>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border-0 h-11"
                  required
                />
              </div>

              {/* Program, Specialization, University, Academic Year */}
              {["program", "programType", "university", "academicYear"].map(field => (
                <div key={field}>
                  <label className="block text-white font-bold mb-2 capitalize">
                    {field === "programType" ? "Specialization" :
                     field === "academicYear" ? "Joining Academic Year" :
                     field === "program" ? "Program Interested" : "University Interested In"}
                  </label>
                  <select
                    name={field}
                    value={formData[field as keyof FormData] ?? ""}
                    onChange={handleSelectChange}
                    className="w-full bg-white text-gray-900 rounded-md p-3 text-sm h-11"
                  >
                    <option value="">Select {field === "programType" ? "specialization" : field.replace(/([A-Z])/g, ' $1').toLowerCase()}</option>
                    {(field === "program" ? programOptions :
                      field === "programType" ? specializationOptions :
                      field === "university" ? universityOptions :
                      academicyearOptions).map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Additional Info */}
              <div>
                <label className="block text-white text-sm font-medium mb-1">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  className="w-full bg-white text-gray-900 rounded-xl p-3 h-28 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-700 hover:bg-gray-100 font-bold text-lg h-12 shadow-xl"
              >
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}