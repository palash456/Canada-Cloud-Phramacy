"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface PrescriptionUploadProps {
  onUpload: (file: File) => void; // Callback to pass file back to parent
}

interface FileData {
  url: string | null;
  name: string;
}

// ✅ Styles centralized for consistency
const styles = {
  wrapper:
    "min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f5ff]",
  title: "text-2xl font-bold mb-6 text-[#096dd9]",
  uploadBox:
    "border-2 border-dashed border-[#096dd9] rounded-lg p-8 flex flex-col items-center gap-4 bg-white",
  buttonBase:
    "px-6 py-2 rounded font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2",
  buttonPrimary: "bg-[#096dd9] hover:bg-[#3070E7]",
  buttonDanger: "bg-red-500 hover:bg-red-600",
  fileName: "mt-2 text-sm text-gray-700",
};

// 📌 Main Component
export const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({
  onUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<FileData>({ url: null, name: "" });

  // 📌 Handle file selection from input
  const handleFileSelect = useCallback(
    (file: File) => {
      const objectUrl = URL.createObjectURL(file);
      setFileData({ name: file.name, url: objectUrl });
      onUpload(file);
    },
    [onUpload]
  );

  // 📌 Trigger hidden file input
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 📌 Input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  // 📌 Clear file selection
  const discardFile = useCallback(() => {
    if (fileData.url) URL.revokeObjectURL(fileData.url);
    setFileData({ name: "", url: null });
  }, [fileData.url]);

  // 📌 Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (fileData.url) URL.revokeObjectURL(fileData.url);
    };
  }, [fileData.url]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadBox}>
        {/* Title */}
        <h2 className={styles.title}>Upload Prescription</h2>

        {/* Upload button */}
        {!fileData.url && (
          <>
            <button
              className={`${styles.buttonBase} ${styles.buttonPrimary}`}
              onClick={openFilePicker}
            >
              Upload Prescription
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Upload Preview */}
        {fileData.url && (
          <>
            <div className="mt-4">
              <Image
                src={fileData.url}
                alt="Prescription Preview"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <div className={styles.fileName}>{fileData.name}</div>
            <button
              className={`${styles.buttonBase} ${styles.buttonDanger}`}
              onClick={discardFile}
            >
              Discard / Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;
