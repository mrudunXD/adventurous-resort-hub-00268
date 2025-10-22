import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-card border-b px-4 py-3 flex items-center gap-4 shadow-sm">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <h1 className="text-xl font-bold text-primary">AgriShield</h1>
            </div>
          </header>
          
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
