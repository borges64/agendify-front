import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'purple' | 'pink' | 'blue' | 'green' | 'orange';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    purple: 'from-purple-400 to-purple-500',
    pink: 'from-pink-400 to-rose-400',
    blue: 'from-blue-400 to-cyan-400',
    green: 'from-green-400 to-emerald-400',
    orange: 'from-orange-400 to-yellow-400'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-50 hover:shadow-md transition-all duration-300 hover:border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
};

export default StatsCard;