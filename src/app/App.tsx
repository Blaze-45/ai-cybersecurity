import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from '@/app/components/dashboard';
import { Websites } from '@/app/components/websites';
import { Alerts } from '@/app/components/alerts';
import { SimulateAttack } from '@/app/components/simulate-attack';
import { Navigation } from '@/app/components/navigation';
import { WebsiteOwnerLogin } from '@/app/components/website-owner-login';

type Page = 'dashboard' | 'websites' | 'alerts' | 'simulate';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <WebsiteOwnerLogin onLogin={handleLogin} />;
  }

  // Authenticated - Main Dashboard
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="flex h-screen overflow-hidden">
        {/* Left Navigation */}
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'websites' && <Websites />}
              {currentPage === 'alerts' && <Alerts />}
              {currentPage === 'simulate' && <SimulateAttack />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}