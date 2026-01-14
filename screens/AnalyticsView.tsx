import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from '../components/Icons';
import { getCategoryInfo } from '../constants';
import { useTransactions } from '../context/TransactionContext';

export const AnalyticsView: React.FC = () => {
  const { transactions } = useTransactions();
  const healthScore = 85;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (healthScore / 100) * circumference;

  const analyticsData = useMemo(() => {
    // 1. Group by category
    const grouped: Record<string, number> = {};
    let total = 0;

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const amount = Math.abs(t.amount);
        grouped[t.category] = (grouped[t.category] || 0) + amount;
        total += amount;
      }
    });

    // 2. Format for Recharts
    return Object.entries(grouped).map(([id, amount]) => {
      const info = getCategoryInfo(id);
      return {
        category: info.label,
        amount,
        color: info.color
      };
    }).sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const totalSpent = analyticsData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="pb-24 pt-4 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-serif text-aether-text">Financial Health</h1>
      </header>

      {/* Health Score */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-aether-border flex items-center justify-between relative overflow-hidden">
        <div>
          <p className="text-sm text-gray-400 mb-1">Overall Score</p>
          <div className="flex items-baseline gap-1">
             <span className="text-4xl font-serif text-aether-text">{healthScore}</span>
             <span className="text-gray-400">/100</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-aether-primary rounded-full text-xs font-medium">
            <Icon name="trending-up" size={12} />
            <span>Top 10%</span>
          </div>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
           <svg className="transform -rotate-90 w-32 h-32">
             <circle cx="64" cy="64" r={radius} stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
             <circle 
                cx="64" 
                cy="64" 
                r={radius} 
                stroke="#4A5D4E" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={circumference - progress} 
                strokeLinecap="round"
             />
           </svg>
           <div className="absolute inset-0 flex items-center justify-center">
             <Icon name="shield" className="text-aether-primary" size={32} />
           </div>
        </div>
      </div>

      {/* Spend Breakdown */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-aether-border">
         <h3 className="text-aether-text font-medium mb-4">Spend Breakdown</h3>
         <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-xs text-gray-400">Total</span>
               <span className="font-serif font-medium text-aether-text">
                 {totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
               </span>
            </div>
         </div>
         
         {/* Legend */}
         <div className="grid grid-cols-2 gap-3 mt-4">
            {analyticsData.map(d => (
              <div key={d.category} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-sm text-gray-500">{d.category}</span>
                <span className="text-sm font-medium text-aether-text ml-auto">${d.amount.toLocaleString()}</span>
              </div>
            ))}
         </div>
      </div>

      {/* AI Insight */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#4A5D4E] to-[#3A4A3E] rounded-3xl p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Icon name="sparkles" size={64} />
        </div>
        <div className="flex gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
             <Icon name="sparkles" size={20} className="text-white" />
          </div>
          <div>
            <h4 className="font-serif text-lg mb-1">Insight</h4>
            <p className="text-sm text-gray-200 leading-relaxed opacity-90">
              You spent 15% less on dining out this week compared to your average. That's an extra $45 in your pocket!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};