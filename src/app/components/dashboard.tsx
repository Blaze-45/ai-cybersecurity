import { useState, useEffect } from 'react';
import { TrendingUp, Activity, AlertTriangle, Shield, Brain, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Generate mock traffic data with attack spike
const generateTrafficData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    const isAttackTime = i >= 4 && i <= 6; // Attack spike in recent hours
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      normal: isAttackTime ? Math.floor(Math.random() * 200 + 150) : Math.floor(Math.random() * 100 + 50),
      anomaly: isAttackTime ? Math.floor(Math.random() * 300 + 400) : 0,
      total: isAttackTime ? Math.floor(Math.random() * 500 + 550) : Math.floor(Math.random() * 100 + 50)
    });
  }
  return data;
};

export function Dashboard() {
  const [trafficData] = useState(generateTrafficData());
  const [anomalyScore, setAnomalyScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    // Simulate real-time anomaly detection
    const interval = setInterval(() => {
      const score = Math.random() * 100;
      setAnomalyScore(score);
      
      if (score > 70) setThreatLevel('high');
      else if (score > 40) setThreatLevel('medium');
      else setThreatLevel('low');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Total Requests', 
      value: '1.2M', 
      change: '+12.5%', 
      icon: Activity, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    { 
      label: 'Active Websites', 
      value: '24', 
      change: '+3', 
      icon: Shield, 
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      label: 'Anomalies Detected', 
      value: '47', 
      change: '+8', 
      icon: AlertTriangle, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    { 
      label: 'Threat Level', 
      value: threatLevel.toUpperCase(), 
      change: 'Real-time', 
      icon: TrendingUp, 
      color: threatLevel === 'high' ? 'text-red-400' : threatLevel === 'medium' ? 'text-yellow-400' : 'text-primary',
      bgColor: threatLevel === 'high' ? 'bg-red-500/10' : threatLevel === 'medium' ? 'bg-yellow-500/10' : 'bg-primary/10'
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-foreground">Threat Intelligence Dashboard</h1>
        <p className="text-muted-foreground">Real-time analytics and system monitoring</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-2xl ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Large Central Traffic Graph */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl text-foreground mb-1">Traffic Analysis Over Time</h2>
            <p className="text-sm text-muted-foreground">24-hour view with anomaly detection</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Attack</span>
            </div>
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f2e', 
                  border: '1px solid #1f2937',
                  borderRadius: '8px',
                  color: '#e0e6ed'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="normal" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNormal)" 
              />
              <Area 
                type="monotone" 
                dataKey="anomaly" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAnomaly)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ML Output and Agent Status - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ML Output Panel */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg text-foreground">ML Anomaly Detection</h3>
              <p className="text-sm text-muted-foreground">Real-time analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="text-sm text-muted-foreground">Current Status</span>
              <span className={`px-3 py-1 rounded text-sm ${
                anomalyScore > 70 ? 'bg-red-500/20 text-red-400' :
                anomalyScore > 40 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-primary/20 text-primary'
              }`}>
                {anomalyScore > 70 ? 'ANOMALY DETECTED' : 
                 anomalyScore > 40 ? 'MONITORING' : 
                 'NORMAL'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Anomaly Score</span>
                <span className="text-foreground">{anomalyScore.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    anomalyScore > 70 ? 'bg-red-500' :
                    anomalyScore > 40 ? 'bg-yellow-500' :
                    'bg-primary'
                  }`}
                  style={{ width: `${anomalyScore}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Model Performance</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-lg text-primary">98.7%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Precision</p>
                  <p className="text-lg text-primary">96.2%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Recall</p>
                  <p className="text-lg text-primary">97.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligent Agent Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg text-foreground">Intelligent Agent</h3>
              <p className="text-sm text-muted-foreground">Automated protection</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-foreground">Agent Status</span>
              </div>
              <span className="text-sm text-primary font-medium">ACTIVE</span>
            </div>

            <div className="bg-secondary rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground mb-1">Last Action Taken</p>
                  <p className="text-xs text-muted-foreground">
                    Blocked 12 malicious IPs from attacking demo-shop.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                <span>2 minutes ago</span>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 space-y-2">
              <p className="text-sm text-foreground mb-2">Reason for Action</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Traffic spike detected (+847% in 5 min)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Multiple failed authentication attempts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Anomaly score exceeded threshold (92.3%)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl text-primary mb-1">156</p>
                  <p className="text-xs text-muted-foreground">Actions Today</p>
                </div>
                <div>
                  <p className="text-2xl text-primary mb-1">99.8%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
