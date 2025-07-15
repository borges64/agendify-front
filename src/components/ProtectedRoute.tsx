import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa o hook de autenticação

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto o estado de autenticação está sendo carregado, exiba um indicador
  // Isso é importante para evitar redirecionamentos indesejados antes de saber se o usuário está logado
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Carregando... {/* Em um projeto real, aqui seria um spinner de carregamento */}
      </div>
    );
  }

  // Se o usuário estiver autenticado, renderiza as rotas filhas (<Outlet />)
  // Caso contrário, redireciona para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;