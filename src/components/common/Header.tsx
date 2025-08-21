import React from "react";
import Image from "next/image";
import HeaderLogo from "./../../assets/images/accessFormLogo.png";

function Header() {
  return (
    <header
      className="w-full flex items-center justify-between px-4 py-0 h-16"
  style={{
    background: "#93aebb30",
    backgroundBlendMode: "plus-lighter",
    boxShadow:
      "inset 0 1px 2px rgba(255, 255, 255), " + // inner top/edges glow
      "-11.15px -10.392px 48px -12px rgba(255, 255, 255), " +
      "2.574px 2.399px 11.08px 0 rgba(255, 255, 255, 0.1) inset, " +
      "1.645px 1.533px 5.54px 0 rgba(255, 255, 255) inset, " +
      "0 1px 1px 0 rgba(255, 255, 255, .70)", // soft bottom glow
    backdropFilter: "blur(15.86px)",
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
