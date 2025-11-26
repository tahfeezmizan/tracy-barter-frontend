import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { RoleSwitcher } from "@/components/dashboard/role-switcher";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#0F233F]">
      <div className="flex w-full h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-0">
          {/* <DynamicHeader /> */}
          <div className="flex-1 bg-[#0F233F] text-white p-8 overflow-auto relative">
            {children}
            <RoleSwitcher />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
