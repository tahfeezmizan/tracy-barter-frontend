import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#0F233F]">
      <div className="flex w-full h-screen">
        <AppSidebar />
        <div className="flex-1 min-h-0 bg-[#0F233F] text-white p-8 overflow-auto ">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
