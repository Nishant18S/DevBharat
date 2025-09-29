import { ProposedSolution } from "@/components/ProposedSolution";
import { KeyFeatures } from "@/components/KeyFeatures";
import { ImpactSection } from "@/components/ImpactSection";
import { DemoSection } from "@/components/DemoSection";
import { Target, Lightbulb, Award } from "lucide-react";

export default function Solution() {
  return (
    <div className="min-h-screen bg-background">
      {/* Solution Components */}
      <ProposedSolution />
      <KeyFeatures />
      <ImpactSection />
    </div>
  );
}