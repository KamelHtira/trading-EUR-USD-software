
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChartCandlestick, 
  Settings, 
  History, 
  Search,
  Play,
  X,
  ArrowLeft
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <ChartCandlestick size={20} /> },
    // { name: "Markets", path: "/markets", icon: <Search size={20} /> },
    // { name: "Live Trading", path: "/trading", icon: <Play size={20} /> },
    { name: "History", path: "/history", icon: <History size={20} /> },
    { name: "Strategy", path: "/strategy", icon: <Settings size={20} /> },
    // { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex flex-col h-screen w-20 bg-sidebar fixed left-0 top-0 border-r border-border">
        <div className="flex items-center justify-center h-20">
          <span className="text-l font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Forex24</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 py-4">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="icon"
                className={`w-12 h-12 rounded-xl ${
                  location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                aria-label={item.name}
              >
                {item.icon}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Top Nav */}
      <nav className="md:hidden flex items-center justify-between p-4 bg-sidebar border-b border-border fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TradeBot
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <ChartCandlestick size={24} />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-50 animate-fade-in pt-16">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={location.pathname === item.path ? "default" : "outline"}
                  className={`w-full justify-start gap-4 ${
                    location.pathname === item.path ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
