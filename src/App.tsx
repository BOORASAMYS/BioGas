import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MetricCard from './components/MetricCard';
import AlertsPanel from './components/AlertPanel';
import CombinedGraph from './components/CombinedGraph';
import SeparateGraphs from './components/SeparateGraphs';
import { useSensorData } from './hooks/useSensorData';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [viewMode, setViewMode] = useState<'combined' | 'separate'>('combined');
  const [highlightedSensor, setHighlightedSensor] = useState<string>('');
  const { data, alerts, currentValues } = useSensorData();

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) + ', ' + now.toLocaleTimeString('en-US', {
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMetricClick = (sensorKey: string) => {
    setViewMode('separate');
    setHighlightedSensor(sensorKey);
    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedSensor(''), 3000);
  };

  const getSensorKey = (title: string): string => {
    const keyMap: { [key: string]: string } = {
      'pH Level': 'ph',
      'Temperature': 'temperature',
      'Pressure 1': 'pressure1',
      'Pressure 2': 'pressure2',
      'Pressure 3': 'pressure3'
    };
    return keyMap[title] || '';
  };

  const metrics = [
    { 
      title: 'pH Level', 
      value: currentValues.ph.toFixed(1), 
      unit: 'pH', 
      color: 'blue',
      icon: '🧪'
    },
    { 
      title: 'Temperature', 
      value: currentValues.temperature.toFixed(1), 
      unit: '°C', 
      color: 'orange',
      icon: '🌡️'
    },
    { 
      title: 'Pressure 1', 
      value: currentValues.pressure1.toFixed(1), 
      unit: 'PSI', 
      color: 'red',
      icon: '⚡'
    },
    { 
      title: 'Pressure 2', 
      value: currentValues.pressure2.toFixed(1), 
      unit: 'PSI', 
      color: 'purple',
      icon: '💨'
    },
    { 
      title: 'Pressure 3', 
      value: currentValues.pressure3.toFixed(1), 
      unit: 'PSI', 
      color: 'green',
      icon: '🔧'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <Navbar currentTime={currentTime} />
      
      <div className="p-4 max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              unit={metric.unit}
              color={metric.color}
              icon={metric.icon}
              onClick={() => handleMetricClick(getSensorKey(metric.title))}
              isHighlighted={viewMode === 'separate' && highlightedSensor === getSensorKey(metric.title)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Alerts Panel */}
          <div className="xl:col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Live Monitoring</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('combined')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewMode === 'combined'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Combined View
                  </button>
                  <button
                    onClick={() => setViewMode('separate')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      viewMode === 'separate'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sensor Dashboard
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-3 flex flex-wrap gap-x-4 gap-y-1">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                pH: {currentValues.ph.toFixed(1)}
                <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2 ml-4"></span>
                Temperature: {currentValues.temperature.toFixed(1)}°C
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 ml-4"></span>
                Pressure 1: {currentValues.pressure1.toFixed(1)} PSI
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2 ml-4"></span>
                Pressure 2: {currentValues.pressure2.toFixed(1)} PSI
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 ml-4"></span>
                Pressure 3: {currentValues.pressure3.toFixed(1)} PSI
              </div>
            </div>

            {/* Graph Display */}
            {viewMode === 'combined' ? (
              <CombinedGraph data={data} />
            ) : (
              <SeparateGraphs data={data} highlightedSensor={highlightedSensor} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;