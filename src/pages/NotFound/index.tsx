import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Importe 'Variants' aqui!

const NotFoundPage: React.FC = () => {
  // --- Definição das Variantes de Animação ---
  // Tipando explicitamente 'Variants' para ajudar o TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  // --- Fim da Definição das Variantes ---

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4"
        variants={containerVariants} // Agora o TypeScript deve entender que é do tipo Variants
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full"
          variants={itemVariants} // Tipado também
        >
          <motion.h1
            className="text-9xl font-bold text-indigo-600 mb-4 animate-bounce"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 10 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-3xl font-semibold mb-3"
            variants={itemVariants}
          >
            Página Não Encontrada
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 mb-6"
            variants={itemVariants}
          >
            Ops! Parece que a página que você está procurando não existe.
            Talvez você tenha digitado o endereço errado ou a página tenha sido movida.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Voltar para o Início
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotFoundPage;