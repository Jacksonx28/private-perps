import React, { useState } from 'react';
import { 
  X, Bell, Shield, Globe, Moon, Sun, Wallet, 
  Key, Lock, Eye, EyeOff, ChevronRight, User,
  Sliders, Save
} from 'lucide-react';

const Settings = ({ isOpen, onClose, walletConnected, setWalletConnected }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    orderUpdates: true,
    liquidationWarnings: true,
    fundingPayments: false,
    marketingEmails: false
  });
  const [privacy, setPrivacy] = useState({
    hideBalance: false,
    privateMode: true,
    autoEncrypt: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    chartType: 'candles',
    orderBookDensity: 'medium'
  });

  if (!isOpen) return null;

  const toggleNotification = (key) => {
    setNotifications(prev => ({...prev, [key]: !prev[key]}));
  };

  const togglePrivacy = (key) => {
    setPrivacy(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <Sliders className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-sm text-slate-400">Customize your trading experience</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-48 border-r border-slate-800 p-4 space-y-1">
            {[
              { id: 'general', label: 'General', icon: Globe },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'wallet', label: 'Wallet', icon: Wallet },
              { id: 'appearance', label: 'Appearance', icon: Moon }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Language & Region</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Language</label>
                      <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Chinese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Currency</label>
                      <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Time Zone</label>
                      <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                        <option>GMT (Greenwich Mean Time)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Trading Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Default Leverage</div>
                        <div className="text-sm text-slate-400">Set your preferred leverage for new positions</div>
                      </div>
                      <select className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                        <option>5x</option>
                        <option>10x</option>
                        <option>20x</option>
                        <option>50x</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Order Confirmation</div>
                        <div className="text-sm text-slate-400">Show confirmation dialog before executing trades</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(notifications).map(([key, value]) => {
                      const labels = {
                        priceAlerts: 'Price Alerts',
                        orderUpdates: 'Order Updates',
                        liquidationWarnings: 'Liquidation Warnings',
                        fundingPayments: 'Funding Payments',
                        marketingEmails: 'Marketing Emails'
                      };
                      return (
                        <div key={key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="text-white">{labels[key]}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={value}
                              onChange={() => toggleNotification(key)}
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Arcium Privacy Active</span>
                  </div>
                  <p className="text-sm text-slate-400">Your positions and orders are encrypted using Arcium's confidential computing network.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <EyeOff className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="font-medium text-white">Hide Balance</div>
                          <div className="text-sm text-slate-400">Blur your balance in the interface</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacy.hideBalance}
                          onChange={() => togglePrivacy('hideBalance')}
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="font-medium text-white">Private Mode</div>
                          <div className="text-sm text-slate-400">Always use encrypted transactions</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacy.privateMode}
                          onChange={() => togglePrivacy('privateMode')}
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="font-medium text-white">Auto-Encrypt</div>
                          <div className="text-sm text-slate-400">Automatically encrypt all order data</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacy.autoEncrypt}
                          onChange={() => togglePrivacy('autoEncrypt')}
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Connected Wallet</h3>
                  {walletConnected ? (
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Phantom Wallet</div>
                            <div className="text-sm text-slate-400">0x7a3f...8d2e</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-emerald-400">Connected</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setWalletConnected(false)}
                        className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-800/30 rounded-lg text-center">
                      <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">No wallet connected</p>
                      <button 
                        onClick={() => setWalletConnected(true)}
                        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Supported Wallets</h3>
                  <div className="space-y-2">
                    {['Phantom', 'Solflare', 'Backpack', 'Glow'].map((wallet) => (
                      <div key={wallet} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {wallet[0]}
                          </div>
                          <span className="text-white">{wallet}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setAppearance({...appearance, theme: 'dark'})}
                      className={`p-4 rounded-lg border transition-all ${
                        appearance.theme === 'dark' 
                          ? 'bg-indigo-500/10 border-indigo-500' 
                          : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Moon className={`w-8 h-8 mx-auto mb-2 ${appearance.theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <div className={`font-medium ${appearance.theme === 'dark' ? 'text-white' : 'text-slate-300'}`}>Dark</div>
                    </button>
                    <button 
                      onClick={() => setAppearance({...appearance, theme: 'light'})}
                      className={`p-4 rounded-lg border transition-all ${
                        appearance.theme === 'light' 
                          ? 'bg-indigo-500/10 border-indigo-500' 
                          : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Sun className={`w-8 h-8 mx-auto mb-2 ${appearance.theme === 'light' ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <div className={`font-medium ${appearance.theme === 'light' ? 'text-white' : 'text-slate-300'}`}>Light</div>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Chart Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Chart Type</label>
                      <select 
                        value={appearance.chartType}
                        onChange={(e) => setAppearance({...appearance, chartType: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="candles">Candlestick</option>
                        <option value="line">Line</option>
                        <option value="area">Area</option>
                        <option value="bars">Bars</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Order Book Density</label>
                      <select 
                        value={appearance.orderBookDensity}
                        onChange={(e) => setAppearance({...appearance, orderBookDensity: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
