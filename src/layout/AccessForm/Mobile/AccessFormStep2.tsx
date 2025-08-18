"use client";

import React from "react";
import PrescriptionUpload from "../../../components/ui/PrescriptionUpload";

const AccessFormStep2Mobile: React.FC<{ onPrescriptionSaved?: (file: File) => void }> = ({ onPrescriptionSaved }) => {
  const handlePrescriptionSubmit = (file: File) => {
    console.log("Prescription file saved for backend:", file);
    onPrescriptionSaved?.(file);
  };

  return (
    <PrescriptionUpload onSubmit={handlePrescriptionSubmit} />
  );
};

export default AccessFormStep2Mobile;
