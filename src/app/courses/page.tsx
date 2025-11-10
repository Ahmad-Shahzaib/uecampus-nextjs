"use client";

import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/component/Courses/courses-card";
import FilterSidebar from "@/component/Courses/filter-sidebar";
import PaginationComponent from "@/component/Courses/pagination";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { RootState } from "@/redux/rootReducer";
import { useSearchParams } from "next/navigation";

type CourseForCard = {
    id: number;
    name: string;
    slug: string;
    image_path: string;
    small_description: string;
    created_at: string;
    updated_at: string;
};

type FullCourseProp = {
    id: number;
    name: string;
    slug: string;
    program_id: string;
    cat_id: string;
    status: string;
    content: string;
    small_description: string;
    meta_tags: string;
    meta_description: string;
    page: string;
    image_path: string;
    video: string;
    created_at: string;
    updated_at: string;
};

function CoursesPageContent() {
    const dispatch = useDispatch();
    const { data: courses, isLoading, error } = useSelector((state: RootState) => state.courses);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;
    const searchParams = useSearchParams();

    useEffect(() => {
        const catIds = searchParams.get("cat_ids") || undefined;
        dispatch(fetchCoursesData(catIds ? { cat_ids: catIds } : {}));
    }, [dispatch, searchParams]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    const totalPages = Math.ceil((courses?.length || 0) / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const displayedCourses = courses?.slice(startIndex, endIndex) || [];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="flex sm:flex-row flex-col w-full gap-8 p-8">
                <FilterSidebar />
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
                    <div className="space-y-6">
                        {(displayedCourses as unknown as CourseForCard[]).map((course) => {
                            const fullCourse: FullCourseProp = {
                                id: course.id,
                                name: course.name,
                                slug: course.slug,
                                program_id: "",
                                cat_id: "",
                                status: "",
                                content: "",
                                small_description: course.small_description,
                                meta_tags: "",
                                meta_description: "",
                                page: "",
                                image_path: course.image_path,
                                video: "",
                                created_at: course.created_at,
                                updated_at: course.updated_at,
                            };
                            return <CourseCard key={course.id} course={fullCourse} />;
                        })}
                    </div>

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

export default function Home() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <CoursesPageContent />
        </Suspense>
    );
}
