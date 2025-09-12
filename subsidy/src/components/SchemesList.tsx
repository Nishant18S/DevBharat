import React, { useState } from 'react';
import { Award, DollarSign, FileText, CheckCircle } from 'lucide-react';
import type { FarmerData } from '../types';
import { subsidySchemes } from '../data/subsidySchemes';

interface SchemesListProps {
  farmerData: FarmerData;
}

export const SchemesList: React.FC<SchemesListProps> = ({ farmerData }) => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);

  const eligibleSchemes = subsidySchemes.filter(scheme => 
    farmerData.landArea >= scheme.minLand && farmerData.landArea <= scheme.maxLand
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Celebration Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white rounded-xl text-center">
        <div className="flex items-center justify-center mb-3">
          <Award className="h-12 w-12 mr-3" />
          <h2 className="text-3xl font-bold">🎉 Congratulations!</h2>
        </div>
        <p className="text-lg opacity-90">
          You have successfully completed all farming steps and are now eligible for subsidies!
        </p>
      </div>

      {/* Section Header */}
      <div className="flex items-center mb-8">
        <DollarSign className="h-8 w-8 text-emerald-600 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Subsidy Schemes</h2>
          <p className="text-gray-600 mt-1">
            Based on your profile and completed training, you are eligible for the following schemes:
          </p>
        </div>
      </div>

      {eligibleSchemes.length > 0 ? (
        <div className="space-y-6">
          {eligibleSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedScheme === scheme.id
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
              onClick={() => setSelectedScheme(scheme.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedScheme === scheme.id ? 'bg-emerald-600' : 'bg-emerald-100'
                  }`}>
                    <Award className={`h-6 w-6 ${
                      selectedScheme === scheme.id ? 'text-white' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {scheme.type}
                      </span>
                      <span>{scheme.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {scheme.amount}
                  </div>
                  <div className="text-sm text-gray-600">Annual Subsidy</div>
                  {selectedScheme === scheme.id && (
                    <div className="mt-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      SELECTED
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Comprehensive Benefits Package:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {scheme.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Required Documents:</span>
                </div>
                <div className="text-sm text-blue-700">
                  {scheme.documents.join(' • ')}
                </div>
              </div>

              {selectedScheme === scheme.id && (
                <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 rounded-lg">
                  <p className="text-emerald-800 font-medium text-center">
                    ✅ You have selected this scheme. Your application will be processed with this subsidy program.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-yellow-50 rounded-xl border border-yellow-200">
          <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-800 mb-2">No Eligible Schemes Currently Available</h3>
          <p className="text-yellow-700">
            Complete your profile and training modules to unlock government subsidies.
          </p>
        </div>
      )}

      {/* Digital Verification Section */}
      <div className="mt-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔐 Digital Verification</h3>
        <div className="bg-emerald-600 text-white px-6 py-2 rounded-full inline-block font-semibold mb-3">
          HacknoTricks Verified Certificate
        </div>
        <p className="text-gray-600">
          Your training completion has been digitally verified and secured with blockchain technology.
        </p>
      </div>
    </div>
  );
};