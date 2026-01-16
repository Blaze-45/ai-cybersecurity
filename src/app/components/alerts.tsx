import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Shield, XCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Globe } from 'lucide-react';

type Severity = 'low' | 'medium' | 'high';

interface Alert {
  id: string;
  timestamp: string;
  website: string;
  severity: Severity;
  message: string;
  actionTaken: string;
  details: {
    ipAddress?: string;
    requestCount?: number;
    anomalyScore?: number;
    blockedIPs?: number;
  };
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    timestamp: '2 minutes ago',
    website: 'demo-shop.com',
    severity: 'high',
    message: 'DDoS Attack Pattern Detected',
    actionTaken: '12 malicious IPs blocked automatically',
    details: {
      ipAddress: '192.168.1.45',
      requestCount: 8470,
      anomalyScore: 92.3,
      blockedIPs: 12
    }
  },
  {
    id: '2',
    timestamp: '15 minutes ago',
    website: 'api.myservice.io',
    severity: 'medium',
    message: 'Unusual Traffic Spike Detected',
    actionTaken: 'Rate limiting applied to 3 IP ranges',
    details: {
      requestCount: 5240,
      anomalyScore: 67.8,
      blockedIPs: 3
    }
  },
  {
    id: '3',
    timestamp: '32 minutes ago',
    website: 'blog.techcorp.com',
    severity: 'low',
    message: 'Minor Anomaly in Request Pattern',
    actionTaken: 'Logged for monitoring, no action required',
    details: {
      requestCount: 234,
      anomalyScore: 42.1
    }
  },
  {
    id: '4',
    timestamp: '1 hour ago',
    website: 'demo-shop.com',
    severity: 'high',
    message: 'SQL Injection Attempt Blocked',
    actionTaken: 'Attacker IP blocked and reported',
    details: {
      ipAddress: '10.0.0.132',
      requestCount: 47,
      anomalyScore: 98.7,
      blockedIPs: 1
    }
  },
  {
    id: '5',
    timestamp: '1 hour ago',
    website: 'portal.enterprise.net',
    severity: 'medium',
    message: 'Multiple Failed Authentication Attempts',
    actionTaken: 'Account temporarily locked, CAPTCHA enabled',
    details: {
      ipAddress: '172.16.0.89',
      requestCount: 156,
      anomalyScore: 71.4
    }
  },
  {
    id: '6',
    timestamp: '2 hours ago',
    website: 'api.myservice.io',
    severity: 'low',
    message: 'Elevated Traffic from New Region',
    actionTaken: 'Monitoring increased, threshold adjusted',
    details: {
      requestCount: 892,
      anomalyScore: 38.5
    }
  },
  {
    id: '7',
    timestamp: '3 hours ago',
    website: 'demo-shop.com',
    severity: 'high',
    message: 'XSS Attack Vector Detected',
    actionTaken: 'Malicious payload sanitized, IP blocked',
    details: {
      ipAddress: '198.51.100.42',
      requestCount: 23,
      anomalyScore: 95.2,
      blockedIPs: 1
    }
  },
  {
    id: '8',
    timestamp: '4 hours ago',
    website: 'blog.techcorp.com',
    severity: 'medium',
    message: 'Bot Crawler Activity Detected',
    actionTaken: 'Rate limited and flagged for review',
    details: {
      requestCount: 1240,
      anomalyScore: 58.9
    }
  }
];

export function Alerts() {
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case 'high': return <XCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
    }
  };

  const filteredAlerts = filterSeverity === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filterSeverity);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-foreground">Security Alerts</h1>
        <p className="text-muted-foreground">Real-time threat intelligence and automated responses</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Alerts</span>
            <Shield className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl text-foreground mt-2">{alerts.length}</p>
        </div>
        <div className="bg-card border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">High Severity</span>
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl text-red-400 mt-2">
            {alerts.filter(a => a.severity === 'high').length}
          </p>
        </div>
        <div className="bg-card border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Medium Severity</span>
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl text-yellow-400 mt-2">
            {alerts.filter(a => a.severity === 'medium').length}
          </p>
        </div>
        <div className="bg-card border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Low Severity</span>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl text-blue-400 mt-2">
            {alerts.filter(a => a.severity === 'low').length}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
        <button
          onClick={() => setFilterSeverity('all')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filterSeverity === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-accent'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterSeverity('high')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filterSeverity === 'high'
              ? 'bg-red-500 text-white'
              : 'bg-secondary text-foreground hover:bg-accent'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setFilterSeverity('medium')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filterSeverity === 'medium'
              ? 'bg-yellow-500 text-white'
              : 'bg-secondary text-foreground hover:bg-accent'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setFilterSeverity('low')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            filterSeverity === 'low'
              ? 'bg-blue-500 text-white'
              : 'bg-secondary text-foreground hover:bg-accent'
          }`}
        >
          Low
        </button>
      </div>

      {/* Alert Timeline Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => {
          const isExpanded = expandedAlert === alert.id;
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-200"
            >
              {/* Alert Header - Clickable */}
              <button
                onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                className="w-full p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Severity Badge */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    {getSeverityIcon(alert.severity)}
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base text-foreground">{alert.message}</h3>
                          <span className={`text-xs px-2 py-1 rounded uppercase ${getSeverityColor(alert.severity)} border`}>
                            {alert.severity}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            <span>{alert.website}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Action Taken */}
                    <div className="flex items-start gap-2 mt-3 p-3 bg-primary/5 border border-primary/10 rounded">
                      <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Action Taken by AI Agent:</p>
                        <p className="text-sm text-primary">{alert.actionTaken}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border bg-secondary/30"
                >
                  <div className="p-6 space-y-4">
                    <h4 className="text-sm text-muted-foreground mb-3">Detailed Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {alert.details.ipAddress && (
                        <div className="bg-card border border-border rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                          <code className="text-sm text-primary font-mono">{alert.details.ipAddress}</code>
                        </div>
                      )}
                      {alert.details.requestCount && (
                        <div className="bg-card border border-border rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">Request Count</p>
                          <p className="text-sm text-foreground">{alert.details.requestCount.toLocaleString()}</p>
                        </div>
                      )}
                      {alert.details.anomalyScore && (
                        <div className="bg-card border border-border rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">Anomaly Score</p>
                          <p className="text-sm text-foreground">{alert.details.anomalyScore}%</p>
                        </div>
                      )}
                      {alert.details.blockedIPs && (
                        <div className="bg-card border border-border rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">Blocked IPs</p>
                          <p className="text-sm text-foreground">{alert.details.blockedIPs}</p>
                        </div>
                      )}
                    </div>

                    {/* AI Decision Logic */}
                    <div className="bg-card border border-border rounded p-4">
                      <p className="text-xs text-muted-foreground mb-3">AI Decision Logic</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Pattern matched against known attack signatures</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Anomaly score exceeded configurable threshold</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Automated response protocol executed successfully</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg text-foreground mb-2">No alerts for this filter</h3>
          <p className="text-sm text-muted-foreground">Try selecting a different severity level</p>
        </div>
      )}
    </div>
  );
}
