import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationCenter from "@/components/NotificationCenter";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import MarketTicker from "@/components/MarketTicker";
import LanguageSelector from "@/components/LanguageSelector";
import SearchBar from "@/components/SearchBar";
import HelpSupport from "@/components/HelpSupport";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-background border-b px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger data-testid="button-sidebar-trigger" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌾</span>
                  <h1 className="text-xl font-bold text-primary">AgriShield</h1>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <MarketTicker />
                <SearchBar />
                <LanguageSelector />
                <ThemeToggle />
                <HelpSupport />
                <NotificationCenter />
                <div className="h-6 w-px bg-border hidden md:block" />
                <UserProfileDropdown />
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
