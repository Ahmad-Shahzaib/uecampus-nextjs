// LogoSection.tsx
import { ImageCard } from '@/components/ui/ImageCard'
import React from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import logo from '../../../../public/assets/uecampus-logo.webp';

const LogoSection = () => {
    const router = useRouter();
    
    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push("/")}
        >
            <Image 
                src={logo}
                alt="UeCampus Logo" 
                width={150} 
                height={50}
                priority
                className="w-[150px] h-[50px] object-contain"
            />
        </div>
    )
}

export default LogoSection