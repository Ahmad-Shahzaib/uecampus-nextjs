"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2 } from "lucide-react"

export function VideoCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video lg:aspect-auto lg:h-80 bg-gradient-to-br from-purple-600 to-purple-900 flex flex-col items-center justify-center">
          {/* Video Placeholder Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-purple-900/50" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-6">
            {/* Video Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/40" />
              </div>
              <span className="text-white text-sm font-medium">
                Why study at UeCampus? | Student Testimonial | Part 1
              </span>
            </div>

            {/* Play Button */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50" />
                <button className="relative w-20 h-20 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mt-4">
              <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">UECAMPUS</h3>
              <p className="text-white/80 text-sm lg:text-base mt-2 tracking-widest">STUDENT TESTIMONIAL</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-6 flex items-center justify-between">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 gap-2 bg-transparent"
              size="sm"
            >
              <span>Watch on YouTube</span>
            </Button>

            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-white text-sm">Watch Later</span>
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
