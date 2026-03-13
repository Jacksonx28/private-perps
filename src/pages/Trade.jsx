import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Lock, ArrowUpRight, ArrowDownRight,
  Info, Zap
} from 'lucide-react';

const Trade = ({ walletConnected, balance }) => {
  const [selectedAsset, setSelectedAsset] = useState('SOL');
  const [positionType, setPositionType] = useState('long');
  const [leverage, setLeverage] = useState(5);
  const [orderType, setOrderType] = useState('market');
  const [size, setSize] = useState('');

  const assets = {
    SOL: { price: 142.35, change: +5.23, volume: '2.4B', icon: '◎', fullName: 'Solana' },
    BTC: { price: 67234.12, change: -1.45, volume: '28.5B', icon: '₿', fullName: 'Bitcoin' },
    ETH: { price: 3456.78, change: +2.18, volume: '15.2B', icon: 'Ξ', fullName: 'Ethereum' }
  };

  const currentAsset = assets[selectedAsset];
  const notionalValue = size ? parseFloat(size) * currentAsset.price : 0;
  const marginRequired = notionalValue / leverage;
  const liquidationPrice = positionType === 'long' 
    ? currentAsset.price * (1 - 0.9 / leverage)
    : currentAsset.price * (1 + 0.9 / leverage);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
      {/* Left Panel - Chart & Order Book */}
      <div className="flex-1 flex flex-col border-r border-slate-800">
        {/* Market Bar */}
        <div className="flex items-center gap-6 px-4 py-3 border-b border-slate-800 bg-slate-900/30 overflow-x-auto">
          {Object.entries(assets).map(([symbol, data]) => (
            <button
              key={symbol}
              onClick={() => setSelectedAsset(symbol)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all min-w-fit ${
                selectedAsset === symbol ? 'bg-slate-800 border border-slate-700' : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-2xl">{data.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{symbol}</span>
                  <span className={`text-xs ${data.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {data.change >= 0 ? '+' : ''}{data.change}%
                  </span>
                </div>
                <div className="text-sm text-slate-400 font-mono">${data.price.toLocaleString()}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Chart Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{currentAsset.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{selectedAsset}</span>
                <span className="text-sm text-slate-400">/ USD</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">${currentAsset.price.toLocaleString()}</div>
          </div>
        </div>

        {/* Chart Area */}
<div className="flex-1 bg-slate-950 relative overflow-hidden">
  <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
    {/* Grid */}
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    {/* Price line - random data */}
    <path 
      d="M0,350 Q100,320 200,280 T400,200 T600,150 T800,180" 
      fill="none" 
      stroke={currentAsset.change >= 0 ? "#10b981" : "#f43f5e"} 
      strokeWidth="2"
    />
    
    {/* Area under line */}
    <path 
      d="M0,350 Q100,320 200,280 T400,200 T600,150 T800,180 L800,400 L0,400 Z" 
      fill={currentAsset.change >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)"}
    />
    
    {/* Current price line */}
    <line x1="0" y1="180" x2="800" y2="180" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
    
    {/* Price labels */}
    <text x="10" y="30" fill="#64748b" fontSize="12">${(currentAsset.price * 1.05).toFixed(2)}</text>
    <text x="10" y="195" fill="#6366f1" fontSize="12" fontWeight="bold">${currentAsset.price.toFixed(2)}</text>
    <text x="10" y="390" fill="#64748b" fontSize="12">${(currentAsset.price * 0.95).toFixed(2)}</text>
  </svg>
  
  {/* Current Price Indicator */}
  <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 rounded-lg p-3">
    <div className="text-xs text-slate-400">Mark Price</div>
    <div className="text-xl font-bold text-white font-mono">${currentAsset.price.toLocaleString()}</div>
  </div>
</div>

        {/* Order Book */}
        <div className="h-64 border-t border-slate-800 bg-slate-900/30 p-4">
          <h3 className="font-semibold text-sm mb-4">Order Book</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-rose-400">${(currentAsset.price * (1 + (i+1)*0.001)).toFixed(2)}</span>
                  <span className="text-slate-400">{(Math.random() * 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-emerald-400">${(currentAsset.price * (1 - (i+1)*0.001)).toFixed(2)}</span>
                  <span className="text-slate-400">{(Math.random() * 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Order Form */}
      <div className="w-full lg:w-96 bg-slate-900/50 border-l border-slate-800 p-4">
        {/* Long/Short Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setPositionType('long')}
            className={`py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 ${
              positionType === 'long' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Long
          </button>
          <button
            onClick={() => setPositionType('short')}
            className={`py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 ${
              positionType === 'short' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <TrendingDown className="w-4 h-4" /> Short
          </button>
        </div>

        {/* Balance */}
        <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg mb-4">
          <span className="text-sm text-slate-400">Available Balance</span>
          <span className="text-lg font-bold text-white font-mono">${balance.toLocaleString()}</span>
        </div>

        {/* Size Input */}
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-2">Size ({selectedAsset})</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>

        {/* Leverage */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Leverage</span>
            <span className="text-indigo-400 font-bold">{leverage}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Order Details */}
        <div className="space-y-2 p-4 bg-slate-800/20 rounded-lg mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Notional Value</span>
            <span className="text-white font-mono">${notionalValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Margin Required</span>
            <span className="text-white font-mono">${marginRequired.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Est. Liquidation</span>
            <span className={positionType === 'long' ? 'text-rose-400' : 'text-emerald-400'}>
              ${liquidationPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={!walletConnected}
          className={`w-full py-4 rounded-lg font-bold text-lg ${
            positionType === 'long' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
          } text-white disabled:opacity-50`}
        >
          {positionType === 'long' ? 'Long' : 'Short'} {selectedAsset}
        </button>
      </div>
    </div>
  );
};

export default Trade;