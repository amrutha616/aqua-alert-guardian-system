
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { date: 'Jan', leaks: 12, resolved: 10 },
  { date: 'Feb', leaks: 19, resolved: 15 },
  { date: 'Mar', leaks: 15, resolved: 14 },
  { date: 'Apr', leaks: 25, resolved: 22 },
  { date: 'May', leaks: 18, resolved: 17 },
  { date: 'Jun', leaks: 21, resolved: 19 },
  { date: 'Jul', leaks: 30, resolved: 27 },
];

const LeakTrends: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Leak Trends (Last 7 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] leak-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLeaks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="leaks" 
                stroke="#0284c7" 
                fillOpacity={1} 
                fill="url(#colorLeaks)" 
                name="Detected Leaks"
              />
              <Area 
                type="monotone" 
                dataKey="resolved" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorResolved)"
                name="Resolved Leaks" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded bg-water-600 mr-2"></span>
            <span className="text-sm">Detected Leaks</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded bg-alert-low mr-2"></span>
            <span className="text-sm">Resolved Leaks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeakTrends;
