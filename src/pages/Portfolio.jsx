import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, PieChart, ArrowUpRight, 
  ArrowDownRight, Clock, DollarSign, Shield, Lock, Eye
} from 'lucide-react';

const Portfolio = ({ walletConnected, balance }) => {
  const [activeTab, setActiveTab] = useState('positions');
  
  const positions = [
    { 
      id: 1, 
      asset: 'SOL', 
      type: 'long', 
      size: 150, 
      entryPrice: 138.50, 
      markPrice: 142.35,
      leverage: 10,
      pnl: 577.50,
      pnlPercent: 2.78,
      liquidationPrice: 124.65,
      margin: 2077.50,
      isPrivate: true
    },
    { 
      id: 2, 
      asset: 'BTC', 
      type: 'short', 
      size: 0.5, 
      entryPrice: 68200, 
      markPrice: 67234.12,
      leverage: 5,
      pnl: 482.94,
      pnlPercent: 1.42,
      liquidationPrice: 75000,
      margin: 6820,
      isPrivate: true
    },
    { 
      id: 3, 
      asset: 'ETH', 
      type: 'long', 
      size: 10, 
      entryPrice: 3350, 
      markPrice: 3456.78,
      leverage: 8,
      pnl: 1067.80,
      pnlPercent: 3.19,
      liquidationPrice: 2937.50,
      margin: 4187.50,
      isPrivate: true
    }
  ];

  const totalPnl = positions.reduce((acc, pos) => acc + pos.pnl, 0);
  const totalMargin = positions.reduce((acc, pos) => acc + pos.margin, 0);
  const availableBalance = balance - totalMargin;
  const utilizationRate = (totalMargin / balance) * 100;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-slate-400">Manage your positions and track performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">Privacy Active</span>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-slate-400 text-sm">Total Balance</span>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            ${balance.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5%</span>
            <span className="text-slate-500">vs last week</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-slate-400 text-sm">Available</span>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            ${availableBalance.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {((availableBalance / balance) * 100).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400 text-sm">In Positions</span>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            ${totalMargin.toLocaleString()}
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500">Utilization</span>
              <span className="text-slate-300">{utilizationRate.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{width: `${utilizationRate}%`}}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${totalPnl >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
              {totalPnl >= 0 ? (
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-rose-400" />
              )}
            </div>
            <span className="text-slate-400 text-sm">Total PnL</span>
          </div>
          <div className={`text-3xl font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span className={totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {totalPnl >= 0 ? '+' : ''}{((totalPnl / totalMargin) * 100).toFixed(2)}%
            </span>
            <span className="text-slate-500">unrealized</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800">
        {['positions', 'history', 'funding'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
              activeTab === tab
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>
            )}
          </button>
        ))}
      </div>

      {/* Positions Table */}
      {activeTab === 'positions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Asset</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Side</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Size</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Entry Price</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Mark Price</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Leverage</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">PnL</th>
                  <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Privacy</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {pos.asset === 'SOL' ? '◎' : pos.asset === 'BTC' ? '₿' : 'Ξ'}
                        </span>
                        <div>
                          <div className="font-semibold text-white">{pos.asset}</div>
                          <div className="text-xs text-slate-500">Perp</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        pos.type === 'long' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {pos.type === 'long' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {pos.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-white font-mono">{pos.size}</div>
                      <div className="text-xs text-slate-500">${(pos.size * pos.markPrice).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-300 font-mono">
                      ${pos.entryPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-mono">
                      ${pos.markPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-indigo-400 font-mono">{pos.leverage}x</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-mono font-semibold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}
                      </div>
                      <div className={`text-xs ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pos.pnl >= 0 ? '+' : ''}{pos.pnlPercent}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-xs text-indigo-400">
                        <Lock className="w-3 h-3" />
                        <span>Private</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {positions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400">No open positions</p>
              <p className="text-slate-500 text-sm mt-1">Start trading to see your positions here</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Trade History</h3>
          <p className="text-slate-400">Your recent trades will appear here</p>
        </div>
      )}

      {/* Funding Tab */}
      {activeTab === 'funding' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <DollarSign className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Funding Payments</h3>
          <p className="text-slate-400">Your funding payment history will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
