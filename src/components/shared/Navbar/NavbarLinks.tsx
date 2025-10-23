"use client";

import Link from "next/link";
import { FaFileContract, FaHome, FaInfoCircle } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { SiHyperskill } from "react-icons/si";

interface NavbarLinksProps {
  activeLink: string;
  handleLinkClick: (link: string) => void;
  user?: boolean; 
}

export const NavbarLinks = ({
  activeLink,
  handleLinkClick,
  user,
}: NavbarLinksProps) => {
  const commonLinks = [
    { href: "#home", label: "Home", icon: <FaHome className="lg:hidden" /> },
    {
      href: "#about",
      label: "About",
      icon: <FaInfoCircle className="lg:hidden" />,
    },
    {
      href: "#skills",
      label: "Skills",
      icon: <SiHyperskill className="lg:hidden" />,
    },
    {
      href: "#projects",
      label: "Projects",
      icon: <GoProjectSymlink className="lg:hidden" />,
    },
    {
      href: "#blog",
      label: "Blogs",
      icon: <FaFileContract className="lg:hidden" />,
    },
    {
      href: "#contact",
      label: "Contact",
      icon: <FaFileContract className="lg:hidden" />,
    },
  ];

  return (
    <>
      {commonLinks.map(({ href, label, icon }) => (
        <li key={href}>
          <a
            href={href}
            onClick={() => handleLinkClick(href)}
            className={
              activeLink === href
                ? "text-secondary font-bold"
                : "text-white hover:text-secondary"
            }
          >
            <span className="flex gap-2 items-center text-xl">
              {icon} {label}
            </span>
          </a>
        </li>
      ))}

      {/* ✅ শুধুমাত্র user থাকলে Dashboard দেখাবে */}
      {user && (
        <li>
          <Link
            href="/dashboard"
            onClick={() => handleLinkClick("#dashboard")}
            className={
              activeLink === "#dashboard"
                ? "text-secondary font-bold"
                : "text-white hover:text-secondary"
            }
          >
            <span className="flex gap-2 items-center text-xl">
              <MdOutlineSpaceDashboard className="lg:hidden" /> Dashboard
            </span>
          </Link>
        </li>
      )}
    </>
  );
};
