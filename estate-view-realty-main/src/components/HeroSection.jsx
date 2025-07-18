import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-home.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find Your
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces.
          </p>

          {/* Search Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-elegant p-6 md:p-8 max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter location" 
                  className="pl-10 h-12 border-0 bg-muted/50 focus:bg-background transition-colors"
                />
              </div>
              
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-25">₹10L - ₹25L</SelectItem>
                  <SelectItem value="25-50">₹25L - ₹50L</SelectItem>
                  <SelectItem value="50-1cr">₹50L - ₹1Cr</SelectItem>
                  <SelectItem value="1cr+">₹1Cr+</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="hero" size="lg" className="h-12">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Popular:</span>
              {['2 BHK', '3 BHK', 'Ready to Move', 'New Projects'].map((filter) => (
                <Button 
                  key={filter} 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            {[
              { number: '10K+', label: 'Properties' },
              { number: '5K+', label: 'Happy Clients' },
              { number: '50+', label: 'Cities' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;