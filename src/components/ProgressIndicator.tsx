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
  const progressPercentage = (currentIndex / (steps.length - 1)) * 100;

  return (
    <div className="mb-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
        {/* Compact progress header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Paso {currentIndex + 1} de {steps.length}
            </h3>
            <p className="text-gray-600 text-sm">
              {steps[currentIndex]?.label}
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)', WebkitBackgroundClip: 'text' }}
            >
              {Math.round(((currentIndex + 1) / steps.length) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Completado</div>
          </div>
        </div>

        {/* Steps container with integrated progress */}
        <div className="relative">
          {/* Steps */}
          <div className="flex items-center justify-between relative z-10">
            {steps.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;
              
              return (
                <div key={step.key} className="flex flex-col items-center">
                  {/* Step circle */}
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                    ${isCompleted 
                      ? 'border-transparent shadow-xl' 
                      : isCurrent 
                        ? 'border-2 shadow-xl scale-110' 
                        : 'bg-white border-gray-300 shadow-md'
                    }
                  `}
                  style={
                    isCompleted ? {
                      background: 'linear-gradient(90deg, #50376F 0%, #007CB6 100%)',
                      boxShadow: '0 10px 25px -5px rgba(80, 55, 111, 0.4), 0 4px 6px -2px rgba(0, 124, 182, 0.3)'
                    } : isCurrent ? {
                      background: 'linear-gradient(135deg, #023F5E 0%, #612247 100%)',
                      borderColor: '#023F5E',
                      boxShadow: '0 10px 25px -5px rgba(2, 63, 94, 0.3), 0 4px 6px -2px rgba(97, 34, 71, 0.2)'
                    } : {}
                  }
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white drop-shadow-sm" />
                    ) : (
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${
                        isCurrent ? 'text-white drop-shadow-sm' : 'text-gray-400'
                      }`} />
                    )}
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ background: 'linear-gradient(135deg, #023F5E 0%, #612247 100%)' }}
                      ></div>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className="mt-3 text-center">
                    <div className={`text-xs font-semibold transition-colors duration-300 ${
                      isCurrent ? 'text-[#023F5E]' : 
                      isCompleted ? 'text-[#50376F]' : 
                      'text-gray-500'
                    }`}>
                      {step.shortLabel}
                    </div>
                    <div className={`text-xs mt-0.5 transition-colors duration-300 ${
                      isCurrent ? 'text-[#612247]' : 
                      isCompleted ? 'text-[#007CB6]' : 
                      'text-gray-400'
                    }`}>
                      {step.number}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress line positioned behind circles */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ 
                width: `${progressPercentage}%`,
                background: currentIndex > 0 
                  ? 'linear-gradient(90deg, #50376F 0%, #007CB6 100%)'
                  : 'linear-gradient(90deg, #023F5E 0%, #612247 100%)'
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};