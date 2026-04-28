import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { LogOut, Plus, Trash2, CheckCircle2, Circle, Clock, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const res = await api.post('/tasks', { title: newTask });
            setTasks([res.data, ...tasks]);
            setNewTask('');
        } catch (error) {
            console.error("Failed to add task");
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        try {
            const res = await api.put(`/tasks/${task.id}`, { status: newStatus });
            setTasks(tasks.map(t => t.id === task.id ? res.data : t));
        } catch (error) {
            console.error("Failed to update task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error("Failed to delete task");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const pendingCount = tasks.filter(t => t.status === 'Pending').length;
    const completedCount = tasks.filter(t => t.status === 'Completed').length;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">SpaceTask</h1>
                    </div>
                    <button 
                        onClick={logout}
                        className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Tasks</p>
                            <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending</p>
                            <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Completed</p>
                            <p className="text-2xl font-bold text-slate-800">{completedCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <form onSubmit={handleAddTask} className="flex gap-3">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="What needs to be done?"
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                            />
                            <button
                                type="submit"
                                disabled={!newTask.trim()}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="hidden sm:inline">Add Task</span>
                            </button>
                        </form>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {tasks.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-800 mb-1">No tasks yet</h3>
                                <p>Add a task above to get started.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div 
                                    key={task.id} 
                                    className={`p-4 flex items-center gap-4 transition-all hover:bg-slate-50 group ${task.status === 'Completed' ? 'opacity-75' : ''}`}
                                >
                                    <button 
                                        onClick={() => toggleStatus(task)}
                                        className={`flex-shrink-0 transition-colors ${task.status === 'Completed' ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-300 hover:text-indigo-500'}`}
                                    >
                                        {task.status === 'Completed' ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : (
                                            <Circle className="w-6 h-6" />
                                        )}
                                    </button>
                                    
                                    <div className="flex-1 min-w-0">
                                        <p className={`truncate text-base transition-all ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                            {task.title}
                                        </p>
                                    </div>

                                    <button 
                                        onClick={() => deleteTask(task.id)}
                                        className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                                        title="Delete Task"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
