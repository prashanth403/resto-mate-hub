import { Star, Quote } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely incredible dining experience! The truffle risotto was divine and the service was impeccable.",
      date: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Best restaurant in the city! The ambiance is perfect for date nights and the food exceeds expectations every time.",
      date: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      comment: "The valet service and table booking system made our evening seamless. Will definitely be returning!",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  ];

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-primary">4.9</span>
            <span className="text-muted-foreground">from 500+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="h-6 w-6 text-orange-200 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic pl-4">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-orange-100">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join hundreds of satisfied customers
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-background/50 rounded-full px-4 py-2">
              <span className="text-sm font-medium">Google</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9</span>
            </div>
            <div className="flex items-center space-x-2 bg-background/50 rounded-full px-4 py-2">
              <span className="text-sm font-medium">Yelp</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}