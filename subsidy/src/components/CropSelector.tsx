import React from 'react';
import { Sprout } from 'lucide-react';
import type { CropType } from '../types';

interface CropSelectorProps {
  selectedCrop: CropType | null;
  onCropSelect: (crop: CropType) => void;
}

const crops = [
  { id: 'potato', name: 'Potato', icon: '🥔', cycle: '90-day cycle' },
  { id: 'onion', name: 'Onion', icon: '🧅', cycle: '120-day cycle' },
  { id: 'tomato', name: 'Tomato', icon: '🍅', cycle: '100-day cycle' },
  { id: 'wheat', name: 'Wheat', icon: '🌾', cycle: '150-day cycle' }
];

export const CropSelector: React.FC<CropSelectorProps> = ({ selectedCrop, onCropSelect }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Sprout className="h-6 w-6 text-emerald-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-800">Select Your Crop</h3>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onCropSelect(crop.id as CropType)}
            className={`p-6 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
              selectedCrop === crop.id
                ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">{crop.icon}</div>
            <h4 className="font-semibold text-gray-800 mb-2">{crop.name}</h4>
            <p className="text-sm text-gray-600">{crop.cycle}</p>
            {selectedCrop === crop.id && (
              <div className="mt-3 flex items-center justify-center">
                <div className="bg-emerald-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedCrop && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-emerald-800 font-medium">
            ✅ Selected: {crops.find(c => c.id === selectedCrop)?.name}
          </p>
          <p className="text-emerald-700 text-sm mt-1">
            Training program will be customized for {selectedCrop} cultivation.
          </p>
        </div>
      )}
    </div>
  );
};