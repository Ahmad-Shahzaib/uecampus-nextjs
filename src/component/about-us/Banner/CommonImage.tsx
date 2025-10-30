import React from "react";

interface CircularImageProps {
  imageUrl: string;
  alt?: string;
}

const CircularImage = ({ imageUrl, alt = "Student" }: CircularImageProps) => {
  return (
    <div className="w-full md:w-1/2 h-auto flex items-center justify-center">
      <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-xl">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default CircularImage;