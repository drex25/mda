import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, FileText, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { requestTypes } from '../../data/requestTypes';

interface RequestStepProps {
  requestType: string;
  description: string;
  files: File[];
  onRequestTypeChange: (type: string) => void;
  onDescriptionChange: (description: string) => void;
  onFilesChange: (files: File[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const RequestStep: React.FC<RequestStepProps> = ({
  requestType,
  description,
  files,
  onRequestTypeChange,
  onDescriptionChange,
  onFilesChange,
  onNext,
  onPrevious
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!requestType) {
      newErrors.requestType = 'Seleccione un tipo de solicitud';
    }
    
    if (!description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;
    
    const newFiles = Array.from(uploadedFiles).filter(file => {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    const totalFiles = files.length + newFiles.length;
    if (totalFiles > 5) {
      alert('Solo se permiten hasta 5 archivos');
      return;
    }

    onFilesChange([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Completar Solicitud</h2>
        <p className="text-gray-600">Proporcione los detalles de su trámite</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Request Type Selection */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tipo de Solicitud</h3>
            <p className="text-sm text-gray-600">Seleccione el tipo de trámite que desea realizar</p>
          </div>
          
          <div className="grid gap-4">
            {requestTypes.map((type, index) => (
              <label
                key={type.value}
                className={`
                  group relative flex items-start p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg
                  ${requestType === type.value 
                    ? 'border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-200 bg-white/50 hover:border-gray-300 hover:bg-gray-50/50'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={type.value}
                  checked={requestType === type.value}
                  onChange={(e) => onRequestTypeChange(e.target.value)}
                  className="sr-only"
                />
                <div className={`
                  flex-shrink-0 w-5 h-5 rounded-full border-2 mr-4 mt-1 transition-all duration-200
                  ${requestType === type.value 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300 group-hover:border-gray-400'
                  }
                `}>
                  {requestType === type.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
                {requestType === type.value && (
                  <CheckCircle className="w-6 h-6 text-blue-500 ml-4" />
                )}
              </label>
            ))}
          </div>
          
          {errors.requestType && (
            <div className="mt-4 flex items-center gap-2 text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.requestType}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción de la Solicitud</h3>
            <p className="text-sm text-gray-600">Detalle el motivo y contexto de su trámite</p>
          </div>
          
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={6}
              className={`
                w-full px-4 py-4 text-base border-2 rounded-xl transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none
                ${errors.description 
                  ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                }
                focus:ring-4 focus:outline-none
              `}
              placeholder="Describa detalladamente el motivo de su solicitud, incluyendo cualquier información relevante que pueda ayudar en el procesamiento de su trámite..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {description.length} caracteres
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            {errors.description ? (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{errors.description}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Mínimo 10 caracteres requeridos</p>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentación Adjunta</h3>
            <p className="text-sm text-gray-600">Adjunte los documentos necesarios para su trámite</p>
          </div>
          
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
              ${dragActive 
                ? 'border-blue-400 bg-blue-50/80 scale-105' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className={`
                inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300
                ${dragActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
              `}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div>
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Seleccionar archivos
                  </span>
                  <span className="text-gray-600"> o arrastre aquí</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>Solo archivos PDF • Máximo 5 archivos • 5MB por archivo</p>
                <p className="text-xs">Formatos aceptados: Documentos oficiales, certificados, formularios</p>
              </div>
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Archivos adjuntados ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-100/80 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Revisar Solicitud
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </form>
    </div>
  );
};