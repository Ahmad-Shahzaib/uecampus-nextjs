import React from "react";

interface CircularImageProps {
  imageUrl: string;
  alt?: string;
  imageStyles?:string;
  imageContainer?:string;
}

const CircularImage = ({ imageUrl, alt = "Student",imageStyles="w-full md:w-1/2 h-auto flex items-center justify-center",
  imageContainer="max-w-md"
 }: CircularImageProps) => {
  return (
    <div className={imageStyles}>
      <div className={`relative w-full ${imageContainer} rounded-lg overflow-hidden shadow-xl`}>
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