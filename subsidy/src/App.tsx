import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FarmerProfile } from './components/FarmerProfile';
import { TrainingDashboard } from './components/TrainingDashboard';
import { SchemesList } from './components/SchemesList';
import { CertificateGenerator } from './components/CertificateGenerator';
import { ProgressTracker } from './components/ProgressTracker';
import VoiceAssistant from './components/VoiceAssistant';
import { cropSteps } from './data/cropSteps';
import type { FarmerData, CompletedStep, CropType } from './types';

function App() {
  const [farmerData, setFarmerData] = useState<FarmerData>({
    name: '',
    aadhaar: '',
    mobile: '',
    landArea: 0,
    location: '',
    bankAccount: '',
    selectedCrop: null,
    profilePhoto: null
  });

  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<Record<string, {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }>>({});

  // Populate farmer data from URL parameters on component mount
  useEffect(() => {
    console.log('Subsidy App: Checking for farmer data in URL parameters...');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('name');
    const aadhaarFromUrl = urlParams.get('aadhaar');
    const landAreaFromUrl = urlParams.get('landArea');
    const cropTypeFromUrl = urlParams.get('cropType');
    
    console.log('URL parameters found:', {
      name: nameFromUrl,
      aadhaar: aadhaarFromUrl,
      landArea: landAreaFromUrl,
      cropType: cropTypeFromUrl
    });
    
    if (nameFromUrl || aadhaarFromUrl) {
      // Decode and use URL parameters
      const mappedData: Partial<FarmerData> = {
        name: nameFromUrl ? decodeURIComponent(nameFromUrl) : '',
        aadhaar: aadhaarFromUrl ? decodeURIComponent(aadhaarFromUrl) : '',
        landArea: landAreaFromUrl ? parseFloat(decodeURIComponent(landAreaFromUrl)) : 0,
        selectedCrop: cropTypeFromUrl ? decodeURIComponent(cropTypeFromUrl) : null,
        mobile: '', // Will be filled by user
        location: '', // Will be filled by user  
        bankAccount: '', // Will be filled by user
        profilePhoto: null
      };
      
      console.log('Setting farmer data from URL:', mappedData);
      setFarmerData(prev => ({ ...prev, ...mappedData }));
      
      // Store in sessionStorage for consistency
      if (nameFromUrl) {
        sessionStorage.setItem('farmerName', decodeURIComponent(nameFromUrl));
      }
      if (aadhaarFromUrl) {
        sessionStorage.setItem('aadhaars', decodeURIComponent(aadhaarFromUrl));
      }
    } else {
      // Fallback to sessionStorage if no URL parameters
      const savedName = sessionStorage.getItem('farmerName');
      const savedAadhaar = sessionStorage.getItem('aadhaars');
      
      console.log('Using fallback sessionStorage data:', { savedName, savedAadhaar });
      
      if (savedName || savedAadhaar) {
        setFarmerData(prev => ({
          ...prev,
          name: savedName || '',
          aadhaar: savedAadhaar || ''
        }));
      }
    }
  }, []);

  const updateFarmerData = (data: Partial<FarmerData>) => {
    setFarmerData(prev => ({ ...prev, ...data }));
  };

  const completeStep = (stepId: string, imageData?: {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }) => {
    const newCompletedStep: CompletedStep = {
      id: stepId,
      completedAt: new Date(),
      imageProof: imageData
    };

    setCompletedSteps(prev => [...prev, newCompletedStep]);
    
    if (imageData) {
      setUploadedImages(prev => ({
        ...prev,
        [stepId]: imageData
      }));
    }

    // Move to next step
    if (farmerData.selectedCrop && farmerData.selectedCrop in cropSteps) {
      const selectedCrop = farmerData.selectedCrop as CropType;
      const totalSteps = cropSteps[selectedCrop].length;
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
    }
  };

  const getCurrentSteps = () => {
    if (!farmerData.selectedCrop || !(farmerData.selectedCrop in cropSteps)) {
      return [];
    }
    const selectedCrop = farmerData.selectedCrop as CropType;
    return cropSteps[selectedCrop];
  };

  const getCompletionPercentage = () => {
    const totalSteps = getCurrentSteps().length;
    if (totalSteps === 0) return 0;
    return Math.round((completedSteps.length / totalSteps) * 100);
  };

  const isTrainingComplete = () => {
    const totalSteps = getCurrentSteps().length;
    return completedSteps.length === totalSteps && totalSteps > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <FarmerProfile 
          farmerData={farmerData}
          onUpdateData={updateFarmerData}
        />

        {farmerData.selectedCrop && (
          <>
            <ProgressTracker
              completedSteps={completedSteps.length}
              totalSteps={getCurrentSteps().length}
              percentage={getCompletionPercentage()}
            />

            <TrainingDashboard
              steps={getCurrentSteps()}
              completedSteps={completedSteps}
              currentStepIndex={currentStepIndex}
              onCompleteStep={completeStep}
              farmerData={farmerData}
            />
          </>
        )}

        {isTrainingComplete() && (
          <>
            <SchemesList 
              farmerData={farmerData}
            />
            
            <CertificateGenerator
              farmerData={farmerData}
              completedSteps={completedSteps}
              uploadedImages={uploadedImages}
              selectedCrop={farmerData.selectedCrop}
            />
          </>
        )}
      </main>

      {/* Back to Dashboard Button */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={() => {
            console.log('Navigating back to dashboard...');
            // Simple same-page navigation to preserve sessionStorage
            window.location.href = 'http://localhost:5173';
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {/* Voice Assistant - Always visible at bottom right */}
      <VoiceAssistant />
    </div>
  );
}

export default App;