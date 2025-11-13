import { AppDispatch, RootState } from "@/redux/store";
import { fetchHowToApplyData } from "@/redux/thunk/howToApply";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export function HeroContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.howToApply);

  useEffect(() => {
    dispatch(fetchHowToApplyData());
  }, [dispatch]);

  if (!data) return null;

  // Extract sectionTitle to make the dependency clearer
  const sectionTitle = data.sectionTitle;

  // Split title into exactly 2 lines: first word | rest
  const titleLines = useMemo(() => {
    if (!sectionTitle) return [];

    const words = sectionTitle.trim().split(/\s+/);
    if (words.length === 0) return [];

    const firstLine = words[0];
    const secondLine = words.slice(1).join(" ");

    return secondLine ? [firstLine, secondLine] : [firstLine];
  }, [sectionTitle]); // Only depends on sectionTitle

  return (
    <div className="text-white space-y-6 text-center md:text-left px-4">
      {titleLines.length > 0 && (
        <h1 className="font-sans tracking-tight">
          {titleLines[0] && (
            <div className="text-5xl md:text-6xl font-semibold">
              {titleLines[0]}
            </div>
          )}

          {titleLines[1] && (
            <div className="text-5xl md:text-6xl font-semibold ">
              {titleLines[1]}
            </div>
          )}
        </h1>
      )}

      <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto md:mx-0">
        {data.description}
      </p>
    </div>
  );
}