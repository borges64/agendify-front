import React from 'react';
import { Calendar, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-sm border-t border-purple-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AGENDIFY
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sistema completo de agendamento para empresas. Gerencie seus clientes, 
              agendamentos e calendário de forma simples e eficiente.
            </p>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition-colors">Suporte</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Tutoriais</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">API</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>contato@agendify.com</li>
              <li>(11) 9999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="border-t border-purple-100 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            © 2024 AGENDIFY. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-600 mt-2 sm:mt-0">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            <span>para facilitar seu negócio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;