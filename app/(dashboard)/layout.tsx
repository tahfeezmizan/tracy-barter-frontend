import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DynamicHeader from "@/components/dashboard/dynamic-header";
import { RoleSwitcher } from "@/components/dashboard/role-switcher";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#0F233F]">
      <div className="flex w-full h-screen">
        <AppSidebar />
        <div className="flex-1 min-h-0 bg-[#0F233F] text-white p-8 overflow-auto ">
          <DynamicHeader />
          {children}
          <RoleSwitcher />
        </div>
      </div>
    </SidebarProvider>
  );
}
