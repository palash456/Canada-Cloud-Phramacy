"use client"

import React, { useState } from "react";
import { GlassButton } from "../../../components/ui/GlassButton";
import { DateOfBirthButton } from "../../../components/ui/DateOfBirthButton";
import AccessFormStep2Mobile from "./AccessFormStep2";
import CloudLogo from "../../../assets/images/cloudBG.png";
import MainLogo from "../../../assets/images/accessFormLogo.png";

// Glass Buttons
const BUTTON_LABELS = ["BIKE", "TREE", "CASTLE"];

const styles = {
  screenWrapper: "min-h-screen w-full bg-[#bae7ff] relative flex flex-col overflow-hidden",
  cloudImage: "absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full opacity-50 object-contain",
  logoWrapper: "flex justify-center pt-[50px] z-10",
  logoImage: "w-[120px] h-[120px] object-contain",
  buttonRow: "flex justify-center gap-8 mt-[98px] px-8 z-10",
  dobButtonWrapper: "mt-40 mb-16 z-10 flex justify-center",
};

export const MobileAccessForm: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dob, setDob] = useState<string>("");
  const [step, setStep] = useState(1);

  // Simulate backend save by logging to console
  const handleDobSave = (newDob: string) => {
    setDob(newDob);
    console.log("DOB saved for backend:", newDob);
    setStep(2);
  };

  if (step === 2) {
    return <AccessFormStep2Mobile />;
  }

  return (
    <div className={styles.screenWrapper}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img src={CloudLogo.src} alt="Background Cloud" className={styles.cloudImage} />
      </div>

      {/* Logo */}
      <div className={styles.logoWrapper}>
        <img src={MainLogo.src} alt="Main Logo" className={styles.logoImage} />
      </div>

      {/* Glass Buttons Section */}
      <div className={styles.buttonRow}>
        {BUTTON_LABELS.map((label, index) => (
          <GlassButton
            key={label}
            text={label}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Date of Birth Button */}
      <div className={styles.dobButtonWrapper}>
        <DateOfBirthButton dob={dob} onSave={handleDobSave} />
      </div>
    </div>
  );
};

export default MobileAccessForm;
