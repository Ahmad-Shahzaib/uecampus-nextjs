// ButtonSection.tsx
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const ButtonSection = () => {
   const router = useRouter();

  const enqureNavigation = () => {
    router.push("/enquire-now"); // navigate to /about page
  };
  
  return (
    <div className="flex gap-3">
      <Button 
        onClick={() => router.push("https://app.uecampus.com/login")}
        variant="outline" 
        className="border-[#6a1b9a] border-3 py-5 text-[#6a1b9a] hover:bg-purple-50 rounded-full px-8"
      >
        Student Portal
      </Button>
      <Button 
        onClick={enqureNavigation}
        className="bg-[#6a1b9a] border-0 cursor-pointer hover:bg-purple-800 text-white px-8 py-6"
      >
        Apply Now
      </Button>
    </div>
  );
};

export default ButtonSection;