import React, { useState } from 'react';
import { Shield, User, Lock, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
  const [cuit, setCuit] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(cuit, password);
      if (!success) {
        setError('Credenciales incorrectas. Verifique su CUIT y contraseña.');
      }
    } catch (err) {
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCuit = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}-${numbers.slice(10, 11)}`;
  };

  const handleCuitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCuit(e.target.value);
    setCuit(formatted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-xl">
            <img 
              src="/src/assets/logo-atm.png" 
              alt="ATM Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Intranet ATM
          </h1>
          <p className="text-gray-600">
            Mesa de Entrada Digital - Back Office
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Card Header */}
          <div 
            className="p-6 text-white text-center"
            style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Acceso Seguro</h2>
            <p className="text-cyan-100 text-sm">Sistema de gestión interna</p>
          </div>

          {/* Login Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cuit" className="block text-sm font-semibold text-gray-700 mb-2">
                  CUIT o Usuario Interno
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="cuit"
                    value={cuit}
                    onChange={handleCuitChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#023F5E] focus:ring-4 focus:ring-[#023F5E]/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="20-12345678-9"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#023F5E] focus:ring-4 focus:ring-[#023F5E]/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                style={{ 
                  background: isLoading 
                    ? 'linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)' 
                    : 'linear-gradient(90deg, #023F5E 0%, #612247 100%)'
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    Ingresar
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Credenciales de prueba:</h4>
              <div className="text-xs text-blue-800 space-y-1">
                <p><strong>Mesa de Ayuda:</strong> 20-12345678-9 / 123456</p>
                <p><strong>Fiscalización:</strong> 20-98765432-1 / 123456</p>
                <p><strong>Administración:</strong> 20-55566677-7 / 123456</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 Agencia Tributaria Misiones
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Sistema interno de gestión de trámites
          </p>
        </div>
      </div>
    </div>
  );
};