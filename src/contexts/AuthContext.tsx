import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  cuit: string;
  role: string;
  area: string;
}

interface AuthContextType {
  user: User | null;
  login: (cuit: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (cuit: string, password: string): Promise<boolean> => {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on CUIT
    const mockUsers: { [key: string]: User } = {
      '20123456789': {
        id: '1',
        name: 'María González',
        cuit: '20-12345678-9',
        role: 'Supervisor',
        area: 'Mesa de Ayuda'
      },
      '20987654321': {
        id: '2',
        name: 'Juan Pérez',
        cuit: '20-98765432-1',
        role: 'Analista',
        area: 'Fiscalización'
      },
      '20555666777': {
        id: '3',
        name: 'Ana Rodríguez',
        cuit: '20-55566677-7',
        role: 'Técnico',
        area: 'Administración'
      }
    };

    const cleanCuit = cuit.replace(/[-\s]/g, '');
    const foundUser = mockUsers[cleanCuit];
    
    if (foundUser && password === '123456') {
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};