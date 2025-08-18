import React from "react";
import Image from "next/image";
import HeaderLogo from "./../../assets/images/accessFormLogo.png";

function Header() {
  return (
    <header
      className="w-full absolute flex items-center justify-between px-4 py-0 h-16"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.37)",
        background: "rgba(255, 255, 255, 0.08)",
        backgroundBlendMode: "plus-lighter",
        boxShadow:
          "-11.15px -10.392px 48px -12px rgba(0, 0, 0, 0.15), -1.858px -1.732px 12px -8px rgba(0, 0, 0, 0.15), 2.574px 2.399px 11.08px 0 rgba(255, 255, 255, 0.14) inset, 1.645px 1.533px 5.54px 0 rgba(255, 255, 255, 0.14) inset",
        backdropFilter: "blur(15.86px)",
        borderRadius: "16px 16px 0 0",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="flex items-center gap-2">
        <Image
          src={HeaderLogo}
          alt="Access Form Logo"
          width={56}
          height={56}
          className="rounded-full"
          priority
        />
        <span
          className="text-[16px] font-normal text-center text-[#000000]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontStyle: "normal",
            lineHeight: "normal",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Scott CX
        </span>
      </div>
      <span
        className="text-[12px] font-normal text-right text-[#002766]"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontStyle: "normal",
          fontSize: "13px",
          lineHeight: "20px",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        BIKE-TREE-CASTLE
      </span>
    </header>
  );
}

export default Header;
