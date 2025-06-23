import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BackOfficeApp } from './components/BackOfficeApp';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BackOfficeApp />
    </AuthProvider>
  );
}

export default App;