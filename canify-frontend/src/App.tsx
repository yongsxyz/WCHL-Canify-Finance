import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Markets from "./pages/Markets";
import AssetDetail from "./pages/AssetDetail";
import Faucet from "./pages/Faucet";
import More from "./pages/More";

import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

import { AuthProvider } from "@/context/auth";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
              <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/markets" element={<><Navbar /><Markets /></>} />
          <Route path="/markets/:assetId" element={<><Navbar /><AssetDetail /></>} />
          <Route path="/faucet" element={<><Navbar /><Faucet /></>} />
          <Route path="/more" element={<><Navbar /><More /></>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
