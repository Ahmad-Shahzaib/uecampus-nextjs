"use client";
import Image from "next/image";
import loader from "../../../../public/assets/loader-ue.gif";


type LoaderProps = {
  size?: number;
  text?: string;
};

export default function Loader({ size = 96, text = "Loading..." }: LoaderProps) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-4">
          <div
            className="rounded-full border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{ width: size, height: size }}
            aria-hidden
          >
            <Image src={loader} alt="Loading..." width={size} height={size} />
          </div>
          {text ? (
            <div className="text-white text-base font-medium tracking-wide">{text}</div>
          ) : null}
        </div>
      </div>
    );
  }