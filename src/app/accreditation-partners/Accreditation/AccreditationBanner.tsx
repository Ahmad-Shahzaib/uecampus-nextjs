import React from "react";

interface BannerProps {
  imageUrl?: string;
  title: string;
}

const AccreditationBanner = ({ imageUrl, title }: BannerProps) => {
  console.log("AccreditationBanner imageUrl:", imageUrl);

  return (
    <div className="relative rounded-2xl w-full h-[40vh] flex items-center justify-start text-white overflow-hidden">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-r from-purple-700 to-purple-900" />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none"></div>
      {/* Content */}
      <h1 className="relative z-10 text-4xl md:text-4xl lg:text-6xl font-medium drop-shadow-lg sm:text-3xl pl-2  lg:pl-10 sm:pl-3 ">
        {title}
      </h1>
    </div>
  );
};

export default AccreditationBanner;