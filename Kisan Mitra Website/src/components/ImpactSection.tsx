import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  TrendingUp, 
  Bot, 
  Globe2, 
  Leaf,
  ArrowRight,
  Wrench
} from "lucide-react";
import { useState, useEffect } from "react";

const impacts = [
  {
    icon: Shield,
    title: "Transparency in Subsidies",
    description: "Digital verification eliminates corruption and ensures rightful beneficiaries receive government support",
    metrics: "95% Fraud Reduction",
    color: "border-primary"
  },
  {
    icon: TrendingUp,
    title: "Fair Pricing & Direct Sales",
    description: "Marketplace platform ensures farmers get competitive prices by eliminating middleman exploitation",
    metrics: "40% Income Increase",
    color: "border-accent"
  },
  {
    icon: Bot,
    title: "AI-powered Knowledge Support",
    description: "Smart assistance provides scientific farming practices and real-time agricultural guidance",
    metrics: "60% Better Yield",
    color: "border-secondary"
  },
  {
    icon: Globe2,
    title: "Multilingual Accessibility",
    description: "Platform available in regional languages ensuring no farmer is left behind due to language barriers",
    metrics: "15+ Languages",
    color: "border-primary"
  },
  {
    icon: Leaf,
    title: "Sustainable Farming Practices",
    description: "Promoting eco-friendly agriculture through data-driven insights and environmental awareness",
    metrics: "30% Less Pesticide Use",
    color: "border-accent"
  },
  {
    icon: Wrench,
    title: "Iot Support",
    description: "Real-time field monitoring through IoT sensors providing data on soil moisture, temperature, and crop health for precision farming",
    metrics: "24/7 Field Monitoring",
    color: "border-secondary"
  }
];

const timelineSteps = [
  { phase: "Phase 1", title: "Farmer Onboarding" },
  { phase: "Phase 2", title: "Scheme Integration"},
  { phase: "Phase 3", title: "Marketplace Launch"},
  { phase: "Phase 4", title: "AI Chatbot Deployment"},
  { phase: "Phase 5", title: "Scale & Expansion" }
];

export const ImpactSection = () => {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % timelineSteps.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Expected Impact & Benefits
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Transforming Indian agriculture through technology-driven solutions with measurable outcomes
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className={`card-shadow hover:shadow-government transition-all duration-300 border-2 ${impact.color} group`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <impact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {impact.description}
                    </p>
                    <Badge variant="outline" className="text-accent border-accent font-semibold">
                      {impact.metrics}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Implementation Timeline */}
        <div className="bg-card-gradient rounded-lg p-8 shadow-government">
          <h3 className="government-heading text-2xl mb-8 text-center">
            Implementation Roadmap
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted rounded-full transform -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary rounded-full transform -translate-y-1/2 z-10 transition-all duration-1000"
              style={{ width: `${((currentPhase + 1) / timelineSteps.length) * 100}%` }}
            ></div>
            
            {/* Timeline Steps */}
            <div className="relative z-20 flex justify-between items-center">
              {timelineSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div 
                    className={`w-4 h-4 rounded-full mx-auto mb-3 transition-all duration-500 ${
                      index <= currentPhase 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted'
                    }`}
                  ></div>
                  <div className="bg-white rounded-lg p-3 shadow-card-soft min-w-[120px]">
                    <Badge variant="outline" className="text-xs mb-1">
                      {step.phase}
                    </Badge>
                    <h4 className="font-semibold text-primary text-sm mb-1">
                      {step.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};