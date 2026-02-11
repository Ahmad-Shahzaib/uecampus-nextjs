"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // from shadcn utils

type ImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    rounded?: boolean;
    shadow?: boolean;
    aspectRatio?: "square" | "video" | "wide" | "auto";
    className?: string;
    loading?: "lazy" | "eager";
    priority?: boolean;
    fallback?: string;
};

export function ImageCard({
    src,
    alt,
    width = 500,
    height = 300,
    rounded = true,
    shadow = false,
    aspectRatio = "auto",
    className,
    loading = "lazy",
    priority = false,
    fallback = "/placeholder.png", // optional fallback
}: ImageProps) {
    const [imgSrc, setImgSrc] = React.useState(src);

    // Aspect ratio mapping
    const aspectClasses = {
        square: "aspect-square",
        video: "aspect-video",
        wide: "aspect-[3/1]",
        auto: "",
    };

    return (
        <div
            className={cn(
                "overflow-hidden relative",
                rounded && "rounded-xl",
                shadow && "shadow-md",
                aspectClasses[aspectRatio],
                className
            )}
        >
            <Image
                src={imgSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? "eager" : loading}
                priority={priority}
                onError={() => setImgSrc(fallback)}
                className={cn("object-cover transition-transform hover:scale-105", className)}
            />
        </div>
    );
}
