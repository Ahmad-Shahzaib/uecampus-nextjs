"use client";
import LogoSection from './Logo'
import NavigationSection from './Navbar'
import ButtonSection from './HeaderButton'
import { useEffect, useState } from 'react';

const HeaderSection = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header className={`fixed flex items-center justify-between py-4 top-0  z-50 bg-white shadow-md  ${isScrolled ? "left-4 right-4 top-2 px-24 rounded-2xl shadow-md" : " left-0 px-12 w-full rounded-none"}`}>
            <LogoSection />
            <NavigationSection />
            <ButtonSection />
        </header>
    )
}

export default HeaderSection