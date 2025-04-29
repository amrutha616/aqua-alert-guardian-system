
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  DropletIcon, 
  GaugeIcon, 
  MapPinIcon, 
  AlertTriangleIcon, 
  ChartLineIcon, 
  SettingsIcon 
} from 'lucide-react';

const AppSidebar = () => {
  const menuItems = [
    { id: 1, title: 'Dashboard', path: '/', icon: GaugeIcon },
    { id: 2, title: 'Map View', path: '/map', icon: MapPinIcon },
    { id: 3, title: 'Alerts', path: '/alerts', icon: AlertTriangleIcon },
    { id: 4, title: 'Analytics', path: '/analytics', icon: ChartLineIcon },
    { id: 5, title: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-2">
          <DropletIcon className="h-6 w-6 mr-2 text-sidebar-primary" />
          <span className="font-bold text-lg">Aqua Alert</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'flex items-center w-full font-medium bg-sidebar-accent text-sidebar-accent-foreground rounded-md' : 'flex items-center w-full'
                      }
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="text-xs opacity-70">
          <p>Aqua Alert Guardian</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
