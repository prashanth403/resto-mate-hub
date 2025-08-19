import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryItems = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      title: "Elegant Interior",
      description: "Sophisticated dining atmosphere"
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      title: "Gourmet Dishes",
      description: "Artfully crafted cuisine"
    },
    {
      type: "image", 
      src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
      title: "Private Events",
      description: "Perfect for special occasions"
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      title: "Fine Dining Experience",
      description: "Exceptional service and ambiance"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
            Restaurant Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a visual journey through our beautiful space and exquisite culinary creations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Gallery */}
          <div className="relative rounded-2xl overflow-hidden shadow-hero mb-8">
            <div className="relative h-96 lg:h-[500px]">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90">{item.description}</p>
                  </div>

                  {/* Video play button for video items */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Play className="h-6 w-6 text-white fill-current" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            {galleryItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? "ring-2 ring-primary scale-105" 
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Gallery grid preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
              "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300&q=80",
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&q=80"
            ].map((src, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden aspect-square group cursor-pointer">
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View Full Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}