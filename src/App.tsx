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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <ProgressIndicator currentStep={currentStep} />
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-xs sm:text-sm">
              © 2025 Agencia tributaria misiones - Mesa de Entrada Digital
            </p>
            <p className="text-xs mt-2">
              Sistema seguro de gestión de trámites gubernamentales
            </p>
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