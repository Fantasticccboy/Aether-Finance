import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from './types';
import { TabBar } from './components/TabBar';
import { Dashboard } from './screens/Dashboard';
import { CalendarView } from './screens/CalendarView';
import { AnalyticsView } from './screens/AnalyticsView';
import { AddTransactionView } from './screens/AddTransactionView';
import { VoiceOverlay } from './components/VoiceOverlay';
import { TransactionProvider } from './context/TransactionContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <CalendarView />;
      case 'analytics': return <AnalyticsView />;
      case 'add': return <AddTransactionView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-aether-bg font-sans selection:bg-aether-secondary selection:text-white overflow-hidden relative">
      
      {/* Scrollable View Area */}
      <main className="h-screen overflow-y-auto w-full px-6 mx-auto md:max-w-2xl lg:max-w-4xl no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Overlays */}
      <VoiceOverlay 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />

      {/* Navigation */}
      <TabBar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        onVoiceTrigger={() => setIsVoiceOpen(true)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TransactionProvider>
      <AppContent />
    </TransactionProvider>
  );
};

export default App;