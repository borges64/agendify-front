import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, AuthUser, LoginPayload } from '../utils/allInterfaces'; // Importa nossos tipos
import { authService } from '../services/authService'; // Importa o serviço de autenticação
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  type: 'admin' | 'employee' | 'patient'; // ESSENCIAL: Garanta que o tipo esteja aqui
  companyId?: string; // Se você incluiu no payload para Employee
  patientId?: string; // Se você incluiu no payload para Patient
}

// 1. Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Define as props para o provedor do contexto
interface AuthProviderProps {
  children: ReactNode; // 'children' é o conteúdo que será envolvido pelo provedor
}

// 3. O componente provedor do contexto de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Para o carregamento inicial da autenticação
  const navigate = useNavigate(); // Hook para navegação programática

  // 4. Função de LOGIN
  const login = useCallback(async (credentials: LoginPayload) => {
    setLoading(true); // Indica que o login está em andamento
    try {
      const response = await authService.login(credentials); // Chama o serviço de login
      const receivedToken = response.access_token;

      // Armazena o token no localStorage
      localStorage.setItem('accessToken', receivedToken);
      setToken(receivedToken); // Atualiza o estado do token

      // Após receber o token, buscar os dados do usuário logado
      const fetchedUser = await authService.getProfile();
      localStorage.setItem('authUser', JSON.stringify(fetchedUser)); // Armazena os dados do usuário
      setUser(fetchedUser); // Atualiza o estado do usuário
      console.log(response, fetchedUser)
      navigate('/dashboard'); // Redireciona para a dashboard após login bem-sucedido
    } catch (error) {
      console.error('Erro na função login do AuthContext:', error);
      // Em caso de erro, limpa qualquer token ou usuário residual
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authUser');
      setToken(null);
      setUser(null);
      throw error; // Re-lança o erro para ser tratado pelo componente LoginPage
    } finally {
      setLoading(false); // Finaliza o carregamento, independente do sucesso/falha
    }
  }, [navigate]); // navigate é uma dependência do useCallback

  // 5. Função de LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken'); // Remove o token do localStorage
    localStorage.removeItem('authUser');   // Remove os dados do usuário do localStorage
    setToken(null);
    setUser(null);
    navigate('/login'); // Redireciona para a página de login
  }, [navigate]);

  // 6. Efeito para verificar o estado de autenticação ao carregar a aplicação
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        // Opcional: Você pode adicionar aqui uma lógica para verificar a validade/expiração do token
        // antes de definir o usuário e token. Por simplicidade, vamos apenas assumir que é válido.
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
        // Se houver erro ao analisar os dados do usuário, limpe tudo
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false); // Marca o carregamento inicial como completo
  }, []); // O array de dependências vazio significa que ele roda apenas uma vez no mount


  const refreshUser = useCallback(async (updatedUser?: User) => {
    try {
      // Se um usuário atualizado for passado, usa-o
      if (updatedUser) {
        setUser(updatedUser);
      } else {
        // Caso contrário, busca os dados mais recentes do backend
        const response = await axios.get('http://localhost:3000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error('Falha ao atualizar o usuário:', error);
      // Se o token for inválido, faz logout
      logout();
    }
  }, [token, setUser]);

  // 7. Valor do contexto que será provido para os componentes filhos
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user, // Verdadeiro se tiver token E usuário
    loading,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 8. Hook personalizado para consumir o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};