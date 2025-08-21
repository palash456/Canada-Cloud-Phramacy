"use client";

import { useState } from "react";
import DateOfBirthIcon from "@/assets/svg/dateOfBirth"; // Adjust path
import { ModalBox } from "./ModalBox";
import { DateInputField } from "./DateInputField";
import Button from "@/components/ui/Button"; // Adjust path

interface DateOfBirthButtonProps {
  dob: string;
  onSave: (dob: string) => void;
  onClick?: () => void;
}

const CORRECT_DOB = "2002-01-02"; // DD-MM-YYYY format

export function DateOfBirthButton({ dob, onSave, onClick }: DateOfBirthButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [tempDob, setTempDob] = useState(dob);
  const [error, setError] = useState<string>("");

  // console.log("Selected DOB:", tempDob)

  const openModal = () => {
    onClick?.();
    setTempDob(dob);
    setError("");
    setShowModal(true);
  };

const CORRECT_DOB = "2002-01-02"; // YYYY-MM-DD

const handleOk = () => {
  // tempDob is assumed to be in YYYY-MM-DD format
  if (tempDob === CORRECT_DOB) {
    console.log("DOB authenticated ✅");
  } else {
    console.log("DOB authentication failed ❌");
  }

  setShowModal(false);
};




  const handleCancel = () => {
    setTempDob(dob);
    setError("");
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="primary"
        size="md"
        icon={<DateOfBirthIcon fill="#096DD9" />}
        iconPosition="left"
        onClick={openModal}
      >
        Date of Birth
      </Button>

      {showModal && (
        <ModalBox
          title="Enter Birthday"
          CloseButton={<DateOfBirthIcon fill="#000000" />}
          body={
            <div className="flex flex-col items-center gap-2 w-full">
              <DateInputField value={tempDob} onChange={setTempDob} />
              {error && <p className="text-red-500 text-sm text-left">{error}</p>}
            </div>
          }
          primaryAction={{ label: "OK", onClick: handleOk }}
          secondaryAction={{ label: "Cancel", onClick: handleCancel }}
          onClose={handleCancel}
        />
      )}
    </>
  );
}
