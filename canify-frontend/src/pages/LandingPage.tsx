import { NavLink } from "react-router-dom";
import { ArrowDown, ArrowRight, Shield, Zap, Globe, Users, FileText, Download, Github, Twitter, Linkedin } from "lucide-react";
import LandingNavbar from "@/components/NavbarLandingPage";
import Galaxy from '@/components/HyperPassed';
import ButtonAnimated from '@/components/ButtonAnimate';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <LandingNavbar />

      <section id="home" className="w-full min-h-screen h-auto md:h-dvh overflow-x-hidden relative text-white px-4 md:px-0 flex flex-col justify-center">

        {/* Gradient Spheres */}
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full md:pb-0 flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-2 md:space-y-4 items-center text-center">
            {/* <p className="font-medium text-base md:text-xl lg:text-2xl text-muted-foreground">
              Supply, borrow, swap, bridge and secure multi-chain.
            </p> */}
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-none">
              CANIFY FINANCE
            </h1>
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-snug">
              Next-Gen DeFi. Multi-Chain. Permissionless.
            </h2>
            <div className="pt-8"><NavLink to="/app/" >
              <ButtonAnimated
                as="button"
                className="custom-class"
                color="magenta"
                speed="3s"
                thickness={5}
              >
                Launch APP
              </ButtonAnimated>
            </NavLink>
            </div>
          </div>
        </div>

        {/* Galaxy Background */}
        <div className="absolute inset-0 z-10">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1}
            glowIntensity={0.3}
            saturation={0.8}
            hueShift={240}
          />
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center gap-3 group">
            <p className="text-base text-muted-foreground group-hover:text-white transition-colors duration-1300">
              Explore
            </p>
            <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce group-hover:text-white transition-colors duration-1100" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="ml-2 text-xl font-bold text-foreground">Canify Finance</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                The next-generation decentralized finance platform empowering users can participate as liquidity providers (lenders) or borrowers, earning interest or accessing capital in a secure, transparent, and permissionless.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#whitepaper" className="text-muted-foreground hover:text-foreground transition-colors">Whitepaper</a></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><NavLink to="/app/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</NavLink></li>
                <li><NavLink to="/app/markets" className="text-muted-foreground hover:text-foreground transition-colors">Markets</NavLink></li>
                <li><NavLink to="/app/faucet" className="text-muted-foreground hover:text-foreground transition-colors">Faucet</NavLink></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Canify Finance. All rights reserved. Built with ❤️ Internet Computer Protocol.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;