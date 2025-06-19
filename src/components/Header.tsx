import React from 'react';
import { Shield } from 'lucide-react';

const svgPattern = "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

export const Header: React.FC = () => {
  return (
    <header className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ backgroundImage: svgPattern }}
      ></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            {/* Logo ATM */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-pink-400/30 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-xl p-2 rounded-xl border border-white/30 shadow-xl">
                <img 
                  src="/src/assets/logo-atm.png" 
                  alt="Agencia Tributaria Misiones" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            
            {/* Title section compacto */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-3 h-3 text-cyan-300" />
                <span className="text-cyan-200 text-xs font-medium tracking-wider uppercase">
                  Sistema Oficial
                </span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent leading-tight">
                Mesa de Entrada Digital
              </h1>
              <p className="text-cyan-100/90 text-sm font-medium">
                Agencia Tributaria Misiones
              </p>
            </div>
          </div>
          
          {/* Status indicator - moved to right */}
          <div className="absolute right-4 flex items-center gap-2 text-xs text-cyan-200/70">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline">Sistema activo</span>
          </div>
        </div>
      </div>
      
      {/* Bottom accent más sutil */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
    </header>
  );
};