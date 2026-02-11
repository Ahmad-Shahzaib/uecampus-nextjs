"use client";

type LoaderProps = {
  size?: number;
  text?: string;
};

export default function Loader({ size = 96, text = "Loading..." }: LoaderProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-4">
        <div
          className="rounded-full border-4 border-gray-800 shadow-2xl flex items-center justify-center"
          style={{ width: size, height: size }}
          aria-hidden
        >
          <svg
            className="animate-spin"
            width={Math.max(24, Math.floor(size * 0.5))}
            height={Math.max(24, Math.floor(size * 0.5))}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#E5E7EB" strokeWidth="4" opacity="0.25" />
            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="#6A1B9A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {text ? (
          <div className="text-white text-base font-medium tracking-wide">{text}</div>
        ) : null}
      </div>
    </div>
  );
}