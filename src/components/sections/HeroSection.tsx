import { HeroButton } from "@/components/ui/hero-button";
import { ArrowRight, Shield, Zap, Globe, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Hedera Hashgraph
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Banking</span>
            <br />
            on Blockchain
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionize financial services with automated smart contracts, transparent transactions, 
            and decentralized banking solutions built on Hedera's enterprise-grade DLT.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <HeroButton size="xl" className="min-w-[200px]">
              Launch DApp
              <ArrowRight className="w-5 h-5 ml-2" />
            </HeroButton>
            <HeroButton variant="outline" size="xl" className="min-w-[200px]">
              View Documentation
            </HeroButton>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm shadow-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Audited</h3>
              <p className="text-muted-foreground text-center">
                Enterprise-grade security with transparent, auditable smart contracts
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm shadow-card">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-center">
                Process transactions in seconds with Hedera's high-throughput network
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm shadow-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Global Access</h3>
              <p className="text-muted-foreground text-center">
                Borderless financial services accessible from anywhere in the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;