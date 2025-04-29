
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PressureGaugeProps {
  value: number; // Value from 0-100
  title: string;
  unit: string;
  minValue?: number;
  maxValue?: number;
  warningThreshold?: number;
  criticalThreshold?: number;
}

const PressureGauge: React.FC<PressureGaugeProps> = ({
  value,
  title,
  unit,
  minValue = 0,
  maxValue = 100,
  warningThreshold = 70,
  criticalThreshold = 90,
}) => {
  // Constrain value to min-max range
  const constrainedValue = Math.max(minValue, Math.min(maxValue, value));
  
  // Calculate needle rotation (from -90 to 90 degrees)
  const range = maxValue - minValue;
  const percentage = ((constrainedValue - minValue) / range);
  const rotation = -90 + (percentage * 180);
  
  // Determine status color based on thresholds
  let statusColor = 'text-alert-low';
  if (constrainedValue >= warningThreshold && constrainedValue < criticalThreshold) {
    statusColor = 'text-alert-medium';
  } else if (constrainedValue >= criticalThreshold) {
    statusColor = 'text-alert-high';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pressure-gauge">
          <svg className="gauge-bg" viewBox="0 0 120 70">
            {/* Gauge background arc */}
            <path 
              d="M10,60 A50,50 0 0,1 110,60" 
              fill="none" 
              stroke="#e2e8f0" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            
            {/* Low zone (green) */}
            <path 
              d="M10,60 A50,50 0 0,1 40,20" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            
            {/* Medium zone (amber) */}
            <path 
              d="M40,20 A50,50 0 0,1 80,20" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            
            {/* High zone (red) */}
            <path 
              d="M80,20 A50,50 0 0,1 110,60" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            
            {/* Tick marks */}
            <g stroke="#475569" strokeWidth="1">
              <line x1="10" y1="60" x2="15" y2="55" />
              <line x1="30" y1="30" x2="35" y2="25" />
              <line x1="60" y1="15" x2="60" y2="20" />
              <line x1="90" y1="30" x2="85" y2="25" />
              <line x1="110" y1="60" x2="105" y2="55" />
            </g>
            
            {/* Value labels */}
            <text x="10" y="70" fontSize="8" fill="currentColor">{minValue}</text>
            <text x="60" y="12" fontSize="8" fill="currentColor" textAnchor="middle">{minValue + range/2}</text>
            <text x="110" y="70" fontSize="8" fill="currentColor" textAnchor="end">{maxValue}</text>
          </svg>
          
          <div 
            className="needle"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          ></div>
          <div className="center-point"></div>
          
          <div className={`text-center mt-4 text-2xl font-bold ${statusColor}`}>
            {value}{unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PressureGauge;
