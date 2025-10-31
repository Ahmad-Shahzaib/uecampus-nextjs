"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/component/Courses/courses-card";
import FilterSidebar from "@/component/Courses/filter-sidebar";
import PaginationComponent from "@/component/Courses/pagination";
import { Input } from "@/components/ui/input";

const courses = [
    {
        id: 1,
        title: "Level 7 Diploma in Health and Social Care",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-11-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 7",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Level 7 Diploma in Health and Social Care at UniCampus.",
        userInfo: "User: Guest User",
        timeInfo: "2 months",
    },
    {
        id: 2,
        title: "Level 7 Diploma in Data Science",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-10-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 7",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Level 7 Diploma in Data Science at UniCampus.",
        userInfo: "User: Guest User",
        timeInfo: "2 months",
    },
    {
        id: 3,
        title: "Level 7 Diploma in Accounting and Finance",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-1-3-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 7",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Level 7 Diploma in Accounting and Finance at UniCampus.",
        userInfo: "User: Guest User",
        timeInfo: "2 months",
    },
    {
        id: 4,
        title: "Extended Level 5 Diploma in Business Management",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-9-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 5",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Extended Level 5 Diploma in Business Management at UniCampus.",
        userInfo: "User: Coordinator Level",
        timeInfo: "3 months",
    },
    {
        id: 5,
        title: "Level 5 Diploma in Cyber Security",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-8-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 5",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Level 5 Diploma in Cyber Security at UniCampus.",
        userInfo: "User: Guest",
        timeInfo: "3 months",
    },
    {
        id: 6,
        title: "Level 5 Diploma in Information Technology",
        image:
            "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-7-300x224.png",
        credits: "120 Credits",
        duration: "Duration: 1 year",
        level: "Level 5",
        type: "Online-Open-Access",
        description:
            "Engage on a transformative educational journey with our Level 5 Diploma in Information Technology at UniCampus.",
        userInfo: "User: Guest",
        timeInfo: "3 months",
    },
];

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const displayedCourses = courses.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="flex sm:flex-row flex-col w-full gap-8 p-8">
                {/* <FilterSidebar /> */}
                <div className="flex-1">
                    <header className="bg-white border-b border-border p-4">
                        <div className="w-full  flex flex-col sm:flex-row  gap-4 sm:gap-6 px-2 sm:px-6">
                            <h1 className="text-xl sm:text-2xl font-bold text-foreground w-full sm:w-auto text-center sm:text-left">
                                Courses
                            </h1>

                            {/* Search Bar */}
                            <div className="w-full  flex items-center rounded-lg border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
                                <div className="relative flex-1 py-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    <Input
                                        type="search"
                                        placeholder="Find your course"
                                        className="h-10 pl-10 pr-3 bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
                                    />
                                </div>
                                <Button className="h-10 sm:h-12 px-3 sm:px-4 rounded-l-none rounded-r-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm sm:text-base">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </header>
                    {/* <div className="space-y-6">
                        {displayedCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div> */}

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
