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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Define initial form data
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Options from store (fallback to empty arrays)
  const programOptions: ProgramType[] = programsData?.programs ?? programsData?.programTypes ?? [];
  const specializationOptions: ProgramType[] = programsData?.programTypes ?? [];
  const universityOptions: University[] = programsData?.universities ?? [];
  const academicyearOptions: AcademicYear[] = programsData?.academicYears ?? [];

  // Country codes with flags
  const countryCodes = [
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+64", country: "New Zealand", flag: "🇳🇿" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+45", country: "Denmark", flag: "🇩🇰" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+43", country: "Austria", flag: "🇦🇹" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+32", country: "Belgium", flag: "🇧🇪" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+372", country: "Estonia", flag: "🇪🇪" },
    { code: "+371", country: "Latvia", flag: "🇱🇻" },
    { code: "+370", country: "Lithuania", flag: "🇱🇹" },
    { code: "+36", country: "Hungary", flag: "🇭🇺" },
    { code: "+40", country: "Romania", flag: "🇷🇴" },
    { code: "+30", country: "Greece", flag: "🇬🇷" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+260", country: "Zambia", flag: "🇿🇲" },
    { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
    { code: "+264", country: "Namibia", flag: "🇳🇦" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+268", country: "Eswatini", flag: "🇸🇿" },
    { code: "+269", country: "Comoros", flag: "🇰🇲" },
    { code: "+250", country: "Rwanda", flag: "🇷🇼" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+258", country: "Mozambique", flag: "🇲🇿" },
    { code: "+259", country: "Mayotte", flag: "🇾🇹" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+220", country: "Gambia", flag: "🇬🇲" },
    { code: "+221", country: "Senegal", flag: "🇸🇳" },
    { code: "+222", country: "Mauritania", flag: "🇲🇷" },
    { code: "+223", country: "Mali", flag: "🇲🇱" },
    { code: "+224", country: "Guinea", flag: "🇬🇳" },
    { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
    { code: "+227", country: "Niger", flag: "🇳🇪" },
    { code: "+228", country: "Togo", flag: "🇹🇬" },
    { code: "+229", country: "Benin", flag: "🇧🇯" },
    { code: "+230", country: "Mauritius", flag: "🇲🇺" },
    { code: "+231", country: "Liberia", flag: "🇱🇷" },
    { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+235", country: "Chad", flag: "🇹🇩" },
    { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
    { code: "+237", country: "Cameroon", flag: "🇨🇲" },
    { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
    { code: "+239", country: "São Tomé and Príncipe", flag: "🇸🇹" },
    { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+241", country: "Gabon", flag: "🇬🇦" },
    { code: "+242", country: "Republic of the Congo", flag: "🇨🇬" },
    { code: "+243", country: "Democratic Republic of the Congo", flag: "🇨🇩" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" },
    { code: "+247", country: "Ascension Island", flag: "🇦🇨" },
    { code: "+248", country: "Seychelles", flag: "🇸🇨" },
    { code: "+249", country: "Sudan", flag: "🇸🇩" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+252", country: "Somalia", flag: "🇸🇴" },
    { code: "+253", country: "Djibouti", flag: "🇩🇯" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+258", country: "Mozambique", flag: "🇲🇿" },
    { code: "+260", country: "Zambia", flag: "🇿🇲" },
    { code: "+261", country: "Madagascar", flag: "🇲🇬" },
    { code: "+262", country: "Réunion", flag: "🇷🇪" },
    { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
    { code: "+264", country: "Namibia", flag: "🇳🇦" },
    { code: "+265", country: "Malawi", flag: "🇲🇼" },
    { code: "+266", country: "Lesotho", flag: "🇱🇸" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+268", country: "Eswatini", flag: "🇸🇿" },
    { code: "+269", country: "Comoros", flag: "🇰🇲" },
    { code: "+290", country: "Saint Helena", flag: "🇸🇭" },
    { code: "+291", country: "Eritrea", flag: "🇪🇷" },
    { code: "+297", country: "Aruba", flag: "🇦🇼" },
    { code: "+298", country: "Faroe Islands", flag: "🇫🇴" },
    { code: "+299", country: "Greenland", flag: "🇬🇱" },
    { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+355", country: "Albania", flag: "🇦🇱" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+357", country: "Cyprus", flag: "🇨🇾" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
    { code: "+370", country: "Lithuania", flag: "🇱🇹" },
    { code: "+371", country: "Latvia", flag: "🇱🇻" },
    { code: "+372", country: "Estonia", flag: "🇪🇪" },
    { code: "+373", country: "Moldova", flag: "🇲🇩" },
    { code: "+374", country: "Armenia", flag: "🇦🇲" },
    { code: "+375", country: "Belarus", flag: "🇧🇾" },
    { code: "+376", country: "Andorra", flag: "🇦🇩" },
    { code: "+377", country: "Monaco", flag: "🇲🇨" },
    { code: "+378", country: "San Marino", flag: "🇸🇲" },
    { code: "+379", country: "Vatican City", flag: "🇻🇦" },
    { code: "+380", country: "Ukraine", flag: "🇺🇦" },
    { code: "+381", country: "Serbia", flag: "🇷🇸" },
    { code: "+382", country: "Montenegro", flag: "🇲🇪" },
    { code: "+383", country: "Kosovo", flag: "🇽🇰" },
    { code: "+385", country: "Croatia", flag: "🇭🇷" },
    { code: "+386", country: "Slovenia", flag: "🇸🇮" },
    { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "+389", country: "North Macedonia", flag: "🇲🇰" },
    { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
    { code: "+421", country: "Slovakia", flag: "🇸🇰" },
    { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
    { code: "+500", country: "Falkland Islands", flag: "🇫🇰" },
    { code: "+501", country: "Belize", flag: "🇧🇿" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+507", country: "Panama", flag: "🇵🇦" },
    { code: "+508", country: "Saint Pierre and Miquelon", flag: "🇵🇲" },
    { code: "+509", country: "Haiti", flag: "🇭🇹" },
    { code: "+590", country: "Guadeloupe", flag: "🇬🇵" },
    { code: "+591", country: "Bolivia", flag: "🇧🇴" },
    { code: "+592", country: "Guyana", flag: "🇬🇾" },
    { code: "+593", country: "Ecuador", flag: "🇪🇨" },
    { code: "+594", country: "French Guiana", flag: "🇬🇫" },
    { code: "+595", country: "Paraguay", flag: "🇵🇾" },
    { code: "+596", country: "Martinique", flag: "🇲🇶" },
    { code: "+597", country: "Suriname", flag: "🇸🇷" },
    { code: "+598", country: "Uruguay", flag: "🇺🇾" },
    { code: "+599", country: "Curaçao", flag: "🇨🇼" },
    { code: "+670", country: "East Timor", flag: "🇹🇱" },
    { code: "+672", country: "Australian External Territories", flag: "🇦🇺" },
    { code: "+673", country: "Brunei", flag: "🇧🇳" },
    { code: "+674", country: "Nauru", flag: "🇳🇷" },
    { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+676", country: "Tonga", flag: "🇹🇴" },
    { code: "+677", country: "Solomon Islands", flag: "🇸🇧" },
    { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
    { code: "+679", country: "Fiji", flag: "🇫🇯" },
    { code: "+680", country: "Palau", flag: "🇵🇼" },
    { code: "+681", country: "Wallis and Futuna", flag: "🇼🇫" },
    { code: "+682", country: "Cook Islands", flag: "🇨🇰" },
    { code: "+683", country: "Niue", flag: "🇳🇺" },
    { code: "+685", country: "Samoa", flag: "🇼🇸" },
    { code: "+686", country: "Kiribati", flag: "🇰🇮" },
    { code: "+687", country: "New Caledonia", flag: "🇳🇨" },
    { code: "+688", country: "Tuvalu", flag: "🇹🇻" },
    { code: "+689", country: "French Polynesia", flag: "🇵🇫" },
    { code: "+690", country: "Tokelau", flag: "🇹🇰" },
    { code: "+691", country: "Micronesia", flag: "🇫🇲" },
    { code: "+692", country: "Marshall Islands", flag: "🇲🇭" },
    { code: "+850", country: "North Korea", flag: "🇰🇵" },
    { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
    { code: "+853", country: "Macau", flag: "🇲🇴" },
    { code: "+855", country: "Cambodia", flag: "🇰🇭" },
    { code: "+856", country: "Laos", flag: "🇱🇦" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+886", country: "Taiwan", flag: "🇹🇼" },
    { code: "+960", country: "Maldives", flag: "🇲🇻" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+963", country: "Syria", flag: "🇸🇾" },
    { code: "+964", country: "Iraq", flag: "🇮🇶" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+967", country: "Yemen", flag: "🇾🇪" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+970", country: "Palestine", flag: "🇵🇸" },
    { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+975", country: "Bhutan", flag: "🇧🇹" },
    { code: "+976", country: "Mongolia", flag: "🇲🇳" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
    { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
    { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
    { code: "+995", country: "Georgia", flag: "🇬🇪" },
    { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
    {code :"+92", country:"Pakistan" , flag:"PK"  }
  ];

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

  const handleCountryCodeChange = (code: string): void => {
    setFormData((prev) => ({ ...prev, countryCode: code }));
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  return (
    <main className="bg-gradient-to-br from-purple-50 to-indigo-100 flex p-4 md:p-8">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white min-h-screen">
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
          <div
            className="bg-gradient-to-b from-[#6A1B9A] to-purple-800 p-6 md:p-8 overflow-y-auto lg:h-full pr-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#9CA3AF transparent",
            } as React.CSSProperties}
          >
            <style jsx>{`
    div::-webkit-scrollbar {
      width: 6px;
      position: absolute;
      right: 0;
    }
    div::-webkit-scrollbar-track {
      background: transparent;
      margin: 8px 0;
    }
    div::-webkit-scrollbar-thumb {
      background: #9CA3AF;
      border-radius: 9999px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    div::-webkit-scrollbar-thumb:hover {
      background: #6B7280;
      background-clip: content-box;
    }
    div {
      scrollbar-gutter: stable;
    }
  `}</style>
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

                {/* Phone with Country Code and Flags */}
                <div>
                  <label className="block text-white text-xs md:text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="bg-white text-gray-900 border-0 h-10 rounded-md text-sm w-24 flex items-center justify-between px-2"
                      >
                        <div className="flex items-center">
                          <span className="mr-1">{selectedCountry.flag}</span>
                          {selectedCountry.code}
                        </div>
                        <span>▼</span>
                      </button>
                      {isCountryDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                          {countryCodes.map((country) => (
                            <div
                              key={country.code}
                              onClick={() => handleCountryCodeChange(country.code)}
                              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <span className="mr-2 text-lg">{country.flag}</span>
                              <span className="font-medium">{country.code}</span>
                              <span className="ml-2 text-gray-600">{country.country}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="123 456 7890"
                      className="flex-1 bg-white text-gray-900 border-0 h-10 text-sm"
                      required
                    />
                  </div>
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