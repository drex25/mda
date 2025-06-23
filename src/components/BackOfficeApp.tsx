import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from './auth/LoginScreen';
import { Dashboard } from './dashboard/Dashboard';

export const BackOfficeApp: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {isAuthenticated ? <Dashboard /> : <LoginScreen />}
    </div>
  );
};