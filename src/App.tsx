
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import YieldIntelligence from "./pages/YieldIntelligence";
import MarketForecast from "./pages/MarketForecast";
import Hedging from "./pages/Hedging";
import Contracts from "./pages/Contracts";
import LearningCenter from "./pages/LearningCenter";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import ScrollToTop from "./components/ScrollToTop";

// Create a new query client instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/yield-intelligence" element={<YieldIntelligence />} />
              <Route path="/market-forecast" element={<MarketForecast />} />
              <Route path="/hedging" element={<Hedging />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/learning" element={<LearningCenter />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
