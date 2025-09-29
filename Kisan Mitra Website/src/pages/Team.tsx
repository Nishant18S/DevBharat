import { TeamSection } from "@/components/TeamSection";
import { Users, Award, Target, Code, Palette, BarChart3 } from "lucide-react";

const teamStats = [
  { label: "Team Members", value: "5", icon: Users },
  { label: "Combined Experience", value: "15+ Years", icon: Award },
  { label: "Projects Completed", value: "50+", icon: Target }
];

const expertise = [
  {
    title: "Full-Stack Development",
    description: "React, Node.js, MongoDB, AI/ML Integration",
    icon: Code,
    color: "primary"
  },
  {
    title: "UI/UX Design",
    description: "Government Portal Design, User Experience Research",
    icon: Palette,
    color: "accent"
  },
  {
    title: "Data Analytics",
    description: "Agricultural Data Analysis, Market Research",
    icon: BarChart3,
    color: "secondary"
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}

      {/* Team Members */}
      <TeamSection />

      {/* Team Expertise */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Our Core Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining technical excellence with deep understanding of agricultural challenges 
              to create meaningful solutions for Indian farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {expertise.map((skill, index) => (
              <div 
                key={index}
                className="card-gradient rounded-lg p-8 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6 ${
                  skill.color === 'primary' ? 'bg-primary/10' :
                  skill.color === 'accent' ? 'bg-accent/10' :
                  'bg-secondary/10'
                }`}>
                  <skill.icon className={`w-8 h-8 ${
                    skill.color === 'primary' ? 'text-primary' :
                    skill.color === 'accent' ? 'text-accent' :
                    'text-secondary'
                  }`} />
                </div>
                <h3 className="government-heading text-xl mb-4">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-12 card-shadow text-center">
              <h2 className="government-heading text-4xl mb-8">Our Vision</h2>
              <blockquote className="text-2xl text-muted-foreground italic leading-relaxed mb-8">
                "To bridge the digital divide in Indian agriculture and ensure every farmer 
                has access to the tools, information, and opportunities they need to thrive 
                in the modern economy."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-1 bg-accent rounded-full"></div>
                <span className="government-heading text-lg">Team DevBharat</span>
                <div className="w-12 h-1 bg-accent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}