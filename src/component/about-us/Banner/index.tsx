import React from "react";

interface BannerProps {
  imageUrl: string;
  title: string;
}

const Banner = ({ imageUrl, title }: BannerProps) => {
  return (
    <div
      className="relative rounded-2xl w-full h-[60vh] bg-cover bg-center flex items-center justify-start text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute rounded-2xl inset-0 bg-black/50"></div>

      {/* Content */}
      <h1 className="relative text-4xl md:text-6xl font-semibold drop-shadow-lg pl-7">
        {title}
      </h1>
    </div>
  );
};

export default Banner;
