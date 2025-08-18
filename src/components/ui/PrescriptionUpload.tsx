"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Button from "./Button";
import { Upload } from "@/assets/svg/Upload";
import { Camera } from "@/assets/svg/Camera";

// Props accepted by this component
interface PrescriptionUploadProps {
  onSubmit?: (file: File) => void; // optional callback when file is submitted
}

// Structure to hold file info
interface FileData {
  url: string | null; // preview URL for images
  name: string; // file name
  file: File | null; // actual file object
}

// Tailwind classes grouped together for easy reading
const styles = {
  wrapper:
    "min-h-screen w-full flex flex-col items-center justify-start pt-28 bg-[#E6F7FF] gap-10 font-[Roboto,sans-serif]",
  title: "text-2xl font-bold mb-6 text-[#096dd9]",
  uploadBox:
    "border-2 border-dashed border-[#096dd9] rounded-lg p-8 flex flex-col items-center gap-4 bg-white w-full max-w-md mx-5",
  fileName: "mt-2 text-sm text-gray-700",
  previewContainer: "mt-4",
};
function PrescriptionUpload({ onSubmit }: PrescriptionUploadProps) {
  // Refs to hidden input fields (file picker + camera)
  const filePickerRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // State to store selected file data
  const [fileData, setFileData] = useState<FileData>({
    url: null,
    name: "",
    file: null,
  });

  // Submitting state (to disable buttons while uploading)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When a file is selected, store it and create a preview URL if it's an image
  const handleFileSelect = (file: File) => {
    const objectUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setFileData({
      name: file.name,
      url: objectUrl,
      file: file,
    });
  };

  // Handle input file changes (from picker or camera)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // get first file
    if (file) handleFileSelect(file);
  };

  // Discard selected file
  const discardFile = () => {
    if (fileData.url) URL.revokeObjectURL(fileData.url); // free memory
    setFileData({ name: "", url: null, file: null });
  };

  // Submit file to API
  const handleSubmit = async () => {
    if (!fileData.file) return;

    setIsSubmitting(true);

    try {
      // Call parent callback (if provided)
      onSubmit?.(fileData.file);

      // Upload to API
      const formData = new FormData();
      formData.append("prescription", fileData.file);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (fileData.url) URL.revokeObjectURL(fileData.url);
    };
  }, [fileData.url]);

  const hasFile = Boolean(fileData.file);

  return (
    <>
      <Header />


      <div className={styles.wrapper}>
<div className="mx-[20px] rounded-[20px] bg-gradient-to-r from-[#3070E7] via-[#16BDEB] via-[#FF007F] to-[#FF9000] p-[2px] h-[95px] w-90 box-border flex-shrink-0">
  <div className="flex items-center justify-center gap-2 rounded-[18px] bg-white ml-[1] py-2 h-[90px] w-full ">
    <span className="text-base font-normal text-black">
      Please scan or select ID
    </span>
  </div>
</div>



        {/* --- When NO file is selected --- */}
        {!hasFile && (
          <div className="flex justify-center gap-4">
            {/* Scan (use camera) */}
            <Button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: Camera({ fill: "#096DD9" }),
                }}
              />
              Scan
            </Button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />

            {/* Select from files */}
            <Button
              type="button"
              onClick={() => filePickerRef.current?.click()}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: Upload({ fill: "#096DD9" }),
                }}
              />
              Select
            </Button>
            <input
              ref={filePickerRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* --- When a file IS selected --- */}
        {hasFile && (
          <>
            <div className={styles.previewContainer}>
              {/* If image then show preview, else just show file name */}
              {fileData.url ? (
                <Image
                  src={fileData.url}
                  alt="Prescription Preview"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  PDF file selected: {fileData.name}
                </div>
              )}
            </div>

            <div className={styles.fileName}>{fileData.name}</div>

            {/* Discard button */}
            <Button onClick={discardFile} disabled={isSubmitting} type="button">
              Discard / Retry
            </Button>

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default PrescriptionUpload;
