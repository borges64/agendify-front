// src/pages/Dashboard/DashboardRouter.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Ajuste o caminho conforme necessário
import { UserType } from '../../utils/allInterfaces'; // Ajuste o caminho conforme necessário
import { AdminDashboardPage } from './DashboardAdmin';
import { EmployeeDashboardPage } from './DashboardEmployee';
import { PatientDashboardPage } from './DashboardPatient';

// src/pages/Dashboard/DashboardRouter.tsx
export const DashboardRouter: React.FC = () => {
  const { user, loading } = useAuth(); // Importa user e loading

  if (loading) { // Se estiver carregando, mostra "Carregando..."
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        Carregando informações do usuário...
      </div>
    );
  }

  // AGORA, ADICIONE UMA VERIFICAÇÃO PARA SE O USUÁRIO É NULO APÓS O CARREGAMENTO
  if (!user) { // Se não estiver carregando, mas o usuário for nulo (ex: sessão inválida)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
        Acesso não autorizado. Faça login novamente.
      </div>
    );
  }

  // Só então, baseado no tipo de usuário:
  if (user.type === UserType.ADMIN) {
    return <AdminDashboardPage />;
  } else if (user.type === UserType.EMPLOYEE) {
    return <EmployeeDashboardPage />;
  } else if (user.type === UserType.PATIENT) {
    return <PatientDashboardPage />;
  } else {
    // Este else só será alcançado se user.type for um valor que não corresponde a nenhum UserType,
    // o que indica um problema nos dados do usuário ou na enumeração.
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
        Tipo de usuário desconhecido: {user.type}.
      </div>
    );
  }
};