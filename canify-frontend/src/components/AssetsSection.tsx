
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, Eye, EyeOff, Info, TrendingUp, ArrowDownUp } from "lucide-react";
import AssetCard from "./AssetCard";

interface AssetsSectionProps {
  title: string;
  emptyMessage: string;
  assets: Array<{
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
    collateral?: string;
    debt?: string;
  }>;
  showHideButton?: boolean;
  mode?: "supply" | "borrow";
}

const AssetsSection = ({
  title,
  emptyMessage,
  assets,
  showHideButton = false,
  mode = "supply"
}: AssetsSectionProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [showZeroBalance, setShowZeroBalance] = useState(true);
  const [showAvailable, setShowAvailable] = useState(true);

  const hasAssets = assets.some(asset =>
    mode === "supply" ? asset.isSupplied : asset.isBorrowed
  );

  const getSectionIcon = () => {
    return mode === "supply" ?
      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" /> :
      <ArrowDownUp className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />;
  };

  // Check if this is a user's current assets section (supplies or borrows)
  const isUserSection = title.toLowerCase().includes("your");
  
  // Calculate total estimated values
  const getTotalEstimatedValue = () => {
    if (mode === "supply") {
      return "$60,080.00"; 
    } else {
      return "< $0.01"; 
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* User's Current Assets Section */}
      <Card className={`p-4 sm:p-6 bg-gradient-to-br from-card to-secondary border-border/50 ${isUserSection ? 'relative overflow-hidden' : ''}`}>
        {/* Animated gradient spheres for user sections */}
        {isUserSection && (
          <>
            <div
              className={`gradient-sphere sphere-1 absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full blur-xl opacity-60 ${mode === "supply"
                  ? "bg-gradient-to-br from-green-400/30 via-green-500/20 to-green-300/15 animate-wander-left"
                  : "bg-gradient-to-br from-green-400/30 via-green-500/20 to-green-300/15 animate-wander-left"
                }`}
            ></div>
            <div
              className={`gradient-sphere sphere-2 absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full blur-lg opacity-50 ${mode === "supply"
                  ? "bg-gradient-to-br from-green-300/25 via-green-400/25 to-green-200/20 animate-wander-right-slow"
                  : "bg-gradient-to-br from-green-300/25 via-green-400/25 to-green-200/20 animate-wander-right-slow"
                }`}
              style={{
                right: '-15px',
                bottom: '-20px',
                transform: 'translate(10px, 15px)'
              }}
            ></div>
          </>
        )}

        <div className="relative z-10">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              {getSectionIcon()}
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">{title}</h2>
            </div>

          </div>

          {/* Stats Row for User Sections */}
          {isUserSection && hasAssets && (
            <TooltipProvider>
              <div className="mb-4 p-4 border-2 border-dashed border-border/50 rounded-lg bg-secondary/30">
                <div className="flex flex-wrap gap-4 text-sm">
                  {mode === "supply" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">Balance</span>
                            <span className="font-semibold">$60,080.00</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Oracle Price: 16.05</div>
                            <div>Protocol Balance: 0.0000</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">APY</span>
                            <span className="font-semibold text-success">&lt;0.01%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Health Factor: 73%</div>
                            <div>Liquidation Factor: 79%</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">Collateral</span>
                            <span className="font-semibold">$60,080.00</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Health Factor: 73%</div>
                            <div>Liquidation Factor: 79%</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                  {mode === "borrow" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">Balance</span>
                            <span className="font-semibold">&lt; $0.01</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Oracle Price: 16.05</div>
                            <div>Protocol Balance: 0.0000</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">APY</span>
                            <span className="font-semibold text-warning">120.34%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Health Factor: 73%</div>
                            <div>Liquidation Factor: 79%</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help">
                            <span className="text-muted-foreground">Borrow power used</span>
                            <span className="font-semibold">&lt;0.01%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Borrow Capacity: 0.00</div>
                            <div>Liquidation Factor: 79%</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            </TooltipProvider>
          )}

          {!hasAssets ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-muted-foreground text-sm">{emptyMessage}</div>
            </div>
          ) : (
            <div className="space-y-3">
              {assets
                .filter(asset => mode === "supply" ? asset.isSupplied : asset.isBorrowed)
                .map((asset, index) => (
                  <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <AssetCard asset={asset} mode={mode} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </Card>

      {/* Available Assets Section */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-secondary border-border/50">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
                  Assets to {mode === "supply" ? "supply" : "borrow"}
                </h2>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          {showHideButton && (
            <Button
              variant="ghost"
              onClick={() => setIsHidden(!isHidden)}
              className="text-sm hover:scale-105 transition-transform self-start sm:self-center"
            >
              {isHidden ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide
                </>
              )}
            </Button>
          )}
        </div>

        {/* {infoMessage && (
          <div className="mb-4 p-3 sm:p-4 rounded-lg bg-info/10 border border-info/20 animate-scale-in">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-info leading-relaxed">{infoMessage}</div>
            </div>
          </div>
        )} */}

        {!isHidden && (
          <div className="space-y-4">
            {/* Filter Checkboxes */}
            <div className="flex flex-wrap gap-4 pb-3 border-b border-border/50">
              {mode === "supply" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showZeroBalance"
                    checked={showZeroBalance}
                    onCheckedChange={(checked) => setShowZeroBalance(checked === true)}
                  />
                  <label
                    htmlFor="showZeroBalance"
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Show assets with 0 balance
                  </label>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showAvailable"
                    checked={showAvailable}
                    onCheckedChange={(checked) => setShowAvailable(checked === true)}
                  />
                  <label
                    htmlFor="showAvailable"
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Check Available
                  </label>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {assets
                .filter(asset => mode === "supply" ? !asset.isSupplied : !asset.isBorrowed)
                .filter(asset => {
                  if (mode === "supply") {
                    if (!showZeroBalance && (asset.balance === "0" || asset.balance === "0.0000")) {
                      return false;
                    }
                  } else {
                    if (!showAvailable && (!asset.available || asset.available === "0" || asset.available === "0.0000")) {
                      return false;
                    }
                  }
                  return true;
                })
                .map((asset, index) => (
                  <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <AssetCard asset={asset} mode={mode} />
                  </div>
                ))}
            </div>

            {/* Total Balance Display */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Est Value</span>
                <span className="font-semibold text-lg">{getTotalEstimatedValue()}</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AssetsSection;
