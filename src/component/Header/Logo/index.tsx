// LogoSection.tsx
import { ImageCard } from '@/components/ui/ImageCard'
import React from 'react'
import { useRouter } from "next/navigation";

const LogoSection = () => {
    const router = useRouter();
    
    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push("/")}
        >
            <ImageCard 
                src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/uecampus-logo.png" 
                alt="UeCampus Logo" 
                width={150} 
                height={50} 
            />
        </div>
    )
}

export default LogoSection