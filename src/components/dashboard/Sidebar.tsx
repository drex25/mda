import React from 'react';
import { 
  Home, 
  FileText, 
  List, 
  Send, 
  Settings, 
  Building2,
  ArrowLeft
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onBackToLanding: () => void;
}

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'asignados', label: 'Trámites asignados', icon: FileText },
  { id: 'todos', label: 'Todos los trámites', icon: List },
  { id: 'girados', label: 'Trámites girados', icon: Send },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onBackToLanding 
}) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-xl z-40">
      {/* Logo */}
      <div 
        className="p-6 text-white border-b border-white/20"
        style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">ATM Intranet</h2>
            <p className="text-cyan-100 text-xs">Mesa de Entrada</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                    ${isActive 
                      ? 'text-white shadow-lg transform scale-[1.02]' 
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                    }
                  `}
                  style={isActive ? {
                    background: 'linear-gradient(90deg, #50376F 0%, #007CB6 100%)'
                  } : {}}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to landing button */}
      <div className="absolute bottom-20 left-4 right-4">
        <button
          onClick={onBackToLanding}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver al Inicio</span>
        </button>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 text-xs font-medium">Sistema Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};