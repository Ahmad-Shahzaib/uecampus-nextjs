import { FeatureCardProps } from "@/component/testinomials/testinomials-card";

type HeroSection = FeatureCardProps;

export const FEATURE_CARDS: FeatureCardProps[] = [
    {
        title: "Study Anytime, Anywhere",
        description:
            "Learn without limits. UeCampus brings you education that fits your world at any place, any time, on your terms.",
        variant: "primary",
    },
    {
        title: "Internationally Recognised Degrees",
        description:
            "Degrees that travel with you. UeCampus offers globally respected qualifications designed to open doors, wherever your journey takes you.",
        variant: "secondary",
    },
    {
        title: "Affordability & Accessibility",
        description:
            "Quality education that's within reach, because opportunity shouldn't cost a fortune for deserving students like you.",
        variant: "tertiary",
    },
]



export const PARTNER_LOGOS = [
    {
        id: "walsh-college",
        name: "Walsh College",
        src: "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-1.png",
        alt: "Walsh College",
    },
    {
        id: "cacp",
        name: "CACP",
        src: "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-2.png",
        alt: "CACP",
    },
    {
        id: "wes",
        name: "World Education Services",
        src: "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-3.png",
        alt: "World Education Services",
    },
    {
        id: "cie",
        name: "CIE European Business School",
        src: "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-4.png",
        alt: "CIE European Business School",
    },
    {
        id: "qualifi",
        name: "QUALIFI Approved Centre",
        src: "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-5.png",
        alt: "QUALIFI Approved Centre",
    },
    {
        id: "ppa",
        name: "PPA Business School",
        src: "	https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/card-logo-6.png",
        alt: "PPA Business School",
    },

]
export const HeroSection_ue: HeroSection[] = [
    {
        title: "Earn Your Degree Anytime, Anywhere with UECampus!",
        description:
            "Flexible, fully accredited programs designed to fit your lifestyle—study online, advance your career, and achieve your goals without boundaries",
        variant: "primary",
    },

]


import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export const SOCIAL_LINKS = [
    {
        name: "Facebook",
        href: "https://facebook.com",
        icon: Facebook,
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        icon: Twitter,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin,
    },
    {
        name: "Instagram",
        href: "https://instagram.com",
        icon: Instagram,
    },
]

export const FOOTER_LINKS = {
    quickLinks: [
        { name: "About Us", href: "/about" },
        { name: "Accreditation & Partners", href: "/accreditation" },
        { name: "Frequently Asked Questions", href: "/faq" },
        { name: "Scholarships", href: "/scholarships" },
    ],
    programs: [
        { name: "Walsh Programmes", href: "/programs/walsh" },
        { name: "PPA Programmes", href: "/programs/ppa" },
        { name: "eie Business School", href: "/programs/eie" },
        { name: "Qualifi Diplomas", href: "/programs/qualifi" },
    ],
}


export const CoursesSection_ue = [
    {
        heading: "Want to know more about our courses?",
        description:
            "Discover programs tailored to your ambitions. From business to technology, our diverse course offerings empower you to excel in your chosen field.",
        variant: "primary",
    }
    , {
        name: "Artificial Intelligence",
        title: "MSc in AI and Machine Learning - Walsh College",
        detail: "This MSc programme combines theoretical foundations with advanced skills in artificial intelligence, deep learning, and neural networks.",
        image: "https://newwebsite.uecampus.com/wp-content/uploads/2025/08/19.jpg"

    },
    {
        name: "Cyber Security",
        title: "MSc in Cyber Security - Walsh College",
        detail: "This MSc programme provides advanced knowledge in cyber security, risk management, and information assurance to protect digital assets.",
        image: "https://newwebsite.uecampus.com/wp-content/uploads/2025/08/featured-thumbnauil-9.jpg"

    }
    , {
        name: "Business Administration",
        title: "MBA in Business Administration - Walsh College",
        detail: "This MBA programme focuses on leadership, strategic management, and business innovation to prepare students for executive roles.",
        image: "https://newwebsite.uecampus.com/wp-content/uploads/2025/08/featured-thumbnail-26.jpg"
    }, {
        name: "Data Science",
        title: "MSc in Data Science - Walsh College",
        detail: "This MSc programme offers expertise in data analysis, statistical modeling, and big data technologies to drive informed decision-making.",
        image: "https://newwebsite.uecampus.com/wp-content/uploads/2025/10/Website-Body-2.png"
    }
]




export const studentLocations = [
    { id: "1", country: "France", lat: 46.2276, lng: 2.2137, color: "#FBBF24" },
    { id: "2", country: "Turkey", lat: 38.9637, lng: 35.2433, color: "#EC4899" },
    { id: "3", country: "Indonesia", lat: -0.7893, lng: 113.9213, color: "#EC4899" },
    { id: "4", country: "Malaysia", lat: 4.2105, lng: 101.6964, color: "#EC4899" },
    { id: "5", country: "China", lat: 35.8617, lng: 104.1954, color: "#FBBF24" },
]