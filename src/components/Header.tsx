// src/components/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Calendar, Bell, Settings, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, // Clock poderia ser para Agendamentos
  HelpCircle,
  Search,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { UserType } from '../utils/allInterfaces'; // Importe o enum UserType

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Função para determinar a seção ativa com base na URL
  const getActiveSectionId = () => {
    if (location.pathname.startsWith('/dashboard/agendamentos')) return 'appointments';
    if (location.pathname.startsWith('/dashboard/calendario')) return 'calendar';
    if (location.pathname.startsWith('/dashboard/clientes')) return 'clients'; // Corrigido para 'clientes'
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    return '';
  };

  const currentActiveSectionId = getActiveSectionId();

  // Não precisamos mais de handleNavigation se estamos usando Link para navegação simples
  // Apenas a deixei comentada para referência se houver necessidade futura de lógica extra no clique

  return (
    <motion.header
      className="bg-gradient-to-l from-zinc-100 to-slate-300 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Seção Esquerda: Logo e Título do Módulo */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className='flex-col'>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Agendify
                </h1>
                <p className="text-xs text-gray-500">NovaTech Desenvolvimento</p>
              </div>
            </Link>
          </div>

          {/* Seção Central: Navegação de Seções (Apenas em MD e acima) */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Link para Dashboard (visível para todos os usuários logados) */}
            <Link
              key="dashboard"
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentActiveSectionId === 'dashboard'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>

            {/* Links para Agendamentos, Calendário e Clientes - Visíveis para ADMIN e EMPLOYEE */}
            {(user?.type === UserType.ADMIN || user?.type === UserType.EMPLOYEE) && (
              <>
                <Link
                  key="appointments"
                  to="/dashboard/agendamentos"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentActiveSectionId === 'appointments'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Agendamentos
                </Link>
                <Link
                  key="calendar"
                  to="/dashboard/calendario"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentActiveSectionId === 'calendar'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Calendário
                </Link>
                <Link
                  key="clients"
                  to="/dashboard/clientes" // Caminho corrigido para "clientes"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentActiveSectionId === 'clients'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Clientes
                </Link>
              </>
            )}

            {/*
              // Exemplo de links EXCLUSIVOS para ADMIN, se houver:
              {user?.type === UserType.ADMIN && (
                <Link
                  key="admin-only-feature"
                  to="/dashboard/admin-feature"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentActiveSectionId === 'admin-only-feature'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Gestão Admin
                </Link>
              )}

              // Exemplo de links EXCLUSIVOS para PATIENT, se houver:
              {user?.type === UserType.PATIENT && (
                <Link
                  key="my-appointments"
                  to="/dashboard/meus-agendamentos" // Assumindo que você terá uma rota para isso
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentActiveSectionId === 'my-appointments'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Meus Agendamentos
                </Link>
              )}
            */}
          </nav>

          {/* Seção Direita: Notificações, Configurações, Perfil e Botão Sair */}
          <div className="flex items-center space-x-3">
            {/* Botões de Ícones (Notificações, Configurações) */}
            <motion.button
              className="p-2 rounded-lg hover:bg-purple-50 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full animate-pulse"></span>
            </motion.button>
            <motion.button
              className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </motion.button>

            {/* Nome do Usuário e Ícone de Perfil */}
            {user && (
              <div className="flex items-center space-x-4 ">
                <div className="h-5 w-5 bg-gradient-to-r from-green-400 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className='flex-col justify-items-center'>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                  <motion.button
                    onClick={logout}
                    className="flex items-center px-2 hover:text-red-600 text-gray-500 shadow-sm transition duration-200"
                  >
                    Sair
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;