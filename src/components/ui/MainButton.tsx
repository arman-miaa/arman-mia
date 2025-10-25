"use client";
import React, { useState } from "react";
import Link from "next/link";

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  target?: "_blank" | "_self";
  className?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  onClick,
  href,
  target = "_self",
  className = "",
}) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick();
  };

  const baseClasses =
    "relative overflow-hidden cursor-pointer mt-4 inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 rounded-lg border-2 border-[#59B2F4] font-bold text-[#59B2F4] tracking-widest bg-transparent transition-all duration-500 hover:shadow-[0_0_20px_#59B2F4aa] group " +
    className;

  const innerContent = (
    <>
      {/* Background animation */}
      <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>

      {/* Text */}
      <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
        {text}
      </span>

      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-[#59B2F4] rounded-full opacity-40 animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: "20px",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        ></span>
      ))}
    </>
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={baseClasses} onClick={handleClick}>
          {innerContent}
        </Link>
      );
    } else {
      return (
        <a
          href={href}
          target={target}
          rel="noopener noreferrer"
          onClick={handleClick}
          className={baseClasses}
        >
          {innerContent}
        </a>
      );
    }
  }

  return (
    <button onClick={handleClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};

export default MainButton;
