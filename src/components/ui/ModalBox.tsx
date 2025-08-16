"use client"

import React from "react";


// Props centralised for easy maintenance
interface ModalBoxProps {
  title: string;
  body: React.ReactNode;
  CloseButton?: React.ReactNode;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
}

// Tailwind classes centralised for easy maintenance
const styles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
  modalContainer: "bg-white rounded-[25px] shadow-lg w-full max-w-md mx-6",
  header: "flex justify-between items-center px-6 py-4 border-b border-gray-200",
  title: "text-[22px] font-medium text-gray-900",
  closeButton: "text-gray-400 hover:text-gray-600 transition",
  body: "px-6 py-6 text-gray-700",
  footer: "flex justify-end gap-2 px-6 py-2 border-t border-gray-100",
  actionButton:
    "px-1.5 py-2.5 rounded transition font-medium text-[#096DD9] active:bg-gray-300",
};

export const ModalBox: React.FC<ModalBoxProps> = ({
  title,
  body,
  primaryAction,
  secondaryAction,
  onClose,
  CloseButton,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            {CloseButton ?? "✕"}
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>{body}</div>

        {/* Footer */}
        <div className={styles.footer}>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={styles.actionButton}
            >
              {secondaryAction.label}
            </button>
          )}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={styles.actionButton}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
