import React from "react";

const BannerImage = () => {
  return (
    <div
      className="relative rounded-2xl  w-full h-[60vh] bg-cover bg-center flex items-center justify-start text-white"
      style={{
        backgroundImage:
          "url('https://newwebsite.uecampus.com/wp-content/uploads/2025/08/thumbnail-1.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute rounded-2xl inset-0 bg-black/50"></div>

      {/* Content */}
      <h1 className="relative text-4xl md:text-6xl font-bold drop-shadow-lg pl-7">
        About UeCampus
      </h1>
    </div>
  );
};

export default BannerImage;
