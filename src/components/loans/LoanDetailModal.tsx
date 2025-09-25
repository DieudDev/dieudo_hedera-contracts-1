import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, Calendar, DollarSign, TrendingUp, FileText, 
  Clock, CheckCircle, AlertCircle, Download, Share
} from "lucide-react";

interface LoanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: {
    id: string;
    type: string;
    totalAmount: number;
    remainingAmount: number;
    monthlyPayment: number;
    interestRate: number;
    nextPayment: string;
    status: string;
    progress: number;
  };
}

export const LoanDetailModal = ({ isOpen, onClose, loan }: LoanDetailModalProps) => {
  const paymentHistory = [
    { date: '2024-01-15', amount: 2500, status: 'completed', fee: 0.50 },
    { date: '2023-12-15', amount: 2500, status: 'completed', fee: 0.50 },
    { date: '2023-11-15', amount: 2500, status: 'completed', fee: 0.50 },
    { date: '2023-10-15', amount: 2500, status: 'completed', fee: 0.50 },
    { date: '2023-09-15', amount: 2500, status: 'completed', fee: 0.50 },
  ];

  const loanTerms = {
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    termLength: '24 months',
    paymentSchedule: 'Monthly',
    prepaymentPenalty: 'None',
    latePaymentFee: '$50.00',
    collateral: 'Equipment/Inventory'
  };

  const documents = [
    { name: 'Loan Agreement', type: 'PDF', size: '2.3 MB', date: '2023-01-15' },
    { name: 'Payment Schedule', type: 'PDF', size: '0.8 MB', date: '2023-01-15' },
    { name: 'Insurance Certificate', type: 'PDF', size: '1.2 MB', date: '2023-01-15' },
    { name: 'Collateral Appraisal', type: 'PDF', size: '3.1 MB', date: '2023-01-10' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl">{loan.type}</span>
                <p className="text-sm text-muted-foreground font-normal">Loan ID: {loan.id}</p>
              </div>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">
              {loan.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Loan Progress */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Loan Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">
                      ${(loan.totalAmount - loan.remainingAmount).toLocaleString()} / ${loan.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={loan.progress} className="h-3" />
                  <p className="text-center text-sm text-muted-foreground">{loan.progress}% Complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Remaining Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${loan.remainingAmount.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium">Monthly Payment</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${loan.monthlyPayment.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Interest Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{loan.interestRate}%</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Payments Left</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.ceil(loan.remainingAmount / loan.monthlyPayment)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Next Payment Due */}
            <Card className="border-border/50 bg-gradient-subtle">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Next Payment Due</h3>
                      <p className="text-muted-foreground">Due on {loan.nextPayment}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">${loan.monthlyPayment.toLocaleString()}</p>
                    <HeroButton size="sm" className="mt-2">
                      Make Payment
                    </HeroButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
              <HeroButton variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </HeroButton>
            </div>
            
            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Payment on {payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="bg-success text-success-foreground mb-1">
                          {payment.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Fee: ${payment.fee}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="terms" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Loan Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium text-foreground">{loanTerms.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium text-foreground">{loanTerms.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Term Length</p>
                      <p className="font-medium text-foreground">{loanTerms.termLength}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Schedule</p>
                      <p className="font-medium text-foreground">{loanTerms.paymentSchedule}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Prepayment Penalty</p>
                      <p className="font-medium text-foreground">{loanTerms.prepaymentPenalty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Late Payment Fee</p>
                      <p className="font-medium text-foreground">{loanTerms.latePaymentFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Collateral</p>
                      <p className="font-medium text-foreground">{loanTerms.collateral}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Loan Documents</h3>
              <HeroButton variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share All
              </HeroButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <Card key={index} className="border-border/50 hover:shadow-card transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                      <HeroButton variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </HeroButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};