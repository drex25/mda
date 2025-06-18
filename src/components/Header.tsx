import React from 'react';
import { MapPin } from 'lucide-react';
import logoAtm from '../assets/logo-atm.png';


export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#5E2348] text-white shadow-2xl border-b border-white/10 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="bg-white/30 p-3 rounded-3xl shadow-xl backdrop-blur-lg flex items-center justify-center border-2 border-white/40 transition-transform hover:scale-105 duration-300">
          <img src={logoAtm} alt="Logo ATM" className="w-28 h-28 object-contain drop-shadow-2xl" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-roboto tracking-tight relative inline-block text-white drop-shadow-lg">
            Mesa de Entrada Digital
            <span className="block h-1 w-2/3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mt-3 mx-auto sm:mx-0 animate-pulse"></span>
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-100 text-lg mt-4">
            <MapPin className="w-6 h-6 text-pink-200" />
            <span className="font-semibold font-roboto tracking-wide drop-shadow">Agencia Tributaria Misiones</span>
          </div>
        </div>
      </div>
    </header>
  );
};

