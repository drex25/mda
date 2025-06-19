import React from 'react';
import { ArrowRight, ArrowLeft, FileText, Mail, Calendar, User, Building2, Shield, Download } from 'lucide-react';
import { requestTypes } from '../../data/requestTypes';

interface PreviewStepProps {
  email: string;
  requestType: string;
  description: string;
  files: File[];
  onNext: () => void;
  onPrevious: () => void;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({
  email,
  requestType,
  description,
  files,
  onNext,
  onPrevious
}) => {
  const selectedRequestType = requestTypes.find(type => type.value === requestType);
  const currentDate = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownloadPreview = () => {
    // Simulate download
    alert('Descargando vista previa del documento...');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Revisión Final</h2>
        <p className="text-gray-600">Verifique todos los datos antes de enviar su solicitud</p>
      </div>

      {/* Document Preview */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Document header */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mesa de Entrada Digital</h3>
                <p className="text-blue-100 text-sm">Agencia Tributaria Misiones</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-green-300 text-sm">
                <Shield className="w-4 h-4" />
                <span>Documento Oficial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document content */}
        <div className="p-8 space-y-8">
          {/* Applicant information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Datos del Solicitante</h4>
                  <p className="text-blue-800 text-sm break-all">{email}</p>
                  <p className="text-blue-600 text-xs mt-1">Correo electrónico verificado</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-2">Tipo de Solicitud</h4>
                  <p className="text-purple-800 text-sm font-medium">{selectedRequestType?.label}</p>
                  <p className="text-purple-600 text-xs mt-1">{selectedRequestType?.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Request description */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Descripción de la Solicitud
            </h4>
            <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {description}
              </p>
            </div>
          </div>

          {/* Attached files */}
          {files.length > 0 && (
            <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Documentación Adjunta ({files.length} archivo{files.length > 1 ? 's' : ''})
              </h4>
              <div className="grid gap-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/80 rounded-lg border border-green-200 hover:bg-green-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">PDF</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal notice */}
          <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Declaración Jurada</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Declaro bajo juramento que la información proporcionada es veraz y completa. 
                  Comprendo que cualquier falsedad u omisión puede dar lugar a las sanciones 
                  previstas en la legislación vigente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document footer */}
        <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <p>Este documento será procesado por la Mesa de Entrada Digital</p>
              <p>Gobierno de la Provincia de Misiones</p>
            </div>
            <button
              onClick={handleDownloadPreview}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar Vista Previa
            </button>
          </div>
        </div>
      </div>

      {/* Important notice */}
      <div className="bg-red-50/80 backdrop-blur-xl border border-red-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-red-900 mb-2">Importante - Verificación Final</h4>
            <div className="text-red-800 text-sm space-y-2">
              <p>• Una vez enviada la solicitud, no podrá modificar los datos ingresados</p>
              <p>• Recibirá un número de expediente único para realizar el seguimiento</p>
              <p>• Las notificaciones oficiales se enviarán al correo electrónico proporcionado</p>
              <p>• El procesamiento puede demorar entre 5 a 15 días hábiles según el tipo de trámite</p>
            </div>
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
          Modificar Datos
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Proceder al Envío
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};