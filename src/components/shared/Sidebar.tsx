"use client";

import Link from "next/link";
import {
  Home,
  PlusCircle,
  FileText,
  Briefcase,
  MessageSquare,
  UserCog,
  Layers,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import LogoutButton from "../modules/auth/LogoutButton";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
    { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
    { href: "/dashboard/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/skills", label: "Skills", icon: Layers },
    { href: "/dashboard/experience", label: "Experience", icon: UserCog },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-accent text-white">
        <span className="font-semibold text-lg">Admin Panel</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-accent text-white md:h-screen md:w-64 flex flex-col justify-between transform transition-transform duration-300 fixed md:static top-0 left-0 z-50 w-64 h-full
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Profile Section */}
        <div>
          <div className="flex flex-col items-center text-center p-6 border-b border-gray-800">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
              <Image
                src="/my-banner.png"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="mt-3 text-lg font-semibold">Arman Mia</h2>
            <p className="text-sm text-gray-400">arman.miaa36@gmail.com</p>
            <span className="mt-1 text-xs bg-gray-800 px-3 py-1 rounded-full">
              Admin Panel
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-3 space-y-1 mt-4 overflow-y-auto">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-800 p-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
