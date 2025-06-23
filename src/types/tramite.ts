export interface Solicitante {
  nombre: string;
  cuit: string;
  email: string;
}

export interface Archivo {
  nombre: string;
  tamaño: number;
  tipo: string;
}

export interface GiroHistorial {
  fecha: string;
  areaOrigen: string;
  areaDestino: string;
  usuario: string;
  observaciones?: string;
}

export interface Tramite {
  id: string;
  numero: string;
  tipo: string;
  descripcion: string;
  solicitante: Solicitante;
  fechaIngreso: string;
  estado: 'Nuevo' | 'En espera' | 'En curso' | 'Rechazado';
  areaActual: string;
  archivos: Archivo[];
  historialGiros: GiroHistorial[];
  observaciones?: string;
}