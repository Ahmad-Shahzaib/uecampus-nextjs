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
  // Complete list of all 256 countries with their country codes and flags
  const countryCodes = [
    { code: "+93", country: "Afghanistan", flag: "AF" },
    { code: "+355", country: "Albania", flag: "AL" },
    { code: "+213", country: "Algeria", flag: "DZ" },
    { code: "+1684", country: "American Samoa", flag: "AS" },
    { code: "+376", country: "Andorra", flag: "AD" },
    { code: "+244", country: "Angola", flag: "AO" },
    { code: "+1264", country: "Anguilla", flag: "AI" },
    { code: "+1268", country: "Antigua and Barbuda", flag: "AG" },
    { code: "+54", country: "Argentina", flag: "AR" },
    { code: "+374", country: "Armenia", flag: "AM" },
    { code: "+297", country: "Aruba", flag: "AW" },
    { code: "+61", country: "Australia", flag: "AU" },
    { code: "+43", country: "Austria", flag: "AT" },
    { code: "+994", country: "Azerbaijan", flag: "AZ" },
    { code: "+1242", country: "Bahamas", flag: "BS" },
    { code: "+973", country: "Bahrain", flag: "BH" },
    { code: "+880", country: "Bangladesh", flag: "BD" },
    { code: "+1246", country: "Barbados", flag: "BB" },
    { code: "+375", country: "Belarus", flag: "BY" },
    { code: "+32", country: "Belgium", flag: "BE" },
    { code: "+501", country: "Belize", flag: "BZ" },
    { code: "+229", country: "Benin", flag: "BJ" },
    { code: "+1441", country: "Bermuda", flag: "BM" },
    { code: "+975", country: "Bhutan", flag: "BT" },
    { code: "+591", country: "Bolivia", flag: "BO" },
    { code: "+387", country: "Bosnia and Herzegovina", flag: "BA" },
    { code: "+267", country: "Botswana", flag: "BW" },
    { code: "+55", country: "Brazil", flag: "BR" },
    { code: "+246", country: "British Indian Ocean Territory", flag: "IO" },
    { code: "+1284", country: "British Virgin Islands", flag: "VG" },
    { code: "+673", country: "Brunei", flag: "BN" },
    { code: "+359", country: "Bulgaria", flag: "BG" },
    { code: "+226", country: "Burkina Faso", flag: "BF" },
    { code: "+257", country: "Burundi", flag: "BI" },
    { code: "+855", country: "Cambodia", flag: "KH" },
    { code: "+237", country: "Cameroon", flag: "CM" },
    { code: "+1", country: "Canada", flag: "CA" },
    { code: "+238", country: "Cape Verde", flag: "CV" },
    { code: "+1345", country: "Cayman Islands", flag: "KY" },
    { code: "+236", country: "Central African Republic", flag: "CF" },
    { code: "+235", country: "Chad", flag: "TD" },
    { code: "+56", country: "Chile", flag: "CL" },
    { code: "+86", country: "China", flag: "CN" },
    { code: "+57", country: "Colombia", flag: "CO" },
    { code: "+269", country: "Comoros", flag: "KM" },
    { code: "+242", country: "Congo", flag: "CG" },
    { code: "+243", country: "Congo, Democratic Republic of the", flag: "CD" },
    { code: "+682", country: "Cook Islands", flag: "CK" },
    { code: "+506", country: "Costa Rica", flag: "CR" },
    { code: "+225", country: "Cote d'Ivoire", flag: "CI" },
    { code: "+385", country: "Croatia", flag: "HR" },
    { code: "+53", country: "Cuba", flag: "CU" },
    { code: "+599", country: "Curacao", flag: "CW" },
    { code: "+357", country: "Cyprus", flag: "CY" },
    { code: "+420", country: "Czech Republic", flag: "CZ" },
    { code: "+45", country: "Denmark", flag: "DK" },
    { code: "+253", country: "Djibouti", flag: "DJ" },
    { code: "+1767", country: "Dominica", flag: "DM" },
    { code: "+1809", country: "Dominican Republic", flag: "DO" },
    { code: "+1829", country: "Dominican Republic", flag: "DO" },
    { code: "+1849", country: "Dominican Republic", flag: "DO" },
    { code: "+670", country: "East Timor", flag: "TL" },
    { code: "+593", country: "Ecuador", flag: "EC" },
    { code: "+20", country: "Egypt", flag: "EG" },
    { code: "+503", country: "El Salvador", flag: "SV" },
    { code: "+240", country: "Equatorial Guinea", flag: "GQ" },
    { code: "+291", country: "Eritrea", flag: "ER" },
    { code: "+372", country: "Estonia", flag: "EE" },
    { code: "+251", country: "Ethiopia", flag: "ET" },
    { code: "+500", country: "Falkland Islands", flag: "FK" },
    { code: "+298", country: "Faroe Islands", flag: "FO" },
    { code: "+679", country: "Fiji", flag: "FJ" },
    { code: "+358", country: "Finland", flag: "FI" },
    { code: "+33", country: "France", flag: "FR" },
    { code: "+594", country: "French Guiana", flag: "GF" },
    { code: "+689", country: "French Polynesia", flag: "PF" },
    { code: "+241", country: "Gabon", flag: "GA" },
    { code: "+220", country: "Gambia", flag: "GM" },
    { code: "+995", country: "Georgia", flag: "GE" },
    { code: "+49", country: "Germany", flag: "DE" },
    { code: "+233", country: "Ghana", flag: "GH" },
    { code: "+350", country: "Gibraltar", flag: "GI" },
    { code: "+30", country: "Greece", flag: "GR" },
    { code: "+299", country: "Greenland", flag: "GL" },
    { code: "+1473", country: "Grenada", flag: "GD" },
    { code: "+590", country: "Guadeloupe", flag: "GP" },
    { code: "+1671", country: "Guam", flag: "GU" },
    { code: "+502", country: "Guatemala", flag: "GT" },
    { code: "+44", country: "Guernsey", flag: "GG" },
    { code: "+224", country: "Guinea", flag: "GN" },
    { code: "+245", country: "Guinea-Bissau", flag: "GW" },
    { code: "+592", country: "Guyana", flag: "GY" },
    { code: "+509", country: "Haiti", flag: "HT" },
    { code: "+39", country: "Holy See (Vatican City State)", flag: "VA" },
    { code: "+504", country: "Honduras", flag: "HN" },
    { code: "+852", country: "Hong Kong", flag: "HK" },
    { code: "+36", country: "Hungary", flag: "HU" },
    { code: "+354", country: "Iceland", flag: "IS" },
    { code: "+91", country: "India", flag: "IN" },
    { code: "+62", country: "Indonesia", flag: "ID" },
    { code: "+98", country: "Iran", flag: "IR" },
    { code: "+964", country: "Iraq", flag: "IQ" },
    { code: "+353", country: "Ireland", flag: "IE" },
    { code: "+44", country: "Isle of Man", flag: "IM" },
    { code: "+972", country: "Israel", flag: "IL" },
    { code: "+39", country: "Italy", flag: "IT" },
    { code: "+1876", country: "Jamaica", flag: "JM" },
    { code: "+81", country: "Japan", flag: "JP" },
    { code: "+44", country: "Jersey", flag: "JE" },
    { code: "+962", country: "Jordan", flag: "JO" },
    { code: "+7", country: "Kazakhstan", flag: "KZ" },
    { code: "+254", country: "Kenya", flag: "KE" },
    { code: "+686", country: "Kiribati", flag: "KI" },
    { code: "+850", country: "North Korea", flag: "KP" },
    { code: "+82", country: "South Korea", flag: "KR" },
    { code: "+965", country: "Kuwait", flag: "KW" },
    { code: "+996", country: "Kyrgyzstan", flag: "KG" },
    { code: "+856", country: "Laos", flag: "LA" },
    { code: "+371", country: "Latvia", flag: "LV" },
    { code: "+961", country: "Lebanon", flag: "LB" },
    { code: "+266", country: "Lesotho", flag: "LS" },
    { code: "+231", country: "Liberia", flag: "LR" },
    { code: "+218", country: "Libya", flag: "LY" },
    { code: "+423", country: "Liechtenstein", flag: "LI" },
    { code: "+370", country: "Lithuania", flag: "LT" },
    { code: "+352", country: "Luxembourg", flag: "LU" },
    { code: "+853", country: "Macau", flag: "MO" },
    { code: "+389", country: "Macedonia", flag: "MK" },
    { code: "+261", country: "Madagascar", flag: "MG" },
    { code: "+265", country: "Malawi", flag: "MW" },
    { code: "+60", country: "Malaysia", flag: "MY" },
    { code: "+960", country: "Maldives", flag: "MV" },
    { code: "+223", country: "Mali", flag: "ML" },
    { code: "+356", country: "Malta", flag: "MT" },
    { code: "+692", country: "Marshall Islands", flag: "MH" },
    { code: "+596", country: "Martinique", flag: "MQ" },
    { code: "+222", country: "Mauritania", flag: "MR" },
    { code: "+230", country: "Mauritius", flag: "MU" },
    { code: "+262", country: "Mayotte", flag: "YT" },
    { code: "+52", country: "Mexico", flag: "MX" },
    { code: "+691", country: "Micronesia", flag: "FM" },
    { code: "+373", country: "Moldova", flag: "MD" },
    { code: "+377", country: "Monaco", flag: "MC" },
    { code: "+976", country: "Mongolia", flag: "MN" },
    { code: "+382", country: "Montenegro", flag: "ME" },
    { code: "+1664", country: "Montserrat", flag: "MS" },
    { code: "+212", country: "Morocco", flag: "MA" },
    { code: "+258", country: "Mozambique", flag: "MZ" },
    { code: "+95", country: "Myanmar", flag: "MM" },
    { code: "+264", country: "Namibia", flag: "NA" },
    { code: "+674", country: "Nauru", flag: "NR" },
    { code: "+977", country: "Nepal", flag: "NP" },
    { code: "+31", country: "Netherlands", flag: "NL" },
    { code: "+599", country: "Netherlands Antilles", flag: "AN" },
    { code: "+687", country: "New Caledonia", flag: "NC" },
    { code: "+64", country: "New Zealand", flag: "NZ" },
    { code: "+505", country: "Nicaragua", flag: "NI" },
    { code: "+227", country: "Niger", flag: "NE" },
    { code: "+234", country: "Nigeria", flag: "NG" },
    { code: "+683", country: "Niue", flag: "NU" },
    { code: "+672", country: "Norfolk Island", flag: "NF" },
    { code: "+1670", country: "Northern Mariana Islands", flag: "MP" },
    { code: "+47", country: "Norway", flag: "NO" },
    { code: "+968", country: "Oman", flag: "OM" },
    { code: "+92", country: "Pakistan", flag: "PK" },
    { code: "+680", country: "Palau", flag: "PW" },
    { code: "+507", country: "Panama", flag: "PA" },
    { code: "+675", country: "Papua New Guinea", flag: "PG" },
    { code: "+595", country: "Paraguay", flag: "PY" },
    { code: "+51", country: "Peru", flag: "PE" },
    { code: "+63", country: "Philippines", flag: "PH" },
    { code: "+64", country: "Pitcairn Islands", flag: "PN" },
    { code: "+48", country: "Poland", flag: "PL" },
    { code: "+351", country: "Portugal", flag: "PT" },
    { code: "+1787", country: "Puerto Rico", flag: "PR" },
    { code: "+1939", country: "Puerto Rico", flag: "PR" },
    { code: "+974", country: "Qatar", flag: "QA" },
    { code: "+242", country: "Republic of the Congo", flag: "CG" },
    { code: "+262", country: "Reunion", flag: "RE" },
    { code: "+40", country: "Romania", flag: "RO" },
    { code: "+7", country: "Russia", flag: "RU" },
    { code: "+250", country: "Rwanda", flag: "RW" },
    { code: "+590", country: "Saint Barthelemy", flag: "BL" },
    { code: "+290", country: "Saint Helena", flag: "SH" },
    { code: "+1869", country: "Saint Kitts and Nevis", flag: "KN" },
    { code: "+1758", country: "Saint Lucia", flag: "LC" },
    { code: "+590", country: "Saint Martin", flag: "MF" },
    { code: "+508", country: "Saint Pierre and Miquelon", flag: "PM" },
    { code: "+1784", country: "Saint Vincent and the Grenadines", flag: "VC" },
    { code: "+685", country: "Samoa", flag: "WS" },
    { code: "+378", country: "San Marino", flag: "SM" },
    { code: "+239", country: "Sao Tome and Principe", flag: "ST" },
    { code: "+966", country: "Saudi Arabia", flag: "SA" },
    { code: "+221", country: "Senegal", flag: "SN" },
    { code: "+381", country: "Serbia", flag: "RS" },
    { code: "+248", country: "Seychelles", flag: "SC" },
    { code: "+232", country: "Sierra Leone", flag: "SL" },
    { code: "+65", country: "Singapore", flag: "SG" },
    { code: "+1721", country: "Sint Maarten", flag: "SX" },
    { code: "+421", country: "Slovakia", flag: "SK" },
    { code: "+386", country: "Slovenia", flag: "SI" },
    { code: "+677", country: "Solomon Islands", flag: "SB" },
    { code: "+252", country: "Somalia", flag: "SO" },
    { code: "+27", country: "South Africa", flag: "ZA" },
    { code: "+500", country: "South Georgia and the South Sandwich Islands", flag: "GS" },
    { code: "+34", country: "Spain", flag: "ES" },
    { code: "+94", country: "Sri Lanka", flag: "LK" },
    { code: "+249", country: "Sudan", flag: "SD" },
    { code: "+597", country: "Suriname", flag: "SR" },
    { code: "+47", country: "Svalbard and Jan Mayen", flag: "SJ" },
    { code: "+268", country: "Swaziland", flag: "SZ" },
    { code: "+46", country: "Sweden", flag: "SE" },
    { code: "+41", country: "Switzerland", flag: "CH" },
    { code: "+963", country: "Syria", flag: "SY" },
    { code: "+886", country: "Taiwan", flag: "TW" },
    { code: "+992", country: "Tajikistan", flag: "TJ" },
    { code: "+255", country: "Tanzania", flag: "TZ" },
    { code: "+66", country: "Thailand", flag: "TH" },
    { code: "+670", country: "Timor-Leste", flag: "TL" },
    { code: "+228", country: "Togo", flag: "TG" },
    { code: "+690", country: "Tokelau", flag: "TK" },
    { code: "+676", country: "Tonga", flag: "TO" },
    { code: "+1868", country: "Trinidad and Tobago", flag: "TT" },
    { code: "+216", country: "Tunisia", flag: "TN" },
    { code: "+90", country: "Turkey", flag: "TR" },
    { code: "+993", country: "Turkmenistan", flag: "TM" },
    { code: "+1649", country: "Turks and Caicos Islands", flag: "TC" },
    { code: "+688", country: "Tuvalu", flag: "TV" },
    { code: "+256", country: "Uganda", flag: "UG" },
    { code: "+380", country: "Ukraine", flag: "UA" },
    { code: "+971", country: "United Arab Emirates", flag: "AE" },
    { code: "+44", country: "United Kingdom", flag: "GB" },
    { code: "+1", country: "United States", flag: "US" },
    { code: "+1340", country: "U.S. Virgin Islands", flag: "VI" },
    { code: "+598", country: "Uruguay", flag: "UY" },
    { code: "+998", country: "Uzbekistan", flag: "UZ" },
    { code: "+678", country: "Vanuatu", flag: "VU" },
    { code: "+58", country: "Venezuela", flag: "VE" },
    { code: "+84", country: "Vietnam", flag: "VN" },
    { code: "+681", country: "Wallis and Futuna", flag: "WF" },
    { code: "+967", country: "Yemen", flag: "YE" },
    { code: "+260", country: "Zambia", flag: "ZM" },
    { code: "+263", country: "Zimbabwe", flag: "ZW" }
  ];


  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  // Prepare filtered countries once to keep rendering consistent
  const filteredCountries = countryCodes.filter(item => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      item.code.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q)
    );
  });

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
              loading="lazy" 
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
                          {filteredCountries.map(item => (
                              <div
                                key={`${item.code}-${item.country}`}
                                onClick={() => handleCountryCodeChange(item.code)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                              >
                                <span className="text-xl">{item.flag}</span>
                                <span className="font-medium w-16">{item.code}</span>
                                <span className="text-gray-700">{item.country}</span>
                              </div>
                            ))}
                          {filteredCountries.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 text-sm">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Input
                    type="number"
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