import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { TodaySpecials } from "@/components/home/TodaySpecials";
import { RestaurantInfo } from "@/components/home/RestaurantInfo";
import { Gallery } from "@/components/home/Gallery";
import { Reviews } from "@/components/home/Reviews";
import { CartSidebar } from "@/components/cart/CartSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QuickActions />
        <TodaySpecials />
        <RestaurantInfo />
        <Gallery />
        <Reviews />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;
