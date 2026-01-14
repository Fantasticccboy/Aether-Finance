import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';

export const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex items-center gap-2 bg-white text-aether-text px-4 py-3 rounded-2xl shadow-lg border border-aether-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">Scan Invoice</span>
              <Icon name="scan" size={18} className="text-aether-primary" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2 bg-white text-aether-text px-4 py-3 rounded-2xl shadow-lg border border-aether-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">Voice Command</span>
              <Icon name="mic" size={18} className="text-aether-primary" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300
          ${isExpanded ? 'bg-aether-text rotate-45' : 'bg-aether-primary'}
        `}
      >
        {isExpanded ? (
           <span className="text-white text-2xl font-light">+</span>
        ) : (
          <div className="relative">
             <div className="absolute inset-0 bg-white opacity-20 blur-lg rounded-full"></div>
             <Icon name="grid" size={24} className="text-white" />
          </div>
        )}
      </motion.button>
    </div>
  );
};