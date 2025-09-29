import { HeroSection } from "@/components/HeroSection";
import { TeamSection } from "@/components/TeamSection";
import { ProblemStatement } from "@/components/ProblemStatement";
import { ProposedSolution } from "@/components/ProposedSolution";
import { KeyFeatures } from "@/components/KeyFeatures";
import { ImpactSection } from "@/components/ImpactSection";
import { DemoSection } from "@/components/DemoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TeamSection />
      <ProblemStatement />
      <ProposedSolution />
      <KeyFeatures />
      <ImpactSection />
      <DemoSection />
      <Footer />
    </div>
  );
};

export default Index;
