import { AlertTriangle, Users, TrendingDown, MapPin, Phone, FileX } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Lack of Scheme Awareness",
    description: "Farmers remain unaware of 70% of government schemes due to poor information dissemination and complex application processes.",
    impact: "₹2.3 Lakh Crore in unused subsidies annually",
    color: "destructive"
  },
  {
    icon: Users,
    title: "Middlemen Dependency", 
    description: "Farmers sell crops at 40-60% below market rates due to dependency on intermediaries and lack of direct market access.",
    impact: "₹50,000+ average annual loss per farmer",
    color: "secondary"
  },
  {
    icon: Phone,
    title: "Limited Digital Access",
    description: "Only 25% of farmers use digital platforms for agricultural guidance, missing crucial weather and market information.",
    impact: "30% crop loss due to poor information access",
    color: "muted"
  },
  {
    icon: TrendingDown,
    title: "Pricing Transparency Issues",
    description: "Farmers lack real-time market pricing information, leading to exploitation and unfair trade practices.",
    impact: "₹1.2 Lakh Crore market value lost annually",
    color: "accent"
  },
  {
    icon: MapPin,
    title: "Regional Language Barriers",
    description: "Agricultural information available primarily in English/Hindi, excluding 60% of farmers who speak regional languages.",
    impact: "400M+ farmers excluded from digital agriculture",
    color: "primary"
  },
  {
    icon: AlertTriangle,
    title: "Fragmented Support System",
    description: "Multiple government departments with no unified platform, creating confusion and inefficiency in farmer support.",
    impact: "Delayed assistance affects 80% of applications",
    color: "destructive"
  }
];

export default function Problem() {
  return (
    <div className="min-h-screen bg-background">


      {/* Problems Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Systemic Agricultural Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each challenge represents a critical barrier to agricultural prosperity, 
              affecting millions of farmers and their families across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                className="card-gradient rounded-lg p-8 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 ${
                  problem.color === 'destructive' ? 'bg-destructive/10' :
                  problem.color === 'secondary' ? 'bg-secondary/10' :
                  problem.color === 'accent' ? 'bg-accent/10' :
                  problem.color === 'primary' ? 'bg-primary/10' :
                  'bg-muted'
                }`}>
                  <problem.icon className={`w-8 h-8 ${
                    problem.color === 'destructive' ? 'text-destructive' :
                    problem.color === 'secondary' ? 'text-secondary' :
                    problem.color === 'accent' ? 'text-accent' :
                    problem.color === 'primary' ? 'text-primary' :
                    'text-muted-foreground'
                  }`} />
                </div>
                
                <h3 className="government-heading text-xl mb-4">{problem.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{problem.description}</p>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  problem.color === 'destructive' ? 'bg-destructive/10 text-destructive' :
                  problem.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  problem.color === 'accent' ? 'bg-accent/10 text-accent' :
                  problem.color === 'primary' ? 'bg-primary/10 text-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <AlertTriangle className="w-3 h-3" />
                  {problem.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="government-heading text-4xl md:text-5xl mb-8">
              The Cumulative Impact
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              These interconnected problems create a cycle of poverty and inefficiency 
              that affects the entire agricultural ecosystem and India's food security.
            </p>
            
            <div className="bg-card rounded-xl p-8 card-shadow">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="government-heading text-2xl mb-4">Economic Impact</h3>
                  <ul className="text-left space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      ₹6.2 Lakh Crore annual agricultural losses
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      40% reduction in farmer income potential
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      Increased rural-to-urban migration
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="government-heading text-2xl mb-4">Social Impact</h3>
                  <ul className="text-left space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      Food security concerns for 1.4B population
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      Perpetual cycle of rural poverty
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      Loss of traditional agricultural knowledge
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}