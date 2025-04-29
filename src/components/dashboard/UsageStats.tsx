
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { DropletIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const UsageStats: React.FC = () => {
  const [animateData, setAnimateData] = useState(false);
  const [data, setData] = useState([
    { name: 'Mon', usage: 0 },
    { name: 'Tue', usage: 0 },
    { name: 'Wed', usage: 0 },
    { name: 'Thu', usage: 0 },
    { name: 'Fri', usage: 0 },
    { name: 'Sat', usage: 0 },
    { name: 'Sun', usage: 0 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateData(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animateData) {
      setData([
        { name: 'Mon', usage: 250 },
        { name: 'Tue', usage: 180 },
        { name: 'Wed', usage: 310 },
        { name: 'Thu', usage: 280 },
        { name: 'Fri', usage: 230 },
        { name: 'Sat', usage: 160 },
        { name: 'Sun', usage: 140 },
      ]);
    }
  }, [animateData]);

  const chartConfig = {
    usage: {
      label: "Water Usage (gal)",
      theme: {
        light: "#0ea5e9",
        dark: "#38bdf8",
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Water Usage Statistics
        </CardTitle>
        <div className="flex items-center">
          <DropletIcon className="h-4 w-4 mr-1 text-primary" />
          <span className="text-xs text-muted-foreground">Weekly Overview</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer 
            config={chartConfig}
            className="h-full w-full"
          >
            <BarChart data={data} className="w-full">
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-usage, #0ea5e9)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-usage, #0ea5e9)" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" labelKey="usage" />}
              />
              <Bar 
                dataKey="usage" 
                name="usage"
                fill="url(#colorUsage)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={300}
                animationEasing="ease-out"
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          <p>Total weekly usage: <span className="font-medium">1,550 gallons</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageStats;
