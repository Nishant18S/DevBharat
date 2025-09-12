import React, { useState } from 'react';
import { MapPin, Loader } from 'lucide-react';

interface LocationPickerProps {
  value: string;
  onChange: (location: string) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationData = await getAddressFromCoords(latitude, longitude);
          onChange(locationData);
          setIsLoading(false);
        } catch {
          alert('Could not determine address');
          setIsLoading(false);
        }
      },
      (error) => {
        const errorMessages: Record<number, string> = {
          1: 'Location access was denied',
          2: 'Location information unavailable',
          3: 'Location request timed out'
        };
        alert(errorMessages[error.code] || 'Error getting location');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const address = data.address;
    const village = address.village || address.hamlet || address.town || address.city_district || '';
    const district = address.county || '';
    const state = address.state || '';

    return `${village}, ${district}, ${state}`.replace(/, ,/g, ',').replace(/^, |, $/g, '');
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          placeholder="Village, District, State"
        />
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          <span className="hidden sm:inline">{isLoading ? 'Detecting...' : 'Get Location'}</span>
        </button>
      </div>
    </div>
  );
};