import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Info, AlertTriangle, Bitcoin } from "lucide-react";

interface SupplyWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: {
    symbol: string;
    name: string;
    icon: string;
    balance: string;
    apy: string;
  };
  mode?: "supply" | "borrow";
}

const SupplyWithdrawModal = ({ isOpen, onClose, asset, mode = "supply" }: SupplyWithdrawModalProps) => {
  const [activeTab, setActiveTab] = useState(mode === "supply" ? "supply" : "borrow");
  const [amount, setAmount] = useState("");
  const [showError, setShowError] = useState(false);
  const [sliderValue, setSliderValue] = useState([0]);
  const [collateralizationEnabled, setCollateralizationEnabled] = useState(false);

  const walletBalance = "0.00";
  const supplyBalance = "1.00";
  const healthFactor = 2;
  const remainingSupply = "1.00";

  const handleMaxClick = () => {
    setSliderValue([100]);
    if (activeTab === "supply") {
      setAmount(walletBalance);
    } else {
      setAmount(supplyBalance);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const percentage = value[0];
    const maxValue = activeTab === "supply" ? parseFloat(walletBalance) : parseFloat(supplyBalance);
    const calculatedAmount = (maxValue * percentage / 100).toFixed(6);
    setAmount(calculatedAmount);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    // Update slider based on amount
    const maxValue = activeTab === "supply" ? parseFloat(walletBalance) : parseFloat(supplyBalance);
    if (maxValue > 0) {
      const percentage = Math.min((parseFloat(value) / maxValue) * 100, 100);
      setSliderValue([percentage]);
    }

    // Show error if amount is invalid
    const numValue = parseFloat(value);
    if (value && (isNaN(numValue) || numValue <= 0)) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setShowError(true);
      return;
    }
    // Handle submit logic here
    console.log(`${activeTab}ing ${amount} ${asset.symbol}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="space-y-0 pb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {mode === "supply" ? (
                <>
                  <TabsTrigger value="supply" className="text-sm">
                    Supply
                  </TabsTrigger>
                  <TabsTrigger value="withdraw" className="text-sm">
                    Withdraw
                  </TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="borrow" className="text-sm">
                    Borrow
                  </TabsTrigger>
                  <TabsTrigger value="repay" className="text-sm">
                    Repay
                  </TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">
                {mode === "supply"
                  ? (activeTab === "supply" ? "SUPPLY" : "WITHDRAW")
                  : (activeTab === "borrow" ? "BORROW" : "REPAY")
                }
              </h3>
              <div className="text-sm text-muted-foreground">
                {mode === "supply"
                  ? (activeTab === "supply" ? "Wallet Balance" : "Supply Balance")
                  : (activeTab === "borrow" ? "Borrow Capacity" : "Borrowed Balance")
                }: <span className="text-primary font-medium">{activeTab === "supply" ? walletBalance : supplyBalance} {asset.symbol}</span>
              </div>
            </div>

            <div className="relative">
              <div className="border border-border rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img
                        src={`/token/${asset.icon}`}
                        alt={`${asset.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      {asset.symbol}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMaxClick}
                      className="text-xs h-7 px-3 text-primary hover:text-primary/80 border border-primary/20"
                    >
                      Max
                    </Button>
                  </div>
                </div>

                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="border-0 p-0 text-2xl md:text-4xl font-bold bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-center hide-spinner"
                />

                {/* Slider */}
                <div className="space-y-4">
                  <Slider
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <button onClick={() => handleSliderChange([25])} className="hover:text-primary transition-colors">25%</button>
                    <button onClick={() => handleSliderChange([50])} className="hover:text-primary transition-colors">50%</button>
                    <button onClick={() => handleSliderChange([75])} className="hover:text-primary transition-colors">75%</button>
                    <button onClick={() => handleSliderChange([100])} className="hover:text-primary transition-colors">100%</button>
                  </div>
                </div>
              </div>

              {showError && (
                <div className="mt-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="text-sm text-destructive font-medium">Invalid Amount</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-foreground">
                {mode === "supply" ? "SUPPLY STATS" : "BORROW STATS"}
              </h4>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {mode === "supply" ? "Supply APY" : "Borrow APY"}
                  </span>
                  <span className="text-base font-bold text-primary">{asset.apy}</span>
                </div>

                {mode === "supply" ? (
                  <>
                    {activeTab === "supply" ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Remaining supply</span>
                          <span className="text-base font-bold">{remainingSupply}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-muted-foreground">Health Factor</span>
                          <span className={`text-base font-bold ${healthFactor > 2 ? 'text-green-500' :
                            healthFactor > 1.5 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                            {healthFactor.toFixed(2)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Remaining supply</span>
                          <span className="text-base font-bold">{remainingSupply}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-muted-foreground">Health Factor</span>
                          <span className={`text-base font-bold ${healthFactor > 2 ? 'text-green-500' :
                            healthFactor > 1.5 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                            {healthFactor.toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {activeTab === "borrow" ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Available to borrow</span>
                          <span className="text-base font-bold">1.00</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-muted-foreground">Health Factor</span>
                          <span className={`text-base font-bold ${healthFactor > 2 ? 'text-green-500' :
                            healthFactor > 1.5 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                            {healthFactor.toFixed(2)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Remaining debt</span>
                          <span className="text-base font-bold">1.00</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-muted-foreground">Health Factor</span>
                          <span className={`text-base font-bold ${healthFactor > 2 ? 'text-green-500' :
                            healthFactor > 1.5 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                            {healthFactor.toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Collateral Section - Only show for supply mode */}
            {mode === "supply" && (
              <div className="space-y-4">
                <h4 className="text-base font-semibold text-foreground">
                  COLLATERAL
                </h4>

                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Health Factor</span>
                    <span className="text-base font-bold">{healthFactor}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Collateralization</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={collateralizationEnabled}
                        onCheckedChange={setCollateralizationEnabled}
                      />
                      <span className="text-sm font-medium">{collateralizationEnabled ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-base font-semibold text-white"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {mode === "supply"
                ? (activeTab === "supply" ? "Supply" : "Withdraw")
                : (activeTab === "borrow" ? "Borrow" : "Repay")
              } {asset.symbol}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplyWithdrawModal;