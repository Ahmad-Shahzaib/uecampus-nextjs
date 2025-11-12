"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Share2, Clock } from "lucide-react";
import { RootState } from "@/redux/rootReducer";
import { AppDispatch } from "@/redux/store";
import { fetchAboutSectionData } from "@/redux/thunk/aboutSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function VideoCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: about, isLoading } = useSelector(
    (state: RootState) => state.aboutSection
  );

  useEffect(() => {
    if (!about) dispatch(fetchAboutSectionData());
  }, [dispatch, about]);

  // ---------- 1. YouTube URL handling ----------
  const rawUrl = about?.youtubeVideo;
  // Fallback demo video (replace with any video you like)
  const fallbackUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const getVideoId = (url?: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(rawUrl) ?? getVideoId(fallbackUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0`
    : "";
  const watchUrl = rawUrl ?? fallbackUrl;

  // ---------- 2. Loading skeleton ----------
  if (isLoading || !about) {
    return (
      <Card className="bg-purple-700 border-0 shadow-lg rounded-2xl overflow-hidden animate-pulse h-full">
        <CardContent className="p-0 h-full">
          <div className="aspect-video w-full h-full bg-purple-600" />
        </CardContent>
      </Card>
    );
  }

  // ---------- 3. Main component ----------
  return (
    <Card className="bg-[#6a1b9a] border-0 shadow-lg rounded-2xl overflow-hidden h-full">
      <CardContent 
        className="p-0 h-full relative"
        style={{
          backgroundImage: `url('https://i.ytimg.com/vi_webp/_fjTVWZ2BiA/sddefault.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Purple overlay */}
        <div className="absolute " />
        
        <div className="relative h-full w-full flex flex-col">
          {/* Top bar with title and action buttons */}
          <div className="p-4 flex justify-between items-start">
            {/* Title */}
            <div className="text-white">
              <h3 className="text-lg font-bold">Why study at UeCampus?</h3>
              <p className="text-sm opacity-80">Student Testimonial | Part 1</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Clock className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Center content - Main text and play button */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            {/* <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white">UECAMPUS</h1>
              <p className="text-xl md:text-2xl text-white/90">STUDENT TESTIMONIAL</p>
            </div>
             */}
            {/* Red play button */}
            <div 
              className="relative cursor-pointer"
              onClick={() => window.open(watchUrl, "_blank")}
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
          
          {/* Bottom content - Watch on YouTube button */}
          <div className="p-4">
            <Button 
              // variant="outline" 
              className="bg-gray-900 rounded py-6 px-6 text-white border-0 hover:bg-black hover:text-white"
              onClick={() => window.open(watchUrl, "_blank")}
            >
              Watch on YouTube
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}