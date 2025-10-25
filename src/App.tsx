
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sakhi from "./pages/Sakhi";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import YieldIntelligence from "./pages/YieldIntelligence";
import MarketForecast from "./pages/MarketForecast";
import WeatherForecast from "./pages/WeatherForecast";
import Hedging from "./pages/Hedging";
import Contracts from "./pages/Contracts";
import LearningCenter from "./pages/LearningCenter";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import ScrollToTop from "./components/ScrollToTop";
import SupportFAQs from "./pages/support/SupportFAQs";
import SupportContact from "./pages/support/SupportContact";
import SupportTutorials from "./pages/support/SupportTutorials";

// Router component with authentication check
const Router = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sakhi" element={<Sakhi />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/sakhi" element={<Sakhi />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/yield-intelligence" element={<YieldIntelligence />} />
            <Route path="/market-forecast" element={<MarketForecast />} />
            <Route path="/weather-forecast" element={<WeatherForecast />} />
            <Route path="/hedging" element={<Hedging />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support/faqs" element={<SupportFAQs />} />
            <Route path="/support/contact" element={<SupportContact />} />
            <Route path="/support/tutorials" element={<SupportTutorials />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Router />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
