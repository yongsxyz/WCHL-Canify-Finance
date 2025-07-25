import { useState } from "react";
import { ArrowLeft, Info, ExternalLink, TrendingUp, TrendingDown, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import SupplyWithdrawModal from "@/components/SupplyWithdrawModal";
const assetDetails = {
  'ICP': {
    name: 'ICP',
    fullName: 'Internet Computer',
    version: 'Version 1',
    reserveSize: '$3.5B',
    availableLiquidity: '$3.2B',
    utilizationRate: '9.00%',
    oraclePrice: '$8.50',
    icon: {
      symbol: 'icp.webp',
    },
    walletBalance: '125.000000',
    availableToSupply: '100.000000',
    availableToSupplyValue: '$850.00',
    availableToBorrow: '230.00',
    availableToBorrowValue: '$1,955.00',
    totalSupplied: '410M',
    totalSuppliedValue: '$3.5B',
    apy: '0.75%',
    maxLtv: '60.00%',
    liquidationThreshold: '65.00%',
    liquidationPenalty: '10.00%',
    totalBorrowed: '30.00M',
    totalBorrowedValue: '$255M',
    borrowApy: '1.25%',
    utilizationRateModel: '9.00%',
    canBeCollateral: true
  },

  'ckETH': {
    name: 'ckETH',
    fullName: 'Chain Key Ethereum',
    version: 'Version 2',
    reserveSize: '$200.00M',
    availableLiquidity: '$180.00M',
    utilizationRate: '10.00%',
    oraclePrice: '$3,000.00',
    icon: {
      symbol: 'eth.svg',
    },
    walletBalance: '2.500000',
    availableToSupply: '2.000000',
    availableToSupplyValue: '$6,000.00',
    availableToBorrow: '5.00',
    availableToBorrowValue: '$15,000.00',
    totalSupplied: '66,666',
    totalSuppliedValue: '$200.00M',
    apy: '0.95%',
    maxLtv: '75.00%',
    liquidationThreshold: '80.00%',
    liquidationPenalty: '12.00%',
    totalBorrowed: '6,000',
    totalBorrowedValue: '$18M',
    borrowApy: '2.00%',
    utilizationRateModel: '10.00%',
    canBeCollateral: true
  },

  'ckBTC': {
    name: 'ckBTC',
    fullName: 'Chain Key Bitcoin',
    version: 'Version 1',
    reserveSize: '$150.00M',
    availableLiquidity: '$145.00M',
    utilizationRate: '3.33%',
    oraclePrice: '$60,000.00',
    icon: {
      symbol: 'btc.svg',
    },
    walletBalance: '0.500000',
    availableToSupply: '0.400000',
    availableToSupplyValue: '$24,000.00',
    availableToBorrow: '0.60',
    availableToBorrowValue: '$36,000.00',
    totalSupplied: '2,500',
    totalSuppliedValue: '$150.00M',
    apy: '0.30%',
    maxLtv: '70.00%',
    liquidationThreshold: '75.00%',
    liquidationPenalty: '10.00%',
    totalBorrowed: '83.33',
    totalBorrowedValue: '$5M',
    borrowApy: '0.60%',
    utilizationRateModel: '3.33%',
    canBeCollateral: true
  },

  'ckUSDC': {
    name: 'ckUSDC',
    fullName: 'Chain Key USD Coin',
    version: 'Version 2',
    reserveSize: '$120.00M',
    availableLiquidity: '$100.00M',
    utilizationRate: '16.67%',
    oraclePrice: '$1.00',
    icon: {
      symbol: 'usdc.svg',
    },
    walletBalance: '5000.000000',
    availableToSupply: '4000.000000',
    availableToSupplyValue: '$4,000.00',
    availableToBorrow: '20,000.00',
    availableToBorrowValue: '$20,000.00',
    totalSupplied: '120M',
    totalSuppliedValue: '$120.00M',
    apy: '0.50%',
    maxLtv: '90.00%',
    liquidationThreshold: '92.50%',
    liquidationPenalty: '5.00%',
    totalBorrowed: '20M',
    totalBorrowedValue: '$20M',
    borrowApy: '1.25%',
    utilizationRateModel: '16.67%',
    canBeCollateral: true
  },

  'ckUSDT': {
    name: 'ckUSDT',
    fullName: 'Chain Key Tether',
    version: 'Version 2',
    reserveSize: '$80.00M',
    availableLiquidity: '$70.00M',
    utilizationRate: '12.50%',
    oraclePrice: '$1.00',
    icon: {
      symbol: 'usdt.svg',
    },
    walletBalance: '2000.000000',
    availableToSupply: '1500.000000',
    availableToSupplyValue: '$1,500.00',
    availableToBorrow: '10,000.00',
    availableToBorrowValue: '$10,000.00',
    totalSupplied: '80M',
    totalSuppliedValue: '$80.00M',
    apy: '0.45%',
    maxLtv: '90.00%',
    liquidationThreshold: '92.50%',
    liquidationPenalty: '5.00%',
    totalBorrowed: '10M',
    totalBorrowedValue: '$10M',
    borrowApy: '1.00%',
    utilizationRateModel: '12.50%',
    canBeCollateral: true
  }


};
// Generate chart data
const generateChartData = () => {
  const data = [];
  for (let i = 0; i <= 100; i += 5) {
    data.push({
      utilization: i,
      borrowApr: i < 50 ? i * 0.02 : i * 0.05,
      ceiling: i * 0.1
    });
  }
  return data;
};

const CryptoIcon = ({ icon }: { icon: { symbol: string } }) => {
  return (
    <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-lg`}>

      <img
        src={`/token/${icon.symbol}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const AssetDetail = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const asset = assetDetails[assetId as keyof typeof assetDetails];

  if (!asset) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Asset not found</h1>
          <Button onClick={() => navigate('/markets')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Markets
          </Button>
        </div>
      </div>
    );
  }

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/markets')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Badge variant="secondary">{asset.version}</Badge>
        </div>

        {/* Asset Header Info */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <CryptoIcon icon={asset.icon} />
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">{asset.name}</h1>
                <span className="text-muted-foreground">{asset.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:ml-auto">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Reserve Size</div>
              <div className="text-lg font-semibold text-card-foreground">{asset.reserveSize}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Available liquidity</div>
              <div className="text-lg font-semibold text-card-foreground">{asset.availableLiquidity}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Utilization Rate</div>
              <div className="text-lg font-semibold text-success">{asset.utilizationRate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Oracle price</div>
              <div className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                {asset.oraclePrice}
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Reserve status & configuration */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Supply Info */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Supply Info</h3>

              {/* Main Supply Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total supplied</div>
                  <div className="font-semibold text-lg text-card-foreground">{asset.totalSupplied}</div>
                  <div className="text-sm text-muted-foreground">{asset.totalSuppliedValue}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">APY</div>
                  <div className="font-semibold text-lg text-success">{asset.apy}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-success">+0.02% (24h)</span>
                  </div>
                </div>
              </div>

              {/* Supply Chart */}
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-medium text-card-foreground mb-4">Supply Trend (7 days)</h4>
                <div className="h-32 bg-gradient-to-br from-success/5 to-transparent rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.15, fullDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.18, fullDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.19, fullDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.20, fullDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.21, fullDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.21, fullDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), supply: 8.21, fullDate: new Date().toLocaleDateString() }
                    ]}>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value) => [`${value}M ${asset.name}`, 'Total Supply']}
                        labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
                        labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="supply"
                        stroke="hsl(var(--success))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--success))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Collateral usage */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Collateral usage</h3>
                {asset.canBeCollateral && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    ✓ Can be collateral
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm text-muted-foreground">Max LTV</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="font-semibold text-card-foreground">{asset.maxLtv}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm text-muted-foreground">Liquidation threshold</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="font-semibold text-card-foreground">{asset.liquidationThreshold}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm text-muted-foreground">Liquidation penalty</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="font-semibold text-card-foreground">{asset.liquidationPenalty}</div>
                </div>
              </div>
            </Card>

            {/* Borrow Info */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Borrow Info</h3>

              {/* Main Borrow Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total borrowed</div>
                  <div className="font-semibold text-lg text-card-foreground">{asset.totalBorrowed}</div>
                  <div className="text-sm text-muted-foreground">{asset.totalBorrowedValue}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">APY, variable</div>
                  <div className="font-semibold text-lg text-warning">{asset.borrowApy}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-red-500">-0.01% (24h)</span>
                  </div>

                </div>
              </div>

              {/* Borrow Chart */}
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-medium text-card-foreground mb-4">Borrow Trend (7 days)</h4>
                <div className="h-32 bg-gradient-to-br from-warning/5 to-transparent rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22800, fullDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22850, fullDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22900, fullDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22920, fullDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22950, fullDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22970, fullDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() },
                      { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), borrow: 22977, fullDate: new Date().toLocaleDateString() }
                    ]}>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value) => [`${Number(value).toLocaleString()} ${asset.name}`, 'Total Borrowed']}
                        labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
                        labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="borrow"
                        stroke="hsl(var(--warning))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--warning))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Interest rate model */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Interest rate model</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Utilization Rate</span>
                  <span className="font-semibold text-success">{asset.utilizationRateModel}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="utilization"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const utilizationRate = payload[0]?.payload?.utilization;
                          const borrowAmount = (utilizationRate * 4906773175875.3 / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                          const borrowApr = payload[0]?.payload?.borrowApr;

                          return (
                            <div className="bg-card border border-border rounded-lg p-4 shadow-lg min-w-[280px]">
                              <h4 className="font-semibold text-card-foreground mb-3">Utilization Rate</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Borrow amount to reach {utilizationRate}% utilization</span>
                                  <span className="font-medium text-card-foreground">${borrowAmount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Borrow APR, variable</span>
                                  <span className="font-medium text-warning">{borrowApr.toFixed(2)}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="borrowApr"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="ceiling"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Borrow APR, variable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
                  <span className="text-muted-foreground">Utilization Rate</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Your info */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Your info</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded flex items-center justify-center">
                    <CryptoIcon icon={asset.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Wallet balance</div>
                    <div className="font-semibold text-card-foreground">
                      {asset.walletBalance} {asset.name}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">Available to supply</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="font-semibold text-card-foreground">
                    {asset.availableToSupply} {asset.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{asset.availableToSupplyValue}</div>
                  <Button className="w-full text-white font-bold" onClick={() => setIsSupplyModalOpen(true)}>Supply</Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">Available to borrow</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="font-semibold text-card-foreground">
                    {asset.availableToBorrow} {asset.name}
                  </div>
                  <div className="text-sm text-muted-foreground ">{asset.availableToBorrowValue}</div>
                  <Button className="w-full text-white font-bold" onClick={() => setIsBorrowModalOpen(true)}>Borrow</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Supply Modal */}
        <SupplyWithdrawModal
          isOpen={isSupplyModalOpen}
          onClose={() => setIsSupplyModalOpen(false)}
          asset={{
            symbol: asset.name,
            name: asset.fullName,
            icon: asset.icon.symbol,
            balance: asset.walletBalance,
            apy: asset.apy
          }}
          mode="supply"
        />

        {/* Borrow Modal */}
        <SupplyWithdrawModal
          isOpen={isBorrowModalOpen}
          onClose={() => setIsBorrowModalOpen(false)}
          asset={{
            symbol: asset.name,
            name: asset.fullName,
            icon: asset.icon.symbol,
            balance: asset.availableToBorrow,
            apy: asset.borrowApy
          }}
          mode="borrow"
        />
      </div>
    </div>
  );
};

export default AssetDetail;