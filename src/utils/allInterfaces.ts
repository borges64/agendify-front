// src/utils/allInterfaces.ts

// Enum para os tipos de usuário (bom ter no frontend também)
export enum UserType {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  PATIENT = 'PATIENT',
}

// Define a estrutura de um usuário autenticado, como retornado pelo backend ou armazenado localmente
export interface AuthUser {
  id: number; // OU 'string' se seu ID for UUID no backend
  name: string;
  email: string;
  type: UserType; // <-- ADICIONADO: ESSENCIAL para o RBAC no frontend
  companyId?: string; // Opcional, se o funcionário tiver um companyId no seu perfil
  patientId?: string; // Opcional, se o paciente tiver um patientId no seu perfil
  // Adicione outras propriedades do usuário que você precise no frontend (ex: phone, address)
}

// Define a estrutura do payload de login que enviamos para o backend
export interface LoginPayload {
  email: string; // Confirmado que é 'email'
  password: string;
}

// Define a estrutura da resposta que esperamos do endpoint de login do backend
export interface LoginResponse {
  access_token: string; // O token JWT
  // Se o seu backend retornar dados do usuário diretamente no login, adicione aqui:
  // user?: AuthUser; // No seu caso, você busca o perfil separadamente, então não precisa aqui.
}

// Define a interface para o contexto de autenticação que será global
export interface AuthContextType {
  user: AuthUser | null; // Dados do usuário logado
  token: string | null; // O token JWT
  isAuthenticated: boolean; // Indica se o usuário está logado
  loading: boolean; // Indica se o estado de autenticação está sendo carregado (inicialmente)
  login: (credentials: LoginPayload) => Promise<void>; // Função para logar (recebe credenciais)
  logout: () => void; // Função para deslogar
}