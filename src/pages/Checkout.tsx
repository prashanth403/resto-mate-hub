import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Phone, CreditCard, IndianRupee, CheckCircle, Users } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatIndianCurrency, calculateTotal } from "@/lib/currency";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: cartState, clearCart } = useCart();
  const cartItems = location.state?.cartItems || cartState.items;
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    instructions: "",
  });

  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [showPayment, setShowPayment] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [splitCount, setSplitCount] = useState(1);

  const deliveryFee = deliveryType === "delivery" ? 50 : 0;
  const subtotal = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  const { tax, total } = calculateTotal(subtotal + deliveryFee);
  const perPerson = Math.ceil(total / Math.max(1, splitCount));

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.email) {
      alert("Please fill in all required fields");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (details: any) => {
    setOrderPlaced(true);
    clearCart();
    const orderId = `RM${Date.now()}`;
    console.log("Order placed successfully:", { orderId, cartItems, deliveryInfo, paymentDetails: details });
    navigate('/order-status', { state: { orderId, deliveryType } });
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Your order has been placed successfully and payment processed.
              </p>
              <div className="bg-card rounded-lg p-6 shadow-card space-y-3">
                <div className="font-semibold text-foreground">Order Details:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="font-semibold text-primary">{formatIndianCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Type:</span>
                    <span>{deliveryType === "delivery" ? "Home Delivery" : "Pickup"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{cartItems.reduce((count: number, item: any) => count + item.quantity, 0)} items</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate('/menu')} variant="outline">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
                  Complete Your Order
                </h1>
                <p className="text-lg text-muted-foreground">
                  Secure payment powered by Razorpay
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Form */}
                <div>
                  <PaymentForm
                    bookingData={{
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toLocaleTimeString(),
                      guests: cartItems.reduce((count: number, item: any) => count + item.quantity, 0),
                      name: deliveryInfo.name,
                      phone: deliveryInfo.phone,
                      email: deliveryInfo.email,
                      requests: deliveryInfo.instructions,
                    }}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentCancel={handlePaymentCancel}
                    totalOverrideInInr={total}
                  />
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {cartItems.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">
                            {formatIndianCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatIndianCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>{formatIndianCurrency(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>{formatIndianCurrency(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">{formatIndianCurrency(total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Split Bill
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Number of payers:</span>
                        <input type="range" min={1} max={8} value={splitCount} onChange={(e) => setSplitCount(Number(e.target.value))} />
                        <span className="font-medium w-6 text-center">{splitCount}</span>
                      </div>
                      <div className="text-sm flex justify-between">
                        <span>Each person pays</span>
                        <span className="font-semibold text-primary">{formatIndianCurrency(perPerson)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Delivery Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">{deliveryInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{deliveryInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{deliveryInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">
                          {deliveryType === "delivery" ? "Home Delivery" : "Pickup"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
              Checkout
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete your order with secure payment and fast delivery
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Order Form */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Delivery Information
                  </h2>
                  <p className="text-muted-foreground">
                    Please provide your details for delivery or pickup.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Delivery Type */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Delivery Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDeliveryType("delivery")}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          deliveryType === "delivery"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Home Delivery</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Delivered to your doorstep in 30-45 minutes
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType("pickup")}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          deliveryType === "pickup"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Pickup</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ready for pickup in 15-20 minutes
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={deliveryInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={deliveryInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={deliveryInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {deliveryType === "delivery" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          value={deliveryInfo.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Enter your complete delivery address"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={deliveryInfo.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={deliveryInfo.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            placeholder="Enter pincode"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      value={deliveryInfo.instructions}
                      onChange={(e) => handleInputChange("instructions", e.target.value)}
                      placeholder="Any special instructions for delivery or preparation..."
                      rows={3}
                    />
                  </div>

                  <div className="bg-muted/50 rounded-md p-3 text-sm flex items-center justify-between">
                    <span>Split Bill: {splitCount} person(s)</span>
                    <span>Each pays {formatIndianCurrency(perPerson)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">
                          {formatIndianCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatIndianCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>{formatIndianCurrency(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>{formatIndianCurrency(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">{formatIndianCurrency(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>123 Food Street, Bandra West, Mumbai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Open: 11:00 AM - 11:00 PM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
