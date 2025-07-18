import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Mumbai",
    rating: 5,
    text: "Found my dream apartment through RealEstate. The platform is so easy to use and the property details were accurate. Highly recommend!",
    avatar: "PS"
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Business Owner",
    location: "Bangalore",
    rating: 5,
    text: "Excellent service! The team helped me find the perfect office space for my startup. The entire process was smooth and transparent.",
    avatar: "RP"
  },
  {
    id: 3,
    name: "Anjali Singh",
    role: "Doctor",
    location: "Delhi",
    rating: 5,
    text: "Best real estate platform I've used. The verified properties feature gave me confidence, and I found my home within a week!",
    avatar: "AS"
  },
  {
    id: 4,
    name: "Vikram Kumar",
    role: "Marketing Manager",
    location: "Pune",
    rating: 4,
    text: "Great variety of properties and excellent customer support. The virtual tours saved me a lot of time during my property search.",
    avatar: "VK"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who found their perfect property with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 left-4 text-primary/10">
              <Quote className="h-16 w-16" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < testimonials[currentIndex].rating
                        ? "fill-warning text-warning"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">2000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;