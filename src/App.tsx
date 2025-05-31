import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Strategy from "./pages/Strategy";
import LiveTrading from "./pages/LiveTrading";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";



import { useAuth } from "./hooks/useAuth";


const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isLoginPage = location.pathname === "/" || location.pathname === "/login";
  const showNavbar = isAuthenticated && !isLoginPage;

  // Redirect unauthenticated users away from protected routes
  const protectedRoutes = ["/dashboard", "/markets", "/strategy", "/trading", "/history", "/settings"];
  if (!isAuthenticated && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-1 md:ml-20 pt-[60px] md:pt-0">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/trading" element={<LiveTrading />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
