import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosError } from 'axios';
import { AdminData, User, EditableUser } from '../../utils/allInterfaces';

// Componente para exibir o formulário de edição em um modal
const EditUserModal: React.FC<{
  user: User;
  onClose: () => void;
  onSave: (editedUser: EditableUser) => void;
}> = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState<EditableUser>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    setEditedUser((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked,
    }));
  } else {
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={editedUser.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={editedUser.email || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="phone"
              value={editedUser.phone || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Tipo</label>
            <select
              name="type"
              value={editedUser.type || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="PATIENT">PATIENT</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isActive"
              checked={editedUser.isActive || false}
              onChange={(e) => setEditedUser((prev) => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 text-teal-600 rounded"
            />
            <label className="ml-2 text-gray-700 font-medium">Usuário Ativo</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente de cartão de usuário
const UserCard: React.FC<{ user: User; onEdit: (user: User) => void }> = ({ user, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-transform duration-300 hover:scale-[1.01]">
      {/* Container flexível para alinhar o ícone de perfil, nome e o botão de editar */}
      <div className="flex items-start justify-between mb-4">
        {/* Container para o ícone de perfil, nome e e-mail */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Botão de edição com ícone */}
        <button
          onClick={() => onEdit(user)}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-blue-500 transition-colors"
          aria-label={`Editar ${user.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* O resto do card permanece igual */}
      <ul className="text-sm text-gray-600 space-y-2">
        <li>
          <span className="font-medium text-gray-700">ID:</span> {user.id}
        </li>
        <li>
          <span className="font-medium text-gray-700">Tipo:</span>
          <span className={`inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${user.type === 'ADMIN' ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-700'}`}>
            {user.type}
          </span>
        </li>
        <li>
          <span className="font-medium text-gray-700">Telefone:</span> {user.phone}
        </li>
        <li>
          <span className="font-semibold text-gray-700">Status:</span>
          <span className={`font-semibold ${user.isActive ? 'text-teal-500' : 'text-red-500'}`}>
            {user.isActive ? 'Ativo' : 'Inativo'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export const AdminDashboardPage: React.FC = () => {
    const { user, token } = useAuth();
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const fetchAdminData = async () => {
        if (!user || user.type !== 'ADMIN' || !token) {
            setError('Acesso não autorizado para a dashboard de administrador.');
            return;
        }

        try {
            const response = await axios.get<AdminData>('http://localhost:3000/dashboards/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAdminData(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                console.error('Erro ao buscar dados do dashboard de administrador:', axiosError.response?.data);
                if (axiosError.response && axiosError.response.status === 403) {
                    setError('Acesso negado. Você não tem permissão de administrador para estes dados.');
                } else {
                    setError('Erro ao carregar dados do dashboard de administrador.');
                }
            } else {
                console.error('Erro desconhecido:', err);
                setError('Ocorreu um erro inesperado.');
            }
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, [user, token]);

    const handleEditUser = (userToEdit: User) => {
      setEditingUser(userToEdit);
    };

    const handleUpdateUser = async (editedUser: EditableUser) => {
        if (!token) return;

        try {
            await axios.put(`http://localhost:3000/user/${editedUser.id}`, editedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Após a atualização bem-sucedida, feche o modal e recarregue os dados da dashboard
            setEditingUser(null);
            fetchAdminData();
        } catch (err: unknown) {
            console.error('Erro ao atualizar usuário:', err);
            // Você pode adicionar um tratamento de erro para exibir uma mensagem para o usuário
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600 font-bold p-4">
                {error}
            </div>
        );
    }

    if (!adminData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-gray-500 text-lg">Carregando dashboard de Admin...</div>
            </div>
        );
    }

    const allUsers = adminData.allUsers || [];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard do Administrador</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Bem-vindo, <span className="font-semibold text-teal-600">{user?.name}</span>. Você está
                    {user?.type === 'ADMIN' ? (
                        <span className="font-semibold text-gray-700 ml-1">Logado como Administrador</span>
                    ) : (
                        <span className="font-semibold text-teal-600 ml-1">Logado como {user?.type}</span>
                    )}
                    .
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Total de Usuários</h3>
                        <p className="text-3xl font-bold text-gray-900">{allUsers.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Usuários Ativos</h3>
                        <p className="text-3xl font-bold text-teal-600">{allUsers.filter(u => u.isActive).length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Usuários Admin</h3>
                        <p className="text-3xl font-bold text-gray-900">{allUsers.filter(u => u.type === 'ADMIN').length}</p>
                    </div>
                </div>

                <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Usuários</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allUsers.map((u) => (
                            <UserCard key={u.id} user={u} onEdit={handleEditUser} />
                        ))}
                    </div>
                </div>
            </div>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleUpdateUser}
                />
            )}
        </div>
    );
};