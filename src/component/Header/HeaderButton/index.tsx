import { Button } from "@/components/ui/button";
import React from "react";

const ButtonSection = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="border-purple-600 text-purple-700">
        Student Portal
      </Button>
      <Button className="bg-purple-700 hover:bg-purple-800 text-white">
        Enquire Now
      </Button>
    </div>
  );
};

export default ButtonSection;
