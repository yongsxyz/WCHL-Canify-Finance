import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, TrendingUp, X } from "lucide-react";

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  analysisType: "portfolio" | "market";
}

const AIAnalysisModal = ({ isOpen, onClose, title, description, analysisType }: AIAnalysisModalProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout: NodeJS.Timeout;

  const getAnalysisContent = () => {
    if (analysisType === "portfolio") {
      return `
**Portfolio Overview**
You currently have no borrowed assets and your supplied assets consist of ckETH worth approximately $60,080.00. Your health factor is neutral at 0, indicating no active loans. To unlock borrowing capabilities, you can use your supplied ckETH as collateral.

💰 **Earnings Insight**
Your supplied ckETH is earning <0.01% APY. While this provides a secure storage, the returns are minimal. Consider supplying other assets like ICP or ckBTC which currently offer a higher APY of 5.79% to maximize your yield.

📉 **Borrowing Strategy**
You haven't borrowed any assets yet. Based on your current collateral, you are eligible to borrow a small amount of ICP, ckETH, ckBTC, ckUSDC, or ckUSDT. Note that ICP currently has a high APY of 120.34%, so borrowing it may incur significant cost.

⚙️ **Optimization Tips**
To improve your portfolio efficiency, consider diversifying your supplied assets into higher-yield tokens like ICP or ckBTC. If you plan to borrow, prefer stablecoins like ckUSDC (1.02% APY) or ckUSDT (5.00% APY) for lower interest expenses.

🛡 **Health Factor Advice**
Your health factor is currently 0, meaning there's no risk of liquidation. If you choose to borrow, ensure you maintain a health factor above 1.0 to stay safe from liquidation events.
  `.trim();
    } else {
      return  `
**Market Overview**
The total market size (TVL) currently stands at $41,188.49 with total available liquidity of $33,489.81 and total borrowed assets at $168.98. This indicates a healthy market with low borrowing activity and high available liquidity.

💡 **Supply Trends**
Total supplied value is $7,867.65, with most of it coming from three key assets:
- ICP contributes 44.93% of the supply market.
- ckETH follows with 37.73%.
- ckBTC stands at 6.05%.

Supply APYs are generally low across the board, with ckETH offering the highest at 2.75%, followed by ckBTC at 0.48%. ICP offers <0.01% APY despite dominating supply volume.

📉 **Borrowing Trends**
Total borrow value is only $168.98, indicating very low utilization. The top borrowed assets are:
- ckBTC: 84.98%
- ckUSDT: 10.44%
- ckETH: 4.06%

Borrow APY is highest for ckETH at 6.49%, while ckBTC and stablecoins (ckUSDT, ckUSDC) remain moderate at around 1–3%.

📊 **Asset-Level Snapshot**
- **ICP**: $491.37B liquidity, $492.75B supply, $22,977.97 borrowed, <0.01% supply APY, 0.04% borrow APY.
- **ckETH**: $165.10 liquidity, $314.88 supply, $143.62 borrowed, 2.75% supply APY, 6.49% borrow APY.
- **ckBTC**: $83.19 liquidity, $101.34 supply, $17.65 borrowed, 0.48% supply APY, 3.03% borrow APY.
- **ckUSDC**: $9,435.08 liquidity, $3,532.95 supply, $6.86 borrowed, 0.00% supply APY, 1.08% borrow APY.
- **ckUSDT**: $463.96 liquidity, $464.19 supply, $0.35 borrowed, 0.00% supply APY, 1.01% borrow APY.

📌 **Insights & Opportunities**
- The market is underutilized, providing opportunities for borrowers with low competition.
- ckETH offers a strong supply APY (2.75%) and high borrow demand.
- ckBTC dominates borrow volume, showing potential use in leveraged positions or swaps.
- Stablecoins have low APYs but offer a hedge for conservative strategies.

🤖 **Tip**: Use AI Market Analysis to detect early shifts in asset borrow demand and APY spikes.
  `.trim();
    }
  };

  const handleAnalysis = async () => {
    // Clear any ongoing typing animation
    if (isTyping) {
      clearTimeout(typingTimeout);
      setIsTyping(false);
    }

    setIsAnalyzing(true);
    setShowResult(false);
    setAnalysisResult("");
    setProgress(0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Ensure progress reaches 100%
    setProgress(100);
    clearInterval(progressInterval);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);

      const result = getAnalysisContent();
      setAnalysisResult(""); // Reset before starting new typing
      setIsTyping(true);

      let index = 0;
      const typeWriter = () => {
        if (index < result.length) {
          setAnalysisResult(prev => prev + result.charAt(index));
          index++;
          typingTimeout = setTimeout(typeWriter, 20);
        } else {
          setIsTyping(false);
        }
      };

      typeWriter();
    }, 500);
  };

  const handleClose = () => {
    // Clear any ongoing typing animation
    if (isTyping) {
      clearTimeout(typingTimeout);
      setIsTyping(false);
    }

    setIsAnalyzing(false);
    setShowResult(false);
    setAnalysisResult("");
    setProgress(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-card to-secondary border-border/50
    scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-secondary/50
    hover:scrollbar-thumb-primary/70 dark:scrollbar-thumb-primary/60 dark:scrollbar-track-secondary/30">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center animate-scale-in">
                <Bot className="w-6 h-6 text-primary-foreground text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">{title}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!showResult && !isAnalyzing && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Ready to Analyze</h3>
              <p className="text-muted-foreground mb-6">
                Our AI will analyze your {analysisType === "portfolio" ? "portfolio data" : "market trends"} and provide personalized insights.
              </p>
              <Button
                onClick={handleAnalysis}
                className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 transition-all duration-300 text-white"
                size="lg"
              >
                <Bot className="w-5 h-5 mr-2" />
                Start Analysis
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">AI Analysis in Progress</h3>
              <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                <span className="animate-pulse">Waiting For Analysis Data...</span>
              </div>

              {/* Progress Bar with Percentage */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-primary animate-pulse">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {progress < 30 && "Initializing analysis..."}
                  {progress >= 30 && progress < 60 && "Processing data..."}
                  {progress >= 60 && progress < 90 && "Generating insights..."}
                  {progress >= 90 && "Finalizing results..."}
                </div>
              </div>
            </div>
          )}

          {showResult && (
            <div className="animate-scale-in">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Analysis Complete</h3>
                    <p className="text-sm text-muted-foreground">AI insights and recommendations</p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {analysisResult}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleAnalysis}
                    variant="outline"
                    className="flex-1"
                    disabled={isTyping} // Disable button while typing
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    {isTyping ? "Processing..." : "Analyze Again"}
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white"
                  >
                    Close Analysis
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisModal;