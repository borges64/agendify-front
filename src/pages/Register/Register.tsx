import axios from 'axios';
import { Import } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCreate } from '../../utils/allInterfaces';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para gerenciar o estado do botão
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const newUser: UserCreate = {
            email, name, password, phone, isActive
        }
         await axios.post<UserCreate>("http://localhost:3000/user/", newUser)
       navigate("/login")
    } catch(err: any) {
        if(axios.isAxiosError(err) && err.response) {
            setError(err.response.data.message || 'Ocorreu um erro ao criar a conta.');
        } else {
            setError("Ocorreu um erro inesperado")
        }
    } finally {
        setIsLoading(false)
    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Agendify Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          {/* Campo de Nome Completo */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="John Doe"
            />
          </div>
          {/* Campo de Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="(00) 99999-9999"
            />
          </div>
          {/* Campo de Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-600 focus:border-gray-600 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="********"
            />
          </div>
          {/* Exibição de Erro */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center justify-between"
            >
              <span className="block sm:inline text-sm">{error}</span>
              <button onClick={() => setError('')} className="text-red-700 hover:text-red-900 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition-colors duration-300 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600'
            }`}
          >
            {isLoading ? 'Criando...' : 'Criar Conta'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem uma conta?
            <a href="/login" className="font-medium text-gray-800 hover:text-gray-900 ml-1">
              Faça login
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}