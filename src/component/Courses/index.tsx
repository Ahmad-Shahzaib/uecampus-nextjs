import { Button } from '@/components/ui/button';
import React from 'react'

const CouresSection = ({
    title,
    description,
    variant,
}: {
    title: string;
    description: string;
    variant: "primary" | "secondary" | "tertiary " | string;
}) => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-box-line-background.png')",
            }}
        >
            <div className="flex justify-between items-center gap-6">
                <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }}></h2>
                    <p className="text-lg text-gray-700">{description}</p>
                </div>
                <div>
                    <Button>
                        Explore Courses
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default CouresSection
