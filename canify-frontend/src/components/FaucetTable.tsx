import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FaucetAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  color: string;
  logo: string;
}

const faucetAssets: FaucetAsset[] = [
  {
    id: "ICP",
    name: "Internet Computer Protocol",
    symbol: "ICP",
    icon: "₿",
    balance: "0",
    color: "bg-orange-500",
    logo: "icp.webp"
  },
  {
    id: "ckETH",
    name: "Chain-Key Ethereum",
    symbol: "ckETH",
    icon: "🔗",
    balance: "0",
    color: "bg-blue-500",
    logo: "eth.svg"
  },
  {
    id: "ckBTC",
    name: "Chain-Key Bitcoin",
    symbol: "ckBTC",
    icon: "◎",
    balance: "0",
    color: "bg-yellow-500",
    logo: "btc.svg"
  },
  {
    id: "ckUSDC",
    name: "Chain-Key USD Coin",
    symbol: "ckUSDC",
    icon: "₮",
    balance: "0",
    color: "bg-green-500",
    logo: "usdc.svg"
  },
  {
    id: "ckUSDT",
    name: "Chain-Key Tether USD",
    symbol: "ckUSDT",
    icon: "$",
    balance: "0",
    color: "bg-blue-600",
    logo: "usdt.svg"
  }
];

const FaucetTable = () => {
  const { toast } = useToast();

  const handleFaucet = (asset: FaucetAsset) => {
    toast({
      title: "Faucet Request",
      description: `Requesting test ${asset.symbol} tokens...`,
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border animate-slide-up">
        <h2 className="text-xl font-semibold text-card-foreground">Test Assets</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Asset
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                Wallet balance
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {faucetAssets.map((asset, index) => (
              <tr
                key={asset.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-all duration-300 animate-fade-in hover:scale-[1.01]"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center text-white text-sm font-bold transition-transform duration-300 hover:scale-110`}>

                      <img
                        src={`/token/${asset.logo}`}
                        alt={`${asset.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-card-foreground">{asset.symbol}</div>
                      <div className="font-sm text-muted-foreground ">{asset.name}</div>

                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="font-mono text-card-foreground">{asset.balance}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFaucet(asset)}
                    className="min-w-[70px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Faucet
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaucetTable;