import { Plus, XCircle } from "lucide-react"; // Importe XCircle para o botão de remover
import React, { useState } from "react";

interface Task {
    id: number;
    task: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

const DashboardContent: React.FC = () => {
    // 1. Estado para as Tarefas: Inicializamos com algumas tarefas de exemplo
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, task: 'Confirmar agendamento de Maria Silva', priority: 'high', completed: false },
        { id: 2, task: 'Ligar para Pedro Santos - reagendamento', priority: 'medium', completed: false },
        { id: 3, task: 'Atualizar dados de Ana Costa', priority: 'low', completed: true },
        { id: 4, task: 'Preparar relatório mensal', priority: 'medium', completed: false },
        { id: 5, task: 'Verificar estoque de materiais', priority: 'low', completed: false }
    ]);

    // Estados para o formulário de nova tarefa
    const [newTaskText, setNewTaskText] = useState<string>('');
    const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false); // Para mostrar/esconder o formulário

    // 2. Marcar/Desmarcar Tarefa como Concluída
    const handleToggleComplete = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // 3. Adicionar Nova Tarefa
    const handleAddTask = () => {
        if (newTaskText.trim() === '') {
            alert('A tarefa não pode estar vazia!');
            return;
        }

        const newTask: Task = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // Gerar ID único simples
            task: newTaskText,
            priority: newTaskPriority,
            completed: false,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTaskText(''); // Limpar campo de texto
        setNewTaskPriority('medium'); // Resetar prioridade
        setShowAddTaskForm(false); // Esconder formulário após adicionar
    };

    // 4. Remover Tarefa (Opcional, mas útil)
    const handleRemoveTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex-col items-center justify-between">
                CONTEUDO DASHBOARD CONTENTs
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Tarefas Pendentes</h2>
                    <button
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm bg-purple-50 px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                        onClick={() => setShowAddTaskForm(!showAddTaskForm)} // Toggle o formulário
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar
                    </button>
                </div>

                {/* Formulário para Adicionar Nova Tarefa */}
                {showAddTaskForm && (
                    <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Nova Tarefa</h3>
                        <input
                            type="text"
                            placeholder="Descreva a tarefa..."
                            className="w-full p-2 border border-purple-300 rounded-md mb-3 focus:ring-purple-500 focus:border-purple-500"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                        />
                        <select
                            className="w-full p-2 border border-purple-300 rounded-md mb-3 focus:ring-purple-500 focus:border-purple-500"
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value as 'high' | 'medium' | 'low')}
                        >
                            <option value="high">Prioridade Alta</option>
                            <option value="medium">Prioridade Média</option>
                            <option value="low">Prioridade Baixa</option>
                        </select>
                        <button
                            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition-colors"
                            onClick={handleAddTask}
                        >
                            Adicionar Tarefa
                        </button>
                    </div>
                )}

                <div className="space-y-3">
                    {/* Renderiza as tarefas do estado 'tasks' */}
                    {tasks.length === 0 && (
                        <p className="text-center text-gray-500">Nenhuma tarefa pendente. Que maravilha!</p>
                    )}

                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                                task.completed ? 'bg-emerald-50 border border-emerald-200' : 'bg-white/50 border border-purple-100 hover:bg-white/80'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task.id)} // Adiciona o manipulador de evento
                                className="w-4 h-4 text-purple-600 bg-white border-purple-300 rounded focus:ring-purple-500"
                            />
                            <div className="flex-1">
                                <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                    {task.task}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            task.priority === 'high' ? 'bg-rose-100 text-rose-800' :
                                            task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveTask(task.id)} // Botão de remover
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Remover tarefa"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;