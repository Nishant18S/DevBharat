import { Card, CardContent } from "@/components/ui/card";
import { 
  UserPlus, 
  LayoutDashboard, 
  FileCheck, 
  Building2, 
  ShoppingCart, 
  MessageCircle,
  Smartphone,
  Globe
} from "lucide-react";

const features = [
  {
    icon: UserPlus,
    title: "Registration & Authentication",
    description: "Secure Aadhaar-based farmer verification with government database integration",
    color: "bg-primary"
  },
  {
    icon: LayoutDashboard,
    title: "Personalized Dashboard",
    description: "Custom farmer dashboard with weather, schemes, and market information",
    color: "bg-accent"
  },
  {
    icon: FileCheck,
    title: "Subsidy Programme Validation",
    description: "Automated eligibility checking and document verification for government schemes",
    color: "bg-secondary"
  },
  {
    icon: Building2,
    title: "Government Schemes",
    description: "Comprehensive database of central and state government agricultural schemes",
    color: "bg-primary"
  },
  {
    icon: ShoppingCart,
    title: "Direct Farmer Marketplace",
    description: "B2B platform connecting farmers directly with buyers, eliminating middlemen",
    color: "bg-accent"
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot Support",
    description: "24/7 multilingual assistance for farming queries and platform navigation",
    color: "bg-secondary"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for smartphones with offline capability for rural connectivity",
    color: "bg-primary"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Available in 15+ Indian regional languages for maximum accessibility",
    color: "bg-accent"
  }
];

export const KeyFeatures = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Platform Key Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive technology solutions designed specifically for Indian farming community needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-shadow hover:shadow-government transition-all duration-300 group border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className={`${feature.color} p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-bold text-primary text-lg mb-3 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-patriotic-gradient text-white rounded-lg p-6 shadow-government inline-block">
            <h3 className="text-xl font-bold mb-2">
              Built for Scale & Accessibility
            </h3>
            <p className="text-white/90 text-sm">
              Designed to serve millions of farmers across India with government-grade security
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};