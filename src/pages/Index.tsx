import Header from "@/components/navigation/Header";
import HeroSection from "@/components/sections/HeroSection";
import StatsCards from "@/components/dashboard/StatsCards";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import CryptoPriceTicker from "@/components/dashboard/CryptoPriceTicker";
import LoanManagement from "@/components/loans/LoanManagement";
import PaymentInterface from "@/components/payments/PaymentInterface";
import HederaIntegration from "@/components/hedera/HederaIntegration";
import { LayoutDashboard, CreditCard, Send, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">Banking Dashboard</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monitor your financial portfolio with real-time data and interactive components
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <StatsCards />
            </div>
            <div className="lg:col-span-1">
              <CryptoPriceTicker />
            </div>
          </div>
          <TransactionHistory />
        </div>
      </section>

      {/* Loans Section */}
      <section id="loans" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CreditCard className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">Loan Management</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automated loan processing and management powered by smart contracts
            </p>
          </div>
          <LoanManagement />
        </div>
      </section>

      {/* Payments Section */}
      <section id="payments" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Send className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">Payment Interface</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Send and receive payments with multi-currency support and real-time conversion
            </p>
          </div>
          <PaymentInterface />
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Activity className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">Transaction History</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete transaction history with real-time updates and detailed analytics
            </p>
          </div>
          <TransactionHistory />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Revolutionary Banking Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of financial services with our comprehensive DApp built on Hedera Hashgraph
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Automated Loan Processing",
                description: "Smart contracts handle loan applications, approvals, and payments automatically",
                icon: "💰"
              },
              {
                title: "Instant Payments",
                description: "Send and receive payments globally with near-zero fees and 3-second finality",
                icon: "⚡"
              },
              {
                title: "Transparent History",
                description: "All transactions are recorded on the blockchain for complete transparency",
                icon: "📊"
              },
              {
                title: "Secure Smart Contracts",
                description: "Audited and tested smart contracts ensure the highest level of security",
                icon: "🛡️"
              },
              {
                title: "Regulatory Compliance",
                description: "Built with compliance in mind to meet banking and financial regulations",
                icon: "⚖️"
              },
              {
                title: "Enterprise Grade",
                description: "Powered by Hedera Hashgraph for enterprise-level performance and reliability",
                icon: "🏢"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-card rounded-xl shadow-card border border-border/50 hover:shadow-glow transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hedera Integration Section */}
      <section id="hedera" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Hedera Network Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect to Hedera Hashgraph network and manage smart contracts
            </p>
          </div>
          <HederaIntegration />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Banking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join the decentralized banking revolution. Experience secure, transparent, and automated financial services.
          </p>
          <button 
            onClick={() => {
              const dashboardElement = document.getElementById('dashboard');
              if (dashboardElement) {
                dashboardElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-background text-primary rounded-lg font-semibold text-lg hover:bg-background/90 transition-all duration-300 hover:scale-105 shadow-glow"
          >
            Launch Banking DApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
