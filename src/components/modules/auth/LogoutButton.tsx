"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
console.log(process.env.NEXT_PUBLIC_BASE_API);
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Logged out successfully!");
        router.push("/login"); 
      } else {
        toast.error(data.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full justify-start gap-2 cursor-pointer"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
