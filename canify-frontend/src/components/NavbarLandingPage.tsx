import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Feature", path: "#features" },
    { name: "Docs", path: "#docs" },
    { name: "Whitepaper", path: "#whitepaper" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-30rounded-full flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-28"
              />
            </div>

            <span className="hidden md:block text-lg font-bold text-foreground">Canify Finance</span>
            <span className="md:hidden ml-12 md:ml-3 text-lg font-bold text-foreground">
              Canify Finance
            </span>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.path)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Launch App Button */}
          <div className="hidden md:flex">
            <NavLink to="/app/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-white">
                Launch App
              </Button>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/50 bg-background">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.querySelector(item.path)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <NavLink to="/app/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-white">
                  Launch App
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;