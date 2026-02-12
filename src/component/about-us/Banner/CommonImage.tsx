import React from "react";
import Image from "next/image";

interface CircularImageProps {
  imageUrl: string;
  alt?: string;
  imageStyles?: string;
  imageContainer?: string;
}

const CircularImage = ({ 
  imageUrl, 
  alt = "Student",
  imageStyles = "w-full md:w-1/2 h-auto flex items-center justify-center",
  imageContainer = "max-w-md"
}: CircularImageProps) => {
  // Only render the image if imageUrl is not empty
  if (!imageUrl) {
    return (
      <div className={imageStyles}>
        <div className={`relative w-full ${imageContainer} rounded-lg overflow-hidden shadow-xl bg-gray-300 flex items-center justify-center`}>
          <span className="text-gray-600">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={imageStyles}>
      <div className={`relative w-full ${imageContainer} rounded-lg overflow-hidden shadow-xl`}>
        <Image
          src={imageUrl}
          alt={alt}
          layout="responsive"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default CircularImage;