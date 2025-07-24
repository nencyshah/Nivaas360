import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

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
   
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-gray-700">Nivaas</span>
              <span className="text-gray-500">360</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative group">
              <Link to="/favorites" className="relative group">
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg hidden group-hover:block z-50">
                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-2">Favorites</h4>
                  {favorites.length === 0 ? (
                    <p className="text-sm text-gray-500">No favorites yet.</p>
                  ) : (
                    favorites.map((fav) => (
                      <Link
                        to={`/property/${fav._id}`}
                        key={fav._id}
                        className="block px-2 py-1 hover:bg-gray-100 text-sm"
                      >
                        {fav.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild>
              <a href="/Signup">Sign Up</a>
            </Button>

            {user?.role !== "seller" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/purchased")}
              >
                Purchased
              </Button>
            )}

            {user?.role === "seller" && (
              <Button size="sm" onClick={() => navigate("/Createlisting")}>
                Create Listing
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5 flex md:hidden" />
            )}
          </Button>

          {user ? (
            <Link to="/Profile">
              <img
                className="rounded-full h-7 w-7 object-cover flex md:hidden."
                src={user.avatar}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/profile.png";
                }}
              />
            </Link>
          ) : (
            <Link to="/signin" className="text-slate-700 hover:underline">
              Sign in
            </Link>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

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
