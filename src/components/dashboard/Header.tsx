import React from 'react';
import { LogOut, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Welcome message */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido/a, {user?.name}
            </h1>
            <p className="text-gray-600 text-sm">
              Rol: {user?.role} - {user?.area}
            </p>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* User menu */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.cuit}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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