import React, { useState } from 'react';
import { ArrowLeft, Lock, Download, Mail, Send, AlertTriangle, CheckCircle, Key, Shield, Building2, Clock } from 'lucide-react';

interface SendStepProps {
  onPrevious: () => void;
}

export const SendStep: React.FC<SendStepProps> = ({ onPrevious }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cuit, setCuit] = useState('');
  const [claveFiscal, setClaveFiscal] = useState('');
  const [hasDFE, setHasDFE] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expedientNumber] = useState('EXP-2025-001234-MISIONES');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      // Simulate DFE check
      setHasDFE(Math.random() > 0.3); // 70% chance of having DFE
    }, 2000);
  };

  const handleSend = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 3000);
  };

  const handleDownloadDraft = () => {
    alert('Descargando borrador de la solicitud...');
  };

  const handleEmailDraft = () => {
    alert('Borrador enviado por correo electrónico');
  };

  if (showSuccess) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Success header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Solicitud Enviada Exitosamente!</h2>
            <p className="text-green-100">Su trámite ha sido registrado en el sistema oficial</p>
          </div>

          {/* Success content */}
          <div className="p-8 space-y-6">
            {/* Expedient number */}
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Key className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-green-900 text-lg mb-2">Número de Expediente</h3>
              <div className="bg-white/80 rounded-lg p-4 border border-green-200">
                <p className="text-2xl font-mono font-bold text-green-800 tracking-wider">
                  {expedientNumber}
                </p>
              </div>
              <p className="text-green-700 text-sm mt-3">
                Conserve este número para realizar el seguimiento de su trámite
              </p>
            </div>

            {/* Next steps */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Confirmación por Correo</h4>
                    <p className="text-blue-800 text-sm">
                      Recibirá un correo electrónico con los detalles del expediente 
                      y los próximos pasos a seguir.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Tiempo de Procesamiento</h4>
                    <p className="text-purple-800 text-sm">
                      Su solicitud será procesada en un plazo de 5 a 15 días hábiles 
                      según la complejidad del trámite.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking info */}
            <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Seguimiento del Trámite</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Podrá consultar el estado de su trámite en cualquier momento utilizando 
                    el número de expediente en la sección "Seguimiento de Expedientes".
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Ir a Seguimiento →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Auth header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Autenticación Requerida</h2>
            <p className="text-blue-100">Ingrese sus credenciales fiscales para enviar la solicitud</p>
          </div>

          {/* Auth form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="cuit" className="block text-sm font-semibold text-gray-700 mb-3">
                  CUIT / CUIL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="cuit"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                    placeholder="XX-XXXXXXXX-X"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="claveFiscal" className="block text-sm font-semibold text-gray-700 mb-3">
                  Clave Fiscal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="claveFiscal"
                    value={claveFiscal}
                    onChange={(e) => setClaveFiscal(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando Credenciales...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Iniciar Sesión con AFIP
                  </>
                )}
              </button>
            </form>

            {/* Alternative options */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">¿No puede iniciar sesión?</h3>
              <div className="grid gap-4">
                <button
                  onClick={handleDownloadDraft}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Descargar Borrador</p>
                    <p className="text-sm text-gray-600">Guardar solicitud en formato PDF</p>
                  </div>
                </button>
                
                <button
                  onClick={handleEmailDraft}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Enviar por Email</p>
                    <p className="text-sm text-gray-600">Recibir borrador por correo electrónico</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-start pt-6">
              <button
                onClick={onPrevious}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                Anterior
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Success auth header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Autenticación Exitosa</h2>
          <p className="text-green-100">Su identidad ha sido verificada correctamente</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* DFE Status */}
          {!hasDFE ? (
            <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">
                    Domicilio Fiscal Electrónico Requerido
                  </h3>
                  <p className="text-amber-800 text-sm mb-4 leading-relaxed">
                    Para enviar el trámite necesita constituir su Domicilio Fiscal Electrónico (DFE). 
                    Este domicilio será utilizado para las notificaciones oficiales del expediente.
                  </p>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-md">
                    Constituir DFE en AFIP
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">
                    Domicilio Fiscal Electrónico Activo
                  </h3>
                  <p className="text-green-800 text-sm">
                    Su DFE está correctamente constituido. Puede proceder con el envío de la solicitud.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Send summary */}
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              Resumen del Envío
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Su solicitud será registrada en el sistema oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Recibirá un número de expediente único para seguimiento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Las notificaciones se enviarán a su correo electrónico y DFE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Podrá realizar seguimiento del trámite en línea</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <button
              onClick={onPrevious}
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>
            <button
              onClick={handleSend}
              disabled={!hasDFE || isLoading}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando Solicitud...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  Enviar Solicitud Oficial
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};