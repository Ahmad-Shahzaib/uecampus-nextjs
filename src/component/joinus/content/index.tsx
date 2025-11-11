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

  // Memoize based on a safe, primitive dependency
  const sectionTitle = data?.sectionTitle ?? "";
  const titleLines = useMemo(() => {
    if (!sectionTitle) return [];

    const words = sectionTitle.trim().split(/\s+/);
    const lines: string[] = [];

    if (words[0]) lines.push(words[0]);
    if (words[1]) lines.push(words[1]);
    const line3 = words.slice(2, 5).join(" ");
    if (line3) lines.push(line3);
    const line4 = words.slice(5).join(" ");
    if (line4) lines.push(line4);

    return lines;
  }, [sectionTitle]);

  if (!data) return null;

  return (
    <div className="text-white space-y-6 text-center md:text-left">
      <h1 className="font-sans tracking-tight leading-tight">
        {titleLines[0] && (
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            {titleLines[0]}
          </div>
        )}

        {titleLines[1] && (
          <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-purple-100">
            {titleLines[1]}
          </div>
        )}

        {titleLines[2] && (
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            {titleLines[2]}
          </div>
        )}

        {titleLines[3] && (
          <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            {titleLines[3]}
          </div>
        )}
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto md:mx-0">
        {data.description}
      </p>
    </div>
  );
}