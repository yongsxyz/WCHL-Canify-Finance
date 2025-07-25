import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MoreHorizontal, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Info, CheckCircle, XCircle, DollarSign, TrendingUp, Database, Wallet, Target, Shield } from "lucide-react";
import { useState } from "react";
import SupplyWithdrawModal from "./SupplyWithdrawModal";

interface AssetCardProps {
  asset: {
    symbol: string;
    name: string;
    icon: string;
    balance: string;
    apy: string;
    available?: string;
    variableApy?: string;
    canSupply?: boolean;
    canBorrow?: boolean;
    isSupplied?: boolean;
    isBorrowed?: boolean;
    canBeCollateral?: boolean;
  };
  mode?: "supply" | "borrow";
}

const AssetCard = ({ asset, mode }: AssetCardProps) => {
  const [showModal, setShowModal] = useState(false);


  const getEstimatedUsdValue = (symbol: string, balance: string) => {
    // Mock prices for different tokens
    const prices: Record<string, number> = {
      ICP: 4000,

    };

    const price = prices[symbol] || 0;

    // Handle different balance formats
    if (balance === "0" || balance === "0.0000" || balance.includes("< 0.01")) {
      return "< $0.01";
    }

    // Parse balance and calculate USD value
    const numericBalance = parseFloat(balance.replace(/,/g, ''));
    if (isNaN(numericBalance)) return "$0.00";

    const usdValue = numericBalance * price;

    if (usdValue < 0.01) return "< $0.01";
    if (usdValue < 1) return `$${usdValue.toFixed(4)}`;
    if (usdValue >= 1000) return `$${(usdValue / 1000).toFixed(1)}k`;
    return `$${usdValue.toFixed(2)}`;
  };

  const getTokenDetails = (symbol: string) => {
    const details: Record<string, any> = {
      ICP: {
        marketCap: "$485.2B",
        volume24h: "$15.2B",
        totalSupply: "120.4M ICP",
        description: "",
        oraclePrice: "16.05",
        collateralFactor: "73%",
        liquidationFactor: "79%",
        protocolBalance: "0.0000",
        borrowCapacity: "0.00",
        walletBalance: "0.0000",
        borrowPotential: "0.00"
      },

    };
    return details[symbol] || {
      marketCap: "N/A",
      volume24h: "N/A",
      totalSupply: "N/A",
      description: "Token information not available.",
      oraclePrice: "0.00",
      collateralFactor: "0%",
      liquidationFactor: "0%",
      protocolBalance: "0.0000",
      borrowCapacity: "0.00",
      walletBalance: "0.0000",
      borrowPotential: "0.00"
    };
  };

  const tokenDetails = getTokenDetails(asset.symbol);

  // Check if this is a user's current asset (supplied or borrowed)
  const isUserAsset = mode === "supply" ? asset.isSupplied : asset.isBorrowed;

  // Check if this is assets to borrow section
  const isAssetsToBorrow = mode === "borrow" && !asset.isBorrowed;

  return (
    <TooltipProvider>
      <Card className="p-3 sm:p-4 hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-secondary group relative">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Token Info Section */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg cursor-pointer hover:scale-105 transition-transform`}>
                  <img
                    src={`/token/${asset.icon}`}
                    alt={`${asset.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4 bg-card border-border shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                      <img
                        src={`/token/${asset.icon}`}
                        alt={`${asset.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{asset.symbol}</h4>
                      <p className="text-sm text-muted-foreground">{asset.name}</p>

                    </div>
                  </div>

                  {/* Market Information */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Market Cap</span>
                        <p className="font-medium">{tokenDetails.marketCap}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">24h Volume</span>
                        <p className="font-medium">{tokenDetails.volume24h}</p>
                      </div>
                    </div>
                  </div>

                  {/* DeFi Protocol Information */}
                  <div className="border-t border-border pt-3">
                    <h5 className="font-medium text-foreground mb-3">Protocol Details</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Oracle Price</span>
                          <p className="font-medium">{tokenDetails.oraclePrice}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Health Factor</span>
                          <p className="font-medium">{tokenDetails.collateralFactor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Liquidation Factor</span>
                          <p className="font-medium">{tokenDetails.liquidationFactor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Protocol Balance</span>
                          <p className="font-medium">{tokenDetails.protocolBalance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Borrow Capacity</span>
                          <p className="font-medium">{tokenDetails.borrowCapacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Wallet Balance</span>
                          <p className="font-medium">{tokenDetails.walletBalance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tokenDetails.description}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>

              <div className="min-w-0 cursor-pointer">
                <div className="font-semibold text-foreground text-sm sm:text-base truncate flex items-center">
                  {asset.symbol}
                  {asset.canBeCollateral !== undefined && !isUserAsset && mode === "supply" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-3 h-3 rounded-full ml-1 animate-pulse ${asset.canBeCollateral ? 'bg-success' : 'bg-destructive'
                            }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{asset.canBeCollateral ? "Can be used as collateral" : "Cannot be used as collateral"}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground truncate">{asset.name}</div>
              </div>

              <HoverCardContent className="w-96 p-4 bg-card border-border shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                      <img
                        src={`/token/${asset.icon}`}
                        alt={`${asset.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{asset.symbol}</h4>
                      <p className="text-sm text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>

                  {/* Market Information */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Market Cap</span>
                        <p className="font-medium">{tokenDetails.marketCap}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">24h Volume</span>
                        <p className="font-medium">{tokenDetails.volume24h}</p>
                      </div>
                    </div>
                  </div>

                  {/* DeFi Protocol Information */}
                  <div className="border-t border-border pt-3">
                    <h5 className="font-medium text-foreground mb-3">Protocol Details</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Oracle Price</span>
                          <p className="font-medium">{tokenDetails.oraclePrice}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Health Factor</span>
                          <p className="font-medium">{tokenDetails.collateralFactor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Liquidation Factor</span>
                          <p className="font-medium">{tokenDetails.liquidationFactor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Protocol Balance</span>
                          <p className="font-medium">{tokenDetails.protocolBalance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Borrow Capacity</span>
                          <p className="font-medium">{tokenDetails.borrowCapacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Wallet Balance</span>
                          <p className="font-medium">{tokenDetails.walletBalance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tokenDetails.description}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Stats and Actions Section */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
            {/* Mobile: Stack stats vertically, Desktop: Horizontal */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              {((mode === "supply") || (isUserAsset || isAssetsToBorrow)) && (
                <div className="text-center sm:text-right sm:min-w-[80px] group/balance">
                  <div className="text-xs text-muted-foreground">
                    {isAssetsToBorrow ? "Available" : (mode === "borrow" && isUserAsset ? "Debt" : "Balance")}
                  </div>
                  <div className="relative">
                    <div className="font-semibold text-foreground text-sm truncate group-hover/balance:opacity-0 transition-opacity duration-200">
                      {isAssetsToBorrow ? (asset.available || "0") : asset.balance}
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover/balance:opacity-100 transition-opacity duration-200 text-sm font-semibold text-foreground truncate flex items-center justify-center sm:justify-end">
                      {getEstimatedUsdValue(asset.symbol, isAssetsToBorrow ? (asset.available || "0") : asset.balance)}
                    </div>
                  </div>
                </div>
              )}

              {/* APY */}
              <div className="text-center sm:text-right sm:min-w-[80px]">
                <div className="text-xs text-muted-foreground flex items-center justify-center sm:justify-end gap-1">
                  APY



                </div>
                <div className="font-semibold text-success text-sm">
                  {asset.apy}
                </div>
                {/* Variable APY display */}
                {/* {asset.variableApy && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {asset.variableApy}
                  </div>
                )} */}
              </div>

            </div>


            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex gap-2">
                {/* Single button with up arrow for supply mode */}
                {mode === "supply" && asset.canSupply && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1 text-xs hover:scale-105 transition-transform"
                    onClick={() => setShowModal(true)}
                  >
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                )}
                {/* Single button with up arrow for borrow mode */}
                {mode === "borrow" && (asset.canBorrow || asset.isBorrowed) && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1 text-xs hover:scale-105 transition-transform"
                    onClick={() => setShowModal(true)}
                  >
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Dropdown Menu - Only show for assets to supply */}
              {!isUserAsset && mode === "supply" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-popover border-border shadow-lg" align="end">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-accent">
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Swap</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-accent">
                      <Info className="w-4 h-4" />
                      <span>Details</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

      </Card>

      {/* Supply/Withdraw/Borrow/Repay Modal */}
      <SupplyWithdrawModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        asset={{
          symbol: asset.symbol,
          name: asset.name,
          icon: asset.icon,
          balance: asset.balance,
          apy: asset.apy
        }}
        mode={mode}
      />
    </TooltipProvider>
  );
};

export default AssetCard;
