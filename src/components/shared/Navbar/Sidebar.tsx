"use client";

import { FaTimes } from "react-icons/fa";
import { NavbarLinks } from "./NavbarLinks";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeLink: string;
  handleLinkClick: (link: string) => void;
  user: boolean;
}

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeLink,
  handleLinkClick,
  user,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-60 lg:hidden bg-primary text-white z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-4 flex items-center justify-between bg-[#2C3448]">
        <a className="text-xl md:text-2xl cursor-pointer text-white hover:text-secondary">
          Portfolio<span className="text-secondary -ml-1 text-2xl">.</span>
        </a>
        <button
          onClick={toggleSidebar}
          className="bg-primary text-2xl cursor-pointer rounded-full"
        >
          <FaTimes />
        </button>
      </div>
      <ul className="menu space-y-3 p-4">
        <NavbarLinks
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
          user={user}
        />
      </ul>
      <div className="absolute bottom-4 left-0 w-full px-5 text-gray-400 border-t border-white/10 pt-3">
        <p>© {new Date().getFullYear()} Portfolio</p>
      </div>
    </div>
  );
};
