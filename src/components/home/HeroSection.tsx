import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  const handleBookTable = () => {
    navigate('/booking');
  };

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="relative bg-gradient-hero py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-orange-100/30" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-card animate-bounce-in">
            <Star className="h-4 w-4 text-primary fill-current" />
            <span className="text-sm font-medium text-muted-foreground">Rated #1 Restaurant in the City</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground font-display">
              Experience
              <span className="text-primary block lg:inline lg:ml-4">Culinary Excellence</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover exceptional flavors, warm hospitality, and unforgettable dining experiences at Restromate. 
              Where every meal tells a story.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" className="group" onClick={handleBookTable}>
              <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              Book Your Table
            </Button>
            <Button variant="floating" size="lg" className="group" onClick={handleViewMenu}>
              <MapPin className="h-5 w-5 group-hover:bounce transition-transform" />
              View Menu
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-center space-y-2">
              <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl lg:text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl lg:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Signature Dishes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}