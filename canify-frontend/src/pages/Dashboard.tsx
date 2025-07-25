
import DashboardStats from "@/components/DashboardStats";
import AssetsSection from "@/components/AssetsSection";
import AIAnalysisModal from "@/components/AIAnalysisModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TrendingUp, Zap, Bot, Wallet } from "lucide-react";
import { useAuth } from "@/context/auth";
import { WalletConnectModal } from "@/components/WalletConnectModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const supplyAssets = [
    {
      symbol: "ICP",
      name: "Internet Computer Protocol",
      icon: "icp.webp",
      balance: "0",
      apy: "5.79%",
      canSupply: true,
      isSupplied: false,
      canBeCollateral: true
    },
    {
      symbol: "ckETH",
      name: "Chain Key Ethereum",
      icon: "eth.svg",
      balance: "0.00",
      apy: "<0.01%",
      canSupply: true,
      isSupplied: true,
      collateral: "60,080.00",
      canBeCollateral: true
    },
    {
      symbol: "ckBTC",
      name: "Chain Key Bitcoin",
      icon: "btc.svg",
      balance: "0",
      apy: "5.79%",
      canSupply: true,
      isSupplied: false,
      canBeCollateral: true
    },
    {
      symbol: "ckUSDC",
      name: "Chain Key USD Coin",
      icon: "usdc.svg",
      balance: "0",
      apy: "<0.01%",
      variableApy: "2.00%",
      canSupply: true,
      isSupplied: false,
      canBeCollateral: false
    },
    {
      symbol: "ckUSDT",
      name: "Chain Key Tether USD",
      icon: "usdt.svg",
      balance: "0",
      apy: "3.64%",
      canSupply: true,
      isSupplied: false,
      canBeCollateral: true
    }
  ];

  const borrowAssets = [
    {
      symbol: "ICP",
      name: "Internet Computer Protocol",
      icon: "icp.webp",
      balance: "< 0.01",
      apy: "120.34%",
      available: "0",
      canBorrow: true,
      isBorrowed: true,
      debt: "< 0.0000001",
      canBeCollateral: true
    },
    {
      symbol: "ckETH",
      name: "Chain Key Ethereum",
      icon: "eth.svg",
      balance: "0",
      apy: "5.13%",
      available: "0",
      variableApy: "5x",
      canBorrow: true,
      isBorrowed: false,
      canBeCollateral: false
    },
    {
      symbol: "ckBTC",
      name: "Chain Key Bitcoin",
      icon: "btc.svg",
      balance: "0",
      apy: "7.59%",
      available: "0",
      canBorrow: true,
      isBorrowed: false,
      canBeCollateral: true
    },
    {
      symbol: "ckUSDC",
      name: "Chain Key USD Coin",
      icon: "usdc.svg",
      balance: "0",
      apy: "1.02%",
      available: "0",
      canBorrow: true,
      isBorrowed: false,
      canBeCollateral: false
    },
    {
      symbol: "ckUSDT",
      name: "Chain Key Tether USD",
      icon: "usdt.svg",
      balance: "0",
      apy: "5.00%",
      available: "0",
      canBorrow: true,
      isBorrowed: false,
      canBeCollateral: true
    }
  ];

    /// Login ICP
  const { isAuthenticated, principal, login, logout } = useAuth();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-transparent to-success/3 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Connect Your Wallet
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Please connect your wallet to access the dashboard and manage your assets
          </p>         
          <Button
            onClick={() => setIsWalletModalOpen(true)}
            className="bg-gradient-to-r from-primary to-success text-white px-8 py-6 text-lg"
            size="lg"
          >
            <Wallet className={`w-4 h-4 transition-transform group-hover:rotate-12 text-white`} /> Connect Wallet
          </Button>
            <WalletConnectModal 
            isOpen={isWalletModalOpen} 
            onOpenChange={setIsWalletModalOpen} 
          />
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-transparent to-success/3">
      {/* Hero Section */}
      <div className="relative overflow-hidden ">
        <div className="absolute"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-4 sm:pb-6 lg:pb-8">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
              Supply assets to earn interest and borrow against your collateral with the best rates
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-12 ">
        <div className="mb-6 sm:mb-8">
          <DashboardStats />
        </div>

        {/* AI Analysis Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-secondary border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI Portfolio Analysis</h2>
                <p className="text-sm text-muted-foreground">Get insights on your strategy</p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-primary to-success text-white"
            >
              Analyze
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <AssetsSection
            title="Your supplies"
            emptyMessage="Nothing supplied yet"
            assets={supplyAssets}
            mode="supply"
            showHideButton={true}
          />

          <AssetsSection
            title="Your borrows"
            emptyMessage="Nothing borrowed yet"
            assets={borrowAssets}
            mode="borrow"
            showHideButton={true}
          />
        </div>

        <AIAnalysisModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="AI Portfolio Analysis"
          description="Get personalized insights on your srategy and portfolio optimization"
          analysisType="portfolio"
        />
      </div>
    </div>
  );
};

export default Dashboard;
