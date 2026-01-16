import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

interface WebsiteOwnerLoginProps {
  onLogin: () => void;
}

export function WebsiteOwnerLogin({ onLogin }: WebsiteOwnerLoginProps) {
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [deviceVerified, setDeviceVerified] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Simulate device verification check
  useEffect(() => {
    const timer = setTimeout(() => setDeviceVerified(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scanning animation when fields are focused
  useEffect(() => {
    if (focusedField) {
      const interval = setInterval(() => {
        setScanProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 30);
      return () => clearInterval(interval);
    } else {
      setScanProgress(0);
    }
  }, [focusedField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate authentication process
    setTimeout(() => {
      onLogin();
    }, 2500);
  };

  const isFormValid = orgId.length > 0 && email.length > 0 && password.length > 0;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }} />
      </div>

      {/* Glow Effect based on focus */}
      <AnimatePresence>
        {focusedField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 40%, rgba(34, 197, 94, 0.15), transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.div
          animate={{ y: [0, 1000] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-[2px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent"
        />
      </div>

      {/* Main Container - Vertical Corridor Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Security Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
            <Shield className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Cybersecurity Platform</h1>
          <p className="text-gray-400 text-sm">Monitor and protect your website</p>
        </motion.div>

        {/* Device Verification Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md mb-8"
        >
          <div className="flex items-center justify-between px-6 py-4 rounded-lg bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-3">
              {deviceVerified ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Device Verified</span>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                  <span className="text-sm text-gray-300">Verifying Device...</span>
                </>
              )}
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Login Form - Layered Depth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Organization ID Field */}
            <div className="relative">
              <motion.div
                animate={{
                  borderColor: focusedField === 'orgId' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(75, 85, 99, 0.5)',
                  boxShadow: focusedField === 'orgId' ? '0 0 20px rgba(34, 197, 94, 0.1)' : 'none'
                }}
                className="relative border rounded-lg overflow-hidden bg-gray-900/70 backdrop-blur-sm"
              >
                <div className="flex items-center px-4 py-3 border-b border-gray-800">
                  <Globe className="w-4 h-4 text-gray-500 mr-2" />
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Website Domain</label>
                </div>
                <input
                  type="text"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  onFocus={() => setFocusedField('orgId')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="example.com"
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none"
                />
                {/* Scanning Progress Bar */}
                {focusedField === 'orgId' && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                  />
                )}
              </motion.div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <motion.div
                animate={{
                  borderColor: focusedField === 'email' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(75, 85, 99, 0.5)',
                  boxShadow: focusedField === 'email' ? '0 0 20px rgba(34, 197, 94, 0.1)' : 'none'
                }}
                className="relative border rounded-lg overflow-hidden bg-gray-900/70 backdrop-blur-sm"
              >
                <div className="flex items-center px-4 py-3 border-b border-gray-800">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  </div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none"
                />
                {focusedField === 'email' && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                  />
                )}
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                animate={{
                  borderColor: focusedField === 'password' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(75, 85, 99, 0.5)',
                  boxShadow: focusedField === 'password' ? '0 0 20px rgba(34, 197, 94, 0.1)' : 'none'
                }}
                className="relative border rounded-lg overflow-hidden bg-gray-900/70 backdrop-blur-sm"
              >
                <div className="flex items-center px-4 py-3 border-b border-gray-800">
                  <Lock className="w-4 h-4 text-gray-500 mr-2" />
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Password</label>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none"
                />
                {focusedField === 'password' && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                  />
                )}
              </motion.div>
            </div>

            {/* MFA Toggle */}
            <div className="flex items-center justify-between px-6 py-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <span className="text-sm text-gray-300">Multi-Factor Authentication</span>
              <button
                type="button"
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  mfaEnabled ? 'bg-green-600' : 'bg-gray-700'
                }`}
              >
                <motion.div
                  animate={{ x: mfaEnabled ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white"
                />
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid || isAuthenticating}
              whileHover={{ scale: isFormValid ? 1.02 : 1 }}
              whileTap={{ scale: isFormValid ? 0.98 : 1 }}
              className={`relative w-full py-5 rounded-lg font-semibold text-lg overflow-hidden transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAuthenticating ? (
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
              
              {/* Button Glow Effect */}
              {isFormValid && !isAuthenticating && (
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ width: '50%' }}
                />
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-600">
            Protected by enterprise-grade encryption
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      `}</style>
    </div>
  );
}