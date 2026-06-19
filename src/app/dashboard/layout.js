import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HamburgerContextProvider from "@/providers/HamburgerContextProvider";

export default function DashboardLayout({ children }) {
  return (
    <HamburgerContextProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex">
        <DashboardSidebar />
        {/* ================= MAIN CONTENT WRAPPER ================= */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ================= TOP NAVBAR (Glassmorphic) ================= */}
          <DashboardHeader />
          {/* ================= MAIN CONTENT BODY ================= */}
          <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </HamburgerContextProvider>
  );
}
