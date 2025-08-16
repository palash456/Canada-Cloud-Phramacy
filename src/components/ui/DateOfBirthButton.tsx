"use client"

import React, { useState } from "react";
import { dateOfBirth } from "@/assets/svg/dateOfBirth";
import { ModalBox } from "./ModalBox";
import { DateInputField } from "./DateInputField";

interface DateOfBirthButtonProps {
  dob: string;
  onSave: (dob: string) => void;
  onClick?: () => void;
}

const buttonStyles = {
  outer: "flex w-80 items-center justify-center rounded-full bg-gradient-to-r from-[#3070E7] to-[#16BDEB] p-[2px] font-['Roboto',sans-serif]",
  inner: "flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 gap-2",
  label: "font-semibold text-[16px] text-[#096dd9] pt-[4px]",
  modalBody: "flex flex-col items-center gap-4 w-full",
};

export const DateOfBirthButton: React.FC<DateOfBirthButtonProps> = ({ dob, onSave, onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [tempDob, setTempDob] = useState(dob);

  const openModal = () => {
    onClick?.();
    setTempDob(dob); // Reset tempDob to current dob when opening
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleOk = () => {
    onSave(tempDob); // Save to parent
    setShowModal(false);
  };

  const handleCancel = () => {
    setTempDob(dob); // Reset tempDob
    setShowModal(false);
  };

  return (
    <>
      {/* DOB Button */}
      <button className={buttonStyles.outer} onClick={openModal}>
        <div className={buttonStyles.inner}>
          <span dangerouslySetInnerHTML={{ __html: dateOfBirth({ fill: "#096DD9" }) }} />
          <span className={buttonStyles.label}>Date of Birth</span>
        </div>
      </button>

      {/* Modal */}
      {showModal && (
        <ModalBox
          title="Enter Birthday"
          CloseButton={<span dangerouslySetInnerHTML={{ __html: dateOfBirth({ fill: "#000000" }) }} />}
          body={<div className={buttonStyles.modalBody}><DateInputField value={tempDob} onChange={setTempDob} /></div>}
          primaryAction={{ label: "OK", onClick: handleOk }}
          secondaryAction={{ label: "Cancel", onClick: handleCancel }}
          onClose={handleCancel}
        />
      )}
    </>
  );
};
