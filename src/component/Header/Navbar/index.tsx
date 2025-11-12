// NavigationSection.tsx
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  mobile?: boolean;
};

const NavigationSection: React.FC<Props> = ({ mobile = false }) => {
  const [aboutOpen, setAboutOpen] = useState(false);

  if (mobile) {
    return (
      <ul className="flex flex-col gap-3 w-full text-gray-800 font-medium">
        <li className="relative">
          <button
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen((s) => !s)}
            className="w-full flex items-center justify-between py-2 px-1 border-b border-gray-100"
          >
            <span>About Us</span>
            <span className="ml-2">
              {aboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {aboutOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="block py-1 hover:text-purple-600 transition-colors"
                >
                  About UeCampus
                </Link>
              </li>
              <li>
                <Link
                  href="/accreditation-partners"
                  className="block py-1 hover:text-purple-600 transition-colors"
                >
                  Accreditation &amp; Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="block py-1 hover:text-purple-600 transition-colors"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="border-b border-gray-100">
          <Link href="/courses" className="block py-2">
            Programmes & Diploma
          </Link>
        </li>
        <li className="border-b border-gray-100">
          <Link href="/scholarship" className="block py-2">
            Scholarship
          </Link>
        </li>
        <li className="border-b border-gray-100">
          <Link href="/contact-us" className="block py-2">
            Contact Us
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-800 hover:text-purple-600 font-medium">
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-5 w-[280px]">
              <NavigationMenuLink asChild>
                <Link href="/about-us" className="hover:text-purple-600 transition-colors">
                  About UeCampus
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/accreditation-partners" className="hover:text-purple-600 transition-colors">
                  Accreditation &amp; Partners
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/faqs" className="hover:text-purple-600 transition-colors">
                  Frequently Asked Questions
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/courses" className="text-gray-800 hover:text-purple-600 font-medium py-2">
              Programmes & Diploma
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/scholarship" className="text-gray-800 hover:text-purple-600 font-medium py-2">
              Scholarship
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact-us" className="text-gray-800 hover:text-purple-600 font-medium py-2">
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationSection;