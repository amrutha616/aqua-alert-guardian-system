
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from 'lucide-react';

interface Alert {
  id: number;
  location: string;
  type: 'leak' | 'pressure' | 'flow';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  status: 'new' | 'assigned' | 'resolved';
}

const alerts: Alert[] = [
  {
    id: 1,
    location: 'Broadway & 42nd St',
    type: 'leak',
    severity: 'high',
    timestamp: '15 min ago',
    status: 'new',
  },
  {
    id: 2,
    location: 'Park Ave & 10th St',
    type: 'pressure',
    severity: 'medium',
    timestamp: '45 min ago',
    status: 'assigned',
  },
  {
    id: 3,
    location: 'Main St & 5th Ave',
    type: 'leak',
    severity: 'low',
    timestamp: '2 hours ago',
    status: 'new',
  },
  {
    id: 4,
    location: 'Oak Dr & Pine Ave',
    type: 'flow',
    severity: 'medium',
    timestamp: '3 hours ago',
    status: 'assigned',
  },
];

const getAlertTypeLabel = (type: string) => {
  switch (type) {
    case 'leak':
      return 'Water Leak';
    case 'pressure':
      return 'Pressure Drop';
    case 'flow':
      return 'Abnormal Flow';
    default:
      return type;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-alert-low';
    case 'medium':
      return 'bg-alert-medium';
    case 'high':
      return 'bg-alert-high';
    default:
      return 'bg-gray-400';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge className="bg-blue-500">New</Badge>;
    case 'assigned':
      return <Badge variant="outline" className="text-alert-medium border-alert-medium">Assigned</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="text-alert-low border-alert-low">Resolved</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const AlertsList: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`h-2 w-2 mt-2 rounded-full ${getSeverityColor(alert.severity)}`} />
                <div>
                  <div className="font-medium">{getAlertTypeLabel(alert.type)}</div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                    <MapPinIcon className="h-3 w-3" />
                    <span>{alert.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getStatusBadge(alert.status)}
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
