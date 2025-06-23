import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { ProgressIndicator } from './ProgressIndicator';
import { EmailStep } from './steps/EmailStep';
import { RequestStep } from './steps/RequestStep';
import { PreviewStep } from './steps/PreviewStep';
import { SendStep } from './steps/SendStep';
import { Toast } from './Toast';
import { useFormData } from '../hooks/useFormData';
import { useToast } from '../hooks/useToast';

interface UserAppProps {
  onBackToLanding: () => void;
}

export const UserApp: React.FC<UserAppProps> = ({ onBackToLanding }) => {
  const {
    currentStep,
    formData,
    updateEmail,
    updateRequestType,
    updateDescription,
    updateFiles,
    nextStep,
    previousStep
  } = useFormData();

  const { toasts, removeToast } = useToast();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <EmailStep
            email={formData.email}
            onEmailChange={updateEmail}
            onNext={nextStep}
          />
        );
      case 'request':
        return (
          <RequestStep
            requestType={formData.requestType}
            description={formData.description}
            files={formData.files}
            onRequestTypeChange={updateRequestType}
            onDescriptionChange={updateDescription}
            onFilesChange={updateFiles}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 'preview':
        return (
          <PreviewStep
            email={formData.email}
            requestType={formData.requestType}
            description={formData.description}
            files={formData.files}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 'send':
        return (
          <SendStep
            onPrevious={previousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Back to landing button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl border border-white/20 text-gray-700 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver al Inicio</span>
        </button>
      </div>

      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressIndicator currentStep={currentStep} />
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-xl border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Seguro y Confiable</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 Agencia Tributaria Misiones - Mesa de Entrada Digital
            </p>
            <p className="text-xs text-gray-500">
              Plataforma oficial para la gestión de trámites gubernamentales
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400 pt-2">
              <span>Términos y Condiciones</span>
              <span>•</span>
              <span>Política de Privacidad</span>
              <span>•</span>
              <span>Ayuda</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </div>
  );
};