import { AuthUser, LoginPayload, LoginResponse } from '../utils/allInterfaces';
import api from './api'; // Importa a instância do Axios que configuramos

export const authService = {
  // Função para fazer a requisição de login ao backend
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', payload);
      return response.data; // Retorna os dados da resposta (incluindo o token)
    } catch (error: any) {
      // Trata erros específicos do login, como credenciais inválidas
      console.error('Erro no login:', error.response?.data || error.message);
      throw error; // Relança o erro para ser tratado no componente que chamou
    }
  },

  // Função para buscar o perfil do usuário (usando o token JWT)
  // Assumimos que você tem um endpoint /auth/profile no seu NestJS que retorna os dados do usuário logado.
  getProfile: async (): Promise<AuthUser> => {
    try {
      const response = await api.get<AuthUser>('/auth/profile');
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error.response?.data || error.message);
      throw error;
    }
  },

  // Para JWT, o "logout" no frontend é apenas remover o token armazenado.
  // Não há necessidade de uma chamada ao backend para isso, a menos que você queira
  // invalidar o token no servidor (raramente feito para tokens de acesso curtos).
  logout: () => {
    // A lógica de remoção do token e usuário será no AuthContext
  },
};