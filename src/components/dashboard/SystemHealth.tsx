
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
}

const metrics: SystemMetric[] = [
  { 
    name: 'Sensor Battery', 
    value: 85, 
    target: 100,
    unit: '%' 
  },
  { 
    name: 'Network Uptime', 
    value: 98.7, 
    target: 100,
    unit: '%' 
  },
  { 
    name: 'Data Transmission', 
    value: 89.2, 
    target: 100,
    unit: '%' 
  }
];

const getStatusColor = (value: number): string => {
  if (value >= 90) return 'text-alert-low';
  if (value >= 75) return 'text-alert-medium';
  return 'text-alert-high';
};

const getProgressColor = (value: number): string => {
  if (value >= 90) return 'bg-alert-low';
  if (value >= 75) return 'bg-alert-medium';
  return 'bg-alert-high';
};

const SystemHealth: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{metric.name}</span>
                <span className={getStatusColor(metric.value)}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              <Progress value={metric.value} className="h-2" indicatorClassName={getProgressColor(metric.value)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
