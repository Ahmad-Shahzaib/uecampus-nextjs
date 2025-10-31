import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";



const ButtonSection = () => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="border-purple-600 text-purple-700">
        Student Portal
      </Button>
      <Button onClick={()=>{
        router.push("/enquire-now")
      }}  className="bg-purple-700 cursor-pointer hover:bg-purple-800 text-white">
        Enquire Now
      </Button>
    </div>
  );
};

export default ButtonSection;
