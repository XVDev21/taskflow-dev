import { useState } from 'react';
import { Plus, Layout, CheckCircle2, ListTodo, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import { TaskList } from './components/tasks/TaskList';
import { TaskForm } from './components/tasks/TaskForm';
import { Loader } from './components/ui/Loader';
import { ErrorBanner } from './components/ui/ErrorBanner';
import { ErrorDetailsModal } from './components/ui/ErrorDetailsModal';
import { Task, CreateTaskInput, NormalizedError } from './types';

function Dashboard() {
  const { tasks, loading, error, addTask, updateTask, toggleTask, deleteTask, retry } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [localError, setLocalError] = useState<NormalizedError | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const handleOpenCreate = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await addTask(data);
      }
      setLocalError(null);
    } catch (err) {
      setLocalError(err as NormalizedError);
      throw err;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">TaskFlow</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Professional Edition</p>
            </div>
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-12">
        <ErrorBanner 
          error={error || localError} 
          onClose={() => setLocalError(null)} 
          onRetry={retry}
          onViewDetails={() => setIsErrorModalOpen(true)}
        />

        <ErrorDetailsModal 
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          error={error || localError}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ListTodo className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{tasks.length}</div>
            <div className="mt-1 text-sm font-medium text-slate-500">Tasks in your flow</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{pendingCount}</div>
            <div className="mt-1 text-sm font-medium text-slate-500">Awaiting action</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{completedCount}</div>
            <div className="mt-1 text-sm font-medium text-slate-500">Successfully finished</div>
          </motion.div>
        </div>

        {/* Task List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Your Tasks</h2>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-400">
              <span>{completedCount}</span>
              <span className="text-slate-200">/</span>
              <span>{tasks.length}</span>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={handleOpenEdit}
            />
          )}
        </div>
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}
