import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  Mail,
  ExternalLink,
  Award,
  Flag
} from "lucide-react";

const navLinks = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: AlertTriangle, label: "Problem", href: "#problem" },
  { icon: Lightbulb, label: "Solution", href: "#solution" },
  // { icon: Users, label: "Team", href: "#team" },
  { icon: Mail, label: "Contact", href: "#contact" }
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent rounded-lg">
<Flag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">KisanSetu</h3>
                <p className="text-primary-foreground/80 text-sm">SIH 2025 Project</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              Empowering farmers through technology, transparency, and fair market access. 
              A comprehensive solution for India's agricultural challenges.
            </p>
            
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground/80 text-sm font-semibold">Made for Farmers, by Innovators</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Platform Sections</h4>
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors group"
                >
                  <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Hackathon Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Hackathon Details</h4>
            <div className="space-y-3">
              <div className="bg-primary-foreground/10 rounded-lg p-3">
                <p className="text-primary-foreground/90 text-sm font-semibold mb-1">
                  Smart India Hackathon 2025
                </p>
                <p className="text-primary-foreground/70 text-xs">
                  Government of India Initiative
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-primary-foreground/80 text-xs">
                  <strong>Problem Statement ID:</strong> SIH25109
                </p>
                <p className="text-primary-foreground/80 text-xs">
                  <strong>Organization:	</strong>AICTE 
                </p>
                <p className="text-primary-foreground/80 text-xs">
                  <strong>Theme:</strong> Agriculture, FoodTech & Rural Development
                </p>
                <p className="text-primary-foreground/80 text-xs">
                  <strong>Category:</strong> Hardware
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Footer Bottom */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/90 text-sm font-semibold">
              Smart India Hackathon 2025 | Team DevBharat
            </p>
            <p className="text-primary-foreground/70 text-xs mt-1">
              This is a demonstration project created for educational and showcase purposes
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2"
            >
              <p className="text-black" > Live Demo</p>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-accent hover:bg-accent/90 gap-2"
            >
              <Mail className="w-3 h-3" />
              Contact Team
            </Button>
          </div>
        </div>
      </div>

      {/* Government Footer Badge */}
      <div className="bg-primary-foreground/5 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/60 text-xs">
            © 2025 Smart Farmer Support Platform | Government of India | Ministry of Electronics & Information Technology
          </p>
        </div>
      </div>
    </footer>
  );
};