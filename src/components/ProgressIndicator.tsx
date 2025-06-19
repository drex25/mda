import React from 'react';
import { Check } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const steps = [
  { key: 'email' as Step, label: 'Correo Electrónico', shortLabel: 'Email', number: 1 },
  { key: 'request' as Step, label: 'Completar Solicitud', shortLabel: 'Solicitud', number: 2 },
  { key: 'preview' as Step, label: 'Previsualización', shortLabel: 'Vista Previa', number: 3 },
  { key: 'send' as Step, label: 'Envío', shortLabel: 'Envío', number: 4 }
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);
  const currentIndex = getCurrentStepIndex();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
      {/* Desktop version */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <React.Fragment key={step.key}>
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                    {step.label}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-all duration-300
                  ${index < currentIndex ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <p className={`text-xs font-medium mt-1 text-center ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                  {step.shortLabel}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className={`
                flex-1 h-1 transition-all duration-300
                ${index < currentIndex ? 'bg-green-500' : 'bg-gray-200'}
              `} />
              {index < steps.length - 1 && (
                <div className="w-2 h-1 bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};