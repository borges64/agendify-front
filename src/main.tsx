import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolve todo o aplicativo para habilitar o roteamento */}
      <AuthProvider> {/* Envolve todo o aplicativo para fornecer o contexto de autenticação */}
        <App /> {/* O componente principal que contém suas rotas */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
