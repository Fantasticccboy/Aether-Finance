import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_CHART_DATA, getCategoryInfo } from '../constants';
import { FinancialStatus } from '../types';
import { getFinancialAdvice } from '../services/geminiService';
import { CashflowChart } from '../components/CashflowChart';
import { Icon } from '../components/Icons';
import { useTransactions } from '../context/TransactionContext';

export const Dashboard: React.FC = () => {
  const { transactions, balance, recentSpending } = useTransactions();
  const [financialStatus, setFinancialStatus] = useState<FinancialStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      // Use real balance and spending in the prompt
      const status = await getFinancialAdvice(balance, recentSpending);
      setFinancialStatus(status);
      setLoading(false);
    };
    fetchAdvice();
  }, [balance, recentSpending]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <motion.div 
      className="space-y-6 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-aether-text">Good morning, Alex</h1>
          <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-aether-secondary/20 border border-aether-secondary flex items-center justify-center overflow-hidden">
          <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover opacity-90" />
        </div>
      </header>
      
      {/* Hero Card: AI Copilot */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-aether-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aether-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 bg-aether-bg px-3 py-1 rounded-full border border-aether-border">
                <Icon name="shield" size={14} className="text-aether-primary" />
                <span className="text-xs font-medium text-aether-primary uppercase tracking-wide">Aether Pilot</span>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Safe to Spend</p>
                 {loading ? (
                   <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-md mt-1 ml-auto"></div>
                 ) : (
                   <p className="text-3xl font-serif text-aether-text mt-1">
                     ${financialStatus?.safeToSpend.toLocaleString()}
                   </p>
                 )}
              </div>
            </div>
            <div className="mt-8">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded"></div>
                </div>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg text-aether-text/80 leading-relaxed font-light">
                  "{financialStatus?.message}"
                </motion.p>
              )}
            </div>
            <div className="absolute bottom-6 right-6 opacity-20">
               <Icon name="zap" size={64} className="text-aether-secondary" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Predictive Chart */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-aether-border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-aether-text font-medium">Cashflow Projection</h3>
            <span className="text-xs text-aether-primary bg-aether-primary/10 px-2 py-1 rounded-lg">
              +12% vs last month
            </span>
          </div>
          <CashflowChart data={MOCK_CHART_DATA} />
        </div>
      </motion.section>

      {/* Wealth Optimizer CTA */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="bg-[#2C362F] rounded-3xl p-6 text-white relative overflow-hidden flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10 max-w-[70%]">
             <h3 className="font-serif text-xl mb-1 text-[#F9F8F6]">High Yield Opportunity</h3>
             <p className="text-sm text-gray-300 font-light">
               Park your idle $2,400 into a 4.5% APY Treasury Trust.
             </p>
           </div>
           <div className="relative z-10 w-10 h-10 rounded-full bg-[#D4C3A3] flex items-center justify-center text-[#2C362F]">
              <Icon name="chevron-right" size={24} />
           </div>
        </div>
      </motion.section>

      {/* Invisible Tracking List */}
      <motion.section variants={itemVariants} className="w-full">
        <div className="flex justify-between items-end mb-4 px-2">
          <h3 className="text-lg font-medium text-aether-text">Recent Activity</h3>
          <button className="text-xs text-gray-400 hover:text-aether-primary transition-colors">View All</button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((t, i) => {
            const categoryInfo = getCategoryInfo(t.category);
            return (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-4 bg-white hover:bg-white/80 rounded-2xl border border-transparent hover:border-aether-border transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center text-aether-text
                    ${t.type === 'income' ? 'bg-green-50' : 'bg-[#F5F4F0]'}
                  `}>
                    <Icon name={categoryInfo.icon} size={20} className="opacity-70 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-medium text-aether-text">{t.title}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {t.category} • {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${t.amount > 0 ? 'text-aether-primary' : 'text-aether-text'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};