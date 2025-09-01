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
      {/* Fancy Admin Top Bar */}
      <header className="fixed top-0 w-full h-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-600 shadow-xl z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left Section - Enhanced Logo & Branding */}
          <div className="flex items-center space-x-6 w-80">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-slate-700/50 md:hidden rounded-lg transition-all duration-200"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-4 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-600/50">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#20B2AA] to-[#1a9d96] rounded-lg flex items-center justify-center shadow-lg">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ade93c71-5b26-473c-9a63-fa3def684fd0/artifacts/fu5a2wt2_Screen%20Shot%202025-08-31%20at%209.55.17%20AM.png" 
                    alt="KG Logo" 
                    className="w-10 h-10 object-contain filter brightness-110"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-xl tracking-wide bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Admin Portal
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs font-medium px-2 py-1 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></div>
                    PRODUCTION
                  </Badge>
                  <span className="text-slate-400 text-xs">KohariGonzalez</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Enhanced System Status */}
          <div className="hidden lg:flex items-center space-x-8 bg-slate-800/30 px-6 py-3 rounded-xl border border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">System Online</span>
                <span className="text-slate-400 text-xs">All services operational</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-[#20B2AA] text-lg font-bold">{mockMetrics.totalUsers.toLocaleString()}</span>
              <span className="text-slate-400 text-xs">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#20B2AA] text-lg font-bold">99.8%</span>
              <span className="text-slate-400 text-xs">Uptime</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Updated 2min ago</span>
            </div>
          </div>

          {/* Right Section - Enhanced Admin Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-slate-700/50 relative p-2 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs px-1.5 py-0.5 min-w-5 h-5 rounded-full shadow-lg animate-bounce">
                  3
                </Badge>
              </Button>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#20B2AA] to-[#1a9d96] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">SA</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
              </div>
              <div className="hidden md:block">
                <p className="text-white text-sm font-semibold">Sara Admin</p>
                <div className="flex items-center space-x-2">
                  <p className="text-slate-400 text-xs">Super Administrator</p>
                  <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                  <p className="text-[#20B2AA] text-xs font-medium">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#20B2AA]/50 to-transparent"></div>
      </header>

      <div className="flex pt-20">
        {/* Admin Sidebar */}
        <aside className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 z-40 ${
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