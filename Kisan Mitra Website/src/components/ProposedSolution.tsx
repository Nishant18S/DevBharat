import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, 
  HandCoins, 
  Cloud, 
  Store, 
  Bot,
  Shield,
  TrendingUp,
  Users, Wrench
} from "lucide-react";

const solutions = [
  {
    icon: UserCheck,
    title: "Farmer Registration & Verification",
    description: "Secure digital identity verification using Aadhaar integration for authenticated farmer profiles",
    benefits: ["KYC Compliance", "Government Integration", "Fraud Prevention"],
    tag: "Authentication"
  },
  {
    icon: HandCoins,
    title: "Subsidy Programme Assistance",
    description: "AI-powered guidance for government schemes with automated eligibility checking and application support",
    benefits: ["Scheme Discovery", "Auto-eligibility", "Document Upload"],
    tag: "Government Schemes"
  },
  {
    icon: Cloud,
    title: "Weather & Scheme Dashboard",
    description: "Real-time weather updates, crop advisories, and personalized government scheme recommendations",
    benefits: ["Weather Alerts", "Crop Guidance", "Scheme Notifications"],
    tag: "Information Hub"
  },
  {
    icon: Store,
    title: "Virtual Marketplace",
    description: "Direct farmer-to-buyer platform eliminating middlemen with transparent pricing mechanisms",
    benefits: ["Fair Pricing", "Direct Sales", "Market Analytics"],
    tag: "Marketplace"
  },
  {
    icon: Bot,
    title: "AI-powered Multilingual Chatbot",
    description: "24/7 assistance in regional languages for farming queries, scheme information, and platform navigation",
    benefits: ["24/7 Support", "Multi-language", "Smart Assistance"],
    tag: "AI Support"
  },
  {
    icon: Wrench,
    title: "IOT Integrated hardware",
    description: "Integrated with IoT devices for offline process at rural areas",
    benefits: ["Offline Processing", "Rural Connectivity"],
    tag: "AI Support"
  }
];

const additionalFeatures = [
  { icon: Shield, title: "Secure Transactions", desc: "End-to-end encryption" },
  { icon: TrendingUp, title: "Market Analytics", desc: "Real-time price trends" },
  { icon: Users, title: "Community Forum", desc: "Farmer collaboration" }
];

export const ProposedSolution = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Our Comprehensive Solution
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A technology-driven platform designed to address every aspect of farmer challenges through innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <Card key={index} className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary text-lg mb-1">{solution.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{solution.tag}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {solution.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary mb-2">Key Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.benefits.map((benefit, bIndex) => (
                      <Badge key={bIndex} variant="outline" className="text-xs border-accent text-accent">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-card-gradient rounded-lg p-8 shadow-government">
          <h3 className="government-heading text-xl mb-6 text-center">
            Additional Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-primary text-sm mb-1">{feature.title}</h4>
                <p className="text-muted-foreground text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};