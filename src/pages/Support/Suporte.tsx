import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "Como faço para agendar uma consulta?",
    answer: "Para agendar, vá em 'Agendamentos' no menu, clique em 'Novo Agendamento' e preencha os dados do cliente, selecionando data e horário."
  },
  {
    question: "Posso cancelar ou reagendar um agendamento?",
    answer: "Sim. Na página 'Agendamentos', localize a consulta e use as opções de 'Reagendar' ou 'Cancelar'."
  },
  {
    question: "Onde posso gerenciar meus clientes?",
    answer: "Acesse a seção 'Clientes' para adicionar, editar e visualizar o histórico de agendamentos."
  },
  {
    question: "Esqueci minha senha, o que devo fazer?",
    answer: "Na tela de login, clique em 'Esqueci minha senha' para redefinir. Um e-mail com instruções será enviado."
  }
];

const SupportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-2xl">
        <motion.h1 
          className="text-3xl font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Central de Ajuda
        </motion.h1>
        <motion.p 
          className="text-center text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Encontre respostas rápidas para suas dúvidas.
        </motion.p>
        
        {/* Seção de Perguntas Frequentes */}
        <div className="mb-8 mt-12">
          <motion.h2 
            className="text-xl font-semibold text-gray-700 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Perguntas Frequentes
          </motion.h2>
          <hr className="my-4 border-t border-gray-200" />
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="pb-4 group" // Adicionamos 'group' para o hover
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-300">{faq.question}</h3>
                <p className="mt-1 text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Linha divisória fina */}
        <hr className="my-6 border-t border-gray-200" />

        {/* Seção de Contato */}
        <div className="text-center">
          <motion.h2 
            className="text-xl font-semibold text-gray-700 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Ainda Precisa de Ajuda?
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Se você não encontrou o que precisava, nossa equipe de suporte está pronta para ajudar.
          </motion.p>
          <div className="flex justify-center items-center space-x-6">
            <motion.a 
              href="mailto:contato@agendify.com" 
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>E-mail</span>
            </motion.a>
            <motion.a 
              href="tel:+5511999999999" 
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.134l-2.75 1.577a4.42 4.42 0 002.57 2.571l1.577-2.751a1 1 0 011.134-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>Telefone</span>
            </motion.a>
          </div>
        </div>

        {/* Botão de Voltar */}
        <div className="text-center mt-8">
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-medium transition-colors duration-300 hover:bg-gray-200 hover:text-gray-800"
            >
              Voltar para a Página Inicial
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;