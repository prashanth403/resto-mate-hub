import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, IndianRupee, CheckCircle, AlertCircle } from "lucide-react";
import { formatIndianCurrency, calculateTotal } from "@/lib/currency";
import { initializePayment, PaymentOptions } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";
import { DemoPayment } from "./DemoPayment";

interface PaymentFormProps {
  bookingData: {
    date: string;
    time: string;
    guests: number;
    name: string;
    phone: string;
    email: string;
    requests: string;
  };
  onPaymentSuccess: (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onPaymentCancel: () => void;
  /** Optional: override total payable amount in INR (e.g., for cart checkout or pre-orders) */
  totalOverrideInInr?: number;
}

export function PaymentForm({ bookingData, onPaymentSuccess, onPaymentCancel, totalOverrideInInr }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const { toast } = useToast();

  // Calculate booking amount
  const baseAmount = 500 * bookingData.guests;
  const timeMultiplier = bookingData.time.includes('PM') && parseInt(bookingData.time) >= 6 ? 1.2 : 1.0;
  const subtotal = Math.round(baseAmount * timeMultiplier);
  const computed = calculateTotal(subtotal);
  const total = typeof totalOverrideInInr === 'number' ? totalOverrideInInr : computed.total;
  const tax = typeof totalOverrideInInr === 'number' ? Math.round(totalOverrideInInr - subtotal) : computed.tax;

  useEffect(() => {
    const handlePaymentSuccess = (event: CustomEvent) => {
      setPaymentStatus('success');
      setIsProcessing(false);
      onPaymentSuccess(event.detail);
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed and payment processed.",
      });
    };

    const handlePaymentCancel = () => {
      setIsProcessing(false);
      onPaymentCancel();
      toast({
        title: "Payment Cancelled",
        description: "You can try the payment again or contact us for assistance.",
        variant: "destructive",
      });
    };

    window.addEventListener('payment-success', handlePaymentSuccess as EventListener);
    window.addEventListener('payment-cancelled', handlePaymentCancel);

    return () => {
      window.removeEventListener('payment-success', handlePaymentSuccess as EventListener);
      window.removeEventListener('payment-cancelled', handlePaymentCancel);
    };
  }, [onPaymentSuccess, onPaymentCancel, toast]);

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      // Use demo payment in development mode
      if (import.meta.env.DEV) {
        // Demo payment will be handled by the DemoPayment component
        return;
      }

      // Generate a unique order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const paymentOptions: PaymentOptions = {
        amount: total,
        currency: 'INR',
        name: 'RestoMate Hub',
        description: `Table booking for ${bookingData.guests} guests on ${bookingData.date}`,
        orderId: orderId,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        notes: {
          bookingId: orderId,
          guests: bookingData.guests.toString(),
          date: bookingData.date,
          time: bookingData.time,
        },
        theme: {
          color: '#ea580c', // Orange color matching the theme
        },
      };

      await initializePayment(paymentOptions);
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your booking has been confirmed and payment processed successfully.
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
          <CardTitle>Payment Details</CardTitle>
        </div>
        <CardDescription>
          Complete your booking by making the payment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span>{bookingData.date} at {bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span>{bookingData.guests} people</span>
            </div>
            <div className="flex justify-between">
              <span>Name:</span>
              <span>{bookingData.name}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Amount:</span>
              <span>{formatIndianCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>{formatIndianCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span className="text-primary">{formatIndianCurrency(total)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Method */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Payment Method</h4>
          <div className="flex items-center space-x-2 p-3 border rounded-lg bg-muted/50">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <span className="font-medium">Razorpay</span>
            <Badge variant="secondary" className="ml-auto">Secure</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            You'll be redirected to Razorpay's secure payment gateway to complete your transaction.
          </p>
        </div>

        {/* Payment Button */}
        {import.meta.env.DEV ? (
          <DemoPayment
            amount={total}
            onSuccess={(details) => {
              setPaymentStatus('success');
              setIsProcessing(false);
              onPaymentSuccess(details);
              toast({
                title: "Payment Successful!",
                description: "Your booking has been confirmed and payment processed.",
              });
            }}
            onCancel={() => {
              setIsProcessing(false);
              onPaymentCancel();
              toast({
                title: "Payment Cancelled",
                description: "You can try the payment again or contact us for assistance.",
                variant: "destructive",
              });
            }}
          />
        ) : (
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay {formatIndianCurrency(total)}
              </>
            )}
          </Button>
        )}

        {paymentStatus === 'failed' && (
          <div className="flex items-center space-x-2 p-3 border border-red-200 rounded-lg bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-600">
              Payment failed. Please try again.
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our terms and conditions.
        </p>
      </CardContent>
    </Card>
  );
}
