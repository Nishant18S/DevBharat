import React, { useState, useEffect, useCallback } from 'react';
import { User, MapPin, Phone, CreditCard, Camera, Sprout } from 'lucide-react';
import type { FarmerData, CropType } from '../types';
import { LocationPicker } from './LocationPicker';
import { CropSelector } from './CropSelector';

interface FarmerProfileProps {
  farmerData: FarmerData;
  onUpdateData: (data: Partial<FarmerData>) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({
  farmerData,
  onUpdateData
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Function to populate form fields from sessionStorage
  const populateFarmerData = useCallback(() => {
    // Get values from sessionStorage
    const farmerName = sessionStorage.getItem('farmerName');
    const aadhaar = sessionStorage.getItem('aadhaars'); // Note: matches your key 'aadhaars'
    
    // Set the values in the form by updating the parent component's data
    if (farmerName) {
      onUpdateData({ name: farmerName });
    }
    if (aadhaar) {
      onUpdateData({ aadhaar: aadhaar });
    }
  }, [onUpdateData]);

  // Call populateFarmerData when component mounts
  useEffect(() => {
    populateFarmerData();
  }, [populateFarmerData]);

  const handleInputChange = (field: keyof FarmerData, value: string | number | null) => {
    onUpdateData({ [field]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Profile photo size too large. Please upload an image smaller than 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        handleInputChange('profilePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSelection = (crop: CropType) => {
    handleInputChange('selectedCrop', crop);
  };

  // Check if fields should be read-only
  const isNameReadOnly = !!sessionStorage.getItem('farmerName');
  const isAadhaarReadOnly = !!sessionStorage.getItem('aadhaars');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <User className="h-8 w-8 text-emerald-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Farmer Profile</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-emerald-500 overflow-hidden bg-gray-100 shadow-lg">
              {photoPreview || farmerData.profilePhoto ? (
                <img 
                  src={photoPreview || farmerData.profilePhoto || ''} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="h-16 w-16" />
                </div>
              )}
            </div>
            <button 
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Upload your profile photo<br />
            <span className="text-xs">(Max 2MB)</span>
          </p>
        </div>

        {/* Personal Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 mr-2 text-emerald-600" />
                Full Name
              </label>
              <input
                type="text"
                value={farmerData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                readOnly={isNameReadOnly}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  isNameReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <CreditCard className="h-4 w-4 mr-2 text-emerald-600" />
                Aadhaar Number
              </label>
              <input
                type="text"
                value={farmerData.aadhaar}
                onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                readOnly={isAadhaarReadOnly}
                maxLength={12}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  isAadhaarReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
                placeholder="Enter 12-digit Aadhaar number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                Mobile Number
              </label>
              <input
                type="tel"
                value={farmerData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Sprout className="h-4 w-4 mr-2 text-emerald-600" />
                Land Area (Acres)
              </label>
              <input
                type="number"
                value={farmerData.landArea || ''}
                onChange={(e) => handleInputChange('landArea', parseFloat(e.target.value) || 0)}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter land area"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                Location
              </label>
              <LocationPicker
                value={farmerData.location}
                onChange={(location) => handleInputChange('location', location)}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <CreditCard className="h-4 w-4 mr-2 text-emerald-600" />
                Bank Account Number
              </label>
              <input
                type="text"
                value={farmerData.bankAccount}
                onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter bank account number"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Crop Selection */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <CropSelector
          selectedCrop={farmerData.selectedCrop as CropType}
          onCropSelect={handleCropSelection}
        />
      </div>
    </div>
  );
};