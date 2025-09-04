import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  MapPin,
  Monitor,
  Smartphone,
  Shield,
  User,
  FileText,
  Settings,
  LogIn,
  LogOut,
  Eye,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState('7days');
  const [filterLocation, setFilterLocation] = useState('all');

  const activityLogs = [
    {
      id: 1,
      timestamp: '2024-12-31 09:30:15',
      action: 'Login',
      category: 'Authentication',
      description: 'Successful admin login',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'low',
      success: true
    },
    {
      id: 2,
      timestamp: '2024-12-31 09:25:43',
      action: 'Password Change',
      category: 'Security',
      description: 'Changed account password',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'medium',
      success: true
    },
    {
      id: 3,
      timestamp: '2024-12-31 08:45:22',
      action: 'Report Upload',
      category: 'Content Management',
      description: 'Uploaded ABC_Corp_Business_Scorecard_Dec2024.pdf',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'low',
      success: true
    },
    {
      id: 4,
      timestamp: '2024-12-31 08:30:11', 
      action: 'User Impersonation Started',
      category: 'Security',
      description: 'Started impersonating user: michael.johnson@email.com',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'high',
      success: true
    },
    {
      id: 5,
      timestamp: '2024-12-31 08:28:33',
      action: 'User Impersonation Ended',
      category: 'Security', 
      description: 'Ended impersonation session for: michael.johnson@email.com',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'medium',
      success: true
    },
    {
      id: 6,
      timestamp: '2024-12-30 17:45:28',
      action: 'AI Credits Injected',
      category: 'AI Management',
      description: 'Added 25 AI credits to emma.rodriguez@consulting.com',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'low',
      success: true
    },
    {
      id: 7,
      timestamp: '2024-12-30 16:22:15',
      action: 'Failed Login Attempt',
      category: 'Authentication',
      description: 'Failed login attempt with incorrect password',
      ipAddress: '203.0.113.42',
      location: 'Unknown Location',
      device: 'Unknown Browser',
      userAgent: 'Unknown',
      riskLevel: 'high',
      success: false
    },
    {
      id: 8,
      timestamp: '2024-12-30 15:30:44',
      action: 'Role Permissions Updated',
      category: 'User Management',
      description: 'Updated permissions for Technical Support role',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'medium',
      success: true
    },
    {
      id: 9,
      timestamp: '2024-12-30 14:15:33',
      action: 'Billing Transaction Processed',
      category: 'Financial',
      description: 'Processed refund for invoice INV-2024-002',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'medium',
      success: true
    },
    {
      id: 10,
      timestamp: '2024-12-30 13:45:12',
      action: 'System Settings Modified',
      category: 'System Administration',
      description: 'Updated platform configuration settings',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL, US',
      device: 'Chrome 120.0.0 on Windows 10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      riskLevel: 'high',
      success: true
    }
  ];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.category.toLowerCase().includes(filterAction.toLowerCase());
    const matchesLocation = filterLocation === 'all' || log.location.toLowerCase().includes(filterLocation.toLowerCase());
    
    // Time range filtering
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
    
    let matchesTimeRange = true;
    if (filterTimeRange === '1day') matchesTimeRange = daysDiff <= 1;
    else if (filterTimeRange === '7days') matchesTimeRange = daysDiff <= 7;
    else if (filterTimeRange === '30days') matchesTimeRange = daysDiff <= 30;
    
    return matchesSearch && matchesAction && matchesLocation && matchesTimeRange;
  });

  const getActionIcon = (action, category) => {
    if (action.includes('Login')) return <LogIn className="w-4 h-4" />;
    if (action.includes('Logout')) return <LogOut className="w-4 h-4" />;
    if (action.includes('Password')) return <Shield className="w-4 h-4" />;
    if (action.includes('Report')) return <FileText className="w-4 h-4" />;
    if (action.includes('User')) return <User className="w-4 h-4" />;
    if (action.includes('Settings') || action.includes('Permissions')) return <Settings className="w-4 h-4" />;
    if (action.includes('Impersonation')) return <Eye className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case 'authentication': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'content management': return 'bg-purple-100 text-purple-800';
      case 'user management': return 'bg-green-100 text-green-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'ai management': return 'bg-indigo-100 text-indigo-800';
      case 'system administration': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeviceIcon = (device) => {
    if (device.toLowerCase().includes('mobile') || device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const activityStats = [
    {
      title: 'Total Activities',
      value: activityLogs.length,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Login Sessions',
      value: activityLogs.filter(log => log.action.includes('Login') && log.success).length,
      icon: LogIn,
      color: 'green'
    },
    {
      title: 'Security Events',
      value: activityLogs.filter(log => log.category === 'Security').length,
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Failed Attempts',
      value: activityLogs.filter(log => !log.success).length,
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Logs</h1>
          <p className="text-slate-600">Monitor all admin activities and security events</p>
        </div>
        <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activityStats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'orange' ? 'text-orange-600' : 'text-slate-600'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search activities by action, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="content">Content Management</SelectItem>
                <SelectItem value="user">User Management</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="ai">AI Management</SelectItem>
                <SelectItem value="system">System Administration</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTimeRange} onValueChange={setFilterTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">Last 24 hours</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="miami">Miami, FL</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity History ({filteredLogs.length} records)</CardTitle>
          <CardDescription>
            Detailed log of all admin activities and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Category & Risk</TableHead>
                <TableHead>Location & Device</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getActionIcon(log.action, log.category)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{log.action}</p>
                        <p className="text-sm text-slate-600">{log.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Badge className={getCategoryBadgeColor(log.category)} size="sm">
                        {log.category}
                      </Badge>
                      <Badge className={getRiskBadgeColor(log.riskLevel)} size="sm">
                        {log.riskLevel} risk
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{log.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        {getDeviceIcon(log.device)}
                        <span className="ml-1 truncate max-w-32" title={log.device}>
                          {log.device.split(' ')[0]} {log.device.split(' ')[1]}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                      {log.ipAddress}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      <div>
                        <p>{new Date(log.timestamp).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {log.success ? 'Success' : 'Failed'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;