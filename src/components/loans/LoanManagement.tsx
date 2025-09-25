import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroButton } from "@/components/ui/hero-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { LoanDetailModal } from "./LoanDetailModal";

const LoanManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const loans = [
    {
      id: "LOAN-001",
      type: "Business Loan",
      totalAmount: 50000,
      remainingAmount: 32500,
      monthlyPayment: 2500,
      interestRate: 5.25,
      nextPayment: "2024-02-15",
      status: "active",
      progress: 35,
    },
    {
      id: "LOAN-002",
      type: "Equipment Financing",
      totalAmount: 25000,
      remainingAmount: 8750,
      monthlyPayment: 1250,
      interestRate: 4.75,
      nextPayment: "2024-02-20",
      status: "active",
      progress: 65,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Loan Management</h2>
        <HeroButton variant="hero">
          <DollarSign className="w-4 h-4 mr-2" />
          Apply for Loan
        </HeroButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map((loan) => (
          <Card 
            key={loan.id} 
            className="shadow-card border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => {
              console.log('Loan clicked:', loan.id);
              setSelectedLoan(loan);
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  {loan.type}
                </CardTitle>
                <Badge variant="default" className="bg-success text-success-foreground">
                  {loan.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loan Progress</span>
                  <span className="font-medium text-foreground">{loan.progress}% Paid</span>
                </div>
                <Progress value={loan.progress} className="h-2" />
              </div>

              {/* Loan Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Original Amount</p>
                  <p className="text-lg font-semibold text-foreground">
                    ${loan.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-lg font-semibold text-destructive">
                    ${loan.remainingAmount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-lg font-semibold text-foreground">
                    ${loan.monthlyPayment.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-semibold text-warning">
                    {loan.interestRate}%
                  </p>
                </div>
              </div>

              {/* Next Payment */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Next Payment Due</span>
                </div>
                <span className="text-sm font-semibold text-warning">{loan.nextPayment}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <HeroButton variant="hero" size="sm" className="flex-1">
                  Make Payment
                </HeroButton>
                <HeroButton variant="outline" size="sm" className="flex-1">
                  View Details
                </HeroButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLoan && (
        <LoanDetailModal
          isOpen={!!selectedLoan}
          onClose={() => setSelectedLoan(null)}
          loan={selectedLoan}
        />
      )}

      {/* Loan Application Card */}
      <Card className="shadow-card border-border/50 bg-gradient-secondary">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Need Additional Funding?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Apply for a new loan with our automated smart contract system. 
            Get pre-approved in minutes with competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HeroButton variant="hero">
              Apply Now
            </HeroButton>
            <HeroButton variant="outline">
              Learn More
            </HeroButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanManagement;