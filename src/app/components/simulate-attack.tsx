import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Users, RotateCcw, Play, Terminal, Activity, Shield, AlertTriangle } from 'lucide-react';

interface ConsoleMessage {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export function SimulateAttack() {
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'System initialized. Ready for simulation.'
    }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'idle' | 'normal' | 'attack' | 'blocking'>('idle');
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleMessages]);

  const addMessage = (type: ConsoleMessage['type'], message: string) => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setConsoleMessages(prev => [...prev, newMessage]);
  };

  const simulateNormalTraffic = async () => {
    setIsSimulating(true);
    setSystemStatus('normal');
    addMessage('info', 'Starting normal traffic simulation...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage('success', 'Generating 100 requests/sec from legitimate users');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addMessage('info', 'Traffic pattern: Normal distribution across regions');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    addMessage('success', 'Anomaly score: 12.3% (Normal range)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage('success', 'All systems nominal. Simulation complete.');
    
    setIsSimulating(false);
    setSystemStatus('idle');
  };

  const simulateAttack = async () => {
    setIsSimulating(true);
    setSystemStatus('attack');
    addMessage('warning', '⚠️ Initiating multi-IP attack simulation...');
    
    await new Promise(resolve => setTimeout(resolve, 700));
    addMessage('error', 'ALERT: Traffic spike detected from 47 unique IPs');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    addMessage('error', 'Request rate: 8,470 req/sec (+847% increase)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage('warning', 'Anomaly score: 92.3% - THRESHOLD EXCEEDED');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setSystemStatus('blocking');
    addMessage('info', '🛡️ AI Agent activated - analyzing attack pattern...');
    
    await new Promise(resolve => setTimeout(resolve, 700));
    addMessage('success', '✓ Pattern matched: DDoS attack signature');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    addMessage('success', '✓ Blocking malicious IP range: 192.168.1.0/24');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage('success', '✓ 12 IPs added to blocklist');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    addMessage('success', '✓ Rate limiting applied to suspicious regions');
    
    await new Promise(resolve => setTimeout(resolve, 700));
    addMessage('success', '🎯 Attack successfully mitigated');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage('info', 'Traffic normalized. System protected.');
    
    setIsSimulating(false);
    setSystemStatus('idle');
  };

  const resetSystem = () => {
    setConsoleMessages([
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: 'info',
        message: 'System reset complete. All logs cleared.'
      }
    ]);
    setSystemStatus('idle');
    addMessage('success', 'Ready for new simulation.');
  };

  const getMessageColor = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'info': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-primary';
    }
  };

  const getStatusConfig = () => {
    switch (systemStatus) {
      case 'idle':
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'IDLE', icon: Activity };
      case 'normal':
        return { color: 'text-primary', bg: 'bg-primary', label: 'NORMAL TRAFFIC', icon: Users };
      case 'attack':
        return { color: 'text-red-400', bg: 'bg-red-500', label: 'ATTACK DETECTED', icon: AlertTriangle };
      case 'blocking':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500', label: 'BLOCKING', icon: Shield };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-foreground">Attack Simulation Control</h1>
        <p className="text-muted-foreground">Test AI-driven threat detection and response in real-time</p>
      </div>

      {/* System Status Banner */}
      <motion.div
        animate={{ 
          scale: systemStatus !== 'idle' ? [1, 1.02, 1] : 1,
          borderColor: systemStatus === 'attack' ? ['#1f2937', '#ef4444', '#1f2937'] : '#1f2937'
        }}
        transition={{ 
          duration: 1, 
          repeat: systemStatus === 'attack' ? Infinity : 0 
        }}
        className="bg-card border border-border rounded-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg ${statusConfig.bg}/10 flex items-center justify-center`}>
              <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">System Status</p>
              <p className={`text-2xl ${statusConfig.color}`}>{statusConfig.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusConfig.bg} ${systemStatus !== 'idle' ? 'animate-pulse' : ''}`} />
            <span className="text-sm text-muted-foreground">
              {isSimulating ? 'Simulation Running' : 'Ready'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Generate Normal Traffic */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateNormalTraffic}
          disabled={isSimulating}
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg text-foreground mb-2">Generate Normal Traffic</h3>
            <p className="text-sm text-muted-foreground">
              Simulate legitimate user requests at normal rates
            </p>
          </div>
        </motion.button>

        {/* Simulate Attack */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateAttack}
          disabled={isSimulating}
          className="bg-card border border-red-500/20 rounded-lg p-6 hover:border-red-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
              <Zap className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg text-red-400 mb-2">Simulate Attack (Multi-IP)</h3>
            <p className="text-sm text-muted-foreground">
              Launch coordinated DDoS attack simulation
            </p>
          </div>
        </motion.button>

        {/* Reset System */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetSystem}
          disabled={isSimulating}
          className="bg-card border border-border rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
              <RotateCcw className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-lg text-foreground mb-2">Reset System</h3>
            <p className="text-sm text-muted-foreground">
              Clear all logs and reset to initial state
            </p>
          </div>
        </motion.button>
      </div>

      {/* Live Console Output */}
      <div className="bg-card border border-border rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" />
            <h3 className="text-base text-foreground">Live System Output</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Console Messages */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-sm bg-[#0a0e1a] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {consoleMessages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="flex gap-3 mb-2 hover:bg-secondary/20 p-2 rounded"
            >
              <span className="text-muted-foreground flex-shrink-0">[{msg.timestamp}]</span>
              <span className={`${getMessageColor(msg.type)} flex-1`}>{msg.message}</span>
            </motion.div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Console Footer */}
        <div className="px-6 py-3 border-t border-border bg-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
              <span>{consoleMessages.length} messages</span>
            </div>
            <span>•</span>
            <span>Auto-scroll enabled</span>
          </div>
          {isSimulating && (
            <div className="flex items-center gap-2 text-xs text-primary">
              <Play className="w-3 h-3 animate-pulse" />
              <span>Simulation in progress...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
