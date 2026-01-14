import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import { useTransactions } from '../context/TransactionContext';

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type VoiceState = 'listening' | 'processing' | 'preview';

export const VoiceOverlay: React.FC<VoiceOverlayProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  const [voiceState, setVoiceState] = useState<VoiceState>('listening');
  const [transcript, setTranscript] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      setVoiceState('listening');
      setTranscript("");
      
      // Simulate flow
      const listenTimer = setTimeout(() => {
        setVoiceState('processing');
      }, 3000);

      const processTimer = setTimeout(() => {
        setTranscript("Spent 58 dollars at Starbucks for coffee...");
        setVoiceState('preview');
      }, 4500);

      return () => {
        clearTimeout(listenTimer);
        clearTimeout(processTimer);
      };
    }
  }, [isOpen]);

  const handleConfirm = () => {
    addTransaction({
      title: 'Starbucks',
      amount: -58.00,
      category: 'food',
      date: new Date(),
      type: 'expense'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* Main Card */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="p-8 flex flex-col items-center min-h-[400px]">
          
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <Icon name="x" size={24} />
          </button>

          {voiceState !== 'preview' && (
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-serif text-aether-text mb-2">
                  {voiceState === 'listening' ? "Listening..." : "Processing..."}
                </h3>
                <p className="text-gray-400">Speak naturally, like talking to an assistant.</p>
              </div>

              {/* Waveform Animation */}
              <div className="h-32 flex items-center justify-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-aether-primary rounded-full"
                    animate={{
                      height: voiceState === 'listening' ? [15, 60, 15] : 10,
                      opacity: voiceState === 'listening' ? 1 : 0.3
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {voiceState === 'preview' && (
            <div className="w-full flex-1 flex flex-col animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-aether-primary">
                  <Icon name="check" size={32} />
                </div>
                <h3 className="text-xl font-medium text-aether-text">I caught that</h3>
                <p className="text-gray-500 italic mt-2">"{transcript}"</p>
              </div>

              {/* Receipt Preview */}
              <div className="bg-[#F9F8F6] p-6 rounded-2xl border border-aether-border space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 text-sm">Merchant</span>
                  <span className="font-medium text-aether-text">Starbucks</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 text-sm">Amount</span>
                  <span className="font-medium text-xl text-aether-text">-$58.00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 text-sm">Category</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="font-medium text-aether-text">Coffee & Dining</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Date</span>
                  <span className="font-medium text-aether-text">Today, 10:42 AM</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full bg-aether-primary text-white py-4 rounded-xl font-medium shadow-lg hover:bg-[#3D4F41] transition-colors"
              >
                Confirm Transaction
              </motion.button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};