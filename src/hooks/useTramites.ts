import { useState } from 'react';
import { Tramite } from '../types/tramite';

// Mock data
const mockTramites: Tramite[] = [
  {
    id: '1',
    numero: 'EXP-2025-001234',
    tipo: 'Nota Formal',
    descripcion: 'Solicitud de certificado de libre deuda para trámite de habilitación comercial. Necesito el certificado para presentar en la municipalidad junto con la documentación requerida para la apertura de mi local comercial.',
    solicitante: {
      nombre: 'Juan Carlos Pérez',
      cuit: '20-12345678-9',
      email: 'juan.perez@email.com'
    },
    fechaIngreso: '2025-01-15T10:30:00Z',
    estado: 'Nuevo',
    areaActual: 'Mesa de Ayuda',
    archivos: [
      { nombre: 'dni_frente.pdf', tamaño: 245760, tipo: 'application/pdf' },
      { nombre: 'dni_dorso.pdf', tamaño: 198432, tipo: 'application/pdf' }
    ],
    historialGiros: []
  },
  {
    id: '2',
    numero: 'EXP-2025-001235',
    tipo: 'Consulta Tributaria',
    descripcion: 'Consulta sobre la aplicación del régimen simplificado para monotributistas. Necesito saber si mi actividad comercial puede acogerse a este régimen y cuáles son los requisitos específicos.',
    solicitante: {
      nombre: 'María González',
      cuit: '27-98765432-1',
      email: 'maria.gonzalez@email.com'
    },
    fechaIngreso: '2025-01-14T14:15:00Z',
    estado: 'En espera',
    areaActual: 'Fiscalización',
    archivos: [
      { nombre: 'formulario_consulta.pdf', tamaño: 512000, tipo: 'application/pdf' }
    ],
    historialGiros: [
      {
        fecha: '2025-01-14T15:00:00Z',
        areaOrigen: 'Mesa de Ayuda',
        areaDestino: 'Fiscalización',
        usuario: 'Ana Rodríguez',
        observaciones: 'Consulta sobre régimen tributario - derivar a especialista'
      }
    ]
  },
  {
    id: '3',
    numero: 'EXP-2025-001236',
    tipo: 'Exclusión de Regímenes',
    descripcion: 'Solicito la exclusión del régimen de retención de ganancias debido a cambio en la categoría de mi actividad profesional. Adjunto documentación que acredita el cambio de situación.',
    solicitante: {
      nombre: 'Roberto Silva',
      cuit: '20-55566677-8',
      email: 'roberto.silva@email.com'
    },
    fechaIngreso: '2025-01-13T09:45:00Z',
    estado: 'En curso',
    areaActual: 'Administración',
    archivos: [
      { nombre: 'solicitud_exclusion.pdf', tamaño: 387200, tipo: 'application/pdf' },
      { nombre: 'certificado_profesional.pdf', tamaño: 445500, tipo: 'application/pdf' }
    ],
    historialGiros: [
      {
        fecha: '2025-01-13T11:00:00Z',
        areaOrigen: 'Mesa de Ayuda',
        areaDestino: 'Administración',
        usuario: 'Ana Rodríguez',
        observaciones: 'Solicitud de exclusión - verificar documentación'
      }
    ]
  },
  {
    id: '4',
    numero: 'EXP-2025-001237',
    tipo: 'Consultas Vinculantes',
    descripcion: 'Consulta vinculante sobre la interpretación del artículo 15 de la ley tributaria provincial en relación a las actividades de servicios digitales prestados desde Misiones hacia otras provincias.',
    solicitante: {
      nombre: 'Laura Martínez',
      cuit: '27-11223344-5',
      email: 'laura.martinez@email.com'
    },
    fechaIngreso: '2025-01-12T16:20:00Z',
    estado: 'Rechazado',
    areaActual: 'Jurídicos',
    archivos: [
      { nombre: 'consulta_vinculante.pdf', tamaño: 678900, tipo: 'application/pdf' }
    ],
    historialGiros: [
      {
        fecha: '2025-01-12T17:00:00Z',
        areaOrigen: 'Mesa de Ayuda',
        areaDestino: 'Jurídicos',
        usuario: 'Ana Rodríguez',
        observaciones: 'Consulta vinculante - requiere análisis legal'
      }
    ],
    observaciones: 'Documentación incompleta - falta jurisprudencia de referencia'
  }
];

export const useTramites = () => {
  const [tramites, setTramites] = useState<Tramite[]>(mockTramites);

  const updateTramite = (id: string, updates: Partial<Tramite>) => {
    setTramites(prev => 
      prev.map(tramite => 
        tramite.id === id 
          ? { ...tramite, ...updates }
          : tramite
      )
    );
  };

  const girarTramite = (id: string, areaDestino: string, observaciones: string) => {
    setTramites(prev => 
      prev.map(tramite => {
        if (tramite.id === id) {
          const nuevoGiro = {
            fecha: new Date().toISOString(),
            areaOrigen: tramite.areaActual,
            areaDestino,
            usuario: 'Usuario Actual', // En una app real, esto vendría del contexto de auth
            observaciones
          };
          
          return {
            ...tramite,
            areaActual: areaDestino,
            estado: 'En espera' as const,
            historialGiros: [...tramite.historialGiros, nuevoGiro]
          };
        }
        return tramite;
      })
    );
  };

  return {
    tramites,
    updateTramite,
    girarTramite
  };
};