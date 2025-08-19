import { useState } from "react";
import { Search, Filter, Star, Plus, Flame, Clock, Users, Heart, ShoppingCart, X, IndianRupee, ChefHat, Leaf, Zap, Crown, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatIndianCurrency } from "@/lib/currency";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { ItemDetailDialog } from "@/components/menu/ItemDetailDialog";

export default function Menu() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Items", count: 48, icon: ChefHat },
    { id: "specials", name: "Restaurant Specials", count: 8, icon: Crown },
    { id: "top-picks", name: "Top Picks", count: 12, icon: Star },
    { id: "biryani", name: "Best Biryanis", count: 8, icon: Flame },
    { id: "packages", name: "Special Packages", count: 6, icon: Zap },
    { id: "starters", name: "Starters", count: 12, icon: Leaf },
    { id: "mains", name: "Main Course", count: 18, icon: ChefHat },
    { id: "desserts", name: "Desserts", count: 6, icon: Heart },
    { id: "beverages", name: "Beverages", count: 4, icon: Users },
  ];

  const dietaryOptions = [
    { id: "all", name: "All", icon: ChefHat },
    { id: "veg", name: "Vegetarian", icon: Leaf },
    { id: "non-veg", name: "Non-Vegetarian", icon: Flame },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Chicken Tikka Masala",
      description: "Tender chicken in rich tomato and cream sauce with aromatic spices",
      price: 2004, // $24 * 83.5 INR
      category: "mains",
      specialCategory: ["specials", "top-picks"],
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
      rating: 4.8,
      isSpicy: true,
      isVeg: false,
      cookTime: "25 min",
      calories: 420,
      ingredients: ["Chicken breast", "Tomato puree", "Heavy cream", "Garam masala", "Turmeric", "Coriander"],
      nutrients: { protein: "28g", carbs: "12g", fat: "18g", fiber: "3g" },
      preparation: "Tandoor-grilled chicken simmered in rich tomato-cream gravy",
      spiceLevel: "Medium",
      allergens: ["Dairy", "Nuts"],
      chefRecommendation: true,
      bestSeller: true,
    },
    {
      id: 2,
      name: "Hyderabadi Biryani",
      description: "Aromatic basmati rice with tender lamb and authentic Hyderabadi spices",
      price: 2338, // $28 * 83.5 INR
      category: "biryani",
      specialCategory: ["specials", "top-picks", "biryani"],
      image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      isSpicy: true,
      isVeg: false,
      cookTime: "45 min",
      calories: 650,
      ingredients: ["Basmati rice", "Lamb", "Saffron", "Cardamom", "Cinnamon", "Mint"],
      nutrients: { protein: "32g", carbs: "85g", fat: "22g", fiber: "5g" },
      preparation: "Dum-cooked with layers of spiced rice and tender meat",
      spiceLevel: "Hot",
      allergens: ["None"],
      chefRecommendation: true,
      bestSeller: true,
    },
    {
      id: 3,
      name: "Paneer Butter Masala",
      description: "Soft cottage cheese in creamy tomato gravy with mild spices",
      price: 1837, // $22 * 83.5 INR
      category: "mains",
      specialCategory: ["top-picks"],
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
      rating: 4.7,
      isSpicy: false,
      isVeg: true,
      cookTime: "20 min",
      calories: 380,
      ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Cashews", "Spices"],
      nutrients: { protein: "18g", carbs: "8g", fat: "25g", fiber: "2g" },
      preparation: "Paneer cubes simmered in rich butter-tomato gravy",
      spiceLevel: "Mild",
      allergens: ["Dairy", "Nuts"],
      chefRecommendation: false,
      bestSeller: true,
    },
    {
      id: 4,
      name: "Veg Biryani",
      description: "Fragrant basmati rice with fresh vegetables and aromatic spices",
      price: 1670, // $20 * 83.5 INR
      category: "biryani",
      specialCategory: ["biryani"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
      rating: 4.6,
      isSpicy: false,
      isVeg: true,
      cookTime: "35 min",
      calories: 450,
      ingredients: ["Basmati rice", "Mixed vegetables", "Saffron", "Spices", "Mint", "Coriander"],
      nutrients: { protein: "12g", carbs: "75g", fat: "8g", fiber: "8g" },
      preparation: "Dum-cooked with layers of spiced rice and fresh vegetables",
      spiceLevel: "Mild",
      allergens: ["None"],
      chefRecommendation: false,
      bestSeller: false,
    },
    {
      id: 5,
      name: "Family Feast Package",
      description: "Complete meal for 4 people with starters, mains, bread, rice, and dessert",
      price: 7098, // $85 * 83.5 INR
      category: "packages",
      specialCategory: ["packages"],
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      rating: 4.9,
      isSpicy: false,
      isVeg: false,
      cookTime: "60 min",
      calories: 1200,
      ingredients: ["Multiple dishes", "Fresh ingredients", "Premium spices"],
      nutrients: { protein: "45g", carbs: "120g", fat: "35g", fiber: "15g" },
      preparation: "Chef-curated combination of our best dishes",
      spiceLevel: "Mixed",
      allergens: ["Dairy", "Nuts", "Gluten"],
      chefRecommendation: true,
      bestSeller: true,
    },
    {
      id: 6,
      name: "Tandoori Chicken",
      description: "Marinated chicken grilled to perfection in traditional tandoor",
      price: 2171, // $26 * 83.5 INR
      category: "mains",
      specialCategory: ["specials", "top-picks"],
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
      rating: 4.8,
      isSpicy: true,
      isVeg: false,
      cookTime: "30 min",
      calories: 380,
      ingredients: ["Chicken", "Yogurt", "Ginger-garlic paste", "Tandoori masala", "Lemon"],
      nutrients: { protein: "35g", carbs: "5g", fat: "18g", fiber: "1g" },
      preparation: "Marinated in spices and yogurt, grilled in clay oven",
      spiceLevel: "Medium",
      allergens: ["Dairy"],
      chefRecommendation: true,
      bestSeller: true,
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || 
                           item.category === selectedCategory || 
                           item.specialCategory?.includes(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDietary = dietaryFilter === "all" || 
                          (dietaryFilter === "veg" && item.isVeg) ||
                          (dietaryFilter === "non-veg" && !item.isVeg);
    
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
              Our Culinary Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover our carefully crafted dishes made with the finest ingredients and authentic recipes
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for your favorite dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              
              {/* Dietary Filters */}
              <div className="flex justify-center space-x-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDietaryFilter(option.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      dietaryFilter === option.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-orange-200 hover:border-primary hover:bg-orange-50"
                    }`}
                  >
                    <option.icon className="h-4 w-4" />
                    <span className="font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-background border-b border-orange-100">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 flex-none px-6 py-3 rounded-full border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-orange-200 hover:border-primary hover:bg-orange-50"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex space-x-2">
                      {item.isVeg ? (
                        <div className="w-6 h-6 border-2 border-green-500 flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-red-500 flex items-center justify-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                        </div>
                      )}
                      {item.isSpicy && (
                        <div className="bg-red-500 text-white p-1 rounded-full">
                          <Flame className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      {item.chefRecommendation && (
                        <Badge className="bg-orange-500 hover:bg-orange-600">
                          <ChefHat className="h-3 w-3 mr-1" />
                          Chef's Pick
                        </Badge>
                      )}
                      {item.bestSeller && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Crown className="h-3 w-3 mr-1" />
                          Best Seller
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.cookTime}
                        </span>
                        <span>{item.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        <span className="font-semibold">{formatIndianCurrency(item.price)}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No items found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Item Detail Dialog */}
      <ItemDetailDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <CartSidebar />
      <Footer />
    </div>
  );
}