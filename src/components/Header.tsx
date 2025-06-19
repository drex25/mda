import React from 'react';
import logoAtm from '../assets/logo-atm.png';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#5E2348] text-white shadow-lg">
      {/* Main header content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          {/* Logo and title section */}
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-3 rounded-2xl shadow-xl backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-300">
              <img src={logoAtm} alt="Logo ATM" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
            </div>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 tracking-wide">
                Mesa de Entrada Digital
              </h1>
              <p className="text-blue-100 text-base sm:text-lg font-medium">
                Agencia Tributaria Misiones
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400"></div>
    </header>
  );
};

