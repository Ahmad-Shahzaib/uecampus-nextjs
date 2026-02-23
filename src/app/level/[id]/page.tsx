"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { fetchProgramsData } from "@/redux/thunk/programsThunk";
import Loader from "@/components/common/Loader";
import CourseCard from "@/component/Courses/courses-card";
import PaginationComponent from "@/component/Courses/pagination";
import Seo from "@/component/common/Seo";
import JsonLdCourse from "@/component/common/JsonLdCourse";

// simplified Course type

type Course = {
  id: string | number;
  program_type_name?: string;
  [key: string]: any;
};

export default function LevelPage() {
  const params = useParams();
  const levelId = params?.id;
  const dispatch = useDispatch();
  const { data: courses = [], isLoading, error } = useSelector((state: RootState) => state.courses);
  const programsData = useSelector((state: RootState) => state.programs.data);
  const [levelName, setLevelName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(1);
    setLevelName("");
  }, [levelId]);

  useEffect(() => {
    if (!levelId) return;
    dispatch(fetchCoursesData({ level_ids: String(levelId) }));
  }, [dispatch, levelId]);

  useEffect(() => {
    if (!programsData) {
      dispatch(fetchProgramsData());
    }
  }, [dispatch, programsData]);

  useEffect(() => {
    if (!levelName && programsData?.levels && levelId) {
      const found = programsData.levels.find((l) => String(l.id) === String(levelId));
      if (found) {
        setLevelName(found.name);
      }
    }
  }, [programsData, levelId, levelName]);

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
    <div className="flex flex-col bg-background">
      <Seo pageKey={"program"} />

      {/* hero */}
      <div className="w-full">
        <div
          className="relative w-full h-64 md:h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1900&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">
              <span className="text-yellow-400">Level</span> Details
            </h1>
            <p className="mt-4 text-white max-w-2xl">
              Browse courses by academic level.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 w-full">
        <div className="bg-white border-b border-border p-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {levelName || "Unknown"}
            </h1>
            <button
              className="text-sm text-purple-700 underline"
              onClick={() => router.push('/courses')}
            >
              Back to courses
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {displayedCourses.map((course: Course) => {
            const safeCourse = {
              ...course,
              id: typeof course.id === "string" ? Number(course.id) : course.id,
              name: course.name || "",
              slug: course.slug || "",
              image_path: course.image_path || "",
            };
            return (
              <div key={safeCourse.id}>
                <JsonLdCourse course={safeCourse} />
                <CourseCard course={safeCourse} />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
