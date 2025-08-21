"use client";

import React, { useRef, useState } from "react";
import Header from "../common/Header"; 
import Footer, { Tab } from "../common/Footer"; 
import Button from "../ui/Button"; 
import GuideBanner from "../ui/GuideBanner"; 
import Camera from "@/assets/svg/Camera"; 
import Upload from "@/assets/svg/Upload"; 
import Select from "@/assets/svg/Select";
import File from "@/assets/svg/File";
import User from "@/assets/svg/User";

// Define allowed tab IDs to ensure type safety
type TabId = "select" | "user" | "file";

// Props for this component
interface PrescriptionUploadProps {
  onSubmit?: (file: File) => void; // Optional callback for when a file is submitted
}

// Encapsulates the logic for opening a hidden file input
function useFilePicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click(); // Programmatically open file picker
  };

  return { fileInputRef, openFilePicker };
}

// Predefined tabs for the footer navigation
const footerTabs: Tab[] = [
  { id: "select", label: "Select", icon: <Select fill="#002766" /> },
  { id: "user", label: "User", icon: <User fill="#002766" /> },
  { id: "file", label: "File", icon: <File fill="#002766" /> },
];
// Main Component

function PrescriptionUpload({ onSubmit }: PrescriptionUploadProps) {
  // Initialize file pickers for camera and file selection
  const cameraPicker = useFilePicker();
  const filePicker = useFilePicker();
  const [activeTab, setActiveTab] = useState<TabId>("select");

  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Header section */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-between px-5 pt-12 pb-4">
        {/* Instruction banner */}
        <section className="flex-1 w-full flex flex-col gap-8">
          <GuideBanner size="md" fullWidth>
            Please scan or select ID
          </GuideBanner>

          {/* Buttons to trigger camera or file selection */}
          <div className="flex justify-center gap-4">
            {/* Scan button triggers camera input */}
            <Button
              variant="primary"
              size="lg"
              icon={<Camera fill="#096DD9" />}
              onClick={cameraPicker.openFilePicker}
            >
              Scan
            </Button>

            {/* Select button triggers file input */}
            <Button
              variant="primary"
              size="lg"
              icon={<Upload fill="#096DD9" />}
              onClick={filePicker.openFilePicker}
            >
              Select
            </Button>

            {/* Hidden input for camera capture */}
            <input
              ref={cameraPicker.fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            {/* Hidden input for file selection */}
            <input
              ref={filePicker.fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
            />
          </div>
        </section>

        {/* I don’t have ID" button */}
        <section className="w-full flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={cameraPicker.openFilePicker} // Reuses camera picker for simplicity
          >
            I don’t have ID
          </Button>
        </section>
      </main>

      {/* Footer section with tab navigation */}
      <footer className="h-[80px]">
        <Footer
          tabs={footerTabs} // Array of tab objects
          activeTabId={activeTab} // Currently active tab
          onTabClick={(tabId: string) => setActiveTab(tabId as TabId)} // Updates active tab
        />
      </footer>
    </div>
  );
}

export default PrescriptionUpload;
