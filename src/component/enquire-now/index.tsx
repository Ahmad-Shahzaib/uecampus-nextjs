"use client"

import React, { useState, ChangeEvent, FormEvent, JSX } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, Mail } from "lucide-react"

interface FormData {
    fullName: string
    email: string
    phone: string
    university: string
    degree: string[]
}

export function ScholarshipForm(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        university: "",
        degree: [],
    })

    const degreeOptions: string[] = [
        "Engineering",
        "Business Administration",
        "Medicine",
        "Law",
        "Education",
        "Arts & Sciences",
        "Computer Science",
        "Psychology",
        "Nursing",
        "Finance",
        "Architecture",
        "Environmental Studies",
        "Liberal Arts",
        "Philosophy",
        "Data Science",
    ]

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDegreeChange = (degree: string): void => {
        setFormData((prev) => ({
            ...prev,
            degree: prev.degree.includes(degree)
                ? prev.degree.filter((d) => d !== degree)
                : [...prev.degree, degree],
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // You can integrate your backend call here
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full">
                <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl gap-6">

                    <div className="flex-1 relative min-h-96 lg:min-h-auto rounded-lg">
                        <img
                            src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-7.jpg"
                            alt="Professional woman with books"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>


                    {/* Right side - Form */}
                    <div className="bg-purple-600">
                        {/* Header */}
                        <div className="bg-purple-700 px-6 py-4">
                            <h1 className="text-white text-xl font-bold">
                                Enquire Today and Get a Scholarship Discount!
                            </h1>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-white text-gray-900 border-0 h-9"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-white text-gray-900 border-0 h-9"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full bg-white text-gray-900 border-0 h-9"
                                    required
                                />
                            </div>

                            {/* University */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Preferred University</label>
                                <Input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleInputChange}
                                    placeholder="Enter preferred university"
                                    className="w-full bg-white text-gray-900 border-0 h-9"
                                    required
                                />
                            </div>

                            {/* Degree Selection */}
                            <div className="pt-2">
                                <label className="block text-white text-sm font-bold mb-3">Select Degree</label>
                                <div className="bg-purple-700 rounded p-3 space-y-2 max-h-40 overflow-y-auto">
                                    {degreeOptions.map((degree) => (
                                        <div key={degree} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={degree}
                                                checked={formData.degree.includes(degree)}
                                                onCheckedChange={() => handleDegreeChange(degree)}
                                                className="border-white bg-transparent"
                                            />
                                            <label
                                                htmlFor={degree}
                                                className="text-white text-sm cursor-pointer flex-1"
                                            >
                                                {degree}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="bg-purple-700 rounded p-3 mt-4">
                                <p className="text-white text-xs leading-relaxed">
                                    <strong>Disclaimer:</strong> By submitting this form, you agree to receive
                                    communications about scholarships and educational opportunities. We respect your
                                    privacy and will not share your information with third parties. For more
                                    information, please review our privacy policy.
                                </p>
                            </div>

                            {/* Social Sign In */}
                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    type="button"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm"
                                >
                                    <Facebook className="w-4 h-4 mr-2" />
                                    Facebook
                                </Button>
                                <Button
                                    type="button"
                                    className="flex-1 bg-white hover:bg-gray-100 text-gray-900 h-9 text-sm"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Google
                                </Button>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold h-10 mt-4"
                            >
                                Submit Enquiry
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
