import React, { useState } from "react";
import { CropStep, CompletedStep, FarmerData } from "../types";
import { TrainingStep } from "./TrainingStep";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface TrainingDashboardProps {
  steps: CropStep[];
  completedSteps: CompletedStep[];
  currentStepIndex: number;
  onCompleteStep: (stepId: string, imageData?: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }) => void;
  farmerData: FarmerData;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({
  steps,
  completedSteps,
  currentStepIndex,
  onCompleteStep,
  farmerData,
}) => {
  const [checklistStates, setChecklistStates] = useState<
    Record<string, boolean[]>
  >({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }>>({});

  const handleChecklistChange = (
    stepId: string,
    itemIndex: number,
    checked: boolean
  ) => {
    setChecklistStates((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [itemIndex]: checked,
      },
    }));
  };

  const handleImageUpload = (stepId: string, imageData: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }) => {
    setUploadedImages((prev) => ({
      ...prev,
      [stepId]: imageData,
    }));
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.some((step) => step.id === stepId);
  };

  const canCompleteStep = (stepId: string) => {
    const checklistState = checklistStates[stepId] || {};
    const step = steps.find((s) => s.id === stepId);
    if (!step) return false;

    const allChecklistCompleted = step.checklist.every(
      (_, index) => checklistState[index]
    );
    const hasImage = uploadedImages[stepId];

    return allChecklistCompleted && hasImage;
  };

  const getStepStatus = (index: number, stepId: string) => {
    if (isStepCompleted(stepId)) return "completed";
    if (index === currentStepIndex) return "current";
    if (index < currentStepIndex) return "available";
    return "locked";
  };

  // Calculate timeline
  const totalDays = steps.reduce((sum, step) => sum + step.days, 0);
  const completedDays = steps
    .filter((step) => isStepCompleted(step.id))
    .reduce((sum, step) => sum + step.days, 0);

  // Get only the current step to display
  const currentStep = steps[currentStepIndex];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Training Program:{" "}
              {farmerData.selectedCrop?.charAt(0).toUpperCase()}
              {farmerData.selectedCrop?.slice(1)}
            </h2>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">
                {completedDays}/{totalDays} Days
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold">
                {completedSteps.length}/{steps.length} Steps
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-emerald-600" />
            Comprehensive Farming Timeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index, step.id);
              const startDay =
                steps.slice(0, index).reduce((sum, s) => sum + s.days, 0) + 1;
              const endDay = startDay + step.days - 1;

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    status === "completed"
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : status === "current"
                      ? "bg-blue-100 border-blue-300 text-blue-800"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    Step {index + 1}
                  </div>
                  <div className="text-sm font-medium mb-1">{step.title}</div>
                  <div className="text-xs">
                    Days {startDay}-{endDay}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Training Steps */}
      {/* Training Steps - Show only current step */}
      <div className="space-y-6">
        {currentStep && (
          <TrainingStep
            key={currentStep.id}
            step={currentStep}
            index={currentStepIndex}
            status={getStepStatus(currentStepIndex, currentStep.id)}
            checklistState={checklistStates[currentStep.id] || {}}
            uploadedImage={uploadedImages[currentStep.id]}
            canComplete={canCompleteStep(currentStep.id)}
            onChecklistChange={handleChecklistChange}
            onImageUpload={handleImageUpload}
            onComplete={(stepId, imageData) =>
              onCompleteStep(stepId, imageData)
            }
          />
        )}
      </div>
    </div>
  );
};
