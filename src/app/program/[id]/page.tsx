"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchCoursesData } from "@/redux/thunk/courses";import { fetchProgramsData } from "@/redux/thunk/programsThunk";import Loader from "@/components/common/Loader";
import CourseCard from "@/component/Courses/courses-card";
import PaginationComponent from "@/component/Courses/pagination";
import Seo from "@/component/common/Seo";

export default function ProgramPage() {
  const params = useParams();
  const programId = params?.id;
  const dispatch = useDispatch();
  const { data: courses = [], isLoading, error } = useSelector((state: RootState) => state.courses);
  const programsData = useSelector((state: RootState) => state.programs.data);
  const searchParams = useSearchParams();
  const [programName, setProgramName] = useState<string>("");
  const [academicYearName, setAcademicYearName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(1);
    // clear derived names so they can be recomputed for the new program id
    setProgramName("");
    setAcademicYearName("");
  }, [programId]);

  useEffect(() => {
    if (!programId) return;
    dispatch(fetchCoursesData({ program_type_ids: String(programId) }));
  }, [dispatch, programId]);

  // ensure programs list is loaded so we can resolve program name
  useEffect(() => {
    if (!programsData) {
      dispatch(fetchProgramsData());
    }
  }, [dispatch, programsData]);

  // derive program name: prefer course-level program_type_name, fall back to programs list or program types
  useEffect(() => {
    if (courses.length > 0) {
      const pn = courses[0]?.program_type_name;
      if (pn) {
        setProgramName(pn);
        return;
      }
    }

    if (!programName && programsData) {
      // try explicit programs list first (when available)
      const foundProgram = programsData.programs?.find((p) => String(p.id) === String(programId));
      if (foundProgram) {
        setProgramName(foundProgram.name);
        return;
      }

      // fallback to programTypes (filters) — these are used when user navigates by program type id
      const foundType = programsData.programTypes?.find((p) => String(p.id) === String(programId));
      if (foundType) {
        setProgramName(foundType.name);
        return;
      }
    }
  }, [courses, programsData, programId, programName]);

  // derive academic year name from search params and programs data
  useEffect(() => {
    const ayParam =
      searchParams?.get("academic_year_ids") ||
      searchParams?.get("academic_year_id") ||
      searchParams?.get("academic_year");

    if (!ayParam) {
      setAcademicYearName("");
      return;
    }

    const firstId = String(ayParam).split(",")[0];
    if (programsData?.academicYears) {
      const found = programsData.academicYears.find((a) => String(a.id) === String(firstId));
      if (found) {
        setAcademicYearName(found.name);
        return;
      }
    }

    // fallback: clear if not found
    setAcademicYearName("");
  }, [searchParams, programsData]);

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
    <div className="flex flex-col   bg-background">
      <Seo pageKey={"program"} />

      {/* Hero / banner with background image and overlay text */}
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
              <span className="text-yellow-400">Program</span> Details
            </h1>
            <p className="mt-4 text-white max-w-2xl">
              Be inspired by the latest trends that shape the world. Be the next one!
            </p>
          </div>
        </div>

         
      </div>

      <div className="p-8 w-full">
        <div className="bg-white border-b border-border p-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold"> {programName || "Unknown"}{academicYearName ? ` — ${academicYearName}` : ""}</h1>
            <button
              className="text-sm text-purple-700 underline"
              onClick={() => router.push('/courses')}
            >
              Back to courses
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
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
