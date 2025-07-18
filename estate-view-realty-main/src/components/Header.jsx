import { useState } from 'react';
import { Menu, X, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const navItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Buy', href: '/Buy' },
    { name: 'Rent', href: '/Rent' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    {name: 'Request Info',href: '/request-info'},
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/"> 
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-700">Nivaas</span>
            <span className="text-gray-500">360</span>
          </h1>
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              {/* <a href="/request-info">Request Info</a> */}
               <a href="/Signup">Sign Up</a> 
            </Button>
            <Button size="sm" onClick={() => navigate('/Createlisting')}>
              Create Listing
            </Button>
          </div>
            
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 flex  md:hidden" />}
          </Button>
          <Link to="/Profile">
            {user ? (
              <img
                className="rounded-full h-7 w-7 object-cover flex md:hidden."
                src={user.avatar}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/profile.png";
                }}
              />
            ) : (
              <Link to="/signin" className="text-slate-700 hover:underline">
                Sign in
              </Link>
            )}
          </Link>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
                <Button className="w-full" onClick={() => { setIsMenuOpen(false); navigate('/createlisting'); }}>
                  List Property
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;