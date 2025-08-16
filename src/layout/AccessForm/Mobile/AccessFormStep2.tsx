"use client";

import React, { useState } from "react";
import { PrescriptionUpload } from "../../../components/ui/PrescriptionUpload";

const AccessFormStep2Mobile: React.FC<{ onPrescriptionSaved?: (file: File) => void }> = ({ onPrescriptionSaved }) => {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const handlePrescriptionUpload = (file: File) => {
    setPrescriptionFile(file);
    console.log("Prescription file saved for backend:", file);
    onPrescriptionSaved?.(file);
  };

  return (
    <PrescriptionUpload onUpload={handlePrescriptionUpload} />
  );
};

export default AccessFormStep2Mobile;
