
import React from 'react';
import AppLayout from '@/components/AppLayout';
import StatusCard from '@/components/dashboard/StatusCard';
import LeakMap from '@/components/dashboard/LeakMap';
import PressureGauge from '@/components/dashboard/PressureGauge';
import LeakTrends from '@/components/dashboard/LeakTrends';
import AlertsList from '@/components/dashboard/AlertsList';
import SystemHealth from '@/components/dashboard/SystemHealth';
import { DropletIcon, AlertTriangleIcon, GaugeIcon, WifiIcon } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor your water infrastructure in real-time.</p>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatusCard 
          title="Active Leaks"
          value="12"
          icon={<DropletIcon className="h-5 w-5" />}
          description="Across the city"
          trend={{ value: 15, isPositive: false }}
          className="border-l-4 border-l-alert-high"
        />
        <StatusCard 
          title="Critical Alerts"
          value="3"
          icon={<AlertTriangleIcon className="h-5 w-5" />}
          description="Requiring attention"
          trend={{ value: 25, isPositive: false }}
          className="border-l-4 border-l-alert-high"
        />
        <StatusCard 
          title="Avg. Water Pressure"
          value="42 PSI"
          icon={<GaugeIcon className="h-5 w-5" />}
          description="City-wide average"
          trend={{ value: 5, isPositive: true }}
          className="border-l-4 border-l-alert-low"
        />
        <StatusCard 
          title="Sensor Network"
          value="132 Active"
          icon={<WifiIcon className="h-5 w-5" />}
          description="98.7% uptime"
          className="border-l-4 border-l-alert-low"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <LeakMap />
        <div className="space-y-6">
          <PressureGauge 
            title="Main Line Pressure"
            value={68}
            unit=" PSI"
            minValue={0}
            maxValue={100}
            warningThreshold={75}
            criticalThreshold={90}
          />
          <SystemHealth />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <LeakTrends />
        <AlertsList />
      </div>
    </AppLayout>
  );
};

export default Index;
