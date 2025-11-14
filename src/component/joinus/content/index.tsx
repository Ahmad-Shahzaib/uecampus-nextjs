import { AppDispatch, RootState } from "@/redux/store";
import { fetchHowToApplyData } from "@/redux/thunk/howToApply";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function HeroContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.howToApply);

  useEffect(() => {
    dispatch(fetchHowToApplyData());
  }, [dispatch]);

  if (!data) return null;

  return (
    <div className="text-white space-y-6 text-center md:text-left px-4 w-full rounded-2xl">

      {/* Title (no splitting, no memo, render directly) */}
      <h1 className="font-sans tracking-tight text-5xl md:text-[93px] leading-tight">
        {data.sectionTitle}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg lg:text-[16px] text-white/90 leading-relaxed  mx-auto md:mx-0">
        {data.description}
      </p>
    </div>
  );
}
