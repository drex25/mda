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

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Paso {currentIndex + 1} de {steps.length}
            </h3>
            <p className="text-sm text-gray-600">
              {steps[currentIndex]?.label}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(((currentIndex + 1) / steps.length) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Completado</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mb-8">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            >
              <div className="h-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;
            
            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center relative z-10">
                  {/* Step circle */}
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/30' 
                      : isCurrent 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400 shadow-lg shadow-blue-500/30 scale-110' 
                        : 'bg-white border-gray-300 shadow-sm'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                    )}
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20"></div>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className="mt-3 text-center">
                    <div className={`text-xs font-medium ${
                      isCurrent ? 'text-blue-700' : 
                      isCompleted ? 'text-green-700' : 
                      'text-gray-500'
                    }`}>
                      {step.shortLabel}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {step.number}
                    </div>
                  </div>
                </div>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center px-4">
                    <div className="h-0.5 w-full bg-gray-200 relative">
                      <div
                        className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ${
                          currentIndex > index ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};