import React from "react";
import Image from "next/image";

interface PrescriptionPreviewProps {
  url: string | null;
  name: string;
}

const PrescriptionPreview: React.FC<PrescriptionPreviewProps> = ({ url, name }) => (
  <div className="mt-4">
    {url ? (
      <Image
        src={url}
        alt="Prescription Preview"
        width={300}
        height={300}
        className="object-contain"
      />
    ) : (
      <div className="text-gray-500 text-sm">
        PDF file selected: {name}
      </div>
    )}
  </div>
);

export default PrescriptionPreview;
