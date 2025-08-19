import { useState } from "react";
import { X, Star, Clock, Flame, Leaf, Plus, Minus, IndianRupee, ChefHat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { formatIndianCurrency } from "@/lib/currency";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  cookTime?: string;
  rating?: number;
  calories?: number;
  ingredients?: string[];
  nutrients?: { protein: string; carbs: string; fat: string; fiber: string };
  preparation?: string;
  spiceLevel?: string;
  allergens?: string[];
  chefRecommendation?: boolean;
  bestSeller?: boolean;
}

interface ItemDetailDialogProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailDialog({ item, isOpen, onClose }: ItemDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    onClose();
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold">{item.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {item.chefRecommendation && (
                  <Badge className="bg-primary text-primary-foreground">
                    <ChefHat className="h-3 w-3 mr-1" />
                    Chef's Pick
                  </Badge>
                )}
                {item.bestSeller && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
                {item.isSpicy && (
                  <Badge className="bg-red-500 text-white">
                    <Flame className="h-3 w-3 mr-1" />
                    Spicy
                  </Badge>
                )}
                {item.isVeg && (
                  <Badge className="bg-green-500 text-white">
                    <Leaf className="h-3 w-3 mr-1" />
                    Vegetarian
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                {item.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                )}
                {item.cookTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{item.cookTime}</span>
                  </div>
                )}
                {item.calories && (
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{item.calories} cal</span>
                  </div>
                )}
              </div>

              <div className="text-2xl font-bold text-primary">
                {formatIndianCurrency(item.price)}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart - {formatIndianCurrency(item.price * quantity)}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Detailed Information */}
          <div className="space-y-6">
            {item.preparation && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Preparation</h4>
                <p className="text-muted-foreground">{item.preparation}</p>
              </div>
            )}

            {item.ingredients && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {item.nutrients && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Nutritional Info</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-card rounded-lg">
                    <div className="text-lg font-bold text-primary">{item.nutrients.protein}</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg">
                    <div className="text-lg font-bold text-primary">{item.nutrients.carbs}</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg">
                    <div className="text-lg font-bold text-primary">{item.nutrients.fat}</div>
                    <div className="text-xs text-muted-foreground">Fat</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg">
                    <div className="text-lg font-bold text-primary">{item.nutrients.fiber}</div>
                    <div className="text-xs text-muted-foreground">Fiber</div>
                  </div>
                </div>
              </div>
            )}

            {item.spiceLevel && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Spice Level</h4>
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-red-500" />
                  <span className="text-muted-foreground">{item.spiceLevel}</span>
                </div>
              </div>
            )}

            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Allergens</h4>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, index) => (
                    <Badge key={index} variant="destructive">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
