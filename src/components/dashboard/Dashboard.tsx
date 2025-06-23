import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TramitesList } from './TramitesList';
import { TramiteDetail } from './TramiteDetail';
import { GirarModal } from './GirarModal';
import { useTramites } from '../../hooks/useTramites';
import { Tramite } from '../../types/tramite';

export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedTramite, setSelectedTramite] = useState<Tramite | null>(null);
  const [showGirarModal, setShowGirarModal] = useState(false);
  const [tramiteToGirar, setTramiteToGirar] = useState<Tramite | null>(null);
  
  const { tramites, updateTramite, girarTramite } = useTramites();

  const handleViewTramite = (tramite: Tramite) => {
    setSelectedTramite(tramite);
  };

  const handleBackToList = () => {
    setSelectedTramite(null);
  };

  const handleGirarTramite = (tramite: Tramite) => {
    setTramiteToGirar(tramite);
    setShowGirarModal(true);
  };

  const handleConfirmGiro = (areaDestino: string, observaciones: string) => {
    if (tramiteToGirar) {
      girarTramite(tramiteToGirar.id, areaDestino, observaciones);
      setShowGirarModal(false);
      setTramiteToGirar(null);
    }
  };

  const handleAceptarGiro = (tramite: Tramite) => {
    updateTramite(tramite.id, { estado: 'En curso' });
  };

  const handleRechazar = (tramite: Tramite, motivo: string) => {
    updateTramite(tramite.id, { 
      estado: 'Rechazado',
      observaciones: motivo
    });
  };

  const filteredTramites = () => {
    switch (activeSection) {
      case 'asignados':
        return tramites.filter(t => t.areaActual === 'Mesa de Ayuda' && t.estado !== 'Nuevo');
      case 'girados':
        return tramites.filter(t => t.historialGiros.length > 0);
      default:
        return tramites;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
        
        <div className="flex-1 ml-64">
          <Header />
          
          <main className="p-6">
            {selectedTramite ? (
              <TramiteDetail
                tramite={selectedTramite}
                onBack={handleBackToList}
                onGirar={handleGirarTramite}
                onAceptar={handleAceptarGiro}
                onRechazar={handleRechazar}
              />
            ) : (
              <TramitesList
                tramites={filteredTramites()}
                onView={handleViewTramite}
                onGirar={handleGirarTramite}
                onAceptar={handleAceptarGiro}
                onRechazar={handleRechazar}
                title={getSectionTitle(activeSection)}
              />
            )}
          </main>
        </div>
      </div>

      {showGirarModal && tramiteToGirar && (
        <GirarModal
          tramite={tramiteToGirar}
          onConfirm={handleConfirmGiro}
          onCancel={() => {
            setShowGirarModal(false);
            setTramiteToGirar(null);
          }}
        />
      )}
    </div>
  );
};

const getSectionTitle = (section: string): string => {
  switch (section) {
    case 'asignados':
      return 'Trámites Asignados';
    case 'girados':
      return 'Trámites Girados';
    case 'configuracion':
      return 'Configuración';
    default:
      return 'Todos los Trámites';
  }
};