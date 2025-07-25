import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Wallet } from "lucide-react";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      <Card className="p-4 lg:p-6 bg-gradient-to-br from-card to-secondary hover:shadow-lg transition-all duration-300 border-border/50 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground text-white" />
            </div>
            <div className="text-sm text-muted-foreground">Net Worth</div>
          </div>
        </div>
        <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">$0.00</div>
        <div className="text-xs lg:text-sm text-muted-foreground">No assets supplied or borrowed</div>
      </Card>
      
      <Card className="p-4 lg:p-6 bg-gradient-to-br from-card to-secondary hover:shadow-lg transition-all duration-300 border-border/50 animate-slide-up [animation-delay:0.1s]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br  bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm text-muted-foreground">Net APY</div>
          </div>
        </div>
        <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">0.00%</div>
        <div className="text-xs lg:text-sm text-muted-foreground">Net borrowing rate</div>
      </Card>
      
      <Card className="p-4 lg:p-6 bg-gradient-to-br from-card to-secondary hover:shadow-lg transition-all duration-300 border-border/50 animate-slide-up [animation-delay:0.2s]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Shield className="w-5 h-5  text-white " />
            </div>
            <div className="text-sm text-muted-foreground">Health Factor</div>
          </div>
        </div>
        <div className="text-2xl lg:text-3xl font-bold text-success mb-2">0</div>
        <div className="text-xs lg:text-sm text-muted-foreground">No borrowed assets</div>
      </Card>
    </div>
  );
};

export default DashboardStats;