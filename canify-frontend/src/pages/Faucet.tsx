import { Droplets } from "lucide-react";
import FaucetTable from "@/components/FaucetTable";

const Faucet = () => {
  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-transparent to-success/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center animate-scale-in">
              <Droplets className="w-6 h-6 text-primary-foreground text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Faucet</h1>
          </div>
          <p className="text-muted-foreground">
            Get tokens for test
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto animate-slide-up " style={{ animationDelay: '0.3s' }}>
          <FaucetTable />
        </div>
      </div>
    </div>
  );
};

export default Faucet;