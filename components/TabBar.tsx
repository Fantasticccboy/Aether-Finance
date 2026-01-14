import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icons';
import { ViewState } from '../types';

interface TabBarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onVoiceTrigger: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({ currentView, onNavigate, onVoiceTrigger }) => {
  const tabs = [
    { id: 'dashboard', icon: 'home', label: 'Home' },
    { id: 'calendar', icon: 'calendar', label: 'Calendar' },
    { id: 'spacer', icon: '', label: '' }, // Placeholder for mic
    { id: 'analytics', icon: 'pie-chart', label: 'Stats' },
    { id: 'add', icon: 'plus', label: 'Add' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-lg border-t border-aether-border z-50 px-6 pb-6 pt-2">
      <div className="relative flex justify-between items-center h-full max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
        
        {/* Floating Mic Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onVoiceTrigger}
            className="w-16 h-16 rounded-full bg-aether-primary text-white shadow-xl flex items-center justify-center border-4 border-aether-bg"
          >
            <Icon name="mic" size={28} />
          </motion.button>
        </div>

        {tabs.map((tab) => {
          if (tab.id === 'spacer') return <div key="spacer" className="w-12" />;

          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id as ViewState)}
              className="flex flex-col items-center justify-center gap-1 w-16"
            >
              <motion.div
                animate={{ color: isActive ? '#4A5D4E' : '#9CA3AF' }}
              >
                <Icon 
                  name={tab.icon} 
                  size={24} 
                  className={isActive ? 'text-aether-primary' : 'text-gray-400'} 
                />
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 bg-aether-primary rounded-full mt-1"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};