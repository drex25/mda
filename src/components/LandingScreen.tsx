import React from 'react';
import { FileText, Shield, Users, Building2, ArrowRight, CheckCircle, Clock, Lock } from 'lucide-react';

interface LandingScreenProps {
  onModeChange: (mode: 'user' | 'backoffice') => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onModeChange }) => {
  const svgPattern = "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ backgroundImage: svgPattern }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-pink-400/30 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/15 backdrop-blur-xl p-3 rounded-xl border border-white/30 shadow-xl">
                  <img 
                    src="/src/assets/logo-atm.png" 
                    alt="Agencia Tributaria Misiones" 
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-cyan-300" />
                  <span className="text-cyan-200 text-sm font-medium tracking-wider uppercase">
                    Sistema Oficial
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent leading-tight">
                  Mesa de Entrada Digital
                </h1>
                <p className="text-cyan-100/90 text-lg font-medium mt-1">
                  Agencia Tributaria Misiones
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido al Sistema Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plataforma oficial para la gestión de trámites gubernamentales de la Provincia de Misiones. 
            Elija la opción que corresponda a su perfil de usuario.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* User Option */}
          <div className="group">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: svgPattern }}
                ></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Ciudadanos</h3>
                  <p className="text-blue-100">Iniciar nuevo trámite</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Gestión de Trámites</h4>
                      <p className="text-gray-600 text-sm">
                        Inicie solicitudes, consultas tributarias, exclusiones de regímenes y consultas vinculantes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Proceso Simplificado</h4>
                      <p className="text-gray-600 text-sm">
                        Flujo guiado de 4 pasos con validación en tiempo real y carga de documentos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Seguridad Garantizada</h4>
                      <p className="text-gray-600 text-sm">
                        Autenticación con AFIP y notificaciones oficiales por correo electrónico
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onModeChange('user')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Iniciar Trámite
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Back Office Option */}
          <div className="group">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Card Header */}
              <div 
                className="text-white p-8 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
              >
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: svgPattern }}
                ></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Empleados ATM</h3>
                  <p className="text-cyan-100">Acceso al sistema interno</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Gestión de Expedientes</h4>
                      <p className="text-gray-600 text-sm">
                        Administre trámites asignados, realice giros entre áreas y gestione el flujo de trabajo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Seguimiento Completo</h4>
                      <p className="text-gray-600 text-sm">
                        Historial de giros, estados de trámites y herramientas de seguimiento en tiempo real
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Acceso Restringido</h4>
                      <p className="text-gray-600 text-sm">
                        Sistema interno con autenticación por CUIT y permisos por área de trabajo
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onModeChange('backoffice')}
                  className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(90deg, #023F5E 0%, #612247 100%)' }}
                >
                  Acceder al Sistema
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Características del Sistema
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plataforma moderna y segura diseñada para optimizar la gestión de trámites gubernamentales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Seguridad Avanzada</h4>
              <p className="text-gray-600 text-sm">
                Integración con AFIP, encriptación de datos y auditoría completa de acciones
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Disponibilidad 24/7</h4>
              <p className="text-gray-600 text-sm">
                Sistema disponible las 24 horas para iniciar trámites y consultar estados
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gestión Digital</h4>
              <p className="text-gray-600 text-sm">
                Eliminación del papel, seguimiento en línea y notificaciones automáticas
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Seguro y Confiable</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 Agencia Tributaria Misiones - Mesa de Entrada Digital
            </p>
            <p className="text-xs text-gray-500">
              Plataforma oficial para la gestión de trámites gubernamentales
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400 pt-2">
              <span>Términos y Condiciones</span>
              <span>•</span>
              <span>Política de Privacidad</span>
              <span>•</span>
              <span>Ayuda</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};