import React, { useState } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  Shield,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const SystemHealth = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  const systemMetrics = [
    {
      title: 'System Uptime',
      value: '99.8%',
      status: 'healthy',
      icon: Activity,
      color: 'green',
      change: '+0.2%',
      trend: 'up'
    },
    {
      title: 'API Response Time',
      value: '245ms',
      status: 'healthy',
      icon: Wifi,
      color: 'green',
      change: '-15ms',
      trend: 'up'
    },
    {
      title: 'Database Performance',
      value: '1.2s',
      status: 'warning',
      icon: Database,
      color: 'orange',
      change: '+0.3s',
      trend: 'down'
    },
    {
      title: 'Error Rate',
      value: '0.03%',
      status: 'healthy',
      icon: AlertTriangle,
      color: 'green',
      change: '-0.01%',
      trend: 'up'
    }
  ];

  const serverStatus = [
    {
      name: 'Web Server',
      status: 'online',
      cpu: 45,
      memory: 62,
      disk: 34,
      uptime: '15 days',
      load: 'Normal'
    },
    {
      name: 'API Server',
      status: 'online',
      cpu: 67,
      memory: 78,
      disk: 45,
      uptime: '15 days',
      load: 'High'
    },
    {
      name: 'Database Server',
      status: 'warning',
      cpu: 89,
      memory: 91,
      disk: 67,
      uptime: '15 days',
      load: 'Critical'
    },
    {
      name: 'Redis Cache',
      status: 'online',
      cpu: 23,
      memory: 34,
      disk: 12,
      uptime: '15 days',
      load: 'Low'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Database server CPU usage above 85%',
      timestamp: '2024-12-30 14:30:00',
      status: 'active',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2024-12-30 12:00:00',
      status: 'resolved',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      message: 'Payment gateway timeout detected',
      timestamp: '2024-12-30 10:15:00',
      status: 'resolved',
      severity: 'high'
    },
    {
      id: 4,
      type: 'success',
      message: 'Backup process completed',
      timestamp: '2024-12-30 08:00:00',
      status: 'resolved',
      severity: 'low'
    }
  ];

  const integrationStatus = [
    {
      name: 'Stripe Payment Gateway',
      status: 'online',
      lastCheck: '2 mins ago',
      responseTime: '198ms',
      uptime: '99.9%'
    },
    {
      name: 'Resend Email Service',
      status: 'online',
      lastCheck: '1 min ago',
      responseTime: '145ms',
      uptime: '99.8%'
    },
    {
      name: 'MongoDB Atlas',
      status: 'warning',
      lastCheck: '3 mins ago',
      responseTime: '456ms',
      uptime: '99.5%'
    },
    {
      name: 'CDN Service',
      status: 'online',
      lastCheck: '1 min ago',
      responseTime: '89ms',
      uptime: '99.9%'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
      case 'healthy': 
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': 
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'error':
      case 'offline': 
        return <XCircle className="w-4 h-4 text-red-600" />;
      default: 
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'resolved': 
        return 'bg-green-100 text-green-800';
      case 'warning': 
        return 'bg-orange-100 text-orange-800';
      case 'error':
      case 'offline':
      case 'active': 
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLoadColor = (load) => {
    switch (load) {
      case 'Low':
      case 'Normal': 
        return 'text-green-600';
      case 'High': 
        return 'text-orange-600';
      case 'Critical': 
        return 'text-red-600';
      default: 
        return 'text-gray-600';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': 
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': 
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'success': 
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'info': 
        return <Eye className="w-4 h-4 text-blue-600" />;
      default: 
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const refreshData = () => {
    setLastUpdate(new Date());
    // Mock refresh logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Health</h1>
          <p className="text-slate-600">Monitor system performance, server status, and integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'orange' ? 'text-orange-600' :
                  metric.color === 'red' ? 'text-red-600' : 'text-slate-600'
                }`} />
                <Badge className={getStatusBadgeColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.title}</p>
                <div className="flex items-center mt-1">
                  {metric.trend === 'up' ? 
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" /> :
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  }
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Server Status */}
      <Card>
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
          <CardDescription>
            Real-time monitoring of all server instances and their resource usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Server</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory Usage</TableHead>
                <TableHead>Disk Usage</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Load</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serverStatus.map((server, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Server className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{server.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(server.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(server.status)}
                        <span className="ml-1 capitalize">{server.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{server.cpu}%</span>
                        <Cpu className="w-3 h-3 text-slate-400" />
                      </div>
                      <Progress value={server.cpu} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{server.memory}%</span>
                        <MemoryStick className="w-3 h-3 text-slate-400" />
                      </div>
                      <Progress value={server.memory} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{server.disk}%</span>
                        <HardDrive className="w-3 h-3 text-slate-400" />
                      </div>
                      <Progress value={server.disk} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">{server.uptime}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getLoadColor(server.load)}`}>
                      {server.load}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Integration Status & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>External service connections and API health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrationStatus.map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900">{integration.name}</p>
                      <p className="text-sm text-slate-500">
                        Last check: {integration.lastCheck} • {integration.responseTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusBadgeColor(integration.status)}>
                      {getStatusIcon(integration.status)}
                      <span className="ml-1 capitalize">{integration.status}</span>
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">{integration.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System alerts and notifications from the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-500">{alert.timestamp}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusBadgeColor(alert.status)} size="sm">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Last updated: {lastUpdate.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-[#20B2AA]" />
                Security Status
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">SSL Certificate:</span>
                  <Badge className="bg-green-100 text-green-800">Valid</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Firewall:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">DDoS Protection:</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-slate-900 flex items-center">
                <Database className="w-4 h-4 mr-2 text-[#20B2AA]" />
                Database Info
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Type:</span>
                  <span>MongoDB Atlas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Version:</span>
                  <span>7.0.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Storage Used:</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-slate-900 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-[#20B2AA]" />
                Performance
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Avg Response Time:</span>
                  <span>245ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Requests/min:</span>
                  <span>1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Error Rate:</span>
                  <span>0.03%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;