import React from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";

type CouresSectionProps = {
    heading: string;
    description: string;
    variant?: "primary" | "secondary" | "tertiary" | string;
};

const CouresSection: React.FC<CouresSectionProps> = ({
    heading,
    description,
    variant,
}) => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat py-16 px-6 sm:px-10 lg:px-20"
            style={{
                backgroundImage:
                    "url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-box-line-background.png')",
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Text Content */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-2xl text-center lg:text-left">
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4 leading-snug"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    ></h2>
                    <p className="text-gray-700 text-lg mb-6">{description}</p>
                    <Button
                        className={`${variant === "primary"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : variant === "secondary"
                                ? "bg-gray-700 hover:bg-gray-800"
                                : "bg-purple-500 hover:bg-purple-600"
                            } text-white px-6 py-3 text-base font-medium rounded-lg transition-colors`}
                    >
                        Explore Courses
                    </Button>
                </div>

                {/* Program Card */}
                <div className="flex-shrink-0 w-full sm:w-[400px]">
                    <ProgramCard />
                </div>
            </div>
        </section>
    );
};

export default CouresSection;
