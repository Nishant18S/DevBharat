import React, { useState } from 'react';
import { CropStep } from '../types';
import { CheckSquare, Square, Play, Upload, CheckCircle, Clock, Camera } from 'lucide-react';

interface TrainingStepProps {
  step: CropStep;
  index: number;
  status: 'completed' | 'current' | 'available' | 'locked';
  checklistState: Record<number, boolean>;
  uploadedImage?: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  };
  canComplete: boolean;
  onChecklistChange: (stepId: string, itemIndex: number, checked: boolean) => void;
  onImageUpload: (stepId: string, imageData: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }) => void;
  onComplete: (stepId: string, imageData?: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }) => void;
}

export const TrainingStep: React.FC<TrainingStepProps> = ({
  step,
  index,
  status,
  checklistState,
  uploadedImage,
  canComplete,
  onChecklistChange,
  onImageUpload,
  onComplete
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChecklistToggle = (itemIndex: number) => {
    if (status === 'completed') return;
    
    const newValue = !checklistState[itemIndex];
    onChecklistChange(step.id, itemIndex, newValue);

    // Show video when first checklist item is completed
    if (!showVideo && Object.values(checklistState).some(Boolean)) {
      setShowVideo(true);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size too large. Please upload an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const imageData = {
          src: result,
          filename: file.name,
          timestamp: new Date(),
          stepTitle: step.title,
          fileSize: file.size
        };
        
        setImagePreview(result);
        onImageUpload(step.id, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (canComplete) {
      onComplete(step.id, uploadedImage);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'border-emerald-500 bg-emerald-50';
      case 'current': return 'border-blue-500 bg-blue-50';
      case 'available': return 'border-yellow-500 bg-yellow-50';
      case 'locked': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-6 w-6 text-emerald-600" />;
      case 'current': return <Clock className="h-6 w-6 text-blue-600" />;
      default: return <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold">{index + 1}</div>;
    }
  };

  if (status === 'locked') {
    return (
      <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 opacity-60">
        <div className="flex items-center space-x-3 mb-4">
          {getStatusIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-600">{step.title}</h3>
            <p className="text-sm text-gray-500">Complete previous steps to unlock</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-2 rounded-xl ${getStatusColor()} transition-all duration-300 ${
      status === 'current' ? 'shadow-lg' : 'shadow-sm'
    }`}>
      {/* Step Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {step.days} days
                </span>
                <span className="flex items-center">
                  <i className={step.icon}></i>
                  <span className="ml-1">Step {index + 1}</span>
                </span>
              </div>
            </div>
          </div>
          
          {status !== 'completed' && (
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              status === 'current' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status === 'current' ? 'In Progress' : `${step.days} days remaining`}
            </div>
          )}

          {status === 'completed' && (
            <div className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
              ✓ Completed Successfully
            </div>
          )}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {/* Professional Overview */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <h4 className="text-blue-800 font-semibold mb-2 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Professional Overview
          </h4>
          <p className="text-blue-700 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Two Column Layout: Checklist Left, Video Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Checklist */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CheckSquare className="h-5 w-5 mr-2 text-emerald-600" />
              Training Checklist
            </h4>
            
            <div className="space-y-3">
              {step.checklist.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    checklistState[itemIndex] 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <button
                    onClick={() => handleChecklistToggle(itemIndex)}
                    disabled={status === 'completed'}
                    className={`flex-shrink-0 mt-0.5 transition-colors ${
                      status === 'completed' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                    }`}
                  >
                    {checklistState[itemIndex] ? (
                      <CheckSquare className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                    )}
                  </button>
                  <label className={`text-sm leading-relaxed cursor-pointer ${
                    checklistState[itemIndex] ? 'text-emerald-800 font-medium' : 'text-gray-700'
                  }`}>
                    {item}
                  </label>
                </div>
              ))}
            </div>

            {/* Detailed Steps */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">Detailed Implementation Steps:</h5>
              <ul className="space-y-2">
                {step.detailedSteps.map((detailStep, idx) => (
                  <li key={idx} className="text-sm text-gray-600 pl-4 relative">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {detailStep}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Video */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Play className="h-5 w-5 mr-2 text-red-600" />
              Professional Training Video
            </h4>
            
            {showVideo || Object.values(checklistState).some(Boolean) ? (
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-800 text-white px-4 py-3 text-center">
                  <p className="text-sm">Learn best practices from agricultural experts</p>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={step.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={`Training Video - ${step.title}`}
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Complete first checklist item to unlock video</p>
                  <p className="text-gray-500 text-sm mt-1">Training video will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Proof Upload Section */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Camera className="h-5 w-5 mr-2 text-blue-600" />
            Proof Documentation
          </h4>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              imagePreview || uploadedImage
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50'
            }`}
            onClick={() => status !== 'completed' && document.getElementById(`file-${step.id}`)?.click()}
          >
            {imagePreview || uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={imagePreview || uploadedImage?.src}
                  alt="Proof"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                />
                <div className="bg-emerald-100 text-emerald-800 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Proof Documentation Uploaded Successfully!</span>
                  </div>
                  <p className="text-sm">
                    File: {uploadedImage?.filename || 'uploaded-image.jpg'} 
                    ({uploadedImage ? (uploadedImage.fileSize / (1024 * 1024)).toFixed(2) : '0'} MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-semibold text-gray-700">📸 Upload Proof Documentation</p>
                  <p className="text-sm text-gray-500 mt-1">Required: {step.proofRequired}</p>
                  <p className="text-xs text-gray-400 mt-2">Click to upload image (Max 5MB)</p>
                </div>
              </div>
            )}
            
            <input
              id={`file-${step.id}`}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={status === 'completed'}
            />
          </div>
        </div>

        {/* Complete Step Button */}
        {status !== 'completed' && (
          <div className="mt-8 text-center">
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                canComplete
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canComplete ? (
                <>
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  Complete Step {index + 1} - {step.title}
                </>
              ) : (
                <>
                  Complete all checklist items and upload proof to continue
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};