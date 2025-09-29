import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Flag, Award } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "smartfarmer.sih2025@gmail.com",
    description: "Get in touch for project inquiries"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+91 98765 43210",
    description: "Monday to Friday, 9 AM to 6 PM"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "IIT Delhi, New Delhi",
    description: "Smart India Hackathon 2025 Venue"
  }
];

const projectLinks = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "View our complete source code",
    url: "#"
  },
  {
    icon: ExternalLink,
    title: "Live Demo",
    description: "Experience our platform live",
    url: "#"
  },
  {
    icon: Linkedin,
    title: "Team LinkedIn",
    description: "Connect with our team members",
    url: "#"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}


      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Contact Form */}
            <div>
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="government-heading text-2xl">Send us a Message</CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                      <Input placeholder="Your full name" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                      <Input type="email" placeholder="your.email@domain.com" className="bg-background" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Organization/Institution</label>
                    <Input placeholder="Your organization or university" className="bg-background" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <Input placeholder="What is this regarding?" className="bg-background" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Tell us about your inquiry, feedback, or collaboration ideas..." 
                      rows={6}
                      className="bg-background"
                    />
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
          </div>
        </div>
      </section>

      {/* Awards Section */}
    </div>
  );
}