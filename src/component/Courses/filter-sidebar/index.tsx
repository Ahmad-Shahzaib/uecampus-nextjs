"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchProgramsData, Program } from "@/redux/thunk/programsThunk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.programs
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!data) {
      dispatch(fetchProgramsData());
    }
  }, [data, dispatch]);

  const handleCategoryChange = (categoryId: number) => {
    const catIdsParam = searchParams.get("cat_ids");
    const currentIds = new Set<number>(
      catIdsParam
        ? catIdsParam
            .split(",")
            .map((v) => parseInt(v.trim(), 10))
            .filter((n) => !Number.isNaN(n))
        : []
    );

    if (currentIds.has(categoryId)) {
      currentIds.delete(categoryId);
    } else {
      currentIds.add(categoryId);
    }

    const selectedIds = Array.from(currentIds).sort((a, b) => a - b);
    const params = new URLSearchParams(searchParams.toString());
    if (selectedIds.length > 0) {
      params.set("cat_ids", selectedIds.join(","));
    } else {
      params.delete("cat_ids");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

        {!isLoading && !error && data?.length === 0 && (
          <div className="text-sm text-gray-600">No programs available.</div>
        )}

        {!isLoading &&
          !error &&
          data?.map((program: Program) => (
            <div key={program.id} className="mb-8 last:mb-0">
              <h3 className="font-semibold text-purple-800 mb-3">
                {program.name}
              </h3>
              <div className="space-y-3">
                {program.categories.map((category: Program["categories"][number]) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={(() => {
                        const catIdsParam = searchParams.get("cat_ids");
                        if (!catIdsParam) return false;
                        const ids = catIdsParam
                          .split(",")
                          .map((v) => parseInt(v.trim(), 10))
                          .filter((n) => !Number.isNaN(n));
                        return ids.includes(category.id);
                      })()}
                      onCheckedChange={() =>
                        handleCategoryChange(category.id)
                      }
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {category.name}
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
