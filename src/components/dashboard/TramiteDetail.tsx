import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  Send, 
  Check, 
  X, 
  MessageSquare,
  Download,
  Clock,
  Building2
} from 'lucide-react';
import { Tramite } from '../../types/tramite';
import { useAuth } from '../../contexts/AuthContext';

interface TramiteDetailProps {
  tramite: Tramite;
  onBack: () => void;
  onGirar: (tramite: Tramite) => void;
  onAceptar: (tramite: Tramite) => void;
  onRechazar: (tramite: Tramite, motivo: string) => void;
}

export const TramiteDetail: React.FC<TramiteDetailProps> = ({
  tramite,
  onBack,
  onGirar,
  onAceptar,
  onRechazar
}) => {
  const { user } = useAuth();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Nuevo':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En espera':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'En curso':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canGirar = () => {
    return user?.area === 'Mesa de Ayuda' || tramite.areaActual === user?.area;
  };

  const canAceptar = () => {
    return tramite.estado === 'En espera' && tramite.areaActual === user?.area;
  };

  const handleRechazar = () => {
    const motivo = prompt('Ingrese el motivo del rechazo:');
    if (motivo) {
      onRechazar(tramite, motivo);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Detalle del Trámite
            </h2>
            <p className="text-gray-600">
              {tramite.numero} - {tramite.tipo}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {canAceptar() && (
            <button
              onClick={() => onAceptar(tramite)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Aceptar Giro
            </button>
          )}
          
          {canGirar() && (
            <button
              onClick={() => onGirar(tramite)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Girar
            </button>
          )}
          
          <button
            onClick={handleRechazar}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Rechazar
          </button>
          
          {tramite.tipo.toLowerCase().includes('consulta') && (
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              <MessageSquare className="w-4 h-4" />
              Responder
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tramite info */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Información del Trámite
              </h3>
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border
                ${getEstadoColor(tramite.estado)}
              `}>
                {tramite.estado}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Trámite
                </label>
                <p className="font-mono text-lg font-semibold text-gray-900">
                  {tramite.numero}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <p className="text-gray-900">{tramite.tipo}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Ingreso
                </label>
                <div className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {new Date(tramite.fechaIngreso).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área Actual
                </label>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{tramite.areaActual}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solicitante info */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Datos del Solicitante
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <p className="text-gray-900">{tramite.solicitante.nombre}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CUIT
                </label>
                <p className="font-mono text-gray-900">{tramite.solicitante.cuit}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <p className="text-gray-900">{tramite.solicitante.email}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Descripción Detallada
            </h3>
            <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {tramite.descripcion}
              </p>
            </div>
          </div>

          {/* Files */}
          {tramite.archivos.length > 0 && (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Archivos Adjuntos ({tramite.archivos.length})
              </h3>
              <div className="space-y-3">
                {tramite.archivos.map((archivo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-100/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{archivo.nombre}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(archivo.tamaño)}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Descargar</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status timeline */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Historial de Giros
            </h3>
            
            <div className="space-y-4">
              {tramite.historialGiros.map((giro, index) => (
                <div key={index} className="relative">
                  {index < tramite.historialGiros.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-gray-900 text-sm">
                          {giro.areaOrigen} → {giro.areaDestino}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(giro.fecha).toLocaleDateString('es-AR')} - {giro.usuario}
                        </p>
                        {giro.observaciones && (
                          <p className="text-sm text-gray-700 mt-2">
                            {giro.observaciones}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {tramite.historialGiros.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No hay giros registrados
                </p>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Descargar PDF completo</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Generar informe</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Agregar nota interna</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};