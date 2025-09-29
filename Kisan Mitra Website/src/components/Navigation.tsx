import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Problem", href: "/problem" },
  { label: "Solution", href: "/solution" },
  // { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" }
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Government Header Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 border-b-2 border-accent">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4" />
            <span className="font-medium">Government of India | Smart India Hackathon 2025</span>
          </div>
          <div className="hidden md:block">
            <span className="font-medium">भारत सरकार | Ministry of Electronics & IT</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b government-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-patriotic-gradient rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="government-heading text-lg font-bold">KisanSetu</h1>
                <p className="text-muted-foreground text-xs">SIH 2025 Hackathon</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={location.pathname === link.href ? "default" : "ghost"}
                    className={cn(
                      "px-4 py-2 font-medium transition-all duration-200",
                      location.pathname === link.href
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent/10 hover:text-accent"
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 animate-accordion-down">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={location.pathname === link.href ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start px-4 py-3 font-medium",
                        location.pathname === link.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent/10 hover:text-accent"
                      )}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};