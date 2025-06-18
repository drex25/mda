import React from 'react';
import { FileText, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mesa de Entrada Digital</h1>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Agencia tributaria misiones</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};