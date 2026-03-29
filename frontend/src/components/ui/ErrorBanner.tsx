import { AlertCircle, X, RotateCcw, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NormalizedError } from '../../types';

interface ErrorBannerProps {
  error: NormalizedError | null;
  onClose?: () => void;
  onRetry?: () => void;
  onViewDetails?: () => void;
}

export function ErrorBanner({ error, onClose, onRetry, onViewDetails }: ErrorBannerProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-6 border border-red-200 rounded-2xl bg-red-50 shadow-sm"
        >
          <div className="flex items-start md:items-center space-x-3 mb-4 md:mb-0">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">{error.message}</p>
              <p className="text-xs text-red-600/80 mt-0.5">Technical ID: {error.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            {onViewDetails && (
              <button
                onClick={onViewDetails}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 text-xs font-bold text-red-700 transition-all bg-white border border-red-200 rounded-xl hover:bg-red-100 active:scale-95"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>View details</span>
              </button>
            )}
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 text-xs font-bold text-white transition-all bg-red-600 rounded-xl hover:bg-red-700 shadow-sm active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-xl hover:bg-red-100 text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
