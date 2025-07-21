import { useState } from "react";
import { Menu, X, Heart } from "lucide-react"; // Icons for menu toggle and favorite
import { Button } from "@/components/ui/button"; // Custom UI button component
import { cn } from "@/lib/utils"; // Utility for conditional class names
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { Link, useLocation } from "react-router-dom"; // For linking to routes and getting current path
import { useSelector } from "react-redux"; // To access Redux state (user info)

const Header = () => {
  // State to track whether the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate(); // For navigation without page reload
  const location = useLocation(); // Get the current route path
  const { user } = useSelector((state) => state.user); // Access logged-in user from Redux store

  // Navigation items for the header
  // If user is NOT a seller, show Buy and Rent links
  const navItems = [
    { name: "Home", href: "/" },
    ...(user?.role !== "seller"
      ? [
          { name: "Buy", href: "/buy" },
          { name: "Rent", href: "/rent" },
        ]
      : []),
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Request Info", href: "/request-info" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Container for header content */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* ✅ Logo Section */}
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-gray-700">Nivaas</span>
              <span className="text-gray-500">360</span>
            </h1>
          </Link>

          {/* ✅ Desktop Navigation Menu (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href // Highlight active link
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* ✅ Desktop Action Buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Favorite button (not implemented yet) */}
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>

            {/* Signup button */}
            <Button variant="outline" size="sm" asChild>
              <a href="/Signup">Sign Up</a>
            </Button>

            {/* If user is not a seller → show Purchased button */}
            {user?.role !== "seller" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/purchased")}
              >
                Purchased
              </Button>
            )}

            {/* If user is a seller → show Create Listing button */}
            {user?.role === "seller" && (
              <Button size="sm" onClick={() => navigate("/Createlisting")}>
                Create Listing
              </Button>
            )}
          </div>

          {/* ✅ Mobile Menu Toggle Button (hamburger / close icon) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" /> // Close icon when menu open
            ) : (
              <Menu className="h-5 w-5 flex md:hidden" /> // Hamburger icon when menu closed
            )}
          </Button>

          {/* ✅ Profile / Signin on Mobile */}
          <Link to="/Profile">
            {user ? (
              // If user is logged in → show profile avatar
              <img
                className="rounded-full h-7 w-7 object-cover flex md:hidden."
                src={user.avatar}
                alt="Profile"
                onError={(e) => {
                  // Fallback to default image if avatar not found
                  e.target.onerror = null;
                  e.target.src = "/src/assets/profile.png";
                }}
              />
            ) : (
              // If user is NOT logged in → show Sign-in link
              <Link to="/signin" className="text-slate-700 hover:underline">
                Sign in
              </Link>
            )}
          </Link>
        </div>

        {/* ✅ Mobile Navigation Menu (only visible if menu is open) */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 py-4 space-y-2">
              {/* Render nav links for mobile */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary" // Highlight active link
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile action buttons */}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/createlisting");
                  }}
                >
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
