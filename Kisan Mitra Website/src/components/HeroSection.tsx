import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/hero-background.jpg";

const carouselSlides = [
  {
    title: "Problem Faced by Farmers",
    content: "Lack of awareness about government schemes, dependence on middlemen, and limited access to fair market prices",
    bgColor: "bg-primary"
  },
  {
    title: "Our Proposed Solution", 
    content: "AI-powered platform providing scheme guidance, direct marketplace access, and multilingual farmer support",
    bgColor: "bg-accent"
  },
  {
    title: "Hackathon Impact & Vision",
    content: "Empowering 600+ million farmers with technology-driven transparency and sustainable agricultural practices",
    bgColor: "bg-secondary"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Government Header */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">Smart India Hackathon 2025 | Government of India Initiative</p>
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className="flex-1 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        
        <div className="relative container mx-auto px-4 py-20 flex flex-col justify-center min-h-[calc(100vh-100px)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Farmer Support & 
                <span className="text-accent"> Marketplace Platform</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                "Empowering Farmers through Technology, Transparency & Fair Market Access"
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3">
                  Explore Platform
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3">
                  View Demo
                </Button>
              </div>
            </div>

            {/* Carousel Section */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  {carouselSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        index === currentSlide ? 'translate-x-0' : 
                        index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                      }`}
                    >
                      <div className={`${slide.bgColor} h-full rounded-lg p-6 flex flex-col justify-center text-white`}>
                        <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                        <p className="text-lg leading-relaxed">{slide.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Carousel Controls */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevSlide}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {carouselSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-accent' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextSlide}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};