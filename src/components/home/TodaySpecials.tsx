import { Button } from "@/components/ui/button";
import { Star, Plus, Clock, Flame, IndianRupee } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatIndianCurrency } from "@/lib/currency";
import { useNavigate } from "react-router-dom";

interface SpecialItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  cookTime: string;
  isSpicy: boolean;
  discount: string;
  category: string;
  isVeg: boolean;
}

export function TodaySpecials() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const specials: SpecialItem[] = [
    {
      id: 1,
      name: "Truffle Mushroom Risotto",
      description: "Creamy arborio rice with wild truffle and parmesan",
      price: 2338, // $28 * 83.5 INR
      originalPrice: 2923, // $35 * 83.5 INR
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80",
      rating: 4.8,
      cookTime: "25 min",
      isSpicy: false,
      discount: "20% OFF",
      category: "mains",
      isVeg: true,
    },
    {
      id: 2,
      name: "Grilled Salmon Teriyaki",
      description: "Fresh Atlantic salmon with teriyaki glaze and vegetables",
      price: 2672, // $32 * 83.5 INR
      originalPrice: 3340, // $40 * 83.5 INR
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
      rating: 4.9,
      cookTime: "20 min",
      isSpicy: false,
      discount: "20% OFF",
      category: "mains",
      isVeg: false,
    },
    {
      id: 3,
      name: "Spicy Thai Curry",
      description: "Authentic red curry with coconut milk and fresh herbs",
      price: 2004, // $24 * 83.5 INR
      originalPrice: 2505, // $30 * 83.5 INR
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80",
      rating: 4.7,
      cookTime: "18 min",
      isSpicy: true,
      discount: "20% OFF",
      category: "mains",
      isVeg: true,
    },
    {
      id: 4,
      name: "Wagyu Beef Steak",
      description: "Premium wagyu with garlic butter and seasonal vegetables",
      price: 5428, // $65 * 83.5 INR
      originalPrice: 6680, // $80 * 83.5 INR
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80",
      rating: 5.0,
      cookTime: "30 min",
      isSpicy: false,
      discount: "19% OFF",
      category: "mains",
      isVeg: false,
    },
  ];

  const handleAddToCart = (item: SpecialItem) => {
    addToCart(item);
  };

  const handleViewAllOffers = () => {
    navigate('/menu');
  };

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Flame className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Limited Time</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
            Today's Special Offers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked by our chefs, available only today with exclusive discounts
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {specials.map((item, index) => (
              <div
                key={item.id}
                className="flex-none w-80 bg-card rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {item.discount}
                  </div>
                  {item.isSpicy && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full">
                      <Flame className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.cookTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">
                          {formatIndianCurrency(item.price)}
                        </span>
                        <span className="text-muted-foreground line-through">
                          {formatIndianCurrency(item.originalPrice)}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="group"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {specials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-orange-200 hover:bg-primary transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" onClick={handleViewAllOffers}>
            View All Offers
          </Button>
        </div>
      </div>
    </section>
  );
}