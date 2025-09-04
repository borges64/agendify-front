// src/components/Header.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserType } from '../utils/allInterfaces';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getActiveSectionId = () => {
    if (location.pathname.startsWith('/dashboard/agendamentos')) return 'appointments';
    if (location.pathname.startsWith('/dashboard/calendario')) return 'calendar';
    if (location.pathname.startsWith('/dashboard/clientes')) return 'clients';
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    return '';
  };

  const currentActiveSectionId = getActiveSectionId();

  return (
    <motion.header
      className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Seção Esquerda: Logo e Título do Módulo */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 8a1 1 0 011-1h.473a2 2 0 011.897 1.343l.235.53a1 1 0 001.077.624l.564-.188a1 1 0 01.69-.153l.635.159a1 1 0 00.865-.398l.386-.58a1 1 0 011.23-.372l.37.124a1 1 0 00.864-.398l.58-.865A1 1 0 0115 5a1 1 0 110 2h-.473a2 2 0 01-1.897 1.343l-.235.53a1 1 0 00-1.077.624l-.564-.188a1 1 0 01-.69-.153l-.635.159a1 1 0 00-.865-.398l-.386-.58a1 1 0 01-1.23-.372l-.37.124A1 1 0 005 8V8z" clipRule="evenodd" />
                </svg>
              </div>
              <div className='flex-col'>
                <h1 className="text-xl font-bold text-gray-800">
                  Agendify
                </h1>
                <p className="text-xs text-gray-500">NovaTech Desenvolvimento</p>
              </div>
            </Link>
          </div>

          {/* Seção Central: Navegação (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentActiveSectionId === 'dashboard'
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-teal-700'
              }`}
            >
              Dashboard
            </Link>

            {(user?.type === UserType.ADMIN || user?.type === UserType.EMPLOYEE) && (
              <>
                <Link to="/dashboard/agendamentos" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentActiveSectionId === 'appointments' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-teal-700'}`}>Agendamentos</Link>
                <Link to="/dashboard/calendario" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentActiveSectionId === 'calendar' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-teal-700'}`}>Calendário</Link>
                <Link to="/dashboard/clientes" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentActiveSectionId === 'clients' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-teal-700'}`}>Clientes</Link>
              </>
            )}
          </nav>

          {/* Seção Direita: Ícones e Perfil Dropdown */}
          <div className="flex items-center space-x-3 relative">
            <motion.button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Bell className="h-5 w-5 text-gray-500" /><span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full animate-pulse"></span></motion.button>
            <motion.button className="p-2 rounded-full hover:bg-gray-100 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Settings className="h-5 w-5 text-gray-500" /></motion.button>

            {/* Ícone de Perfil e Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  aria-expanded={isProfileMenuOpen}
                >
                  <User className="h-4 w-4 text-gray-500" />
                </button>

                {isProfileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-3 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50 origin-top-right"
                    initial={{ scale: 0.9, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                        <User className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-gray-800">{user.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${user.type === UserType.ADMIN ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-700'}`}>
                        {user.type}
                      </span>
                      <hr className="my-4 w-full border-gray-200" />
                      <button
                        onClick={logout}
                        className="w-full py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;