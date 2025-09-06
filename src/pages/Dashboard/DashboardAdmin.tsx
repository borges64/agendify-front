import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosError } from 'axios';
import { AdminData, User, EditableUser } from '../../utils/allInterfaces';
import { ChevronDown, Search, X } from 'lucide-react';
import { UserType } from '../../utils/allInterfaces';
import { motion } from 'framer-motion';
import { useNotifications } from '../../components/NotifyComponent/notifcationContext';

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
      setEditedUser((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setEditedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-[100]">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Nome</label>
            <input type="text" name="name" value={editedUser.name || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">E-mail</label>
            <input type="email" name="email" value={editedUser.email || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Telefone</label>
            <input type="text" name="phone" value={editedUser.phone || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Tipo</label>
            <select name="type" value={editedUser.type || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="ADMIN">Administrador</option>
              <option value="PATIENT">Paciente</option>
              <option value="EMPLOYEE">Colaborador</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" name="isActive" checked={editedUser.isActive || false} onChange={(e) => setEditedUser((prev) => ({ ...prev, isActive: e.target.checked }))} className="h-4 w-4 text-teal-600 rounded" />
            <label className="ml-2 text-gray-700 font-medium">Usuário Ativo</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">Salvar Alterações</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Componente: Item de usuário da lista, atuando como um dropdown
const UserListItem: React.FC<{ user: User; isExpanded: boolean; onClick: () => void; onEdit: (user: User) => void }> = ({ user, isExpanded, onClick, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-2 overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200">
        <span className="font-medium text-gray-800 cursor-pointer" onClick={onClick}>{user.name}</span>
        <div className="flex items-center space-x-2">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${user.type === UserType.ADMIN ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-700'}`}>
                {user.type}
            </span>
            
            {/* Ícone de Edição */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no ícone feche o dropdown
                onEdit(user);
              }}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-500 transition-colors"
              aria-label={`Editar ${user.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Ícone de seta para o dropdown */}
            <button onClick={onClick} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="p-4 bg-gray-50 border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <ul className="text-sm text-gray-600 space-y-2">
            <li><span className="font-medium text-gray-700">ID:</span> {user.id}</li>
            <li><span className="font-medium text-gray-700">E-mail:</span> {user.email}</li>
            <li><span className="font-medium text-gray-700">Telefone:</span> {user.phone}</li>
            <li><span className="font-medium text-gray-700">Status:</span> 
              <span className={`font-semibold ml-1 ${user.isActive ? 'text-teal-500' : 'text-red-500'}`}>
                {user.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};


export const AdminDashboardPage: React.FC = () => {
    const { user, token } = useAuth();
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { addNotification } = useNotifications()

    const fetchAdminData = async () => {
        if (!user || user.type !== UserType.ADMIN || !token) {
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
            setEditingUser(null);
            fetchAdminData();

            const notificationMessage = `Usuário ${editedUser.name} foi editado com sucesso por ${user?.name}`
            addNotification(notificationMessage)

        } catch (err: unknown) {
            console.error('Erro ao atualizar usuário:', err);
        }
    };

    const filteredUsers = adminData?.allUsers.filter(u => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            u.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            u.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            (u.phone && u.phone.toLowerCase().includes(lowerCaseSearchTerm))
        );
    }) || [];

    const toggleDropdown = (userId: string) => {
      setExpandedUserId(prevId => (prevId === userId ? null : userId));
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

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard do Administrador</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Bem-vindo, <span className="font-semibold text-teal-600">{user?.name}</span>. Você está
                    {user?.type === UserType.ADMIN ? (
                        <span className="font-semibold text-gray-700 ml-1">Logado como Administrador</span>
                    ) : (
                        <span className="font-semibold text-teal-600 ml-1">Logado como {user?.type}</span>
                    )}
                    .
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100"><h3 className="text-sm font-medium text-gray-500 mb-2">Total de Usuários</h3><p className="text-3xl font-bold text-gray-900">{filteredUsers.length}</p></div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100"><h3 className="text-sm font-medium text-gray-500 mb-2">Usuários Ativos</h3><p className="text-3xl font-bold text-teal-600">{filteredUsers.filter(u => u.isActive).length}</p></div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100"><h3 className="text-sm font-medium text-gray-500 mb-2">Usuários Admin</h3><p className="text-3xl font-bold text-gray-900">{filteredUsers.filter(u => u.type === UserType.ADMIN).length}</p></div>
                </div>

                <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Usuários</h2>
                    
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar por nome, e-mail ou telefone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((u) => (
                            <UserListItem
                                key={u.id}
                                user={u}
                                isExpanded={expandedUserId === u.id}
                                onClick={() => toggleDropdown(u.id)}
                                onEdit={handleEditUser}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">Nenhum usuário encontrado.</p>
                    )}
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