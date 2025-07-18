import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const FilterSidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState([
    'budget', 'bedrooms', 'propertyType'
  ]);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const bedroomOptions = ['1 RK/Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6+ BHK'];
  const propertyTypes = ['Residential Apartment', 'Independent Floor', 'Independent House/Villa', 'Farm House'];
  const availableFor = ['Family', 'Single Women', 'Single Men', 'Company Lease'];
  const postedBy = ['Owner', 'Builder', 'Dealer', 'Featured Dealer'];
  const furnishingStatus = ['Semi-furnished', 'Furnished', 'Unfurnished'];
  const localities = [
    { name: 'Dwarka', rating: 4.4 },
    { name: 'Golf Course Ext Road', rating: 4.2 },
    { name: 'Noida Expressway', rating: 4.3 },
    { name: 'Noida Extension', rating: 4.3 },
    { name: 'Sector 65 Gurgaon', rating: 4.2 },
  ];
  const amenities = ['Parking', 'Park', 'Power Backup', 'Vaastu Compliant', 'Lift', 'Swimming Pool', 'Gym', 'Security'];
  const ageOfProperty = ['0-1 years', '1-5 years', '5-10 years', '10+ years', '20+ years'];

  const FilterSection = ({ title, sectionKey, children }) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left p-2 hover:bg-muted/50 rounded-md transition-colors"
        >
          <h3 className="font-medium text-foreground">{title}</h3>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isExpanded && <div className="space-y-3 pl-2">{children}</div>}
        <Separator />
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-80 bg-background border-r transform transition-transform duration-300 z-50 lg:z-10",
        "overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Clear All</Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Budget */}
          <FilterSection title="Budget" sectionKey="budget">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Min Budget</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">₹10 Lacs</SelectItem>
                    <SelectItem value="25">₹25 Lacs</SelectItem>
                    <SelectItem value="50">₹50 Lacs</SelectItem>
                    <SelectItem value="1cr">₹1 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Max Budget</Label>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">₹50 Lacs</SelectItem>
                    <SelectItem value="1cr">₹1 Cr</SelectItem>
                    <SelectItem value="2cr">₹2 Cr</SelectItem>
                    <SelectItem value="5cr">₹5 Cr+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FilterSection>

          {/* Bedrooms */}
          <FilterSection title="Number of Bedrooms" sectionKey="bedrooms">
            <div className="space-y-2">
              {bedroomOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={option} />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Type of Property" sectionKey="propertyType">
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Available For */}
          <FilterSection title="Available For" sectionKey="availableFor">
            <div className="space-y-2">
              {availableFor.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={option} />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Posted By */}
          <FilterSection title="Posted By" sectionKey="postedBy">
            <div className="space-y-2">
              {postedBy.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={option} />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Furnishing Status */}
          <FilterSection title="Furnishing Status" sectionKey="furnishing">
            <div className="space-y-2">
              {furnishingStatus.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={option} />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Localities */}
          <FilterSection title="Localities with Ratings" sectionKey="localities">
            <div className="space-y-2">
              {localities.map((locality) => (
                <div key={locality.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={locality.name} />
                    <Label htmlFor={locality.name} className="text-sm">{locality.name}</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="text-xs text-muted-foreground">{locality.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Bathrooms */}
          <FilterSection title="No. of Bathrooms" sectionKey="bathrooms">
            <div className="flex flex-wrap gap-2">
              {['1+', '2+', '3+', '4+', '5+'].map((option) => (
                <Badge key={option} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {option}
                </Badge>
              ))}
            </div>
          </FilterSection>

          {/* Amenities */}
          <FilterSection title="Amenities" sectionKey="amenities">
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={amenity} />
                  <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="text-primary">
                +11 more
              </Button>
            </div>
          </FilterSection>

          {/* Properties with Photos */}
          <FilterSection title="Photo Filters" sectionKey="photos">
            <div className="flex items-center space-x-2">
              <Checkbox id="photos" />
              <Label htmlFor="photos" className="text-sm">Properties with Photos</Label>
            </div>
          </FilterSection>

          {/* Area */}
          <FilterSection title="Area (sq.ft.)" sectionKey="area">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Min Area" type="number" className="h-9" />
              <Input placeholder="Max Area" type="number" className="h-9" />
            </div>
          </FilterSection>

          {/* Verified Properties */}
          <FilterSection title="Verification" sectionKey="verified">
            <div className="flex items-center space-x-2">
              <Checkbox id="verified" />
              <Label htmlFor="verified" className="text-sm">Verified Properties</Label>
            </div>
          </FilterSection>

          {/* Age of Property */}
          <FilterSection title="Age of Property" sectionKey="age">
            <div className="space-y-2">
              {ageOfProperty.map((age) => (
                <div key={age} className="flex items-center space-x-2">
                  <Checkbox id={age} />
                  <Label htmlFor={age} className="text-sm">{age}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Apply Button */}
          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <Button className="w-full" size="lg">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;