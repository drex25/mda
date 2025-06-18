import React from 'react';
import { ArrowRight, ArrowLeft, FileText, Mail, Calendar, User } from 'lucide-react';
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
    day: 'numeric'
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Previsualización del Documento
          </h2>
          <p className="text-gray-600">
            Revise los datos de su solicitud antes de enviarla.
          </p>
        </div>

        {/* Document Preview */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mesa de Entrada Digital
              </h3>
              <p className="text-gray-600">Gobierno de Misiones</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Fecha de presentación: {currentDate}</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Correo Electrónico</h4>
                    <p className="text-gray-700">{email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Tipo de Solicitud</h4>
                    <p className="text-gray-700">{selectedRequestType?.label}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Descripción de la Solicitud
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
                </div>
              </div>

              {files.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Documentación Adjuntada ({files.length} archivo{files.length > 1 ? 's' : ''})
                  </h4>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Este documento será procesado por la Mesa de Entrada Digital del Gobierno de Misiones
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 rounded-full p-2">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-amber-900 mb-2">Importante</h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                Una vez enviada la solicitud, recibirá un número de expediente para realizar el seguimiento. 
                Verifique que todos los datos sean correctos antes de continuar.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Modificar Solicitud
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors group"
          >
            Proceder al Envío
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};