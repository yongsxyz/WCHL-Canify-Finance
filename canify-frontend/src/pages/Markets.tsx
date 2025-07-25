import { TrendingUp, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MarketStats from "@/components/MarketStats";
import TopMarkets from "@/components/TopMarkets";
import AssetsTable from "@/components/AssetsTable";
import AIAnalysisModal from "@/components/AIAnalysisModal";

const Markets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-transparent to-success/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center animate-scale-in">
              <TrendingUp className="w-6 h-6 text-primary-foreground text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Markets</h1>
          </div>
          <p className="text-muted-foreground">
            Discover real-time markets, trends, and investment opportunities.
          </p>
        </div>

        {/* AI Market Analysis Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-secondary border-border/50 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI Market Analysis</h2>
                <p className="text-sm text-muted-foreground">Get insights on current market trends</p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 transition-all duration-300 text-white"
            >

              Ask AI Agent
            </Button>
          </div>
        </Card>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <MarketStats />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <TopMarkets />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <AssetsTable />
        </div>

        <AIAnalysisModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="AI Market Analysis"
          description="Get comprehensive insights on current market trends and opportunities"
          analysisType="market"
        />
      </div>
    </div>
  );
};

export default Markets;