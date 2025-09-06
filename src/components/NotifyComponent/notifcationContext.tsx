// src/context/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Adicione a dependência `uuid` (`npm install uuid @types/uuid`)

interface Notification {
    id: string;
    message: string;
    timestamp: number;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (message: string) => void;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((message: string) => {
        const newNotification: Notification = {
            id: uuidv4(),
            message,
            timestamp: Date.now(),
        };
        // Mantém apenas as últimas 5 notificações no log para evitar excesso
        setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications deve ser usado dentro de um NotificationProvider');
    }
    return context;
};