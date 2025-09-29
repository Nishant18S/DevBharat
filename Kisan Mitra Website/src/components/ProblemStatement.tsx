import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Users, TrendingDown, CloudOff } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Lack of Scheme Awareness",
    description: "Farmers are unaware of government subsidies and support programs available to them",
    impact: "Missing out on ₹50,000+ annual benefits"
  },
  {
    icon: Users,
    title: "Dependence on Middlemen",
    description: "Exploitation by intermediaries leads to unfair pricing and reduced farmer income",
    impact: "30-40% reduction in actual earnings"
  },
  {
    icon: TrendingDown,
    title: "No Structured Cultivation Guidance",
    description: "Lack of scientific farming practices and crop management advice",
    impact: "Lower yield quality and quantity"
  },
  {
    icon: CloudOff,
    title: "Limited Weather & Market Data Access",
    description: "Farmers lack timely information about weather patterns and market prices",
    impact: "Poor decision making and losses"
  }
];

export const ProblemStatement = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Challenges Faced by Indian Farmers
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Understanding the core problems that our Smart Farmer Support Platform aims to solve
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="card-shadow hover:shadow-government transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <problem.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary text-lg">{problem.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-3 leading-relaxed">
                  {problem.description}
                </p>
                <div className="bg-accent/10 rounded-lg p-3">
                  <p className="text-accent font-semibold text-sm">
                    Impact: {problem.impact}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card-gradient rounded-lg p-6 shadow-government inline-block">
            <h3 className="government-heading text-xl mb-2">
              600+ Million Farmers Need Our Solution
            </h3>
            <p className="text-muted-foreground">
              Addressing these challenges can transform Indian agriculture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};