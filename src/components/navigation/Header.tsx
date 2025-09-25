import { HeroButton } from "@/components/ui/hero-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Wallet, Shield, TrendingUp, Menu } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    console.log('Connect Wallet clicked');
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsWalletConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Hedera wallet",
      });
      
      // Navigate to dashboard after connection
      setTimeout(() => {
        const dashboardElement = document.getElementById('dashboard');
        if (dashboardElement) {
          dashboardElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLaunchApp = () => {
    console.log('Launch App clicked');
    const dashboardElement = document.getElementById('dashboard');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If dashboard section doesn't exist, navigate to dashboard page
      window.location.href = '/dashboard';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">HederaBank</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#loans" className="text-muted-foreground hover:text-foreground transition-colors">
            Loans
          </a>
          <a href="#payments" className="text-muted-foreground hover:text-foreground transition-colors">
            Payments
          </a>
          <a href="#history" className="text-muted-foreground hover:text-foreground transition-colors">
            History
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <HeroButton 
            variant={isWalletConnected ? "success" : "outline"}
            size="sm" 
            className="hidden md:flex"
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : isWalletConnected ? "Connected" : "Connect Wallet"}
          </HeroButton>
          <HeroButton size="sm" onClick={handleLaunchApp}>
            Launch App
          </HeroButton>
          <button className="md:hidden p-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;