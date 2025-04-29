
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeakMap from '@/components/dashboard/LeakMap';

const MapView = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
        <p className="text-muted-foreground mt-1">Interactive visualization of the water network.</p>
      </div>
      
      <Card className="p-6">
        <Tabs defaultValue="leaks">
          <TabsList className="mb-6">
            <TabsTrigger value="leaks">Leak Detections</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Locations</TabsTrigger>
            <TabsTrigger value="pressure">Pressure Map</TabsTrigger>
          </TabsList>
          <TabsContent value="leaks" className="h-[calc(100vh-300px)] min-h-[500px]">
            <LeakMap />
          </TabsContent>
          <TabsContent value="sensors" className="h-[calc(100vh-300px)] min-h-[500px]">
            <div className="flex items-center justify-center h-full bg-muted rounded-md">
              <p className="text-muted-foreground">Sensor locations map view coming soon</p>
            </div>
          </TabsContent>
          <TabsContent value="pressure" className="h-[calc(100vh-300px)] min-h-[500px]">
            <div className="flex items-center justify-center h-full bg-muted rounded-md">
              <p className="text-muted-foreground">Pressure heatmap view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default MapView;
