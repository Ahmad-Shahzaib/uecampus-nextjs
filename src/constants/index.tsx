import { FeatureCardProps } from "@/component/testinomials/testinomials-card";
import { BookOpen, Award, Briefcase, Clock, DollarSign, Users, Zap, Globe } from "lucide-react"
type HeroVariant = "primary" | "secondary" | "tertiary";
type HeroSection = {
  title: string;
  description: string;
  variant: HeroVariant;
};






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



export const faqItems = [
  {
    id: 1,
    question: "What is UeCampus?",
    answer:
      "UeCampus is an online platform offering a wide range of courses and degrees to help you advance your career.",
  },
  {
    id: 2,
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in a course by browsing our catalog, selecting your desired course, and completing the enrollment process through your account.",
  },
  {
    id: 3,
    question: "Are the degrees recognized globally?",
    answer:
      "Yes, our degrees are recognized by leading institutions and employers worldwide, ensuring your credentials are valued globally.",
  },
  {
    id: 4,
    question: "Can I study part-time?",
    answer: "All our courses are designed to be flexible, allowing you to study at your own pace and schedule.",
  },
  {
    id: 5,
    question: "What support is available for students?",
    answer:
      "We provide comprehensive support including 24/7 customer service, academic advisors, technical support, and community forums.",
  },
  {
    id: 6,
    question: "How much does it cost?",
    answer:
      "Pricing varies depending on the course or degree program. We offer flexible payment plans and financial aid options.",
  },
  {
    id: 7,
    question: "Is there a mobile app for studying?",
    answer:
      "Yes, our mobile app is available on both iOS and Android, allowing you to learn on the go anytime, anywhere.",
  },
]


export const features = [
  {
    icon: BookOpen,
    title: "Learn From Anywhere",
    description: "Study from the comfort of your home with flexible online schedules that fit your life.",
  },
  {
    icon: Award,
    title: "Globally Recognized Degrees",
    description: "Earn credentials that are respected by employers and institutions worldwide.",
  },
  {
    icon: Briefcase,
    title: "Career Advancement",
    description: "Gain skills and qualifications that open doors to new job opportunities and promotions.",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Balance work, life, and study with self-paced programs or scheduled classes.",
  },
  {
    icon: DollarSign,
    title: "Affordable Tuition",
    description: "Access quality education without the high cost—many programs offer payment plans.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from experienced instructors with real-world industry knowledge.",
  },
  {
    icon: Zap,
    title: "Certifications & Credentials",
    description: "Get certified along the way to boost your resume before graduation.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Join a diverse student network and collaborate on international projects.",
  },
]

const PartnerCard =[
  {
    imageurl : "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/academic-partners-image.png",
    title: "Our Academic Partners",
    description: "Our partners are at the heart of UeCampus’s commitment to delivering quality education. We collaborate with reputable universities and educational institutions worldwide to co-create and validate our programs, ensuring they meet the highest academic standards.",
    buttonText: "View All Partners",
    
  }
]
