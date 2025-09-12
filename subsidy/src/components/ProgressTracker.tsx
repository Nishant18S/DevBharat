import React from 'react';
import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface ProgressTrackerProps {
  completedSteps: number;
  totalSteps: number;
  percentage: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedSteps,
  totalSteps,
  percentage
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-800">Training Progress</h2>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-600">{percentage}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{completedSteps} of {totalSteps} steps completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <CheckCircle className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-emerald-600">{completedSteps}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{totalSteps - completedSteps}</div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <TrendingUp className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">{totalSteps}</div>
          <div className="text-sm text-gray-600">Total Steps</div>
        </div>
      </div>

      {completedSteps === totalSteps && totalSteps > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-center">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          <h3 className="text-lg font-bold">🎉 Congratulations!</h3>
          <p className="text-sm opacity-90">You have successfully completed all training modules!</p>
        </div>
      )}
    </div>
  );
};