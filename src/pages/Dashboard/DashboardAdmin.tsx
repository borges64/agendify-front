import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export const AdminDashboardPage = () => {
    const { user, token } = useAuth(); // Pegue o token do contexto
    const [adminData, setAdminData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            // Verifique se o usuário existe, se ele é admin e se há um token
            if (user && user.type === 'ADMIN' && token) {
                try {
                    const response = await axios.get('http://localhost:3000/dashboards/admin', { // Chame o endpoint do seu backend
                        headers: {
                            Authorization: `Bearer ${token}`, // Envie o token de autorização
                        },
                    });
                    setAdminData(response.data);
                } catch (err: any) {
                    console.error('Erro ao buscar dados do dashboard de administrador:', err);
                    if (err.response && err.response.status === 403) {
                        setError('Acesso negado. Você não tem permissão de administrador para estes dados.');
                    } else {
                        setError('Erro ao carregar dados do dashboard de administrador.');
                    }
                }
            } else {
                // Isso pode acontecer se alguém tentar acessar diretamente ou se o token for inválido
                setError('Acesso não autorizado para a dashboard de administrador.');
            }
        };

        fetchAdminData();
    }, [user, token]); // Re-executa se o objeto user ou token mudar

    if (error) {
        return <div className="text-red-500 font-bold p-4">{error}</div>;
    }

    if (!adminData) {
        return <div>Carregando dashboard de Admin...</div>;
    }

    return <>
        <div>
            <h2 className="text-3xl font-bold mb-4">Dashboard do Administrador</h2>
            <p>Bem-vindo, {user?.name} ({user?.email})! Você está logado como {user?.type}.</p>
            <div className="mt-4 p-4 bg-white rounded shadow">
                <h3>Dados recebidos do Backend:</h3>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(adminData, null, 2)}
                </pre>
            </div>
            ola
            {/* Adicione aqui os componentes e layout específicos da dashboard do administrador */}
        </div>
    </>
}