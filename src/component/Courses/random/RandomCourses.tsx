"use client";

import { useEffect } from "react";
import { ProgramCard } from "@/component/Courses/CourseCard";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchRandomCourses } from "@/redux/thunk/randomCoursesThunk";

const RandomCourses = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.randomCourses
  );

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchRandomCourses());
    }
  }, [dispatch, data.length]);

  const coursesToRender = data.slice(0, 4);

  return (
    <section className="bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-64 rounded-3xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold">View Other Courses</h1>
          <p>
            Explore our wide range of online programs and advance your career
          </p>
        </div>

        {!isLoading && !error && coursesToRender.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coursesToRender.map((course) => (
              <ProgramCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {!isLoading && !error && !coursesToRender.length && (
          <p className="text-center text-gray-500">
            No random courses to display right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default RandomCourses;
