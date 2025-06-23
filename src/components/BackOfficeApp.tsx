import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from './auth/LoginScreen';
import { Dashboard } from './dashboard/Dashboard';

interface BackOfficeAppProps {
  onBackToLanding: () => void;
}

export const BackOfficeApp: React.FC<BackOfficeAppProps> = ({ onBackToLanding }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Back to landing button - only show when not authenticated */}
      {!isAuthenticated && (
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl border border-white/20 text-gray-700 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Volver al Inicio</span>
          </button>
        </div>
      )}
      
      {isAuthenticated ? (
        <Dashboard onBackToLanding={onBackToLanding} />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};