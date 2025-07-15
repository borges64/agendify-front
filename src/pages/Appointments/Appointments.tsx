import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Clock } from 'lucide-react';
import AppointmentForm from './AppointmentForm';


const AppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, client: 'João Silva', service: 'Corte de Cabelo', date: '2024-03-15', time: '14:00', status: 'confirmed', notes: 'Cliente preferencial' },
    { id: 2, client: 'Maria Santos', service: 'Manicure', date: '2024-03-15', time: '15:30', status: 'pending', notes: '' },
    { id: 3, client: 'Pedro Costa', service: 'Massagem', date: '2024-03-16', time: '16:00', status: 'confirmed', notes: 'Primeira vez' },
    { id: 4, client: 'Ana Oliveira', service: 'Limpeza de Pele', date: '2024-03-16', time: '17:00', status: 'confirmed', notes: '' },
    { id: 5, client: 'Carlos Lima', service: 'Depilação', date: '2024-03-17', time: '10:00', status: 'pending', notes: 'Cancelou uma vez' }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    cancelled: 'Cancelado'
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddAppointment = (newAppointment: any) => {
    setAppointments([...appointments, newAppointment]);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Agendamentos</h2>
          <p className="text-gray-600 mt-1">Gerencie todos os seus agendamentos</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-medium flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-purple-50">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">Todos os status</option>
                <option value="confirmed">Confirmados</option>
                <option value="pending">Pendentes</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data & Hora
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observações
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {appointment.client.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.client}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status as keyof typeof statusColors]}`}>
                      {statusLabels[appointment.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {appointment.notes || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-purple-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};

export default AppointmentsList;