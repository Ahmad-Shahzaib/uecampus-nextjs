import React from 'react'

const HeroSection = ({
    title,
    description,
    variant,
}: {
    title: string
    description: string
    variant: "primary" | "secondary" | "tertiary"
}) => {
    return (
        <div className="relative w-[90%] h-[500px] flex items-center content-center mx-auto justify-center overflow-hidden rounded-lg">
            {/* Background Video – CENTERED */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://newwebsite.uecampus.com/wp-content/uploads/2025/09/video-banner.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Content */}
            <div
                className={`relative z-10 text-center px-6 sm:px-8 ${variant === "primary"
                    ? "text-white"
                    : variant === "secondary"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
            >
                <div className='w-1/2 mx-auto'>
                    <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl whitespace-pre-line">
                        {title}
                    </h1>
                </div>
                <p className="mt-6 max-w-2xl mx-auto text-lg whitespace-pre-line">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default HeroSection