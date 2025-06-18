import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, onEmailChange, onNext }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    
    setError('');
    onNext();
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

  return (
    <div className="bg-white/80 rounded-2xl shadow-lg border border-blue-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold font-roboto text-gray-900 mb-2 tracking-tight">
            Ingreso de Correo Electrónico
          </h2>
          <p className="text-gray-600 leading-relaxed font-roboto">
            Ingrese su correo electrónico donde recibirá las novedades del trámite y 
            confirmaciones del sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => setTouched(true)}
                className={`
                  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                  ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                `}
                placeholder="ejemplo@correo.com"
              />
              {error && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Importante:</strong> Verificará que pueda acceder a este correo electrónico, 
              ya que recibirá notificaciones importantes sobre el estado de su trámite.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group"
          >
            Continuar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};