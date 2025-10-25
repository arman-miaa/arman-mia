import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1  md:ml-64  p-4 mt-16 md:mt-0">{children}</div>
    </main>
  );
}
