import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/Icons';
import { CATEGORIES } from '../constants';
import { useTransactions } from '../context/TransactionContext';

export const AddTransactionView: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [justAdded, setJustAdded] = useState(false);

  const handlePress = (val: string) => {
    if (val === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? val : prev + val);
    }
  };

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount === 0) return;

    addTransaction({
      title: 'Manual Entry',
      amount: -numericAmount, // Default to expense
      category: selectedCategory,
      date: new Date(),
      type: 'expense'
    });

    setJustAdded(true);
    setAmount('0');
    setTimeout(() => setJustAdded(false), 2000);
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] pt-6">
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
         <span className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Enter Amount</span>
         <div className="flex items-start">
            <span className="text-3xl font-serif text-aether-text mt-2">$</span>
            <span className="text-7xl font-light text-aether-text tracking-tighter">
              {amount}
            </span>
         </div>
      </div>

      {/* Category Horizontal Scroll */}
      <div className="mb-8 w-full overflow-x-auto no-scrollbar px-6">
        <div className="flex gap-3 w-max">
           {CATEGORIES.map(cat => (
             <button
               key={cat.id}
               onClick={() => setSelectedCategory(cat.id)}
               className={`
                 flex items-center gap-2 px-5 py-3 rounded-full border transition-all
                 ${selectedCategory === cat.id 
                   ? 'bg-aether-text text-white border-aether-text shadow-lg transform scale-105' 
                   : 'bg-white text-gray-500 border-aether-border hover:bg-gray-50'
                 }
               `}
             >
               <Icon name={cat.icon} size={16} />
               <span className="text-sm font-medium whitespace-nowrap">{cat.label}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Soft Keypad */}
      <div className="grid grid-cols-3 gap-4 px-6 mb-6">
         {keys.map(k => (
           <motion.button
             key={k}
             whileTap={{ scale: 0.95, backgroundColor: '#E5E2DD' }}
             onClick={() => handlePress(k)}
             className="h-16 rounded-2xl flex items-center justify-center text-2xl text-aether-text font-light"
           >
             {k === 'backspace' ? <Icon name="x" size={24} /> : k}
           </motion.button>
         ))}
      </div>

      <div className="px-6">
        <button 
          onClick={handleSubmit}
          className={`
            w-full py-4 rounded-2xl font-medium shadow-lg transition-all
            ${justAdded ? 'bg-green-600 text-white' : 'bg-aether-primary text-white hover:bg-[#3D4F41]'}
          `}
        >
          {justAdded ? 'Added!' : 'Add Transaction'}
        </button>
      </div>
    </div>
  );
};