import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, Users, MapPin, Phone, CheckCircle, CreditCard, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { TableLayout, SeatingPreference } from "@/components/booking/TableLayout";
import { PreOrderSelector, SUGGESTED_ITEMS } from "@/components/booking/PreOrderSelector";
import { formatIndianCurrency, calculateBookingAmount, calculateTotal } from "@/lib/currency";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const eventDetails = location.state?.eventDetails;
  const isEventBooking = location.state?.isEventBooking;

  const [bookingData, setBookingData] = useState({
    date: eventDetails?.date || "",
    time: eventDetails?.time || "",
    guests: eventDetails?.guests?.split('-')[0] || "",
    name: "",
    phone: "",
    email: "",
    requests: "",
  });

  const [isBooked, setIsBooked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [seating, setSeating] = useState<SeatingPreference>("indoor");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [preOrder, setPreOrder] = useState<Record<number, number>>({});

  // Compute total override (booking base + pre-order) in INR
  const bookingTotalOverride = useMemo(() => {
    const base = calculateBookingAmount(parseInt(bookingData.guests || '0') || 0, bookingData.time || '');
    const preOrderTotal = Object.entries(preOrder).reduce((sum, [id, qty]) => {
      const item = SUGGESTED_ITEMS.find(i => i.id === Number(id));
      return sum + (item ? item.price * (qty as number) : 0);
    }, 0);
    const totals = calculateTotal(base + preOrderTotal);
    return totals.total;
  }, [bookingData.guests, bookingData.time, preOrder]);

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.guests || !bookingData.name || !bookingData.phone || !bookingData.email) {
      alert("Please fill in all required fields");
      return;
    }
    if (!selectedTable) {
      alert("Please select a table from the layout");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (details: any) => {
    setPaymentDetails(details);
    setIsBooked(true);
    setShowPayment(false);
    const orderId = `RM${Date.now()}`;
    navigate('/order-status', { state: { orderId, deliveryType: 'dine-in' } });
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isBooked) {
    const baseAmount = calculateBookingAmount(parseInt(bookingData.guests), bookingData.time);
    const preOrderTotal = Object.entries(preOrder).reduce((sum, [id, qty]) => {
      const item = SUGGESTED_ITEMS.find(i => i.id === Number(id));
      return sum + (item ? item.price * (qty as number) : 0);
    }, 0);
    const { total } = calculateTotal(baseAmount + preOrderTotal);
    
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
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Your table has been reserved and payment processed successfully.
              </p>
              <div className="bg-card rounded-lg p-6 shadow-card space-y-3">
                <div className="font-semibold text-foreground">Booking Details:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Table:</span>
                    <span>Table #{selectedTable} ({seating})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pre-order:</span>
                    <span className="font-medium">{formatIndianCurrency(preOrderTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold text-primary">{formatIndianCurrency(total)}</span>
                  </div>
                  {paymentDetails && (
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="text-xs">{paymentDetails.razorpay_payment_id}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button onClick={() => {
                setIsBooked(false);
                setShowPayment(false);
                setPaymentDetails(null);
                setBookingData({
                  date: "",
                  time: "",
                  guests: "",
                  name: "",
                  phone: "",
                  email: "",
                  requests: "",
                });
              }} variant="outline">
                Make Another Booking
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
                  Complete Your Booking
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
                      ...bookingData,
                      guests: parseInt(bookingData.guests),
                    }}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentCancel={handlePaymentCancel}
                    totalOverrideInInr={bookingTotalOverride}
                  />
                </div>

                {/* Booking Summary */}
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{bookingData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{bookingData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">{bookingData.guests} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">{bookingData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{bookingData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{bookingData.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-6 shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Payment Security
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span className="text-sm">256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span className="text-sm">PCI DSS compliant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Secure payment gateway</span>
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
              {isEventBooking ? "Book Your Event" : "Reserve Your Table"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEventBooking 
                ? "Reserve your perfect event with our comprehensive booking system"
                : "Book your perfect dining experience with us. Choose your preferred date, time, and table."
              }
            </p>
            {isEventBooking && eventDetails && (
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Event Details</span>
                </div>
                <p className="text-orange-700 font-medium">{eventDetails.title}</p>
                <p className="text-sm text-orange-600">{eventDetails.description}</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Booking Form */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {isEventBooking ? "Event Booking Information" : "Booking Information"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isEventBooking 
                      ? "Please fill in your details to reserve your event."
                      : "Please fill in your details to reserve your table."
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Select Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Number of Guests
                      </Label>
                      <select
                        id="guests"
                        value={bookingData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        required
                      >
                        <option value="">Select guests</option>
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Available Time Slots
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleInputChange("time", time)}
                          className={`p-2 text-sm rounded-md border transition-all ${
                            bookingData.time === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-orange-200 hover:border-primary hover:bg-orange-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={bookingData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="requests"
                      value={bookingData.requests}
                      onChange={(e) => handleInputChange("requests", e.target.value)}
                      placeholder="Any special dietary requirements, celebrations, or seating preferences..."
                      rows={3}
                    />
                  </div>

                  {/* Seating Preference */}
                  <div className="space-y-2">
                    <Label>Seating Preference</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["indoor","outdoor","window"] as SeatingPreference[]).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSeating(opt)}
                          className={`p-2 rounded-md border text-sm capitalize ${
                            seating === opt ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-orange-200 hover:border-primary'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table Layout */}
                  {bookingData.date && bookingData.time && bookingData.guests && (
                    <div className="space-y-2">
                      <Label>Available Tables</Label>
                      <TableLayout
                        date={bookingData.date}
                        time={bookingData.time}
                        guests={parseInt(bookingData.guests)}
                        seatingPreference={seating}
                        selectedTableId={selectedTable}
                        onSelect={setSelectedTable}
                      />
                    </div>
                  )}

                  {/* Pre-order */}
                  <div className="space-y-2">
                    <Label>Pre-order (Optional)</Label>
                    <PreOrderSelector value={preOrder} onChange={setPreOrder} />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Confirm Reservation
                  </Button>
                </form>
              </div>

              {/* Restaurant Info */}
              <div className="space-y-8">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Restaurant Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-muted-foreground text-sm">
                          123 Food Street, Bandra West, Mumbai, Maharashtra 400050
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium">Contact</div>
                        <div className="text-muted-foreground text-sm">
                          +91 98765 43210
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium">Opening Hours</div>
                        <div className="text-muted-foreground text-sm">
                          Mon-Thu: 11:00 AM - 10:00 PM<br />
                          Fri-Sun: 11:00 AM - 11:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Booking Policy
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Reservations can be made up to 30 days in advance</li>
                    <li>• Tables are held for 15 minutes past reservation time</li>
                    <li>• Cancellations must be made at least 2 hours before</li>
                    <li>• Large groups (8+) may require a deposit</li>
                    <li>• Special dietary requirements can be accommodated</li>
                  </ul>
                </div>

                <div className="rounded-xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                    alt="Restaurant Interior"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}