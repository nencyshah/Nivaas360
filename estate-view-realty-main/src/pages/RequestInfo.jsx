import { Send, Home, MapPin, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const RequestInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Request Property Information
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get detailed information about properties that match your requirements. 
              Our experts will provide you with comprehensive details and arrange property visits.
            </p>
          </div>
        </section>

        {/* Request Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card p-8 md:p-12">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Tell Us About Your Requirements
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below with your property requirements and contact details. 
                    We'll get back to you with matching properties within 24 hours.
                  </p>
                </div>

                <form className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        1
                      </div>
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" placeholder="Enter your full name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input id="occupation" placeholder="Your profession" />
                      </div>
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        2
                      </div>
                      Property Requirements
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Residential Apartment</SelectItem>
                            <SelectItem value="independent-floor">Independent Floor</SelectItem>
                            <SelectItem value="villa">Independent House/Villa</SelectItem>
                            <SelectItem value="studio">1 RK/Studio</SelectItem>
                            <SelectItem value="farmhouse">Farm House</SelectItem>
                            <SelectItem value="commercial">Commercial Property</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Buy/Rent/Investment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="buy">Buy</SelectItem>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="resale">Resale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select BHK" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1rk">1 RK</SelectItem>
                            <SelectItem value="1bhk">1 BHK</SelectItem>
                            <SelectItem value="2bhk">2 BHK</SelectItem>
                            <SelectItem value="3bhk">3 BHK</SelectItem>
                            <SelectItem value="4bhk">4 BHK</SelectItem>
                            <SelectItem value="5bhk">5+ BHK</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="No. of bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="furnishing">Furnishing</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Furnishing status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unfurnished">Unfurnished</SelectItem>
                            <SelectItem value="semi-furnished">Semi-furnished</SelectItem>
                            <SelectItem value="furnished">Fully Furnished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Location & Budget */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        3
                      </div>
                      Location & Budget
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredLocations">Preferred Locations *</Label>
                        <Input 
                          id="preferredLocations" 
                          placeholder="e.g., Dwarka, Noida, Gurgaon" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specificArea">Specific Area/Landmark</Label>
                        <Input 
                          id="specificArea" 
                          placeholder="e.g., Near Metro Station, IT Park" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minBudget">Minimum Budget *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Min budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">₹10 Lacs</SelectItem>
                            <SelectItem value="25">₹25 Lacs</SelectItem>
                            <SelectItem value="50">₹50 Lacs</SelectItem>
                            <SelectItem value="75">₹75 Lacs</SelectItem>
                            <SelectItem value="100">₹1 Cr</SelectItem>
                            <SelectItem value="200">₹2 Cr</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxBudget">Maximum Budget *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Max budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">₹50 Lacs</SelectItem>
                            <SelectItem value="75">₹75 Lacs</SelectItem>
                            <SelectItem value="100">₹1 Cr</SelectItem>
                            <SelectItem value="200">₹2 Cr</SelectItem>
                            <SelectItem value="500">₹5 Cr</SelectItem>
                            <SelectItem value="1000">₹10 Cr+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Preferences */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        4
                      </div>
                      Additional Preferences
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        'Parking Required', 'Gym/Fitness Center', 'Swimming Pool', 'Children\'s Play Area',
                        'Security/Gated Community', 'Power Backup', 'Lift/Elevator', 'Club House',
                        'Garden/Green Space', 'Shopping Complex', 'School Nearby', 'Hospital Nearby'
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox id={amenity} />
                          <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">When are you looking to buy/rent?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediately</SelectItem>
                          <SelectItem value="1month">Within 1 month</SelectItem>
                          <SelectItem value="3months">Within 3 months</SelectItem>
                          <SelectItem value="6months">Within 6 months</SelectItem>
                          <SelectItem value="1year">Within 1 year</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalRequirements">Additional Requirements/Comments</Label>
                      <Textarea 
                        id="additionalRequirements" 
                        placeholder="Any specific requirements, preferences, or questions..." 
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Contact Preferences */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        5
                      </div>
                      Contact Preferences
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Preferred Contact Method:</Label>
                        <div className="flex flex-wrap gap-4">
                          {['Phone Call', 'WhatsApp', 'Email', 'SMS'].map((method) => (
                            <div key={method} className="flex items-center space-x-2">
                              <Checkbox id={method} />
                              <Label htmlFor={method} className="text-sm">{method}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Contact Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Best time to contact" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                            <SelectItem value="anytime">Anytime</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to receive property recommendations and updates via phone, email, and WhatsApp. 
                        I also agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and 
                        <a href="/terms" className="text-primary hover:underline ml-1">Terms of Service</a>.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="newsletter" />
                      <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        Subscribe to our newsletter for market insights and new property alerts
                      </Label>
                    </div>

                    <Button className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Our property experts will contact you within 24 hours with suitable options
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Service?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Verified Properties</h3>
                <p className="text-sm text-muted-foreground">
                  All properties are verified for legal compliance and authenticity
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Our experienced team provides personalized property recommendations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Best Deals</h3>
                <p className="text-sm text-muted-foreground">
                  We negotiate the best prices and terms for our clients
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RequestInfo;