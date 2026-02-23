"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchProgramsData } from "@/redux/thunk/programsThunk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state: RootState) => state.programs);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!data) {
      dispatch(fetchProgramsData());
    }
  }, [data, dispatch]);

  const handleFilterChange = (paramKey: string, filterId: number) => {
    // special-case several filters that have their own top-level route
    // so the user is taken to a dedicated page instead of staying on
    // /courses with query params. The uncheck behaviour always returns
    // to the main /courses list.
    if (
      paramKey === "program_type_ids" ||
      paramKey === "university_ids" ||
      paramKey === "level_ids" ||
      paramKey === "academic_year_ids"
    ) {
      const idStr = String(filterId);
      const target =
        paramKey === "program_type_ids"
          ? `/program/${idStr}`
          : paramKey === "university_ids"
          ? `/university/${idStr}`
          : paramKey === "level_ids"
          ? `/level/${idStr}`
          : `/academic-year/${idStr}`;

      const params = new URLSearchParams(searchParams.toString());
      const existing = params
        .getAll(`${paramKey}[]`)
        .map((v) => parseInt(v, 10))
        .filter((n) => !Number.isNaN(n));
      const currentIds = new Set<number>(existing);

      if (currentIds.has(filterId)) {
        router.push(`/courses`, { scroll: false });
      } else {
        router.push(target, { scroll: false });
      }

      return;
    }

    // generic handling for other filters (level, university, academic year, etc.)
    const key = `${paramKey}[]`;
    const params = new URLSearchParams(searchParams.toString());

    // gather existing values for this key
    const existing = params
      .getAll(key)
      .map((v) => parseInt(v, 10))
      .filter((n) => !Number.isNaN(n));
    const currentIds = new Set<number>(existing);

    if (currentIds.has(filterId)) {
      currentIds.delete(filterId);
    } else {
      currentIds.add(filterId);
    }

    // remove all previous entries and append updated set
    params.delete(key);
    Array.from(currentIds)
      .sort((a, b) => a - b)
      .forEach((id) => params.append(key, String(id)));

    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  const isFilterSelected = (paramKey: string, filterId: number) => {
    const key = `${paramKey}[]`;
    const values = searchParams.getAll(key);
    return values.some((v) => String(filterId) === v);
  };

  const filterConfigs = [
    {
      title: "Program Types",
      paramKey: "program_type_ids",
      items: data?.programTypes ?? [],
    },
    {
      title: "Universities",
      paramKey: "university_ids",
      items: data?.universities ?? [],
    },
    {
      title: "Levels",
      paramKey: "level_ids",
      items: data?.levels ?? [],
    },
    {
      title: "Academic Years",
      paramKey: "academic_year_ids",
      items: data?.academicYears ?? [],
    },
  ].filter((config) => config.items.length > 0);

  const hasFilters = filterConfigs.length > 0;

  return (
    <aside className="sm:w-56 flex-full shrink-0">
      <Card className="p-6 bg-white">
        <h1 className="text-lg font-bold mb-6 text-purple-800">
          Filter Courses
        </h1>

        {isLoading && (
          <div className="text-sm text-gray-600">Loading programs...</div>
        )}

        {error && (
          <div className="text-sm text-red-500">
            Failed to load programs: {error}
          </div>
        )}

        {!isLoading && !error && data && !hasFilters && (
          <div className="text-sm text-gray-600">No filters available.</div>
        )}

        {!isLoading && !error && hasFilters &&
          filterConfigs.map(({ title, items, paramKey }) => (
            <div key={paramKey} className="mb-8 last:mb-0">
              <h1 className="font-semibold text-purple-800 mb-3">{title}</h1>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`${paramKey}-${item.id}`}
                      checked={isFilterSelected(paramKey, item.id)}
                      onCheckedChange={() =>
                        handleFilterChange(paramKey, item.id)
                      }
                    />
                    <label
                      htmlFor={`${paramKey}-${item.id}`}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Card>
    </aside>
  );
}
