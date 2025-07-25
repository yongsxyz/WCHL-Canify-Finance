import { useState, useEffect } from "react";
import { Wallet, Copy, LogOut, Coins, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import { useAuth } from "@/context/auth";
import { WalletConnectModal } from "./WalletConnectModal";

const WalletDropdown = () => {
  /// Login ICP
  const { isAuthenticated, principal, login, logout } = useAuth();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [isMobileWalletOpen, setIsMobileWalletOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const walletAddress = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "Not connected";

  const totalBalance = "0.0000";
  const estValue = "0";
  const icpBalance = "0.0000";

  const assets = [
    { name: "ICP", balance: "0.0000", symbol: "ICP", logo: "icp.webp" },
    { name: "ckETH", balance: "0.0000", symbol: "ETH", logo: "eth.svg" },
    { name: "ckBTC", balance: "0.0000", symbol: "USDT", logo: "btc.svg" },
    { name: "ckUSDC", balance: "0.0000", symbol: "USDC", logo: "usdc.svg" },
    { name: "ckUSDT", balance: "0.0000", symbol: "USDT", logo: "usdt.svg" },
  ];

  const walletProviders = [
    {
      name: "Internet Identity",
      icon: "token/icp.webp",
      description: "Connect using Internet Identity",
      recommended: true,
      recent: true,
    },
    {
      name: "OISY Wallet",
      icon: "wallet/oisy.webp",
      description: "Recommended wallet for this platform",
      recommended: false
    },
    {
      name: "Plug Wallet",
      icon: "wallet/plugwallet.webp",
      description: "Connect with Plug wallet"
    }
  ];

  /// CHECK LOGIN
  useEffect(() => {
    if (isAuthenticated) {
      setIsConnected(true);
    } else {
      logout();
      setIsConnected(false);
    }
  }, [isAuthenticated]);


  const copyAddress = () => {
    navigator.clipboard.writeText(principal);
    toast({
      title: "Address copied to clipboard",
    });
  };

  const disconnect = () => {
    logout();
    toast({
      title: "Wallet disconnected",
    });
  };

  const closewallet = () => {
    setIsMobileWalletOpen(false);
  };

  // If not connected, show Connect Wallet button
  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setIsConnectModalOpen(true)}
          className={`
            ${isMobile
              ? 'h-9 w-9 p-0'
              : 'h-9 px-6'
            }
            bg-gradient-to-r from-primary via-primary/90 to-success 
            hover:from-primary/90 hover:via-primary/80 hover:to-success/90 
            text-primary-foreground font-semibold shadow-lg hover:shadow-xl 
            transition-all duration-300 border-0 hover:scale-105 
            animate-fade-in relative overflow-hidden group
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-transparent before:via-white/20 before:to-transparent 
            before:translate-x-[-100%] hover:before:translate-x-[100%] 
            before:transition-transform before:duration-700
          `}
        >
          <Wallet className={`w-4 h-4 ${isMobile ? '' : 'mr-1'} transition-transform group-hover:rotate-12 text-white`} />
          {!isMobile && (
            <span className="relative z-10 font-bold text-white">Connect Wallet</span>
          )}
        </Button>

        {/* Connect Wallet Modal */}
        <WalletConnectModal
          isOpen={isConnectModalOpen}
          onOpenChange={setIsConnectModalOpen}
        />
      </>
    );
  }

  // Connected state - Mobile version
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileWalletOpen(true)}
          className={`
            ${isMobile
              ? 'h-9 w-9 p-0'
              : 'h-9 px-6'
            }
            bg-gradient-to-r from-primary via-primary/90 to-success 
            hover:from-primary/90 hover:via-primary/80 hover:to-success/90 
            text-primary-foreground font-semibold shadow-lg hover:shadow-xl 
            transition-all duration-300 border-0 hover:scale-105 
            animate-fade-in relative overflow-hidden group
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-transparent before:via-white/20 before:to-transparent 
            before:translate-x-[-100%] hover:before:translate-x-[100%] 
            before:transition-transform before:duration-700`}

        >
          <Wallet className={`w-4 h-4 ${isMobile ? '' : 'mr-1'} transition-transform group-hover:rotate-12 text-white`} />
        </Button>

        {/* Mobile Wallet Modal */}
        <Dialog open={isMobileWalletOpen} onOpenChange={setIsMobileWalletOpen}>
          <DialogContent className="sm:max-w-md h-full sm:h-auto bg-background border-0 p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <DialogHeader className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-muted-foreground text-sm font-medium">
                    Connected Wallet
                  </DialogTitle>
                </div>
              </DialogHeader>

              {/* Content */}
              <div className="flex-1 px-6 space-y-6">
                {/* Estimated Value */}
                <div className="space-y-3">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Estimated Value
                  </h3>
                  <div className="text-3xl font-bold">$0.00</div>
                </div>

                {/* Wallet Address */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-xl font-medium">{walletAddress}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* COMP Distribution */}
                <div className="space-y-4">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    ICP Internet Computer Protocol
                  </h3>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full items-center justify-center">
                      <img
                        src="/token/icp.webp"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-medium">{icpBalance}</div>
                    </div>
                  </div>
                </div>

                {/* Token List */}
                <div className="space-y-4">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Assets
                  </h3>
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <div key={asset.symbol} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <img
                              src={`/token/${asset.logo}`}
                              alt={`/token/${asset.logo} logo`}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        <span className="text-muted-foreground">{asset.balance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-12 pt-4 space-y-3">
                <Button
                  variant="outline"
                  onClick={disconnect}
                  className="w-full bg-gradient-to-r from-destructive/10 to-destructive/5 hover:from-destructive/20 hover:to-destructive/10 border-destructive/30 hover:border-destructive/50 text-destructive hover:text-destructive transition-all duration-300 hover:scale-[1.02]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
                <Button
                  variant="outline"
                  onClick={closewallet}
                  className="w-full h-12 bg-muted/30 border-muted"
                >
                  Close Wallet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop connected version
  return (
    <div className="flex items-center gap-2 animate-fade-in">
      {/* Token Balance Dropdown */}
      <Popover open={isTokenOpen} onOpenChange={setIsTokenOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm font-medium bg-gradient-to-r from-secondary/50 to-muted/50 hover:from-secondary hover:to-muted border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
          >
            <img
              src="/token/icp.webp"
              alt="Logo"
              className="w-full h-full object-contain"
            />
            <span className="group-hover:text-primary transition-colors">{totalBalance}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl animate-scale-in" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Est Value</h3>
              <span className="text-sm bg-gradient-to-r from-primary to-success bg-clip-text text-transparent font-bold">$ 111{estValue}</span>
            </div>
            <div className="border-t border-border/50 pt-3">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Assets</h4>
              <div className="space-y-2">
                {assets.map((asset, index) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-muted/30 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center border border-primary/10">
                        <img
                          src={`/token/${asset.logo}`}
                          alt={`${asset.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm">{asset.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{asset.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Wallet Dropdown */}
      <Popover open={isWalletOpen} onOpenChange={setIsWalletOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm font-medium bg-gradient-to-r from-secondary/50 to-muted/50 hover:from-secondary hover:to-muted border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
          >
            <Wallet className="w-4 h-4 mr-1 group-hover:text-primary transition-colors" />
            <span className="group-hover:text-primary transition-colors">{walletAddress}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl animate-scale-in" align="end">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                Connected Wallet
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </h3>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <span className="text-sm font-mono">{walletAddress}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-6 w-6 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={disconnect}
              className="w-full bg-gradient-to-r from-destructive/10 to-destructive/5 hover:from-destructive/20 hover:to-destructive/10 border-destructive/30 hover:border-destructive/50 text-destructive hover:text-destructive transition-all duration-300 hover:scale-[1.02]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WalletDropdown;