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
    <div className="text-white  space-y-6 text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight">
          {data?.sectionTitle}
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto md:mx-0">
        {data?.description}
      </p>
    </div>
  )
}
