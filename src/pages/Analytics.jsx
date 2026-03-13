import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity, 
  Calendar, DollarSign, Target, Zap, ArrowUpRight, ArrowDownRight,
  Clock, Shield
} from 'lucide-react';

const Analytics = ({ walletConnected, balance }) => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    totalTrades: 156,
    winRate: 68.5,
    profitFactor: 2.34,
    sharpeRatio: 1.87,
    avgTradeSize: 12500,
    largestWin: 15420,
    largestLoss: -4200,
    totalVolume: 2340000,
    feesPaid: 1170
  };

  const pnlData = [
    { date: 'Mon', pnl: 1200 },
    { date: 'Tue', pnl: -800 },
    { date: 'Wed', pnl: 2400 },
    { date: 'Thu', pnl: 1800 },
    { date: 'Fri', pnl: -1200 },
    { date: 'Sat', pnl: 3200 },
    { date: 'Sun', pnl: 2100 }
  ];

  const assetPerformance = [
    { asset: 'SOL', trades: 45, pnl: 8500, winRate: 72 },
    { asset: 'BTC', trades: 38, pnl: 12300, winRate: 65 },
    { asset: 'ETH', trades: 42, pnl: 6200, winRate: 71 },
    { asset: 'AVAX', trades: 31, pnl: -1800, winRate: 58 }
  ];

  const recentActivity = [
    { type: 'trade', asset: 'SOL', side: 'long', pnl: 450, time: '2 hours ago' },
    { type: 'trade', asset: 'BTC', side: 'short', pnl: -120, time: '4 hours ago' },
    { type: 'funding', asset: 'ETH', amount: -2.5, time: '8 hours ago' },
    { type: 'trade', asset: 'ETH', side: 'long', pnl: 890, time: '12 hours ago' },
    { type: 'deposit', amount: 5000, time: '1 day ago' }
  ];

  const totalPnl = pnlData.reduce((acc, day) => acc + day.pnl, 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400">Track your trading performance and insights</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-lg">
          {['24h', '7d', '30d', '90d', 'All'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* PnL Overview Card */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-indigo-300 text-sm mb-1">Total PnL ({timeRange})</div>
            <div className={`text-4xl font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+24.5%</span>
              <span className="text-slate-400">vs previous period</span>
            </div>
          </div>
          <div>
            <div className="text-indigo-300 text-sm mb-1">Win Rate</div>
            <div className="text-4xl font-bold text-white">{stats.winRate}%</div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">107 Wins / 49 Losses</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{width: `${stats.winRate}%`}}></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-indigo-300 text-sm mb-1">Profit Factor</div>
            <div className="text-4xl font-bold text-white">{stats.profitFactor}</div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <BarChart3 className="w-4 h-4" />
            Total Trades
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalTrades}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Activity className="w-4 h-4" />
            Sharpe Ratio
          </div>
          <div className="text-2xl font-bold text-white">{stats.sharpeRatio}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Avg Trade Size
          </div>
          <div className="text-2xl font-bold text-white">${(stats.avgTradeSize / 1000).toFixed(1)}k</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Target className="w-4 h-4" />
            Total Volume
          </div>
          <div className="text-2xl font-bold text-white">${(stats.totalVolume / 1000000).toFixed(2)}M</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PnL Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Daily PnL
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
              <span className="text-slate-400">Profit</span>
              <span className="w-3 h-3 bg-rose-500 rounded-full ml-2"></span>
              <span className="text-slate-400">Loss</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {pnlData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                    day.pnl >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{height: `${Math.abs(day.pnl) / 40}%`}}
                ></div>
                <span className="text-xs text-slate-500">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-400" />
            Asset Performance
          </h3>
          <div className="space-y-4">
            {assetPerformance.map((asset) => (
              <div key={asset.asset} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-xl">
                  {asset.asset === 'SOL' ? '◎' : asset.asset === 'BTC' ? '₿' : asset.asset === 'ETH' ? 'Ξ' : '◊'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{asset.asset}</span>
                    <span className={`font-mono ${asset.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {asset.pnl >= 0 ? '+' : ''}${asset.pnl.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{asset.trades} trades</span>
                    <span className="text-slate-400">{asset.winRate}% win rate</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${asset.pnl >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{width: `${Math.min(Math.abs(asset.pnl) / 150, 100)}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-slate-400 text-sm">Largest Win</h4>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 font-mono">
            +${stats.largestWin.toLocaleString()}
          </div>
          <p className="text-slate-500 text-sm mt-1">SOL Long 10x</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-slate-400 text-sm">Largest Loss</h4>
            <TrendingDown className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-rose-400 font-mono">
            ${stats.largestLoss.toLocaleString()}
          </div>
          <p className="text-slate-500 text-sm mt-1">BTC Short 5x</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-slate-400 text-sm">Fees Paid</h4>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            ${stats.feesPaid.toLocaleString()}
          </div>
          <p className="text-slate-500 text-sm mt-1">0.05% per trade</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'trade' 
                    ? activity.pnl > 0 ? 'bg-emerald-500/10' : activity.pnl < 0 ? 'bg-rose-500/10' : 'bg-slate-700'
                    : activity.type === 'funding' 
                      ? 'bg-amber-500/10' 
                      : 'bg-blue-500/10'
                }`}>
                  {activity.type === 'trade' ? (
                    activity.pnl > 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> :
                    activity.pnl < 0 ? <TrendingDown className="w-5 h-5 text-rose-400" /> :
                    <Activity className="w-5 h-5 text-slate-400" />
                  ) : activity.type === 'funding' ? (
                    <DollarSign className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {activity.type === 'trade' 
                      ? `${activity.side === 'long' ? 'Long' : 'Short'} ${activity.asset}`
                      : activity.type === 'funding'
                        ? `Funding Payment ${activity.asset}`
                        : 'Deposit'
                    }
                  </div>
                  <div className="text-sm text-slate-400">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                {activity.pnl !== undefined && (
                  <div className={`font-mono font-semibold ${activity.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {activity.pnl >= 0 ? '+' : ''}${Math.abs(activity.pnl)}
                  </div>
                )}
                {activity.amount && (
                  <div className="font-mono font-semibold text-blue-400">
                    +${activity.amount.toLocaleString()}
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-indigo-400">
                  <Shield className="w-3 h-3" />
                  <span>Private</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
