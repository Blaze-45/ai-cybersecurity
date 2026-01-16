import { useState } from 'react';
import { Plus, Eye, Globe, Activity, TrendingUp, X, Copy, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'warning' | 'offline';
  requests: number;
  lastActivity: string;
  anomalies: number;
}

const mockWebsites: Website[] = [
  { id: '1', name: 'demo-shop.com', url: 'https://demo-shop.com', status: 'warning', requests: 45620, lastActivity: '2 min ago', anomalies: 12 },
  { id: '2', name: 'api.myservice.io', url: 'https://api.myservice.io', status: 'active', requests: 128450, lastActivity: '1 min ago', anomalies: 0 },
  { id: '3', name: 'blog.techcorp.com', url: 'https://blog.techcorp.com', status: 'active', requests: 23890, lastActivity: '5 min ago', anomalies: 2 },
  { id: '4', name: 'portal.enterprise.net', url: 'https://portal.enterprise.net', status: 'active', requests: 67340, lastActivity: '3 min ago', anomalies: 0 },
  { id: '5', name: 'store.fashionbrand.co', url: 'https://store.fashionbrand.co', status: 'offline', requests: 0, lastActivity: '2 hours ago', anomalies: 0 },
];

const generateSiteTrafficData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    hour: `${i * 2}h`,
    traffic: Math.floor(Math.random() * 5000 + 2000)
  }));
};

const mockBlockedIPs = [
  { ip: '192.168.1.45', reason: 'Multiple failed auth', time: '5 min ago' },
  { ip: '10.0.0.132', reason: 'Traffic spike', time: '12 min ago' },
  { ip: '172.16.0.89', reason: 'Suspicious pattern', time: '28 min ago' },
];

export function Websites() {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [newWebsiteName, setNewWebsiteName] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleAddWebsite = () => {
    if (!newWebsiteName.trim()) return;
    
    const newSite: Website = {
      id: Date.now().toString(),
      name: newWebsiteName,
      url: `https://${newWebsiteName}`,
      status: 'active',
      requests: 0,
      lastActivity: 'Just now',
      anomalies: 0
    };
    
    setWebsites([...websites, newSite]);
    setNewWebsiteName('');
    setShowAddModal(false);
  };

  const handleCopyApiKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'warning': return 'bg-yellow-500 text-yellow-900';
      case 'offline': return 'bg-red-500 text-red-100';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-foreground">Website Management</h1>
          <p className="text-muted-foreground">Monitor and protect your web properties</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add Website
        </button>
      </div>

      {/* Websites Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Website</th>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Requests (24h)</th>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Anomalies</th>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Last Activity</th>
                <th className="text-left px-6 py-4 text-sm text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website, index) => (
                <motion.tr
                  key={website.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border hover:bg-secondary/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">{website.name}</p>
                        <p className="text-xs text-muted-foreground">{website.url}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(website.status)}`} />
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(website.status)}`}>
                        {website.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{website.requests.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${website.anomalies > 0 ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                      {website.anomalies}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{website.lastActivity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedWebsite(website)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary hover:bg-accent text-foreground rounded transition-colors duration-150"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Website Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-foreground">Add New Website</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Website Name
                  </label>
                  <input
                    type="text"
                    value={newWebsiteName}
                    onChange={(e) => setNewWebsiteName(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">
                      API Key (Auto-generated)
                    </label>
                    <button
                      onClick={handleCopyApiKey}
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-primary font-mono break-all">
                    sk_live_{Math.random().toString(36).substring(2, 15)}
                  </code>
                </div>

                <button
                  onClick={handleAddWebsite}
                  disabled={!newWebsiteName.trim()}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Detail View */}
      <AnimatePresence>
        {selectedWebsite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedWebsite(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card border border-border rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-foreground mb-1">{selectedWebsite.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedWebsite.url}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWebsite(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Site Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Requests</span>
                  </div>
                  <p className="text-2xl text-foreground">{selectedWebsite.requests.toLocaleString()}</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">Anomalies</span>
                  </div>
                  <p className="text-2xl text-foreground">{selectedWebsite.anomalies}</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusDot(selectedWebsite.status)}`} />
                    <span className="text-sm text-muted-foreground">Status</span>
                  </div>
                  <p className="text-2xl text-foreground capitalize">{selectedWebsite.status}</p>
                </div>
              </div>

              {/* Traffic Graph */}
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <h4 className="text-sm text-muted-foreground mb-4">Traffic Pattern (24h)</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateSiteTrafficData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1f2e',
                          border: '1px solid #1f2937',
                          borderRadius: '8px',
                          color: '#e0e6ed'
                        }}
                      />
                      <Line type="monotone" dataKey="traffic" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Blocked IPs */}
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="text-sm text-muted-foreground mb-4">Recently Blocked IPs</h4>
                <div className="space-y-2">
                  {mockBlockedIPs.map((blocked, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded border border-border">
                      <div className="flex items-center gap-3">
                        <code className="text-sm text-primary font-mono">{blocked.ip}</code>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{blocked.reason}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{blocked.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
