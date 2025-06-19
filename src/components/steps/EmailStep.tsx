import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, onEmailChange, onNext }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    if (!email) {
      setError('El correo electrónico es requerido');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }
    
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      setError('');
      onNext();
    }, 1000);
  };

  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    if (touched) {
      if (!value) {
        setError('El correo electrónico es requerido');
      } else if (!validateEmail(value)) {
        setError('Ingrese un correo electrónico válido');
      } else {
        setError('');
      }
    }
  };

  const isValid = email && validateEmail(email) && !error;

  // Extract SVG background to avoid JSX parsing issues
  const svgBackground = "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: svgBackground }}
          ></div>
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verificación de Identidad</h2>
            <p className="text-blue-100 text-sm">
              Ingrese su correo electrónico para recibir notificaciones oficiales
            </p>
          </div>
        </div>

        {/* Form section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                Correo Electrónico Oficial
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={() => setTouched(true)}
                  className={`
                    w-full pl-12 pr-12 py-4 text-lg border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm
                    ${error 
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                      : isValid
                        ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    }
                    focus:ring-4 focus:outline-none
                  `}
                  placeholder="ejemplo@correo.com"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  {isValid && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {error && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              {error && (
                <div className="mt-3 flex items-center gap-2 text-red-600 animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
            </div>

            {/* Security notice */}
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">
                    Seguridad y Privacidad
                  </h4>
                  <p className="text-blue-800 text-xs leading-relaxed">
                    Su correo electrónico será utilizado únicamente para notificaciones oficiales 
                    del trámite. Los datos están protegidos según la normativa vigente.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || isValidating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Validando...
                </>
              ) : (
                <>
                  Continuar con la Solicitud
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Al continuar, acepta los términos y condiciones del sistema de Mesa de Entrada Digital
        </p>
      </div>
    </div>
  );
};