import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit3, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../../types';
import { cn } from '../../utils/cn';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
  key?: string;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(task.id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "group relative flex items-start p-5 space-x-4 transition-all border rounded-2xl bg-white",
          task.completed ? "border-slate-100 bg-slate-50/50" : "border-slate-200 hover:border-blue-200 hover:shadow-md",
          (isDeleting || isToggling) && "opacity-60 pointer-events-none"
        )}
      >
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={cn(
            "mt-1 transition-transform active:scale-90 relative",
            task.completed ? "text-blue-500" : "text-slate-300 hover:text-slate-400"
          )}
        >
          {isToggling ? (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : task.completed ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={cn(
                "text-lg font-bold transition-all truncate",
                task.completed ? "text-slate-400 line-through" : "text-slate-900"
              )}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-2 transition-colors rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 transition-colors rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm mb-3 line-clamp-2",
              task.completed ? "text-slate-400" : "text-slate-600"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(task.createdAt).toLocaleString()}</span>
            </div>
            {task.completed && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                Completed
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        isDestructive
      />
    </>
  );
}
