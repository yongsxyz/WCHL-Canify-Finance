import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Droplets,
  MoreHorizontal,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  CircleDot,
  Trophy,
  Gift,
  Plus
} from "lucide-react";
import WalletDropdown from "./WalletDropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/app/", icon: LayoutDashboard },
    { name: "Markets", path: "/app/markets", icon: TrendingUp },
    { name: "Faucet", path: "/app/faucet", icon: Droplets },
    { name: "More", path: "/app/more", icon: MoreHorizontal },
  ];

  return (
    <nav className="bg-background border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm bg-background/95">
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

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-4">
              {navItems.slice(0, -1).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/app/"}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 ${isActive
                      ? "bg-primary text-primary-foreground text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}

              {/* More Dropdown */}
              <Popover>
                <PopoverTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none">
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  More
                  <ChevronDown className="w-3 h-3 ml-1" />
                </PopoverTrigger>
                <PopoverContent align="center" className="w-80 p-4 bg-background border border-border shadow-xl">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground mb-4">More options</p>

                    <NavLink
                      to="/leaderboards"
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-foreground">Leaderboards</h4>
                        <p className="text-xs text-muted-foreground">View leaderboards</p>
                      </div>
                    </NavLink>

                    <NavLink
                      to="/airdrop"
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-foreground">Airdrop Claims</h4>
                        <p className="text-xs text-muted-foreground">Claim your airdrop tokens</p>
                      </div>
                    </NavLink>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Desktop Wallet */}
          <div className="hidden md:flex">
            <WalletDropdown />
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <WalletDropdown />
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/50">
            {navItems.slice(0, -1).map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/app/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-base font-bold transition-colors duration-200 ${isActive
                    ? "bg-primary text-primary-foreground text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}

            {/* Mobile More Section */}
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-2 px-3">More options</p>

              <NavLink
                to="/bubbles"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <CircleDot className="w-5 h-5 mr-3" />
                Bubbles
              </NavLink>

              <NavLink
                to="/leaderboards"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Trophy className="w-5 h-5 mr-3" />
                Leaderboards
              </NavLink>

              <NavLink
                to="/airdrop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Gift className="w-5 h-5 mr-3" />
                Airdrop Claims
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;