import { Card, CardContent } from "@/components/ui/card";
import teamLeader from "@/assets/team-leader.jpg";
import teamDeveloper1 from "@/assets/team-developer1.jpg";
import teamDesigner from "@/assets/team-designer.jpg";
import teamDeveloper2 from "@/assets/team-developer2.jpg";
import teamAnalyst from "@/assets/team-analyst.jpg";

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Team Leader & Full Stack Developer",
    image: teamLeader,
    expertise: "System Architecture, Backend Development"
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    image: teamDeveloper1,
    expertise: "React, UI/UX Implementation"
  },
  {
    name: "Rohit Kumar",
    role: "UI/UX Designer",
    image: teamDesigner,
    expertise: "User Experience, Interface Design"
  },
  {
    name: "Vikash Singh",
    role: "Backend Developer",
    image: teamDeveloper2,
    expertise: "Database, API Development"
  },
  {
    name: "Anita Gupta",
    role: "Data Analyst",
    image: teamAnalyst,
    expertise: "AI/ML, Data Processing"
  }
];

export const TeamSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="government-heading text-3xl md:text-4xl mb-4">
            Team Innovators – SIH Hackathon 2025
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the dedicated team behind the Smart Farmer Support & Marketplace Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="card-shadow hover:shadow-government transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent rounded-full border-2 border-white"></div>
                </div>
                
                <h3 className="font-bold text-primary text-lg mb-1">{member.name}</h3>
                <p className="text-accent font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card-gradient rounded-full px-6 py-3 shadow-card-soft">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold">Smart India Hackathon 2025 Participants</span>
            <div className="w-3 h-3 bg-accent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};