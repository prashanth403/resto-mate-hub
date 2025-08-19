import { useState } from "react";
import { Calendar, Clock, Users, Star, ArrowRight, Sparkles, Heart, Crown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatIndianCurrency, usdToInr } from "@/lib/currency";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const eventCategories = [
    { id: "all", name: "All Events", count: 8 },
    { id: "upcoming", name: "Upcoming", count: 3 },
    { id: "live", name: "Live Now", count: 1 },
    { id: "birthday", name: "Birthdays", count: 2 },
    { id: "wedding", name: "Weddings", count: 1 },
    { id: "corporate", name: "Corporate", count: 1 },
  ];

  const events = [
    {
      id: 1,
      title: "Jazz Night with Live Band",
      description: "Experience the magic of live jazz music with our talented musicians.",
      date: "2024-02-15",
      time: "8:00 PM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
      price: 2500,
      category: "upcoming",
      guests: "50-100",
      type: "Live Music",
      rating: 4.8,
      isLive: false,
    },
    {
      id: 2,
      title: "Valentine's Day Special Dinner",
      description: "Celebrate love with our exclusive Valentine's Day menu.",
      date: "2024-02-14",
      time: "6:00 PM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
      price: 3500,
      category: "upcoming",
      guests: "30-60",
      type: "Special Occasion",
      rating: 4.9,
      isLive: false,
    },
    {
      id: 3,
      title: "Weekend Brunch Extravaganza",
      description: "Join us for an amazing weekend brunch with live cooking stations.",
      date: "2024-02-10",
      time: "11:00 AM - 3:00 PM",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      price: 1200,
      category: "live",
      guests: "100-150",
      type: "Brunch",
      rating: 4.6,
      isLive: true,
    },
    {
      id: 4,
      title: "Birthday Celebration Package",
      description: "Make birthdays unforgettable with our complete celebration package.",
      date: "Any Date",
      time: "Flexible",
      image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
      price: 5000,
      category: "birthday",
      guests: "20-50",
      type: "Birthday",
      rating: 4.9,
      isLive: false,
    },
    {
      id: 5,
      title: "Wedding Anniversary Special",
      description: "Celebrate your love story with our romantic anniversary package.",
      date: "Any Date",
      time: "Flexible",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
      price: 4500,
      category: "wedding",
      guests: "10-30",
      type: "Anniversary",
      rating: 4.8,
      isLive: false,
    },
  ];

  const filteredEvents = events.filter(event => {
    if (selectedCategory === "all") return true;
    return event.category === selectedCategory;
  });

  const handleBookEvent = (event: any) => {
    navigate('/booking', { 
      state: { 
        eventDetails: event,
        isEventBooking: true 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-display">
                Events & Celebrations
              </h1>
              <Sparkles className="h-8 w-8 text-primary ml-3" />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Create unforgettable memories with our spectacular events and celebration packages. 
              From intimate gatherings to grand celebrations, we make every moment special.
            </p>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-8 bg-background border-b border-orange-100">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {eventCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-none px-6 py-3 rounded-full border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-orange-200 hover:border-primary hover:bg-orange-50"
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      {event.isLive && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                          LIVE NOW
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/20">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {event.type === "Birthday" && <Heart className="h-5 w-5 text-pink-500" />}
                      {event.type === "Anniversary" && <Crown className="h-5 w-5 text-purple-500" />}
                      {event.type === "Corporate" && <Crown className="h-5 w-5 text-blue-500" />}
                      {event.title}
                    </CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{event.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-2xl font-bold text-primary">
                        {formatIndianCurrency(usdToInr(event.price))}
                      </div>
                      <Button onClick={() => handleBookEvent(event)}>
                        Book Event
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Process */}
        <section className="py-16 bg-gradient-to-b from-background to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How to Book Your Event
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our simple 4-step process makes booking your perfect event effortless
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Event</h3>
                <p className="text-muted-foreground">
                  Browse our events and packages to find the perfect fit
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Select Details</h3>
                <p className="text-muted-foreground">
                  Pick your preferred date, time, and number of guests
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customize Package</h3>
                <p className="text-muted-foreground">
                  Add decorations, entertainment, and catering options
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">
                  Complete your booking with secure online payment
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/booking')}
                className="bg-primary hover:bg-primary/90"
              >
                Start Booking Your Event
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
