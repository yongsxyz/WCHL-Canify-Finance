import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign, PiggyBank, CreditCard } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

const MarketStats = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Generate sample sparkline data with more dramatic trends
  const generateSparklineData = (trend: 'up' | 'down' | 'volatile', periods: number = 20) => {
    const data = [];
    let baseValue = 100;
    const currentDate = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < periods; i++) {
      let change = 0;
      if (trend === 'up') {
        change = Math.random() * 4 + 1; // Strong upward trend
      } else if (trend === 'down') {
        change = Math.random() * 4 - 3; // Strong downward trend
      } else {
        change = Math.random() * 8 - 4; // High volatility
      }
      
      baseValue = Math.max(baseValue + change, 20);
      
      // Generate date going backwards from current date
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (periods - i));
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      data.push({ 
        value: baseValue,
        time: i,
        date: `${day} ${month} ${year}`,
        label: `${day} ${month} ${year}: $${baseValue.toFixed(2)}`
      });
    }
    return data;
  };

  const stats = [
    {
      title: "Total Market Size (TVL)",
      value: "$41,188.49",
      change: "0.29%",
      isPositive: true,
      icon: DollarSign,
      gradient: "from-blue-500 to-blue-600",
      sparklineData: generateSparklineData('up'),
      sparklineColor: "#3b82f6",
    },
    {
      title: "Total available",
      value: "$33,489.81", 
      change: "0.05%",
      isPositive: true,
      icon: PiggyBank,
      gradient: "from-purple-500 to-purple-600",
      sparklineData: generateSparklineData('volatile'),
      sparklineColor: "#8b5cf6",
    },
    {
      title: "Total Supply",
      value: "$7,867.65",
      change: "1.37%", 
      isPositive: true,
      icon: Wallet,
      gradient: "from-green-500 to-green-600",
      sparklineData: generateSparklineData('up'),
      sparklineColor: "#10b981",
    },
    {
      title: "Total Borrow",
      value: "$168.98",
      change: "0.04%",
      isPositive: true,
      icon: CreditCard,
      gradient: "from-orange-500 to-orange-600",
      sparklineData: generateSparklineData('down'),
      sparklineColor: "#f59e0b",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="p-4 lg:p-6 bg-gradient-to-br from-card to-secondary hover:shadow-lg transition-all duration-300 border-border/50 animate-fade-in hover:scale-105 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${
                stat.isPositive 
                  ? 'bg-success/10 text-success border-success/20' 
                  : 'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
              
              {/* Sparkline Chart */}
              <div className="h-12 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.sparklineData}>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const value = payload[0].value;
                          const dataPoint = payload[0].payload;
                          return (
                            <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
                              <p className="text-xs text-muted-foreground">{dataPoint.date}</p>
                              <p className="text-sm font-semibold text-foreground">
                                ${typeof value === 'number' ? value.toFixed(2) : value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={stat.sparklineColor}
                      strokeWidth={hoveredCard === index ? 3 : 2}
                      dot={false}
                      activeDot={{ r: 4, fill: stat.sparklineColor, strokeWidth: 2, stroke: '#fff' }}
                      className="transition-all duration-200"
                    />
                  </LineChart>
                </ResponsiveContainer>
                
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketStats;