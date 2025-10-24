"use client";

import Link from "next/link";

import { Home, PlusCircle } from "lucide-react";
import LogoutButton from "../modules/auth/LogoutButton";


export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-accent text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        <LogoutButton />
      </div>
    </aside>
  );
}
