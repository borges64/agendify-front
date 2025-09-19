import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X } from 'lucide-react';
import { User, EditableUser } from '../utils/allInterfaces';

interface EditProfileModalProps {
  user: User;
  token: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, token, isOpen, onClose, onUpdate }) => {
  const [editedUser, setEditedUser] = useState<EditableUser>({
    name: '',
    email: '',
    phone: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await axios.put<User>(
        `http://localhost:3000/user/${user.id}`,
        editedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data); // Chama a função de atualização no componente pai
      onClose(); // Fecha o modal
    } catch (err: any) {
      console.error('Erro ao atualizar o perfil:', err);
      setError('Falha ao atualizar. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            initial={{ y: "-100vh" }}
            animate={{ y: "0" }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Configurações do Perfil</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                  disabled={isSaving}
                >
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;