"use client";
import React from "react";
import { GlassButton } from "../../../components/ui/GlassButton";
import { DateOfBirthButton } from "../../../components/ui/DateOfBirthButton";
import CloudLogo from "../../../assets/images/cloudBG.png";
import MainLogo from "../../../assets/images/accessFormLogo.png";

export const MobileAccessForm = () => {
  return (
    <div className="min-h-screen w-full bg-[#bae7ff] relative flex flex-col overflow-hidden">
      {/* Background Cloud */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={CloudLogo.src}
          alt="Background Cloud"
          className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[100%]  opacity-50 object-contain"
        />
      </div>

      {/* Logo/Image */}
      <div className="flex justify-center pt-[50px] z-10">
        <img
          src={MainLogo.src}
          alt="Main Logo"
          className="w-[160px] h-[160px] object-contain"
        />
      </div>

      {/* Glass Buttons Container */}
      <div className="flex justify-center gap-8 mt-[98px] px-8 z-10">
        <GlassButton text="BIKE" backgroundColor="bg-[#D6F1FF40]" />
        <GlassButton text="TREE" backgroundColor="bg-[#D6F1FF40]" />
        <GlassButton text="CASTLE" backgroundColor="bg-[#D6F1FF40]" />
      </div>

      {/* Date of Birth Button */}
      <div className="mt-40 mb-16 z-10 flex justify-center">
        <DateOfBirthButton />
      </div>
    </div>
  );
};

export default MobileAccessForm;
