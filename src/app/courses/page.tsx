"use client";

import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import CourseCard from "@/component/Courses/courses-card";
import FilterSidebar from "@/component/Courses/filter-sidebar";
import PaginationComponent from "@/component/Courses/pagination";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchCoursesData, FetchCourseParams } from "@/redux/thunk/courses";
import { RootState } from "@/redux/rootReducer";
import { useSearchParams } from "next/navigation";
import type { Course } from "@/redux/slices/courses";
import { fetchSearchResults } from "@/redux/thunk/searchCourses";
import { resetSearchState } from "@/redux/slices/searchSlice";
import Link from "next/link";

function CoursesPageContent() {
    const dispatch = useDispatch();
    const { data: courses = [], isLoading, error } = useSelector((state: RootState) => state.courses);
    const searchState = useSelector((state: RootState) => state.search);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchParams = useSearchParams();
    const paramsKey = searchParams.toString();

    useEffect(() => {
        // Reset to first page only when search params change
        setCurrentPage(1);
    }, [paramsKey]);

    useEffect(() => {
        const filters: FetchCourseParams = {};
        const params = new URLSearchParams(paramsKey);

        const programTypeIds = params.get("program_type_ids");
        const universityIds = params.get("university_ids");
        const levelIds = params.get("level_ids");

        if (programTypeIds) {
            filters.program_type_ids = programTypeIds;
        }
        if (universityIds) {
            filters.university_ids = universityIds;
        }
        if (levelIds) {
            filters.level_ids = levelIds;
        }

        dispatch(fetchCoursesData(filters));
    }, [dispatch, paramsKey]);

    // Debounce search input and call search API
    useEffect(() => {
        const trimmed = searchKeyword.trim();
        if (trimmed.length < 2) {
            dispatch(resetSearchState());
            return;
        }

        const handler = setTimeout(() => {
            dispatch(fetchSearchResults(trimmed));
        }, 400);

        return () => clearTimeout(handler);
    }, [searchKeyword, dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader text="" />
            </div>  
        );
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const displayedCourses = courses.slice(startIndex, endIndex);

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
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword((e.target as HTMLInputElement).value)}
                                        onKeyDown={(e) => {
                                            if ((e as React.KeyboardEvent).key === "Enter") {
                                                const trimmed = searchKeyword.trim();
                                                if (trimmed.length >= 1) {
                                                    dispatch(fetchSearchResults(trimmed));
                                                }
                                            }
                                        }}
                                        className="h-10 pl-10 pr-3 bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
                                    />
                                </div>
                                <Button className="h-10 sm:h-12 px-3 sm:px-4 rounded-l-none rounded-r-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm sm:text-base">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </header>
                    {/* Search results (shows when user types) */}
                    {searchKeyword.trim().length > 0 ? (
                        <div className="space-y-4 mt-4">
                            {searchState.isLoading ? (
                                <div className="flex justify-center py-6">
                                    <Loader size={48} text="" />
                                </div>
                            ) : searchState.error ? (
                                <div className="text-red-500 text-center py-6">{searchState.error}</div>
                            ) : searchState.data.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {searchState.data.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/course/${item.slug}`}
                                            className="block p-4 border border-border rounded-md bg-white hover:shadow"
                                        >
                                            <div className="text-sm font-medium text-foreground">{item.name}</div>
                                            {item.small_description && (
                                                <div className="text-xs text-muted-foreground mt-1">{item.small_description}</div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">No results found</div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {displayedCourses.map((course: Course) => {
                                return <CourseCard key={course.id} course={course} />;
                            })}
                        </div>
                    )}

                    {/* Pagination - show only when not searching */}
                    {searchKeyword.trim().length === 0 && (
                        <div className="mt-8 flex justify-center">
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
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
