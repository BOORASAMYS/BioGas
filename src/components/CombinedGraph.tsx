import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DataPoint {
  timestamp: string;
  ph: number;
  temperature: number;
  pressure1: number;
  pressure2: number;
  pressure3: number;
}

interface CombinedGraphProps {
  data: DataPoint[];
}

const CombinedGraph: React.FC<CombinedGraphProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Sensor Readings</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="ph"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            name="pH"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="pressure1"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            name="Pressure 1 (PSI)"
          />
          <Line
            type="monotone"
            dataKey="pressure2"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            name="Pressure 2 (PSI)"
          />
          <Line
            type="monotone"
            dataKey="pressure3"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="Pressure 3 (PSI)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CombinedGraph;