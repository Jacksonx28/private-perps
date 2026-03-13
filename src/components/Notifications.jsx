import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react';

const Notifications = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Order Filled',
      message: 'Your long position on SOL has been filled at $142.35',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Liquidation Warning',
      message: 'Your BTC short position is approaching liquidation price',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Funding Payment',
      message: 'Funding payment of $2.50 received for ETH position',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Wallet Connected',
      message: 'Successfully connected Phantom wallet',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Price Alert',
      message: 'SOL reached your target price of $140.00',
      time: '5 hours ago',
      read: true
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'success': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20';
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-slate-800/30';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      ></div>
      
      {/* Notifications Panel */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-indigo-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
            <h2 className="text-lg font-bold text-white">Notifications</h2>
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-xs rounded-full">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
              Mark all read
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-slate-800/30 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-slate-800/20' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getBgColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50">
          <button className="w-full py-2 text-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;