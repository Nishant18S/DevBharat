export interface FarmerData {
  name: string;
  aadhaar: string;
  mobile: string;
  landArea: number;
  location: string;
  bankAccount: string;
  selectedCrop: string | null;
  profilePhoto: string | null;
}

export interface CompletedStep {
  id: string;
  completedAt: Date;
  imageProof?: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  };
}

export interface CropStep {
  id: string;
  title: string;
  days: number;
  icon: string;
  checklist: string[];
  videoUrl: string;
  description: string;
  detailedSteps: string[];
  proofRequired: string;
}

export interface SubsidyScheme {
  id: string;
  name: string;
  type: string;
  eligibility: string;
  amount: string;
  benefits: string[];
  minLand: number;
  maxLand: number;
  documents: string[];
}

export type CropType = 'potato' | 'onion' | 'tomato' | 'wheat';

export interface ChecklistItemProps {
  item: string;
  index: number;
  stepId: string;
  isCompleted: boolean;
  onToggle: (stepId: string, itemIndex: number) => void;
}

export interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  isVisible: boolean;
}