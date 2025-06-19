import React from 'react';
import { Check, Mail, FileText, Eye, Send } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const steps = [
  { key: 'email' as Step, label: 'Verificación', shortLabel: 'Email', number: 1, icon: Mail },
  { key: 'request' as Step, label: 'Solicitud', shortLabel: 'Datos', number: 2, icon: FileText },
  { key: 'preview' as Step, label: 'Revisión', shortLabel: 'Preview', number: 3, icon: Eye },
  { key: 'send' as Step, label: 'Envío', shortLabel: 'Envío', number: 4, icon: Send }
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStep);
  const progressPercentage = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Paso {currentIndex + 1} de {steps.length}
            </h3>
            <p className="text-gray-600 mt-1">
              {steps[currentIndex]?.label}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-500">Completado</div>
          </div>
        </div>

        {/* Modern progress track */}
        <div className="relative">
          {/* Background track */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Steps container */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;
              
              return (
                <div key={step.key} className="flex flex-col items-center relative">
                  {/* Step circle */}
                  <div className={`
                    relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all duration-500 z-10
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/25' 
                      : isCurrent 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 shadow-xl shadow-blue-500/30 scale-110' 
                        : 'bg-white border-gray-300 shadow-md hover:shadow-lg hover:scale-105'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white drop-shadow-sm" />
                    ) : (
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${
                        isCurrent ? 'text-white drop-shadow-sm' : 'text-gray-400'
                      }`} />
                    )}
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-ping opacity-20"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse opacity-30"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className="mt-4 text-center">
                    <div className={`text-sm font-semibold transition-colors duration-300 ${
                      isCurrent ? 'text-blue-700' : 
                      isCompleted ? 'text-green-700' : 
                      'text-gray-500'
                    }`}>
                      {step.shortLabel}
                    </div>
                    <div className={`text-xs mt-1 transition-colors duration-300 ${
                      isCurrent ? 'text-blue-500' : 
                      isCompleted ? 'text-green-500' : 
                      'text-gray-400'
                    }`}>
                      Paso {step.number}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};