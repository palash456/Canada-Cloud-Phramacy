"use client";
import React from "react";
import MobileAccessForm from "../layout/AccessForm/Mobile/AccessForm";
import TabletAccessForm from "../layout/AccessForm/Tablet/AccessForm";
import DesktopAccessForm from "../layout/AccessForm/Desktop/AccessForm";

export const AccessForm = () => {
  return (
    <>
      <div className="block sm:hidden">
        <MobileAccessForm />
      </div>

      <div className="hidden sm:block lg:hidden">
        <TabletAccessForm />
      </div>

      <div className="hidden lg:block">
        <DesktopAccessForm />
      </div>
    </>
  );
};

export default AccessForm;
