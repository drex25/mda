import { RequestType } from '../types';

export const requestTypes: RequestType[] = [
  {
    value: 'nota-formal',
    label: 'Nota Formal',
    description: 'Presentación de documentación oficial o solicitudes formales'
  },
  {
    value: 'consulta-tributaria',
    label: 'Consulta Tributaria',
    description: 'Consultas relacionadas con impuestos y obligaciones fiscales'
  },
  {
    value: 'exclusion-regimenes',
    label: 'Exclusión de Regímenes',
    description: 'Solicitud de exclusión de regímenes tributarios específicos'
  },
  {
    value: 'consultas-vinculantes',
    label: 'Consultas Vinculantes',
    description: 'Consultas con carácter vinculante para la administración'
  }
];