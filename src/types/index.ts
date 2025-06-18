export interface FormData {
  email: string;
  requestType: string;
  description: string;
  files: File[];
}

export interface User {
  cuit: string;
  hasDFE: boolean;
  isAuthenticated: boolean;
}

export type Step = 'email' | 'request' | 'preview' | 'send';

export interface RequestType {
  value: string;
  label: string;
  description: string;
}