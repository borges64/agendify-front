import React from "react"
import { useAuth } from "../../context/AuthContext"
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "../../components/Header";


const pageTransitionVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -40 }
};


export function Dashboard() {
  // const { user, logout } = useAuth();

  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 p-6 md:p-8 overflow-auto">
        <main className="flex-1 flex flex-col"> {/* Adicionei uma tag <main> para semântica e flex-col */}
          {/* <AnimatePresence for page transitions between child pages /> */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={location.pathname} // A chave é crucial para o AnimatePresence saber quando um componente saiu/entrou
              initial="initial"
              animate="in"
              exit="out"
              variants={pageTransitionVariants}
              transition={{ duration: 0.1 }}
              className="h-full w-full flex-1" // Garante que a div de animação ocupe o espaço necessário e seja flexível
            >
               {/* Aqui será renderizado o conteúdo da sub-rota */}
                
              <Outlet 
              
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}