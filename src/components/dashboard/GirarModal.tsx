import React, { useState } from 'react';
import { X, Send, Building2 } from 'lucide-react';
import { Tramite } from '../../types/tramite';

interface GirarModalProps {
  tramite: Tramite;
  onConfirm: (areaDestino: string, observaciones: string) => void;
  onCancel: () => void;
}

const areas = [
  'Administración',
  'Fiscalización', 
  'Recaudaciones',
  'Jurídicos',
  'Auditoría',
  'Informática',
  'Control Fiscal en Ruta'
];

export const GirarModal: React.FC<GirarModalProps> = ({
  tramite,
  onConfirm,
  onCancel
}) => {
  const [areaDestino, setAreaDestino] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaDestino) {
      onConfirm(areaDestino, observaciones);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Header */}
        <div 
          className="p-6 text-white rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Girar Trámite</h3>
                <p className="text-cyan-100 text-sm">{tramite.numero}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current info */}
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 font-medium text-sm">Área Actual</span>
              </div>
              <p className="text-blue-800 font-semibold">{tramite.areaActual}</p>
            </div>

            {/* Area selection */}
            <div>
              <label htmlFor="areaDestino" className="block text-sm font-semibold text-gray-700 mb-3">
                Área de Destino
              </label>
              <select
                id="areaDestino"
                value={areaDestino}
                onChange={(e) => setAreaDestino(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#023F5E] focus:ring-4 focus:ring-[#023F5E]/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                required
              >
                <option value="">Seleccionar área...</option>
                {areas.filter(area => area !== tramite.areaActual).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Observations */}
            <div>
              <label htmlFor="observaciones" className="block text-sm font-semibold text-gray-700 mb-3">
                Observaciones / Motivo del Giro
              </label>
              <textarea
                id="observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#023F5E] focus:ring-4 focus:ring-[#023F5E]/20 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Ingrese el motivo del giro o instrucciones específicas para el área de destino..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!areaDestino}
                className="flex-1 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                style={{ 
                  background: !areaDestino 
                    ? 'linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)' 
                    : 'linear-gradient(90deg, #023F5E 0%, #612247 100%)'
                }}
              >
                <Send className="w-4 h-4" />
                Confirmar Giro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};