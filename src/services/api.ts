import axios from 'axios';

// 1. Crie uma instância do Axios com a URL base do seu backend
const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se que esta é a porta do seu backend NestJS
  headers: {
    'Content-Type': 'application/json', // Informa que estamos enviando JSON
  },
});

// 2. Interceptor para adicionar o token JWT em requisições
// Este interceptor será executado ANTES de cada requisição.
api.interceptors.request.use(
  (config: any) => {
    // Tenta pegar o token do localStorage
    const token = localStorage.getItem('accessToken');

    // Se houver um token, adicione-o ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    // Lida com erros na configuração da requisição
    return Promise.reject(error);
  }
);

// 3. Interceptor para lidar com respostas de erro (opcional, mas recomendado)
// Isso é útil para, por exemplo, deslogar o usuário automaticamente se o token expirar
api.interceptors.response.use(
  (response: any) => response, // Se a resposta for sucesso, apenas passe-a
  (error: any) => {
    // Se a resposta for 401 Unauthorized, pode significar que o token expirou
    if (error.response && error.response.status === 401) {
      console.warn('Requisição 401 Unauthorized. Token pode estar expirado ou inválido.');
      // Opcional: Dispare um evento de logout globalmente ou redirecione
      // window.location.href = '/login'; // Ou use o navigate do React Router
      // Vamos lidar com o logout no AuthContext para manter a responsabilidade lá.
    }
    return Promise.reject(error);
  }
);

export default api;