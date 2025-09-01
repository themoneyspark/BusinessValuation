import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  Activity, 
  TrendingUp,
  Shield,
  Settings,
  CreditCard,
  Headphones,
  BarChart3,
  UserCheck,
  Tag,
  Bell,
  Search,
  Menu,
  X,
  Bot,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { mockMetrics } from '../mockData';

// Import section components
import UsersManagement from './admin/UsersManagement';
import BillingManagement from './admin/BillingManagement';
import SupportTickets from './admin/SupportTickets';
import CouponManagement from './admin/CouponManagement';
import TeamManagement from './admin/TeamManagement';
import SystemHealth from './admin/SystemHealth';
import ReportManagement from './admin/ReportManagement';
import RoleManagement from './admin/RoleManagement';
import AIManagement from './admin/AIManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    {
      category: 'User Management',
      items: [
        { id: 'users', name: 'Users Overview', icon: Users, count: mockMetrics.totalUsers },
        { id: 'team', name: 'Team Members', icon: UserCheck, count: 8 }
      ]
    },
    {
      category: 'Financial Management', 
      items: [
        { id: 'billing', name: 'Billing & Revenue', icon: DollarSign, count: `$${mockMetrics.monthlyRevenue.toLocaleString()}` },
        { id: 'coupons', name: 'Coupon Codes', icon: Tag, count: 12 }
      ]
    },
    {
      category: 'Content & Reports',
      items: [
        { id: 'reports', name: 'Report Management', icon: FileText, count: '24 reports' },
        { id: 'analytics', name: 'Reports & Analytics', icon: BarChart3, count: mockMetrics.reportsGenerated }
      ]
    },
    {
      category: 'AI & Features',
      items: [
        { id: 'ai', name: 'AI Management', icon: Bot, count: '15.2K queries' },
        { id: 'support', name: 'Support Tickets', icon: Headphones, count: mockMetrics.openTickets }
      ]
    },
    {
      category: 'Advanced Security',
      items: [
        { id: 'roles', name: 'Role Management', icon: Shield, count: '8 roles' },
        { id: 'security', name: 'Security Center', icon: Shield, count: '2 alerts' },
        { id: 'system', name: 'System Health', icon: Activity, count: `${mockMetrics.systemUptime}%` }
      ]
    },
    {
      category: 'System Settings',
      items: [
        { id: 'settings', name: 'Platform Settings', icon: Settings, count: null }
      ]
    }
  ];

  const quickMetrics = [
    {
      title: 'Total Users',
      value: mockMetrics.totalUsers.toLocaleString(),
      change: `+${mockMetrics.userGrowth}%`,
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: `$${mockMetrics.monthlyRevenue.toLocaleString()}`,
      change: `+${mockMetrics.revenueGrowth}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Reports Generated',
      value: mockMetrics.reportsGenerated,
      change: '+15%',
      trend: 'up',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Open Tickets',
      value: mockMetrics.openTickets,
      change: '-8%',
      trend: 'down',
      icon: HelpCircle,
      color: 'orange'
    },
    {
      title: 'System Health',
      value: `${mockMetrics.systemUptime}%`,
      change: 'Uptime',
      trend: 'stable',
      icon: Activity,
      color: 'green'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'support':
        return <SupportTickets />;
      case 'coupons':
        return <CouponManagement />;
      case 'team':
        return <TeamManagement />;
      case 'system':
        return <SystemHealth />;
      case 'reports':
        return <ReportManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'ai':
        return <AIManagement />;
      default:
        return <DashboardOverview quickMetrics={quickMetrics} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Professional Admin Header */}
      <header className="fixed top-0 w-full h-16 bg-slate-900 border-b border-slate-700 shadow-lg z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left Section - Logo & Branding */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-slate-700 md:hidden"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#20B2AA] rounded-lg flex items-center justify-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ade93c71-5b26-473c-9a63-fa3def684fd0/artifacts/fu5a2wt2_Screen%20Shot%202025-08-31%20at%209.55.17%20AM.png" 
                  alt="KG Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">Admin Portal</h1>
                <p className="text-slate-400 text-xs">KohariGonzalez CPAs</p>
              </div>
            </div>
          </div>

          {/* Center Section - System Status */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-300">System Online</span>
            </div>
            <div className="text-slate-300">{mockMetrics.totalUsers.toLocaleString()} Active Users</div>
            <Badge className="bg-green-100 text-green-800 text-xs">
              PRODUCTION
            </Badge>
          </div>

          {/* Right Section - Admin Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-5 h-5">
                3
              </Badge>
            </Button>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#20B2AA] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SG</span>
              </div>
              <div className="hidden md:block">
                <p className="text-white text-sm font-medium">Sara Gonzalez</p>
                <p className="text-slate-400 text-xs">Super Admin</p>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Admin Sidebar */}
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <div className="p-4">
            {navigation.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#20B2AA] text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.count && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            activeSection === item.id ? 'bg-white/20 text-white' : 'bg-slate-100'
                          }`}
                        >
                          {item.count}
                        </Badge>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = ({ quickMetrics }) => {
  return (
    <div className="space-y-6">
      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickMetrics.map((metric, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-5 h-5 ${
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    metric.color === 'orange' ? 'text-orange-600' : 'text-slate-600'
                  }`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{metric.title}</p>
                  <div className="flex items-center justify-end mt-1">
                    {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
                    <span className={`text-xs ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Jennifer Lee', action: 'Generated Premium Report', time: '2 mins ago', type: 'report' },
                { user: 'Michael Johnson', action: 'Upgraded to Premium', time: '15 mins ago', type: 'upgrade' },
                { user: 'Sarah Thompson', action: 'New Registration', time: '1 hour ago', type: 'registration' },
                { user: 'David Chen', action: 'Support Ticket Created', time: '2 hours ago', type: 'support' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{activity.user}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{activity.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { message: 'High ticket volume detected', type: 'warning', time: '5 mins ago' },
                { message: 'Monthly revenue target reached', type: 'success', time: '1 hour ago' },
                { message: 'System backup completed', type: 'info', time: '3 hours ago' },
                { message: 'New user registration spike', type: 'info', time: '6 hours ago' }
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-orange-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;