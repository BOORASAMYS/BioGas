import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  sensor: string;
  message: string;
  severity: 'warning' | 'normal';
  timestamp: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
      </div>
      
      <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
            <p className="text-gray-500">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-2 rounded-lg border ${
                alert.severity === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle
                  className={`h-3 w-3 mt-0.5 ${
                    alert.severity === 'warning' ? 'text-yellow-600' : 'text-green-600'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">{alert.sensor}</p>
                  <p className="text-xs text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;