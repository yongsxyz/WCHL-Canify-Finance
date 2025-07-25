import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";


interface MarketData {
  name: string;
  value: number;
  color: string;
  logo: string;
}

interface MarketOverviewProps {
  title: string;
  amount: string;
  change: string;
  data: MarketData[];
  isPositive?: boolean;
}

const MarketOverview = ({ title, amount, change, data, isPositive = true }: MarketOverviewProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50 animate-fade-in hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${isPositive
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive'
            }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <div className={`text-2xl font-bold mb-4 ${title.includes('Supply') ? 'text-success' : 'text-destructive'}`}>
          {amount}
        </div>
        <p className="text-sm text-muted-foreground mb-4">TOP 3 MARKETS</p>
      </div>

      {/* Market List */}
      <div className="space-y-4">
        {data.map((market, index) => (
          <div key={market.name} className="flex items-center gap-3">
            <img
              src={`/token/${market.logo}`}
              alt={`${market.name} logo`}
              className="w-7 h-7 object-contain"
            />
            <span className="text-sm font-medium text-foreground min-w-[60px]">
              {market.name}
            </span>
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${market.value}%`,
                    backgroundColor: market.color,
                    animationDelay: `${index * 200}ms`
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground min-w-[50px] text-right">
                {market.value.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MarketOverview;