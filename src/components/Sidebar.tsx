// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: '0%', transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.3 } }
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.05, originX: 0, color: '#FFFFFF' } // Animação ao passar o mouse
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Meus Agendamentos', path: '/dashboard/meus-agendamentos' },
    { name: 'Novo Agendamento', path: '/dashboard/novo-agendamento' },
    { name: 'Histórico', path: '/dashboard/historico' },
    { name: 'Configurações', path: '/dashboard/settings' }, // Exemplo
  ];

  return (
    <motion.nav
      className="bg-gray-800 text-white w-64 p-4 flex flex-col shadow-lg"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-xl font-bold mb-8 text-center">Menu</div>
      <ul className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <motion.li
            key={item.name}
            variants={linkVariants}
            whileHover="hover"
            className="w-full"
          >
            <Link
              to={item.path}
              className={`block py-2 px-4 rounded-md transition duration-200 ${
                location.pathname === item.path ? 'bg-indigo-700 font-semibold' : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Sidebar;