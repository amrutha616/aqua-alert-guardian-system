
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LeakSeverity = 'low' | 'medium' | 'high';

interface LeakMarker {
  id: number;
  x: number;
  y: number;
  severity: LeakSeverity;
  location: string;
  detectedAt: string;
  flowRate: string;
  pressure: string;
}

const leakData: LeakMarker[] = [
  {
    id: 1,
    x: 25,
    y: 35,
    severity: 'low',
    location: 'Main St & 5th Ave',
    detectedAt: '2025-04-29 08:45',
    flowRate: '12.3 L/min',
    pressure: '45 PSI'
  },
  {
    id: 2,
    x: 45,
    y: 60,
    severity: 'medium',
    location: 'Park Ave & 10th St',
    detectedAt: '2025-04-29 07:30',
    flowRate: '25.7 L/min',
    pressure: '32 PSI'
  },
  {
    id: 3,
    x: 75,
    y: 40,
    severity: 'high',
    location: 'Broadway & 42nd St',
    detectedAt: '2025-04-29 06:15',
    flowRate: '52.1 L/min',
    pressure: '18 PSI'
  },
  {
    id: 4,
    x: 60,
    y: 25,
    severity: 'low',
    location: 'River Rd & Maple St',
    detectedAt: '2025-04-29 09:20',
    flowRate: '8.5 L/min',
    pressure: '47 PSI'
  },
  {
    id: 5,
    x: 15,
    y: 70,
    severity: 'medium',
    location: 'Oak Dr & Pine Ave',
    detectedAt: '2025-04-29 08:10',
    flowRate: '31.2 L/min',
    pressure: '28 PSI'
  }
];

const getSeverityLabel = (severity: LeakSeverity) => {
  switch (severity) {
    case 'low':
      return { label: 'Minor', color: 'bg-alert-low' };
    case 'medium':
      return { label: 'Moderate', color: 'bg-alert-medium' };
    case 'high':
      return { label: 'Critical', color: 'bg-alert-high animate-pulse' };
    default:
      return { label: 'Unknown', color: 'bg-gray-400' };
  }
};

const LeakMap: React.FC = () => {
  const [selectedLeak, setSelectedLeak] = useState<LeakMarker | null>(null);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>City Leak Map</CardTitle>
        <div className="flex gap-2 text-xs">
          <Badge variant="outline" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-alert-low"></span> Minor
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-alert-medium"></span> Moderate
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-alert-high"></span> Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="city-map rounded-md border relative overflow-hidden">
          <TooltipProvider>
            {leakData.map((leak) => (
              <Tooltip key={leak.id}>
                <TooltipTrigger asChild>
                  <div 
                    className={`map-marker marker-${leak.severity}`} 
                    style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
                    onClick={() => setSelectedLeak(leak === selectedLeak ? null : leak)}
                  ></div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-xs">
                    <p className="font-bold">{leak.location}</p>
                    <p>{getSeverityLabel(leak.severity).label} Leak</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>

          {selectedLeak && (
            <div className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{selectedLeak.location}</h4>
                <Badge className={getSeverityLabel(selectedLeak.severity).color}>
                  {getSeverityLabel(selectedLeak.severity).label}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Detected:</span> {selectedLeak.detectedAt}
                </div>
                <div>
                  <span className="text-muted-foreground">Flow Rate:</span> {selectedLeak.flowRate}
                </div>
                <div>
                  <span className="text-muted-foreground">Pressure:</span> {selectedLeak.pressure}
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span> Active
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeakMap;
