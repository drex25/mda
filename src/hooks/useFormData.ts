import { useState } from 'react';
import { FormData, Step } from '../types';

export const useFormData = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    requestType: '',
    description: '',
    files: []
  });

  const updateEmail = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
  };

  const updateRequestType = (requestType: string) => {
    setFormData(prev => ({ ...prev, requestType }));
  };

  const updateDescription = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const updateFiles = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const nextStep = () => {
    const steps: Step[] = ['email', 'request', 'preview', 'send'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const steps: Step[] = ['email', 'request', 'preview', 'send'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return {
    currentStep,
    formData,
    updateEmail,
    updateRequestType,
    updateDescription,
    updateFiles,
    nextStep,
    previousStep
  };
};