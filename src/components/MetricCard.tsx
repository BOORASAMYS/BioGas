import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  color: string;
  icon: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, color, icon, onClick, isHighlighted }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-600 border-red-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    green: 'bg-green-100 text-green-600 border-green-200'
  };

  const iconMapping = {
    '🧪': '🧪',
    '🌡️': '🌡️',
    '⚡': '⚡',
    '💨': '💨',
    '🔧': '🔧'
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border p-3 transition-all cursor-pointer hover:shadow-md ${
        isHighlighted 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-sm border`}>
          {iconMapping[icon as keyof typeof iconMapping]}
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{unit}</div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    </div>
  );
};

export default MetricCard; 