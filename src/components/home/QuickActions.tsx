import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  UtensilsCrossed, 
  Percent, 
  Sparkles, 
  Car, 
  PartyPopper, 
  CalendarDays,
  ShoppingCart 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    {
      title: "Book Table",
      description: "Reserve your perfect dining spot",
      icon: Calendar,
      href: "/booking",
      color: "bg-orange-500",
    },
    {
      title: "Browse Menu",
      description: "Explore our culinary delights",
      icon: UtensilsCrossed,
      href: "/menu",
      color: "bg-orange-400",
    },
    {
      title: "Today's Offers",
      description: "Special deals and discounts",
      icon: Percent,
      href: "/offers",
      color: "bg-orange-600",
    },
    {
      title: "Restaurant Specials",
      description: "Chef's signature dishes",
      icon: Sparkles,
      href: "/specials",
      color: "bg-orange-300",
    },
    {
      title: "Valet Parking",
      description: "Convenient car parking service",
      icon: Car,
      href: "/valet",
      color: "bg-orange-700",
    },
    {
      title: "Private Parties",
      description: "Host your special events",
      icon: PartyPopper,
      href: "/parties",
      color: "bg-orange-500",
    },
    {
      title: "Events & Celebrations",
      description: "Book your special occasions",
      icon: CalendarDays,
      href: "/events",
      color: "bg-orange-400",
    },
    {
      title: "Order Online",
      description: "Get food delivered to your table",
      icon: ShoppingCart,
      href: "/order",
      color: "bg-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
            Quick Actions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for the perfect dining experience, just a tap away
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <div
              key={action.title}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                if (action.href === "/menu") {
                  navigate('/menu');
                } else if (action.href === "/booking") {
                  navigate('/booking');
                } else if (action.href === "/events") {
                  navigate('/events');
                } else if (action.href === "/order") {
                  navigate('/menu');
                } else {
                  // For other actions, navigate to menu as fallback
                  navigate('/menu');
                }
              }}
            >
              <div className="bg-card border border-orange-100 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-orange-200">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group" onClick={() => navigate('/menu')}>
            View All Services
            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}