import { useState, useEffect, useRef } from 'react';

interface SensorData {
  timestamp: string;
  ph: number;
  temperature: number;
  pressure1: number;
  pressure2: number;
  pressure3: number;
}

interface Alert {
  id: string;
  sensor: string;
  message: string;
  severity: 'warning' | 'normal';
  timestamp: string;
}

export const useSensorData = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [currentValues, setCurrentValues] = useState({
    ph: 7.2,
    temperature: 35.5,
    pressure1: 15.2,
    pressure2: 18.7,
    pressure3: 12.3
  });

  const previousValues = useRef(currentValues);

  const generateNewData = (): SensorData => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });

    // Generate realistic biogas sensor values with some variation
    const newValues = {
      ph: Math.max(6.0, Math.min(8.5, currentValues.ph + (Math.random() - 0.5) * 0.3)),
      temperature: Math.max(30, Math.min(45, currentValues.temperature + (Math.random() - 0.5) * 2)),
      pressure1: Math.max(10, Math.min(25, currentValues.pressure1 + (Math.random() - 0.5) * 1.5)),
      pressure2: Math.max(12, Math.min(30, currentValues.pressure2 + (Math.random() - 0.5) * 2)),
      pressure3: Math.max(8, Math.min(20, currentValues.pressure3 + (Math.random() - 0.5) * 1.2))
    };

    setCurrentValues(newValues);

    return {
      timestamp: timeString,
      ph: Number(newValues.ph.toFixed(1)),
      temperature: Number(newValues.temperature.toFixed(1)),
      pressure1: Number(newValues.pressure1.toFixed(1)),
      pressure2: Number(newValues.pressure2.toFixed(1)),
      pressure3: Number(newValues.pressure3.toFixed(1))
    };
  };

  const checkForAlerts = (newData: SensorData) => {
    const sensors = [
      { key: 'ph', name: 'pH Level', threshold: 0.5, normal: [6.5, 7.5] },
      { key: 'temperature', name: 'Temperature', threshold: 3, normal: [32, 40] },
      { key: 'pressure1', name: 'Pressure 1', threshold: 2, normal: [12, 20] },
      { key: 'pressure2', name: 'Pressure 2', threshold: 2.5, normal: [15, 25] },
      { key: 'pressure3', name: 'Pressure 3', threshold: 1.5, normal: [10, 18] }
    ];

    const newAlerts: Alert[] = [];

    sensors.forEach(sensor => {
      const currentValue = newData[sensor.key as keyof SensorData] as number;
      const previousValue = previousValues.current[sensor.key as keyof typeof previousValues.current];
      const change = Math.abs(currentValue - previousValue);
      
      if (change > sensor.threshold) {
        newAlerts.push({
          id: `${sensor.key}-${Date.now()}`,
          sensor: sensor.name,
          message: `Sudden change detected: ${change.toFixed(1)} unit change`,
          severity: 'warning',
          timestamp: new Date().toLocaleTimeString()
        });
      } else if (currentValue < sensor.normal[0] || currentValue > sensor.normal[1]) {
        newAlerts.push({
          id: `${sensor.key}-range-${Date.now()}`,
          sensor: sensor.name,
          message: `Value outside normal range: ${currentValue}`,
          severity: 'warning',
          timestamp: new Date().toLocaleTimeString()
        });
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)]); // Keep max 5 alerts
    }

    previousValues.current = { ...currentValues };
  };

  useEffect(() => {
    // Initialize with some data points
    const initialData: SensorData[] = [];
    for (let i = 19; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 3000);
      const timeString = timestamp.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      initialData.push({
        timestamp: timeString,
        ph: Number((7 + Math.random() * 0.5).toFixed(1)),
        temperature: Number((35 + Math.random() * 3).toFixed(1)),
        pressure1: Number((15 + Math.random() * 2).toFixed(1)),
        pressure2: Number((18 + Math.random() * 2.5).toFixed(1)),
        pressure3: Number((12 + Math.random() * 1.5).toFixed(1))
      });
    }
    setData(initialData);

    // Set up interval for live updates
    const interval = setInterval(() => {
      const newData = generateNewData();
      
      setData(prev => {
        const updated = [...prev, newData];
        // Keep only last 20 data points
        return updated.slice(-20);
      });
      
      checkForAlerts(newData);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { data, alerts, currentValues };
};