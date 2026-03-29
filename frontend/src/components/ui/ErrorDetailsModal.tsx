import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, Clock, Info } from 'lucide-react';
import { NormalizedError } from '../../types';

interface ErrorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: NormalizedError | null;
}

export function ErrorDetailsModal({ isOpen, onClose, error }: ErrorDetailsModalProps) {
  if (!error) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-800 shadow-2xl pointer-events-auto rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <Terminal className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Technical Details</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 transition-colors rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="flex items-center space-x-2 mb-2 text-slate-400">
                      <Info className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Error Type</span>
                    </div>
                    <p className="text-sm font-mono text-red-400">{error.type}</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="flex items-center space-x-2 mb-2 text-slate-400">
                      <Terminal className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Status Code</span>
                    </div>
                    <p className="text-sm font-mono text-blue-400">{error.statusCode || 'N/A'}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Timestamp</span>
                  </div>
                  <p className="text-sm font-mono text-slate-300">{new Date(error.timestamp).toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Raw Message / Details</span>
                  </div>
                  <div className="p-4 bg-black/50 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {typeof error.details === 'string' 
                      ? error.details 
                      : JSON.stringify(error.details, null, 2)}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-bold text-white transition-all bg-slate-800 rounded-xl hover:bg-slate-700 active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
