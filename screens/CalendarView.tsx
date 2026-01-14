import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icons';
import { useTransactions } from '../context/TransactionContext';
import { getCategoryInfo } from '../constants';

export const CalendarView: React.FC = () => {
  const { transactions } = useTransactions();
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  
  // Generate calendar days for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDayTransactions = (day: number) => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  };

  const getDots = (day: number) => {
    const dailyTx = getDayTransactions(day);
    if (dailyTx.length === 0) return [];
    
    // Sort logic: Income first (green), then High expense (amber), then normal
    // Limit to 2 dots
    const dots: string[] = [];
    const hasIncome = dailyTx.some(t => t.type === 'income');
    const hasHighExpense = dailyTx.some(t => t.amount < -100);
    const hasExpense = dailyTx.some(t => t.type === 'expense');

    if (hasIncome) dots.push('bg-aether-primary');
    if (hasHighExpense) dots.push('bg-amber-400');
    else if (hasExpense && dots.length < 2) dots.push('bg-gray-300');

    return dots;
  };

  const activeTransactions = getDayTransactions(selectedDate);

  return (
    <div className="pb-24 pt-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-aether-text">
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><Icon name="chevron-left" size={20}/></button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-aether-text"><Icon name="chevron-right" size={20}/></button>
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-aether-border">
        <div className="grid grid-cols-7 mb-4">
          {weekDays.map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-4">
          {days.map(day => {
            const isSelected = selectedDate === day;
            const dots = getDots(day);
            return (
              <button 
                key={day} 
                onClick={() => setSelectedDate(day)}
                className="flex flex-col items-center gap-1 relative h-10"
              >
                <div className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all
                  ${isSelected ? 'bg-aether-text text-white shadow-lg' : 'text-aether-text hover:bg-gray-50'}
                `}>
                  {day}
                </div>
                <div className="flex gap-0.5">
                  {dots.map((color, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${color}`} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Log */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-aether-text px-2">
             {today.toLocaleString('en-US', { month: 'long' })} {selectedDate}
          </h3>
          
          <div className="space-y-3">
             {activeTransactions.length === 0 ? (
               <div className="text-center py-8 text-gray-400 italic">No activity for this day.</div>
             ) : (
               activeTransactions.map((t) => {
                 const categoryInfo = getCategoryInfo(t.category);
                 return (
                   <div key={t.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-aether-border/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-aether-bg rounded-xl flex items-center justify-center text-aether-text/70">
                          <Icon name={categoryInfo.icon} size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-aether-text text-sm">{t.title}</p>
                          <p className="text-xs text-gray-400 capitalize">{t.category}</p>
                        </div>
                      </div>
                      <span className={`font-medium text-sm ${t.amount > 0 ? 'text-aether-primary' : 'text-aether-text'}`}>
                        {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </span>
                   </div>
                 );
               })
             )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};