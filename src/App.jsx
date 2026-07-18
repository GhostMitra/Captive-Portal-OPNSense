import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NetworkInfo } from './components/NetworkInfo';
import { LoginCard } from './components/LoginCard';
import { StatusCard } from './components/StatusCard';
import { TermsModal } from './components/TermsModal';
import { FaqModal } from './components/FaqModal';
import { Footer } from './components/Footer';
import { getPortalContext, checkSessionStatus } from './lib/opnsense';

export default function App() {
  const [contextInfo, setContextInfo] = useState({
    isLocalDev: true,
    zone: '0',
    redirurl: 'https://google.com',
    clientIp: '192.168.1.105',
    clientMac: 'AA:BB:CC:DD:EE:FF',
    errorMessage: null,
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('cp2077_theme');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Modals
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Sync theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('cp2077_theme', theme);
  }, [theme]);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initialize context & status
  useEffect(() => {
    const ctx = getPortalContext();
    setContextInfo(ctx);

    async function initSession() {
      try {
        const res = await checkSessionStatus();
        if (res && res.authorized) {
          setIsAuthenticated(true);
          setSessionData(res);
        }
      } catch (e) {
        console.error('Session check failed', e);
      } finally {
        setIsCheckingSession(false);
      }
    }

    initSession();
  }, []);

  const handleLoginSuccess = (loginResult) => {
    setIsAuthenticated(true);
    setSessionData({
      user: loginResult.data?.userName || 'Connected User',
      sessionTimeout: 7200,
      bytesIn: 0,
      bytesOut: 0,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSessionData(null);
  };

  return (
    <div className="min-h-screen bg-portal-gradient flex flex-col justify-between font-mono scanlines transition-colors duration-200">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <main className="mx-auto w-full max-w-lg px-4 py-8 flex-1 flex flex-col justify-center gap-6">
        <NetworkInfo contextInfo={contextInfo} />

        {isCheckingSession ? (
          <div className="flex h-56 items-center justify-center rounded-none border border-neutral-800 bg-black">
            <div className="flex items-center gap-3 text-neutral-400 font-mono text-xs">
              <span className="inline-block animate-spin font-mono">[ / ]</span>
              <span>AUTHENTICATING NETWORK STATE...</span>
            </div>
          </div>
        ) : isAuthenticated ? (
          <StatusCard
            sessionData={sessionData}
            contextInfo={contextInfo}
            onLogout={handleLogout}
          />
        ) : (
          <LoginCard
            onLoginSuccess={handleLoginSuccess}
            onOpenTerms={() => setIsTermsOpen(true)}
            initialError={contextInfo.errorMessage}
          />
        )}
      </main>

      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <FaqModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
