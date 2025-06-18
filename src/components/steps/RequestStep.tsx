import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, FileText, AlertCircle } from 'lucide-react';
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
    <div className="relative bg-white/90 rounded-3xl shadow-2xl border border-blue-200 p-10 overflow-hidden backdrop-blur-xl transition-all duration-300">
      {/* Fondo decorativo animado */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-pulse z-0" />
      <div className="absolute -bottom-10 right-0 w-56 h-56 bg-pink-200 opacity-20 rounded-full blur-2xl animate-pulse z-0" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold font-roboto text-gray-900 mb-2 tracking-tight drop-shadow-lg">
            Completar Solicitud
          </h2>
          <p className="text-gray-600 font-roboto text-base">
            Complete los datos de su solicitud y adjunte la documentación necesaria.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de solicitud *
            </label>
            <div className="grid gap-3">
              {requestTypes.map((type) => (
                <label
                  key={type.value}
                  className={`
                    flex items-start p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50
                    ${requestType === type.value ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200'}
                  `}
                >
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    checked={requestType === type.value}
                    onChange={(e) => onRequestTypeChange(e.target.value)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.requestType && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.requestType}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de la solicitud *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={4}
              className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none
                ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              `}
              placeholder="Describa brevemente el motivo de su solicitud..."
            />
            <div className="flex justify-between items-center mt-2">
              {errors.description ? (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Mínimo 10 caracteres</p>
              )}
              <p className="text-sm text-gray-400">{description.length} caracteres</p>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Adjuntar documentación
            </label>
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-medium hover:text-blue-500">
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
              <p className="text-sm text-gray-500 mt-2">
                Solo archivos PDF, máximo 5 archivos de 5MB cada uno
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Archivos adjuntados:</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onPrevious}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors group"
            >
              Continuar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};