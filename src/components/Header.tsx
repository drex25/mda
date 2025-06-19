import React from 'react';
import { Building2, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-8">
            {/* Logo container with enhanced styling */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Title section with enhanced typography */}
            <div className="text-center space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-blue-300" />
                <span className="text-blue-200 text-sm font-medium tracking-wider uppercase">
                  Sistema Oficial
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                Mesa de Entrada Digital
              </h1>
              <p className="text-blue-100/90 text-lg font-medium tracking-wide">
                Agencia Tributaria Misiones
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-blue-200/70 mt-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema activo y seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent with animated gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
    </header>
  )
  );
};