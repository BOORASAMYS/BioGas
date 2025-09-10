import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface DataPoint {
  timestamp: string;
  ph: number;
  temperature: number;
  pressure1: number;
  pressure2: number;
  pressure3: number;
}

interface SeparateGraphsProps {
  data: DataPoint[];
  highlightedSensor?: string;
}

interface GraphConfig {
  title: string;
  dataKey: string;
  color: string;
  unit: string;
}

const SeparateGraphs: React.FC<SeparateGraphsProps> = ({ data, highlightedSensor }) => {
  const graphs: GraphConfig[] = [
    { title: 'pH Level', dataKey: 'ph', color: '#3b82f6', unit: 'pH' },
    { title: 'Temperature', dataKey: 'temperature', color: '#f97316', unit: '°C' },
    { title: 'Pressure 1', dataKey: 'pressure1', color: '#ef4444', unit: 'PSI' },
    { title: 'Pressure 2', dataKey: 'pressure2', color: '#8b5cf6', unit: 'PSI' },
    { title: 'Pressure 3', dataKey: 'pressure3', color: '#10b981', unit: 'PSI' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {graphs.map((graph) => (
        <div 
          key={graph.dataKey} 
          className={`bg-white rounded-lg shadow-sm border p-3 transition-all ${
            highlightedSensor === graph.dataKey
              ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
              : 'border-gray-200'
          }`}
        >
          <h4 className="text-sm font-medium text-gray-900 mb-2">{graph.title}</h4>
          
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value) => [`${value} ${graph.unit}`, graph.title]}
              />
              
              <Line
                type="monotone"
                dataKey={graph.dataKey}
                stroke={graph.color}
                strokeWidth={2}
                dot={{ fill: graph.color, strokeWidth: 2, r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default SeparateGraphs;