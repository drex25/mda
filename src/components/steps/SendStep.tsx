import React, { useState } from 'react';
import { ArrowLeft, Lock, Download, Mail, Send, AlertTriangle, CheckCircle, Key } from 'lucide-react';

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
    }, 2000);
  };

  const handleDownloadDraft = () => {
    // Simulate download
    alert('Descargando borrador de la solicitud...');
  };

  const handleEmailDraft = () => {
    // Simulate email sending
    alert('Borrador enviado por correo electrónico');
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Solicitud Enviada Exitosamente!
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-green-800 text-lg font-medium mb-2">
              Número de Expediente: {expedientNumber}
            </p>
            <p className="text-green-700 text-sm">
              Conserve este número para realizar el seguimiento de su trámite
            </p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Confirmación por correo</p>
                <p className="text-sm text-gray-600">
                  Recibirá un correo electrónico con los detalles del expediente y próximos pasos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Seguimiento</p>
                <p className="text-sm text-gray-600">
                  Podrá consultar el estado de su trámite en la sección "Seguimiento de Expedientes".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Autenticación Requerida
            </h2>
            <p className="text-gray-600">
              Para enviar su solicitud debe autenticarse con CUIT y Clave Fiscal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mb-8">
            <div>
              <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-2">
                CUIT *
              </label>
              <input
                type="text"
                id="cuit"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                placeholder="XX-XXXXXXXX-X"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="claveFiscal" className="block text-sm font-medium text-gray-700 mb-2">
                Clave Fiscal *
              </label>
              <input
                type="password"
                id="claveFiscal"
                value={claveFiscal}
                onChange={(e) => setClaveFiscal(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <div className="border-t pt-8">
            <h3 className="font-medium text-gray-900 mb-4">¿No puede iniciar sesión?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={handleDownloadDraft}
                className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Descargar Borrador</p>
                  <p className="text-sm text-gray-600">Guardar solicitud en PDF</p>
                </div>
              </button>
              <button
                onClick={handleEmailDraft}
                className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Enviar por Email</p>
                  <p className="text-sm text-gray-600">Recibir borrador por correo</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-start pt-6">
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Autenticación Exitosa
          </h2>
          <p className="text-gray-600">
            Su identidad ha sido verificada correctamente
          </p>
        </div>

        {!hasDFE ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-medium text-amber-900 mb-2">
                  Domicilio Fiscal Electrónico Requerido
                </h3>
                <p className="text-amber-800 text-sm mb-4">
                  Para enviar el trámite necesita constituir su Domicilio Fiscal Electrónico (DFE). 
                  Este domicilio será utilizado para las notificaciones oficiales.
                </p>
                <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  Constituir DFE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-green-900 mb-2">
                  Domicilio Fiscal Electrónico Activo
                </h3>
                <p className="text-green-800 text-sm">
                  Su DFE está correctamente constituido. Puede proceder con el envío de la solicitud.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-medium text-blue-900 mb-3">Resumen del envío</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Su solicitud será registrada en el sistema oficial</li>
            <li>• Recibirá un número de expediente único</li>
            <li>• Las notificaciones se enviarán a su correo electrónico y DFE</li>
            <li>• Podrá realizar seguimiento del trámite en línea</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>
          <button
            onClick={handleSend}
            disabled={!hasDFE || isLoading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Enviar Solicitud
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};