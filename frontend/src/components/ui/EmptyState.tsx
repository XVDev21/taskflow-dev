import { motion } from 'motion/react';
import { ClipboardList, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick?: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl"
    >
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <ClipboardList className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No tasks yet</h3>
      <p className="text-slate-500 max-w-xs mb-8">
        Your task list is empty. Start by creating your first task to stay organized.
      </p>
      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create First Task</span>
        </button>
      )}
    </motion.div>
  );
}
