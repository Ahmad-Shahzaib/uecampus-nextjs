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
      <ul className="flex flex-col gap-2 w-full text-gray-800 font-medium relative">
        <li className="relative">
          <button
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen((s) => !s)}
            className="w-full flex items-center text-left py-2 px-1"
          >
            <span>About Us</span>
            <span className="ml-2">
              {aboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {aboutOpen && (
            <ul className="absolute left-0 top-full mt-1 w-[260px] bg-white shadow-lg rounded-lg border border-gray-100 p-4 z-50">
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

        <li>
          <Link href="/courses" className="block py-2">
            Programmes & Diploma
          </Link>
        </li>
        <li>
          <Link href="/scholarship" className="block py-2">
            Scholarship
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="block py-2">
            Contact Us
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[300px]">
              <NavigationMenuLink asChild>
                <Link href="/about-us">About UeCampus</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/accreditation-partners">
                  Accreditation &amp; Partners
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/faqs">Frequently Asked Questions</Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/courses">Programmes & Diploma</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/scholarship">Scholarship</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact-us">Contact Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationSection;
