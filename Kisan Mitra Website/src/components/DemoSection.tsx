import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Smartphone, 
  MessageSquare, 
  BarChart3,
  PlayCircle,
  Eye
} from "lucide-react";

const demoScreens = [
  {
    icon: Monitor,
    title: "Farmer Dashboard",
    description: "Personalized dashboard showing weather updates, scheme eligibility, and market prices with government scheme notifications",
    features: ["Weather Alerts", "Scheme Status", "Market Prices", "Crop Calendar"],
    mockupBg: "bg-gradient-to-br from-primary/10 to-accent/10"
  },
  {
    icon: Smartphone,
    title: "Marketplace Screen", 
    description: "Direct farmer-to-buyer marketplace with transparent pricing, quality verification, and secure payment integration",
    features: ["Product Listing", "Price Comparison", "Buyer Reviews", "Secure Payments"],
    mockupBg: "bg-gradient-to-br from-accent/10 to-secondary/10"
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Interaction",
    description: "Multilingual AI assistant providing 24/7 support for farming queries, scheme guidance, and platform navigation",
    features: ["Voice Input", "Multi-language", "Smart Responses", "Scheme Guidance"],
    mockupBg: "bg-gradient-to-br from-secondary/10 to-primary/10"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Data-driven insights showing farming patterns, income trends, scheme utilization, and market analytics for farmers",
    features: ["Income Tracking", "Yield Analysis", "Market Trends", "ROI Calculator"],
    mockupBg: "bg-gradient-to-br from-primary/10 to-secondary/10"
  }
];

export const DemoSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Platform Demo Screenshots
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Preview of our comprehensive farmer support platform interface designed for ease of use and maximum impact
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="default" className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Watch Full Demo
            </Button>
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Live Preview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {demoScreens.map((screen, index) => (
            <Card key={index} className="card-shadow hover:shadow-government transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <screen.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-primary text-lg">{screen.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">Demo Mockup</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {screen.description}
                </p>

                {/* Mockup Screen */}
                <div className={`${screen.mockupBg} rounded-lg p-6 border-2 border-dashed border-primary/20 min-h-[200px] flex flex-col justify-center`}>
                  <div className="text-center">
                    <screen.icon className="w-12 h-12 text-primary/60 mx-auto mb-4" />
                    <h4 className="font-semibold text-primary mb-2">{screen.title} Interface</h4>
                    <p className="text-muted-foreground text-xs mb-4">
                      Interactive mockup - Full demo available
                    </p>
                    
                    {/* Mock UI Elements */}
                    <div className="space-y-2">
                      <div className="bg-white/50 rounded p-2 flex items-center justify-between">
                        <div className="w-3 h-3 bg-primary/30 rounded"></div>
                        <div className="text-xs text-primary/70">Sample Interface Element</div>
                        <div className="w-3 h-3 bg-accent/30 rounded"></div>
                      </div>
                      <div className="bg-white/30 rounded p-2 flex items-center justify-center">
                        <div className="text-xs text-primary/50">Interactive Demo Content</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {screen.features.map((feature, fIndex) => (
                      <Badge key={fIndex} variant="outline" className="text-xs border-accent text-accent">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card-gradient rounded-lg p-6 shadow-government inline-block">
            <h3 className="government-heading text-xl mb-2">
              Complete Platform Demonstration Available
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Schedule a live demo session with our team to explore all features
            </p>
            <Button variant="default" className="bg-accent hover:bg-accent/90">
              Request Live Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};