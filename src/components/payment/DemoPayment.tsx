import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, IndianRupee, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { formatIndianCurrency } from "@/lib/currency";

interface DemoPaymentProps {
  amount: number;
  onSuccess: (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onCancel: () => void;
}

export function DemoPayment({ amount, onSuccess, onCancel }: DemoPaymentProps) {
  const [step, setStep] = useState<'card' | 'processing' | 'success'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      
      // Simulate successful payment
      setTimeout(() => {
        onSuccess({
          razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          razorpay_order_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          razorpay_signature: `sig_${Math.random().toString(36).substr(2, 20)}`,
        });
      }, 2000);
    }, 3000);
  };

  if (step === 'processing') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
          <CardTitle>Processing Payment</CardTitle>
          <CardDescription>
            Please wait while we process your payment...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Demo Payment Gateway</CardTitle>
        </div>
        <CardDescription>
          This is a demo payment form for testing purposes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Amount */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatIndianCurrency(amount)}
          </div>
          <div className="text-sm text-muted-foreground">
            Amount to be charged
          </div>
        </div>

        <Separator />

        {/* Card Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                maxLength={4}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg bg-green-50">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">
              This is a secure demo payment gateway
            </span>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Pay {formatIndianCurrency(amount)}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Badge variant="secondary" className="mb-2">
            Demo Mode
          </Badge>
          <p className="text-xs text-muted-foreground">
            This is a demonstration payment form. No real charges will be made.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
