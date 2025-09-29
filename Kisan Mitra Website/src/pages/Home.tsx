import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Play, ArrowRight, Users, Target, Award, AlertTriangle, FileX, Phone, TrendingDown, MapPin,
  UserCheck, HandCoins, Cloud, Store, Bot, Shield, Smartphone, Globe,
  Mail, Github, ExternalLink
} from "lucide-react"
import video from "@/assets/video.mp4";
import video1 from "@/assets/video1.mp4";
import video2 from "@/assets/video2.mp4";
import { useState, useEffect } from "react";

export default function Home() {
  // Video carousel state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Sample videos - you can replace with actual different videos
  const videos = [
    {
      src: video,
      title: "Platform Overview",
      description: "Complete walkthrough of our farmer support platform"
    },
    {
      src: video1, // Replace with different video when available
      title: "Government Schemes",
      description: "Easy access to government agricultural schemes"
    },
    {
      src: video2, // Replace with different video when available
      title: "Market Access",
      description: "Direct connection to markets and fair pricing"
    },
    
  ];

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Video Carousel */}
        <div className="absolute inset-0 z-0">
          {videos.map((videoItem, index) => (
            <video
              key={index}
              className={`w-full h-full object-cover scale-110 absolute inset-0 transition-opacity duration-1000 ${
                index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={videoItem.src}
              autoPlay
              muted
              loop
              playsInline
            ></video>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        
          
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            {/* Government Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-8">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium text-sm">Smart India Hackathon 2025</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
              Smart Farmer Support &
              <span className="text-accent block"> Marketplace Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed animate-fade-in" style={{animationDelay: "0.2s"}}>
              "सरल • पारदर्शी • न्यायसंगत"<br />
              Empowering 600+ Million Farmers through Technology, Transparency & Fair Market Access
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Link to="/solution">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-lg">
                  <Target className="w-5 h-5 mr-2" />
                  Explore Our Solution
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-accent mb-2">600M+</div>
                <div className="text-white/80 font-medium">Farmers to Impact</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-accent mb-2">₹50K+</div>
                <div className="text-white/80 font-medium">Average Income Increase</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-accent mb-2">12+</div>
                <div className="text-white/80 font-medium">States Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-1 h-8 bg-white/50 rounded-full"></div>
          </div>
        </div> */}
      </section>

      {/* Problem Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Addressing Critical Agricultural Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the systemic issues that affect 600+ million farmers across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <FileX className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="government-heading text-lg mb-3">Scheme Unawareness</h3>
              <p className="text-muted-foreground text-sm mb-3">70% of farmers unaware of government schemes</p>
              <Badge variant="outline" className="text-xs text-destructive border-destructive">₹2.3L Cr unused annually</Badge>
            </div>

            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="government-heading text-lg mb-3">Middlemen Dependency</h3>
              <p className="text-muted-foreground text-sm mb-3">40-60% below market rates due to intermediaries</p>
              <Badge variant="outline" className="text-xs text-secondary border-secondary">₹50K+ loss per farmer</Badge>
            </div>

            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="government-heading text-lg mb-3">Digital Divide</h3>
              <p className="text-muted-foreground text-sm mb-3">Only 25% farmers use digital platforms</p>
              <Badge variant="outline" className="text-xs text-primary border-primary">30% crop loss</Badge>
            </div>

            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
              <h3 className="government-heading text-lg mb-3">Price Transparency</h3>
              <p className="text-muted-foreground text-sm mb-3">Lack of real-time market pricing information</p>
              <Badge variant="outline" className="text-xs text-accent border-accent">₹1.2L Cr lost annually</Badge>
            </div>

            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="government-heading text-lg mb-3">Language Barriers</h3>
              <p className="text-muted-foreground text-sm mb-3">Information primarily in English/Hindi</p>
              <Badge variant="outline" className="text-xs text-primary border-primary">400M+ excluded</Badge>
            </div>

            <div className="card-gradient rounded-lg p-6 card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="government-heading text-lg mb-3">Fragmented Support</h3>
              <p className="text-muted-foreground text-sm mb-3">Multiple departments, no unified platform</p>
              <Badge variant="outline" className="text-xs text-destructive border-destructive">80% delayed assistance</Badge>
            </div>
          </div>

          <div className="text-center">
            <Link to="/problem">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Target className="w-4 h-4 mr-2" />
                Explore Detailed Problem Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Our Comprehensive Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technology-driven platform addressing every aspect of farmer challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">Farmer Verification</CardTitle>
                    <Badge variant="secondary" className="text-xs">Authentication</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Secure Aadhaar-based verification with government database integration
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">KYC Compliance</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Fraud Prevention</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <HandCoins className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">Scheme Assistance</CardTitle>
                    <Badge variant="secondary" className="text-xs">Government</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  AI-powered guidance with automated eligibility checking
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">Auto-eligibility</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Scheme Discovery</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">Direct Marketplace</CardTitle>
                    <Badge variant="secondary" className="text-xs">Marketplace</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Farmer-to-buyer platform eliminating middlemen
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">Fair Pricing</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Direct Sales</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">AI Chatbot</CardTitle>
                    <Badge variant="secondary" className="text-xs">AI Support</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  24/7 multilingual assistance for farming queries
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">24/7 Support</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Multi-language</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Cloud className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">Smart Dashboard</CardTitle>
                    <Badge variant="secondary" className="text-xs">Information</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Real-time weather, crop advisories, and scheme recommendations
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">Weather Alerts</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Crop Guidance</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-primary text-lg mb-1">Mobile-First</CardTitle>
                    <Badge variant="secondary" className="text-xs">Accessibility</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Optimized for smartphones with offline capability
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs border-accent text-accent">Offline Mode</Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">Rural Connectivity</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/solution">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Award className="w-4 h-4 mr-2" />
                Explore Complete Solution
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Expected Impact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Expected Impact & Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Measurable outcomes transforming Indian agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="card-shadow hover:shadow-government transition-all duration-300 border-2 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2">Subsidy Transparency</h3>
                    <p className="text-muted-foreground text-sm mb-3">Digital verification eliminates corruption</p>
                    <Badge variant="outline" className="text-accent border-accent">95% Fraud Reduction</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 border-2 border-accent">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2">Income Increase</h3>
                    <p className="text-muted-foreground text-sm mb-3">Fair pricing through direct marketplace</p>
                    <Badge variant="outline" className="text-accent border-accent">40% Income Boost</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:shadow-government transition-all duration-300 border-2 border-secondary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Bot className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2">Smart Farming</h3>
                    <p className="text-muted-foreground text-sm mb-3">AI-powered agricultural guidance</p>
                    <Badge variant="outline" className="text-accent border-accent">60% Better Yield</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="government-heading text-4xl md:text-5xl mb-6">
              Meet Our Innovation Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Smart India Hackathon 2025 participants driving agricultural transformation
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {[
              { name: "Arjun Sharma", role: "Team Leader", expertise: "Full Stack Development" },
              { name: "Priya Patel", role: "Frontend Dev", expertise: "React & UI/UX" },
              { name: "Rohit Kumar", role: "UI/UX Designer", expertise: "Interface Design" },
              { name: "Vikash Singh", role: "Backend Dev", expertise: "API Development" },
              { name: "Anita Gupta", role: "Data Analyst", expertise: "AI/ML & Analytics" }
            ].map((member, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg card-shadow hover:shadow-government transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-bold text-primary text-sm mb-1">{member.name}</h3>
                <p className="text-accent font-semibold text-xs mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs">{member.expertise}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/team">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Users className="w-4 h-4 mr-2" />
                Meet the Complete Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-12 card-shadow text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Agriculture?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join us in revolutionizing Indian farming through technology, transparency, and fair market access.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/solution">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 hover:text-secondary font-semibold px-8 py-4">
                    <Award className="w-5 h-5 mr-2" />
                    Explore Platform
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-secondary font-semibold px-8 py-4">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}