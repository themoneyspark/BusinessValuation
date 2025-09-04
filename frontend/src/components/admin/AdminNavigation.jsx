import React from 'react';
import { 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  Home,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const AdminNavigation = ({ activeAdminTab, onAdminTabChange, onReturnToDashboard }) => {
  const adminMenuItems = [
    {
      id: 'overview',
      label: 'Admin Overview',
      icon: Home,
      description: 'Platform statistics and activity'
    },
    {
      id: 'clients',
      label: 'Client Management', 
      icon: Users,
      description: 'User accounts and client data',
      badge: '1,247'
    },
    {
      id: 'assessments',
      label: 'Assessment Review',
      icon: FileText,
      description: 'Review client assessments and progress',
      badge: '156'
    },
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: BarChart3,
      description: 'Platform performance and business insights'
    },
    {
      id: 'settings',
      label: 'Admin Settings',
      icon: Settings,
      description: 'System configuration and management'
    }
  ];

  return (
    <aside className="fixed left-0 top-18 w-70 h-[calc(100vh-4.5rem)] bg-gray-900 border-r border-gray-700">
      <div className="flex flex-col h-full">
        
        {/* Admin Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
              <p className="text-sm text-gray-400">KGOB Administration</p>
            </div>
          </div>
        </div>

        {/* Admin Navigation Menu */}
        <div className="flex-1 py-6 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAdminTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onAdminTabChange(item.id)}
                className={`w-full h-16 justify-start px-6 mb-1 text-left ${
                  isActive 
                    ? 'bg-red-500 text-white border-r-4 border-red-300' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </div>
                  
                  {item.badge && (
                    <Badge className="bg-teal-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Return to Dashboard */}
        <div className="p-6 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onReturnToDashboard}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminNavigation;