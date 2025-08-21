"use client";

import React from "react";

// Export Tab type for reuse
export interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode; // React component like <Select />
}

interface FooterProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
}

export default function Footer({ tabs, activeTabId, onTabClick }: FooterProps) {
  return (
    <footer className="w-full fixed bottom-0 left-0 h-[80px] flex justify-center items-center gap-6 shadow-t ">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              flex flex-col items-center justify-center gap-1 w-[60px] h-[40px] 
              rounded-[50px] transition-all
              ${isActive ? "bg-blue-100 shadow-inner" : "bg-blue-50 shadow-md"}
              hover:brightness-95
            `}
          >
            {/* Icon container: fully centered */}
            <div className="flex-1 w-full flex items-center justify-center">
              {tab.icon}
            </div>

            {/* Tab label */}
            {/* <span className="text-xs font-medium">{tab.label}</span> */}
          </button>
        );
      })}
    </footer>
  );
}
