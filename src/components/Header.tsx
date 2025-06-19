import React from 'react';
import { Building2, Shield } from 'lucide-react';

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
      
      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-6">
            {/* Logo container with enhanced styling */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/50 to-pink-400/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20 shadow-xl">
                <div className="bg-gradient-to-br from-cyan-400 to-pink-500 p-2.5 rounded-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Title section with enhanced typography */}
            <div className="text-center space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-cyan-300" />
                <span className="text-cyan-200 text-xs font-medium tracking-wider uppercase">
                  Sistema Oficial
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent leading-tight">
                Mesa de Entrada Digital
              </h1>
              <p className="text-cyan-100/90 text-base font-medium tracking-wide">
                Agencia Tributaria Misiones
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-cyan-200/70 mt-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema activo y seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent with animated gradient */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
    </header>
  );
};