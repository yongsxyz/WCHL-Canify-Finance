import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Cryptocurrency icons with proper symbols
const CryptoIcon = ({ symbol }: { symbol: string }) => {
  const iconMap: { [key: string]: { bg: string; color: string; symbol: string } } = {
    'ICP': { bg: 'bg-yellow-500', color: 'text-white', symbol: 'icp.webp' },
    'ckETH': { bg: 'bg-gray-800', color: 'text-white', symbol: 'eth.svg' },
    'ckBTC': { bg: 'bg-blue-500', color: 'text-white', symbol: 'btc.svg' },
    'ckUSDC': { bg: 'bg-orange-500', color: 'text-white', symbol: 'usdc.svg' },
    'ckUSDT': { bg: 'bg-gray-600', color: 'text-white', symbol: 'usdt.svg' },
  };

  const config = iconMap[symbol] || { bg: 'bg-gray-400', color: 'text-white', symbol: '○' };

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}>
      <img
        src={`/token/${config.symbol}`}

        className="w-full h-full object-contain"
      />
    </div>
  );
};

const AssetsTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAllAssets, setShowAllAssets] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(true);
  const assets = [
    {
      asset: "ICP",
      liquidity: "$491.37B",
      totalSupply: "$492.75B",
      supplyAPY: "<0.01%",
      totalBorrow: "$22,977.97",
      borrowAPY: "0.04%",
      category: "Major",
    },
    {
      asset: "ckETH",
      liquidity: "$165.10",
      totalSupply: "$314.88",
      supplyAPY: "2.75%",
      totalBorrow: "$143.62",
      borrowAPY: "6.49%",
      category: "Stablecoin",
    },
    {
      asset: "ckBTC",
      liquidity: "$83.19",
      totalSupply: "$101.34",
      supplyAPY: "0.48%",
      totalBorrow: "$17.65",
      borrowAPY: "3.03%",
      category: "Stablecoin",
    },
    {
      asset: "ckUSDC",
      liquidity: "$9,435.08",
      totalSupply: "$3,532.95",
      supplyAPY: "0.00%",
      totalBorrow: "$6.86",
      borrowAPY: "1.08%",
      category: "Stablecoin",
    },
    {
      asset: "ckUSDT",
      liquidity: "$463.96",
      totalSupply: "$464.19",
      supplyAPY: "0.00%",
      totalBorrow: "$0.35",
      borrowAPY: "1.01%",
      category: "Major",
    },

  ];

  // Get unique asset names and categories for filter
  const uniqueAssets = useMemo(() => {
    return Array.from(new Set(assets.map(asset => asset.asset)));
  }, []);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(assets.map(asset => asset.category)));
  }, []);

  // Filter assets based on search and selected filters
  const filteredAssets = useMemo(() => {
    let filtered = assets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.asset.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected assets
    if (!showAllAssets && selectedAssets.length > 0) {
      filtered = filtered.filter(asset => selectedAssets.includes(asset.asset));
    }

    // Filter by selected categories
    if (!showAllCategories && selectedCategories.length > 0) {
      filtered = filtered.filter(asset => selectedCategories.includes(asset.category));
    }

    return filtered;
  }, [searchTerm, selectedAssets, selectedCategories, showAllAssets, showAllCategories]);

  const handleAssetToggle = (asset: string) => {
    setSelectedAssets(prev =>
      prev.includes(asset)
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
    setShowAllAssets(false);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setShowAllCategories(false);
  };

  const handleShowAllAssets = () => {
    setShowAllAssets(true);
    setSelectedAssets([]);
  };

  const handleShowAllCategories = () => {
    setShowAllCategories(true);
    setSelectedCategories([]);
  };

  const handleAssetClick = (assetName: string) => {
    navigate(`/markets/${assetName}`);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="SEARCH ASSETS"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 hover:bg-primary/10 transition-all duration-200">
              <Filter className="w-4 h-4" />
              {showAllCategories ? 'All Categories' : `${selectedCategories.length} Selected`}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background border-border/50 shadow-lg">
            <DropdownMenuCheckboxItem
              checked={showAllCategories}
              onCheckedChange={handleShowAllCategories}
              className="font-medium"
            >
              All Categories
            </DropdownMenuCheckboxItem>
            <div className="border-t border-border/50 my-1" />
            {uniqueCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">ASSET</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">LIQUIDITY</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">TOTAL SUPPLY</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">SUPPLY APY</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">TOTAL BORROW</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">BORROW APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">
                    {searchTerm ? `No assets found matching "${searchTerm}"` : 'No assets match the selected filters'}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAssets.map((asset, index) => (
                <TableRow
                  key={index}
                  className="border-border/50 hover:bg-muted/30 transition-all duration-200 animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleAssetClick(asset.asset)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={asset.asset} />
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {asset.asset}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{asset.liquidity}</TableCell>
                  <TableCell className="font-medium text-foreground">{asset.totalSupply}</TableCell>
                  <TableCell className="font-medium text-success">{asset.supplyAPY}</TableCell>
                  <TableCell className="font-medium text-foreground">{asset.totalBorrow}</TableCell>
                  <TableCell className="font-medium text-warning">{asset.borrowAPY}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AssetsTable;