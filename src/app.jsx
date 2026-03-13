import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './components/Notifications';
import './index.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0x7a3f...8d2e');
  const [balance, setBalance] = useState(69000);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout 
                walletConnected={walletConnected}
                walletAddress={walletAddress}
                onConnectWallet={handleConnectWallet}
                onOpenSettings={() => setShowSettings(true)}
                onOpenNotifications={() => setShowNotifications(true)}
              />
            }
          >
            <Route index element={<Navigate to="/trade" replace />} />
            <Route 
              path="trade" 
              element={
                <Trade 
                  walletConnected={walletConnected}
                  balance={balance}
                />
              } 
            />
            <Route 
              path="portfolio" 
              element={
                <Portfolio 
                  walletConnected={walletConnected}
                  balance={balance}
                />
              } 
            />
            <Route 
              path="orders" 
              element={
                <Orders 
                  walletConnected={walletConnected}
                />
              } 
            />
            <Route 
              path="analytics" 
              element={
                <Analytics 
                  walletConnected={walletConnected}
                  balance={balance}
                />
              } 
            />
          </Route>
        </Routes>

        {/* Settings Modal */}
        <Settings 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
        />

        {/* Notifications Modal */}
        <Notifications 
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>
    </Router>
  );
}

export default App;
