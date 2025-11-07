import React from "react";

interface BannerProps {
  imageUrl: string;
  title: string;
}

const AccreditationBanner = ({ imageUrl, title }: BannerProps) => {
  console.log("AccreditationBanner imageUrl:", imageUrl);

  return (
    <div className="relative rounded-2xl w-full h-[40vh] flex items-center justify-start text-white overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none"></div>
      {/* Content */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-semibold drop-shadow-lg pl-10">
        {title}
      </h1>
    </div>
  );
};

export default AccreditationBanner;