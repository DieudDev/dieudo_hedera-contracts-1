import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import StatsCards from "@/components/dashboard/StatsCards";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import CryptoPriceTicker from "@/components/dashboard/CryptoPriceTicker";
import LoanManagement from "@/components/loans/LoanManagement";
import PaymentInterface from "@/components/payments/PaymentInterface";
import HederaIntegration from "@/components/hedera/HederaIntegration";
import { LayoutDashboard, CreditCard, Send, Activity, Settings, ArrowLeft } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Banking Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your decentralized banking operations on Hedera Hashgraph
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="animate-pulse bg-success w-2 h-2 rounded-full"></div>
            <span className="text-sm text-success font-medium">Live Data</span>
            <ThemeToggle />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Loans</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="hedera" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Hedera</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <StatsCards />
              </div>
              <div className="lg:col-span-1">
                <CryptoPriceTicker />
              </div>
            </div>
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="loans">
            <LoanManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentInterface />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="hedera">
            <HederaIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;