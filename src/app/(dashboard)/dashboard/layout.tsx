import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex flex-col md:flex-row">
      {/* Sidebar on desktop, collapsible / top on mobile */}
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </main>
  );
}
