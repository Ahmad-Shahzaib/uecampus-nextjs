import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const NavigationSection = ({ mobile = false }) => {
  if (mobile) {
    return (
      <ul className="flex flex-col gap-3 w-full text-gray-800 font-medium">
        <li>About Us</li>
        <li>Programmes & Diploma</li>
        <li>Scholarship</li>
        <li>Contact Us</li>
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
              <NavigationMenuLink href="/about-us">About UeCampus</NavigationMenuLink>
              <NavigationMenuLink href="/accreditation-partners">Accreditation & Partners </NavigationMenuLink>
              <NavigationMenuLink href="/faqs">Frequently Asked Questions</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/programmes">
            Programmes & Diploma
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/scholarship">
            Scholarship
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/contact-us">Contact Us</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationSection;
