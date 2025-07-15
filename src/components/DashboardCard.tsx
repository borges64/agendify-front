import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
// import StatsCard from '../../../../agendifyfront/src/components/StatsCard';

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode; // Para um futuro ícone (se usar Heroicons, por exemplo)
  children: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center"
      variants={cardVariants}
      whileHover={{ scale: 1.03 }} // Animação ao passar o mouse
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon && <div className="text-indigo-600 mb-4 text-4xl">{icon}</div>}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </motion.div>
  );
};

export default DashboardCard;