import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BackOfficeApp } from './components/BackOfficeApp';
import { UserApp } from './components/UserApp';
import { LandingScreen } from './components/LandingScreen';
import './index.css';

type AppMode = 'landing' | 'user' | 'backoffice';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('landing');

  const handleModeChange = (mode: AppMode) => {
    setAppMode(mode);
  };

  const handleBackToLanding = () => {
    setAppMode('landing');
  };

  if (appMode === 'landing') {
    return <LandingScreen onModeChange={handleModeChange} />;
  }

  if (appMode === 'user') {
    return <UserApp onBackToLanding={handleBackToLanding} />;
  }

  return (
    <AuthProvider>
      <BackOfficeApp onBackToLanding={handleBackToLanding} />
    </AuthProvider>
  );
}

export default App;