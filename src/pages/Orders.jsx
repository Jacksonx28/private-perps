import React, { useState } from 'react';
import { List, Clock, CheckCircle, XCircle, Filter, Search, TrendingUp, TrendingDown, MoreHorizontal, Download, Lock } from 'lucide-react';

const Orders = ({ walletConnected }) => {
  const [activeTab, setActiveTab] = useState('open');
  const [filterStatus, setFilterStatus] = useState('all');

  const openOrders = [
    {
      id: 1,
      asset: 'SOL',
      type: 'limit',
      side: 'long',
      size: 100,
      price: 140.00,
      filled: 0,
      total: 100,
      status: 'open',
      time: '2 hours ago',
      privacy: 'encrypted'
    },
    {
      id: 2,
      asset: 'BTC',
      type: 'stop',
      side: 'short',
      size: 0.25,
      price: 68500.00,
      trigger: 68000.00,
      filled: 0,
      total: 0.25,
      status: 'open',
      time: '5 hours ago',
      privacy: 'encrypted'
    },
    {
      id: 3,
      asset: 'ETH',
      type: 'limit',
      side: 'long',
      size: 50,
      price: 3400.00,
      filled: 25,
      total: 50,
      status: 'partial',
      time: '1 day ago',
      privacy: 'encrypted'
    }
  ];

  const orderHistory = [
    {
      id: 101,
      asset: 'SOL',
      type: 'market',
      side: 'long',
      size: 200,
      price: 138.50,
      filled: 200,
      total: 200,
      status: 'filled',
      time: '2 days ago',
      privacy: 'encrypted'
    },
    {
      id: 102,
      asset: 'BTC',
      type: 'limit',
      side: 'short',
      size: 0.5,
      price: 69500.00,
      filled: 0,
      total: 0.5,
      status: 'cancelled',
      time: '3 days ago',
      privacy: 'encrypted'
    },
    {
      id: 103,
      asset: 'ETH',
      type: 'market',
      side: 'long',
      size: 30,
      price: 3320.00,
      filled: 30,
      total: 30,
      status: 'filled',
      time: '5 days ago',
      privacy: 'encrypted'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'filled': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-rose-400" />;
      case 'partial': return <Clock className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      open: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      partial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      filled: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };
    return styles[status] || styles.open;
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-slate-400">Manage your open orders and view history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Open Orders</div>
          <div className="text-2xl font-bold text-white">3</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Filled Today</div>
          <div className="text-2xl font-bold text-emerald-400">12</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-rose-400">2</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total Volume</div>
          <div className="text-2xl font-bold text-white">$1.2M</div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-1">
          {['open', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'open' ? 'Open Orders' : 'Order History'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 pb-3 sm:pb-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Open Orders Table */}
      {activeTab === 'open' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Time</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Asset</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Type</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Side</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Price</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Filled</th>
                  <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {openOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {order.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {order.asset === 'SOL' ? '◎' : order.asset === 'BTC' ? '₿' : 'Ξ'}
                        </span>
                        <span className="font-semibold text-white">{order.asset}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 capitalize">{order.type}</span>
                      {order.trigger && (
                        <div className="text-xs text-slate-500">Trigger: ${order.trigger.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                        order.side === 'long' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {order.side === 'long' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {order.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-mono">
                      ${order.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-white font-mono">{order.size}</div>
                      <div className="text-xs text-slate-500">{order.asset}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{width: `${(order.filled / order.total) * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400">
                          {((order.filled / order.total) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium rounded-lg transition-colors border border-rose-500/20">
                          Cancel
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {openOrders.length === 0 && (
            <div className="text-center py-12">
              <List className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No open orders</p>
              <p className="text-slate-500 text-sm mt-1">Your active orders will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* Order History Table */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Time</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Asset</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Type</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Side</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Avg Price</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Total</th>
                  <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Privacy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orderHistory.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {order.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {order.asset === 'SOL' ? '◎' : order.asset === 'BTC' ? '₿' : 'Ξ'}
                        </span>
                        <span className="font-semibold text-white">{order.asset}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 capitalize">{order.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                        order.side === 'long' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {order.side === 'long' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {order.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-mono">
                      ${order.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-white font-mono">{order.filled} {order.asset}</div>
                      <div className="text-xs text-slate-500">${(order.filled * order.price).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-xs text-indigo-400">
                        <Lock className="w-3 h-3" />
                        <span>Encrypted</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
