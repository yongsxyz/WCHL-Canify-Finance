// components/WalletConnectModal.tsx
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

export const WalletConnectModal = ({ isOpen, onOpenChange }: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void
}) => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const connectWallet = async (walletName: string) => {
    try {
      if (walletName === "Internet Identity") {
        await login();

        if (!isAuthenticated) {
          throw new Error("Authentication not confirmed");
        }

        onOpenChange(false);

        toast({
          title: `Connected to ${walletName}`,
          description: "Your wallet has been successfully connected!",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to wallet",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl animate-scale-in">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Connect Wallet
            </DialogTitle>
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-success rounded-full"></div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Recently Used Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <h3 className="text-sm font-medium text-muted-foreground">Recently Used</h3>
            </div>

            {walletProviders
              .filter(wallet => wallet.recent)
              .map((wallet, index) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet.name)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-success/5 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={`/${wallet.icon}`}
                        alt={`${wallet.icon} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        {wallet.name}
                        {wallet.recommended && (
                          <span className="text-xs bg-gradient-to-r from-primary/20 to-success/20 text-primary px-2 py-1 rounded-full border border-primary/30 animate-scale-in">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{wallet.description}</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                    →
                  </div>
                </button>
              ))}
          </div>

          {/* All Wallets Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-border"></div>
              <h3 className="text-sm font-medium text-muted-foreground whitespace-nowrap">Available Wallets</h3>
              <div className="w-full h-[1px] bg-gradient-to-r from-border to-transparent"></div>
            </div>

            {walletProviders
              .filter(wallet => !wallet.recent)
              .map((wallet, index) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet.name)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-success/5 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={`/${wallet.icon}`}
                        alt={`${wallet.icon} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        {wallet.name}
                        {wallet.recommended && (
                          <span className="text-xs bg-gradient-to-r from-primary/20 to-success/20 text-primary px-2 py-1 rounded-full border border-primary/30 animate-scale-in">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{wallet.description}</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                    →
                  </div>
                </button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};