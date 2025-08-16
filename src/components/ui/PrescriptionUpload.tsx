"use client";

import React, { useRef, useState } from "react";
import FullScreenCamera from "./FullScreenCamera";

const styles = {
  wrapper: "min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f5ff]",
  title: "text-2xl font-bold mb-6 text-[#096dd9]",
  uploadBox: "border-2 border-dashed border-[#096dd9] rounded-lg p-8 flex flex-col items-center gap-4 bg-white",
  button: "px-6 py-2 rounded bg-[#096dd9] text-white font-semibold hover:bg-[#3070E7] transition",
  preview: "mt-4 max-w-xs max-h-60 border border-gray-300 rounded-lg",
  fileName: "mt-2 text-sm text-gray-700",
};

export const PrescriptionUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onUpload(file);
    }
  };



  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleScanClick = () => {
    setShowCamera(true);
  };

  const handleCameraCapture = (file: File) => {
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className={styles.wrapper}>
      {showCamera && (
        <FullScreenCamera
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
      <div className={styles.uploadBox}>
        <div className={styles.title}>Upload Prescription</div>
        <div style={{ display: "flex", gap: 16, width: "100%", justifyContent: "center" }}>
          <button className={styles.button} onClick={handleScanClick}>
            Scan
          </button>
          <button className={styles.button} onClick={handleUploadClick}>
            Upload
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img src={previewUrl} alt="Preview" className={styles.preview} />
            <div className={styles.fileName}>{fileName}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button
                className={styles.button}
                style={{ background: '#f44336', color: '#fff' }}
                onClick={() => {
                  setPreviewUrl(null);
                  setFileName("");
                }}
              >
                Discard / Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;
