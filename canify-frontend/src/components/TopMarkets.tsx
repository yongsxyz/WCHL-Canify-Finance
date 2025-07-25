import MarketOverview from "./MarketOverview";

const TopMarkets = () => {
  const topSupplyData = [
    { name: "ICP", value: 44.93, color: "#3B82F6", logo: "icp.webp" },
    { name: "ckETH", value: 37.73, color: "#10B981", logo: "eth.svg" },
    { name: "ckBTC", value: 6.05, color: "#8B5CF6", logo: "btc.svg" },
  ];

  const topBorrowData = [
    { name: "ckBTC", value: 84.98, color: "#F59E0B", logo: "btc.svg" },
    { name: "ckUSDT", value: 10.44, color: "#8B5CF6", logo: "usdt.svg" },
    { name: "ckETH", value: 4.06, color: "#3B82F6", logo: "eth.svg" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <MarketOverview
        title="Total Supply"
        amount="$7,860.15"
        change="0.22%"
        data={topSupplyData}
        isPositive={true}
      />
      
      <MarketOverview
        title="Total Borrow"
        amount="$168.96"
        change="0.00%"
        data={topBorrowData}
        isPositive={false}
      />
    </div>
  );
};

export default TopMarkets;