import React from 'react';
import { Check, Mail, FileText, Eye, Send } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const steps = [
  { key: 'email' as Step, shortLabel: 'Email', number: 1, icon: Mail },
  { key: 'request' as Step, shortLabel: 'Solicitud', number: 2, icon: FileText },
  { key: 'preview' as Step, shortLabel: 'Vista Previa', number: 3, icon: Eye },
  { key: 'send' as Step, shortLabel: 'Envío', number: 4, icon: Send }
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="mb-4">
      <div className="bg-white rounded-xl px-6 pt-4 pb-2 shadow border border-slate-100 flex flex-col items-stretch min-h-[70px]">
        {/* Stepper */}
        <div className="flex items-center justify-between relative w-full">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;
            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center min-w-[60px] z-10">
                  <div className={`
                    flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300
                    ${isCompleted ? 'bg-emerald-500 border-emerald-500' : isCurrent ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 shadow-md scale-110' : 'bg-white border-slate-300'}
                  `}>
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                    )}
                  </div>
                  <span className={`mt-1 text-xs font-medium ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>{step.shortLabel}</span>
                </div>
                {/* Connecting line except last */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center">
                    <div className="h-1 w-full bg-slate-200 relative -ml-1 -mr-1">
                      <div
                        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: currentIndex > index ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {/* Step indicator below, right aligned */}
        <div className="flex justify-end mt-1">
          <span className="text-xs font-semibold text-slate-500">{currentIndex + 1}/{steps.length}</span>
        </div>
      </div>
    </div>
  );
};