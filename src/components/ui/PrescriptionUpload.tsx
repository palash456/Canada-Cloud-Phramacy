"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Button from "../ui/Button";
import GuideBanner from "../ui/GuideBanner";
import Camera from "@/assets/svg/Camera";
import Upload from "@/assets/svg/Upload";

// Props accepted by this component
interface PrescriptionUploadProps {
  onSubmit?: (file: File) => void;
}

// Structure to hold file info
interface FileData {
  url: string | null;
  name: string;
  file: File | null;
}

// Tailwind classes grouped together
const styles = {
  wrapper:
    "min-h-screen w-full flex flex-col items-center justify-start bg-[#E6F7FF] font-[Roboto,sans-serif] pt-[120px]",
container: "w-[90%] h-[63vh] flex flex-col items-center justify-between",

  fileName: "mt-2 text-sm text-gray-700",
  previewContainer: "mt-4",
};

function PrescriptionUpload({ onSubmit }: PrescriptionUploadProps) {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [fileData, setFileData] = useState<FileData>({
    url: null,
    name: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (file: File) => {
    const objectUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setFileData({
      name: file.name,
      url: objectUrl,
      file,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const discardFile = () => {
    if (fileData.url) URL.revokeObjectURL(fileData.url);
    setFileData({ name: "", url: null, file: null });
  };

  const handleSubmit = async () => {
    if (!fileData.file) return;

    setIsSubmitting(true);

    try {
      onSubmit?.(fileData.file);

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
        <div className={styles.container}>
          <div className="topSection w-full flex flex-col gap-8">
            <div className="guideBanner">
              <GuideBanner size="md" fullWidth>
                Please scan or select ID
              </GuideBanner>
            </div>

            <div className="actionButtons">
              {/* --- When NO file is selected --- */}
              {!hasFile && (
                <div className="flex justify-center gap-4">
                  {/* Scan (Camera) */}
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Camera fill="#096DD9" />}
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    Scan
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Upload fill="#096DD9" />}
                    onClick={() => filePickerRef.current?.click()}
                  >
                    Select
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
                  {/* <Button
                size="lg"
                icon={<Upload fill="#096DD9" />}
                onClick={() => filePickerRef.current?.click()}
              >
                Select
              </Button> */}

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

                  <Button
                    size="md"
                    onClick={discardFile}
                    disabled={isSubmitting}
                  >
                    Discard / Retry
                  </Button>

                  <Button
                    size="md"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="bottomSection">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => cameraInputRef.current?.click()}
            >
              I don’t have ID
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PrescriptionUpload;
