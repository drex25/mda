import React from 'react';
import { Header } from './components/Header';
import { ProgressIndicator } from './components/ProgressIndicator';
import { EmailStep } from './components/steps/EmailStep';
import { RequestStep } from './components/steps/RequestStep';
import { PreviewStep } from './components/steps/PreviewStep';
import { SendStep } from './components/steps/SendStep';
import { Toast } from './components/Toast';
import { useFormData } from './hooks/useFormData';
import { useToast } from './hooks/useToast';

function App() {
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
}

export default App;