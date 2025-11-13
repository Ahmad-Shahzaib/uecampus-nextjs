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
    const paramValue = searchParams.get(paramKey);
    const currentIds = new Set<number>(
      paramValue
        ? paramValue
            .split(",")
            .map((v) => parseInt(v.trim(), 10))
            .filter((n) => !Number.isNaN(n))
        : []
    );

    if (currentIds.has(filterId)) {
      currentIds.delete(filterId);
    } else {
      currentIds.add(filterId);
    }

    const selectedIds = Array.from(currentIds).sort((a, b) => a - b);
    const params = new URLSearchParams(searchParams.toString());
    if (selectedIds.length > 0) {
      params.set(paramKey, selectedIds.join(","));
    } else {
      params.delete(paramKey);
    }

    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  const isFilterSelected = (paramKey: string, filterId: number) => {
    const paramValue = searchParams.get(paramKey);
    if (!paramValue) return false;
    return paramValue
      .split(",")
      .map((v) => parseInt(v.trim(), 10))
      .filter((n) => !Number.isNaN(n))
      .includes(filterId);
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
  ].filter((config) => config.items.length > 0);

  const hasFilters = filterConfigs.length > 0;

  return (
    <aside className="sm:w-56 flex-full shrink-0">
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-bold mb-6 text-purple-800">
          Filter Courses
        </h2>

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
              <h3 className="font-semibold text-purple-800 mb-3">{title}</h3>
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
