import { MapPin, Clock, Phone, Star, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RestaurantInfo() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Award Winning</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-display">
                About Restromate
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Since 2015, Restromate has been serving exceptional cuisine with passion and dedication. 
                Our award-winning chefs create memorable dining experiences using the finest ingredients 
                and innovative cooking techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground text-sm">
                      123 Food Street<br />
                      Foodie City, FC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Contact</h4>
                    <p className="text-muted-foreground text-sm">
                      +1 (555) 123-4567<br />
                      info@restromate.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Mon-Thu: 11:00 AM - 10:00 PM<br />
                      Fri-Sun: 11:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Capacity</h4>
                    <p className="text-muted-foreground text-sm">
                      150 Guests<br />
                      Private Dining Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                <MapPin className="h-4 w-4" />
                Get Directions
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>
          </div>

          {/* Right side - Image & Stats */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                alt="Restaurant Interior"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-bold text-foreground">4.9</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="font-bold text-foreground mb-1">500+</div>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="font-bold text-foreground mb-1">8 Years</div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-200/30 rounded-full blur-xl animate-float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-300/25 rounded-full blur-xl animate-float" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}