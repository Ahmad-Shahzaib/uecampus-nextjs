// src/components/VideoCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Share2 } from "lucide-react";
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

  // Extract YouTube URL
  const youtubeUrl = about?.youtubeVideo; 
  const videoId = youtubeUrl 
    ? youtubeUrl 
    : youtubeUrl 

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  if (isLoading || !about) {
    return (
      <Card className="bg-purple-700 border-0 shadow-lg rounded-2xl overflow-hidden animate-pulse">
        <CardContent className="p-0">
          <div className="aspect-video lg:h-80  bg-purple-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video lg:aspect-auto lg:h-80">
          {/* Embedded YouTube Video */}
          <iframe
            src={embedUrl}
            title="UeCampus Student Testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />

          {/* Overlay Play Button (Optional - for thumbnail feel) */}
          <div className="absolute inset-0 flex items-center justify-center bg-purple-600/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
               onClick={() => window.open(youtubeUrl, "_blank")}>
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-70" />
              <div className="relative w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 text-white fill-white ml-2" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0  p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm "
              size="sm"
              onClick={() => window.open(youtubeUrl, "_blank")}
            >
              Watch on YouTube
            </Button>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                <span className="text-white text-sm font-medium">Watch Later</span>
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Title Badge */}
          <div className="absolute top-0 left-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/40" />
            <span className="text-white text-sm font-semibold">
              Why study at UeCampus? | Student Testimonial
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}