import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Plus,
  RefreshCw,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  MoreHorizontal
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { mockAIUsage } from '../../data/adminMockData';

const AIManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditAmount, setCreditAmount] = useState('');
  const { toast } = useToast();

  const filteredUsers = mockAIUsage.userLimits.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || user.tier.toLowerCase() === filterTier.toLowerCase();
    return matchesSearch && matchesTier;
  });

  const getUsageColor = (used, limit) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  const getUsageBarColor = (used, limit) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-[#20B2AA]';
  };

  const injectCredits = (user) => {
    const credits = parseInt(creditAmount);
    toast({
      title: "Credits Injected!",
      description: `Added ${credits} AI credits to ${user.userName}'s account`,
    });
    setShowCreditModal(false);
    setCreditAmount('');
    setSelectedUser(null);
  };

  const resetUserUsage = (user) => {
    toast({
      title: "Usage Reset",
      description: `${user.userName}'s monthly usage has been reset to 0`,
    });
  };

  const aiStats = [
    {
      title: 'Total Queries',
      value: mockAIUsage.monthlyStats.totalQueries.toLocaleString(),
      change: '+23%',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Active Sessions',
      value: mockAIUsage.monthlyStats.activeSessions.toLocaleString(),
      change: '+15%',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Monthly Cost',
      value: `$${mockAIUsage.monthlyStats.costThisMonth.toFixed(2)}`,
      change: '-5%',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Reset in Days',
      value: mockAIUsage.monthlyStats.daysUntilReset,
      change: 'Jan 1st',
      icon: Calendar,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Management Dashboard</h1>
          <p className="text-slate-600">Monitor AskSara usage, manage credits, and analyze AI interactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All Usage
          </Button>
          <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
            <Settings className="w-4 h-4 mr-2" />
            AI Settings
          </Button>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiStats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  stat.color === 'orange' ? 'text-orange-600' : 'text-slate-600'
                }`} />
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.title}</p>
                  <p className="text-xs text-slate-400">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Queries Analysis</CardTitle>
          <CardDescription>Most frequently asked questions and their categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAIUsage.popularQueries.map((query, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#20B2AA] text-white rounded-full text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{query.query}</p>
                    <Badge variant="outline" className="text-xs mt-1">{query.category}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{query.count}</p>
                  <p className="text-xs text-slate-500">queries</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Usage Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User AI Usage Limits</CardTitle>
              <CardDescription>Monitor and manage individual user AI credit consumption</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterTier} onValueChange={setFilterTier}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Query</TableHead>
                    <TableHead>Top Query</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.userId} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-[#20B2AA] text-white text-sm">
                              {user.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900">{user.userName}</p>
                            <Badge variant="outline" size="sm">{user.tier}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className={getUsageColor(user.used, user.monthlyLimit)}>
                              {user.used} / {user.monthlyLimit}
                            </span>
                            <span className="text-slate-500">
                              {user.remaining} left
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getUsageBarColor(user.used, user.monthlyLimit)}`}
                              style={{ width: `${(user.used / user.monthlyLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(user.lastQuery).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-slate-600 truncate max-w-xs" title={user.topQuery}>
                          {user.topQuery}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Inject Credits
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem onClick={() => resetUserUsage(user)}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reset Usage
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Credit Injection Modal */}
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Inject AI Credits</DialogTitle>
                              <DialogDescription>
                                Add additional AI credits to {selectedUser?.userName}'s account
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4 p-4">
                                <div className="bg-slate-50 p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-600">Current Usage:</span>
                                    <span className="font-medium">{selectedUser.used} / {selectedUser.monthlyLimit}</span>
                                  </div>
                                  <Progress value={(selectedUser.used / selectedUser.monthlyLimit) * 100} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="creditAmount">Credits to Add</Label>
                                  <Input
                                    id="creditAmount"
                                    type="number"
                                    placeholder="e.g., 25"
                                    value={creditAmount}
                                    onChange={(e) => setCreditAmount(e.target.value)}
                                  />
                                  <p className="text-xs text-slate-500">
                                    This will increase their monthly limit by the specified amount
                                  </p>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                  <Button variant="outline" onClick={() => setShowCreditModal(false)}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={() => injectCredits(selectedUser)} 
                                    className="bg-[#20B2AA] hover:bg-[#1a9d96]"
                                    disabled={!creditAmount}
                                  >
                                    Inject Credits
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* AI System Status */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI System Status</CardTitle>
              <CardDescription>Real-time AI service monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">AskSara API</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Query Processing</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Fast</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-900">Rate Limiting</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>AI interaction insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Peak Usage Time:</span>
                  <span className="font-medium">2-4 PM EST</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Avg Query Length:</span>
                  <span className="font-medium">47 characters</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Success Rate:</span>
                  <span className="font-medium text-green-600">97.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Avg Response Time:</span>
                  <span className="font-medium">1.2 seconds</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIManagement;