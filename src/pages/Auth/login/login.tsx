import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para gerenciar o estado do botão
  const { login } = useAuth(); // Pega a função de login do contexto
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // TENTA O LOGIN
      await login({ email, password })
    } catch(err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao tentar login, verifique"
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Container principal com o fundo pastel */}
      <div className="relative p-8 rounded-lg shadow-xl w-full max-w-md bg-gradient-to-br from-pastel-light to-yellow-100/75 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="seuemail@exemplo.com"
            />
          </div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 hover:border-gray-400"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-pastel-dark hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </a>
        </p>
        <p className='mt-4 text-center text-sm text-gray-400'>
          <a href="#" className='font-medium text-purple-600 hover:text-indigo-500'>Esqueceu a senha?</a>
        </p>
      </div>
    </div>
  );
}