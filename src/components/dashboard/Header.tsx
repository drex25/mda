import React from 'react';
import { LogOut, Bell, User, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Welcome message */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenido/a, {user?.name}
              </h1>
              <p className="text-gray-600 text-sm">
                Rol: {user?.role} - {user?.area}
              </p>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* User menu */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.cuit}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-red-200 hover:border-red-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};