import React from 'react';
import { 
  Eye, 
  Check, 
  Send, 
  X, 
  MessageSquare,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Tramite } from '../../types/tramite';
import { useAuth } from '../../contexts/AuthContext';

interface TramitesListProps {
  tramites: Tramite[];
  onView: (tramite: Tramite) => void;
  onGirar: (tramite: Tramite) => void;
  onAceptar: (tramite: Tramite) => void;
  onRechazar: (tramite: Tramite, motivo: string) => void;
  title: string;
}

export const TramitesList: React.FC<TramitesListProps> = ({
  tramites,
  onView,
  onGirar,
  onAceptar,
  onRechazar,
  title
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

  const canGirar = (tramite: Tramite) => {
    return user?.area === 'Mesa de Ayuda' || tramite.areaActual === user?.area;
  };

  const canAceptar = (tramite: Tramite) => {
    return tramite.estado === 'En espera' && tramite.areaActual === user?.area;
  };

  const handleRechazar = (tramite: Tramite) => {
    const motivo = prompt('Ingrese el motivo del rechazo:');
    if (motivo) {
      onRechazar(tramite, motivo);
    }
  };

  const statsData = [
    {
      label: 'Nuevos',
      value: tramites.filter(t => t.estado === 'Nuevo').length,
      color: 'blue',
      icon: FileText
    },
    {
      label: 'En espera',
      value: tramites.filter(t => t.estado === 'En espera').length,
      color: 'yellow',
      icon: Clock
    },
    {
      label: 'En curso',
      value: tramites.filter(t => t.estado === 'En curso').length,
      color: 'green',
      icon: TrendingUp
    },
    {
      label: 'Rechazados',
      value: tramites.filter(t => t.estado === 'Rechazado').length,
      color: 'red',
      icon: AlertCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with improved stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">
            {tramites.length} trámite{tramites.length !== 1 ? 's' : ''} encontrado{tramites.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`
                bg-${stat.color}-50/80 backdrop-blur-sm border border-${stat.color}-200 rounded-xl p-4 text-center
                hover:shadow-lg transition-all duration-200 hover:scale-105
              `}>
                <div className={`inline-flex items-center justify-center w-8 h-8 bg-${stat.color}-100 rounded-lg mb-2`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <div className={`text-${stat.color}-600 font-bold text-xl`}>
                  {stat.value}
                </div>
                <div className={`text-${stat.color}-600 text-xs font-medium`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr 
                className="text-white text-left"
                style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
              >
                <th className="px-6 py-4 font-semibold">Nº Trámite</th>
                <th className="px-6 py-4 font-semibold">Fecha Ingreso</th>
                <th className="px-6 py-4 font-semibold">Solicitante</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold">Área Actual</th>
                <th className="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tramites.map((tramite, index) => (
                <tr 
                  key={tramite.id}
                  className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="font-mono text-sm font-medium">
                        {tramite.numero}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(tramite.fechaIngreso).toLocaleDateString('es-AR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {tramite.solicitante.nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tramite.solicitante.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-medium">
                      {tramite.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                      ${getEstadoColor(tramite.estado)}
                    `}>
                      {tramite.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">
                      {tramite.areaActual}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* Ver */}
                      <button
                        onClick={() => onView(tramite)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Aceptar giro */}
                      {canAceptar(tramite) && (
                        <button
                          onClick={() => onAceptar(tramite)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          title="Aceptar giro"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      {/* Girar */}
                      {canGirar(tramite) && (
                        <button
                          onClick={() => onGirar(tramite)}
                          className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Girar trámite"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}

                      {/* Rechazar */}
                      <button
                        onClick={() => handleRechazar(tramite)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Rechazar"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Responder (solo consultas) */}
                      {tramite.tipo.toLowerCase().includes('consulta') && (
                        <button
                          className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Responder consulta"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tramites.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay trámites
            </h3>
            <p className="text-gray-600">
              No se encontraron trámites en esta sección.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};