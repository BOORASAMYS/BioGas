import { useState, useEffect, useRef } from 'react';

export interface SensorData {
  timestamp: string;
  ph: number;
  temperature: number;
  pressure1: number;
  pressure2: number;
  pressure3: number;
}

export interface Alert {
  id: string;
  sensor: string;
  message: string;
  severity: 'warning' | 'normal';
  timestamp: string;
}

function extractNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const match = value.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }
  return NaN;
}

const MAX_ENTRIES = 500;

export const useSensorData = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [currentValues, setCurrentValues] = useState<SensorData>({
    timestamp: '',
    ph: NaN,
    temperature: NaN,
    pressure1: NaN,
    pressure2: NaN,
    pressure3: NaN,
  });

  const previousValues = useRef<SensorData>(currentValues);
  // Correct Type for intervalRef in browsers/Node is number or null for window.setInterval
  const intervalRef = useRef<number | null>(null);

  const checkForAlerts = (newData: SensorData) => {
    const sensors = [
      { key: 'ph', name: 'pH Level', threshold: 0.5, normal: [6.5, 7.5] },
      { key: 'temperature', name: 'Temperature', threshold: 3, normal: [32, 40] },
      { key: 'pressure1', name: 'Pressure 1', threshold: 2, normal: [12, 20] },
      { key: 'pressure2', name: 'Pressure 2', threshold: 2.5, normal: [15, 25] },
      { key: 'pressure3', name: 'Pressure 3', threshold: 1.5, normal: [10, 18] },
    ];

    const newAlerts: Alert[] = [];

    sensors.forEach(({ key, name, threshold, normal }) => {
      const currentValue = newData[key as keyof SensorData];
      const previousValue = previousValues.current[key as keyof SensorData];

      if (
        typeof currentValue !== 'number' ||
        typeof previousValue !== 'number' ||
        isNaN(currentValue) ||
        isNaN(previousValue)
      ) {
        return;
      }

      const change = Math.abs(currentValue - previousValue);

      if (change > threshold) {
        newAlerts.push({
          id: `${key}-${Date.now()}`,
          sensor: name,
          message: `Sudden change detected: ${change.toFixed(1)} unit change`,
          severity: 'warning',
          timestamp: new Date().toLocaleTimeString(),
        });
      } else if (normal.length >= 2 && (currentValue < normal[0] || currentValue > normal[1])) {
        newAlerts.push({
          id: `${key}-range-${Date.now()}`,
          sensor: name,
          message: `Value outside normal range: ${currentValue}`,
          severity: 'warning',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    });

    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev.slice(0, 4)]);
    }

    previousValues.current = { ...newData };
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('https://biogas-backend-zk70.onrender.com/sensorData');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const fetchedData: SensorData[] = await response.json();

        if (fetchedData.length === 0) return;

        const latest = fetchedData[0]; // newest data

        const newData: SensorData = {
          timestamp: new Date(latest.timestamp).toLocaleTimeString(),
          ph: extractNumber(latest.ph),
          temperature: extractNumber(latest.temperature),
          pressure1: extractNumber(latest.pressure1),
          pressure2: extractNumber(latest.pressure2),
          pressure3: extractNumber(latest.pressure3),
        };

        setCurrentValues(newData);
        setData((prev) => [...prev.slice(-19), newData]);
        checkForAlerts(newData);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    fetchSensorData();

    intervalRef.current = window.setInterval(fetchSensorData, 5000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { data, alerts, currentValues };
};
