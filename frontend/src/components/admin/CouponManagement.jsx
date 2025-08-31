import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Percent,
  DollarSign,
  Users,
  Eye,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  CheckCircle,
  XCircle,
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
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useToast } from '../../hooks/use-toast';
import { mockCoupons } from '../../mockData';

const CouponManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    usageLimit: '',
    expiryDate: '',
    status: 'active'
  });

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || coupon.status === filterStatus;
    const matchesType = filterType === 'all' || coupon.discountType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'expired': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'inactive': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `Coupon code "${code}" copied to clipboard`,
    });
  };

  const handleCreateCoupon = () => {
    // Mock creation logic
    toast({
      title: "Coupon Created!",
      description: `Coupon "${newCoupon.code}" has been created successfully`,
    });
    setShowCreateForm(false);
    setNewCoupon({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      usageLimit: '',
      expiryDate: '',
      status: 'active'
    });
  };

  const couponStats = [
    {
      title: 'Active Coupons',
      value: mockCoupons.filter(c => c.status === 'active').length,
      icon: Tag,
      color: 'blue'
    },
    {
      title: 'Total Usage',
      value: mockCoupons.reduce((sum, c) => sum + c.usedCount, 0),
      icon: Users,
      color: 'green'
    },
    {
      title: 'Expired Coupons',
      value: mockCoupons.filter(c => c.status === 'expired').length,
      icon: XCircle,
      color: 'red'
    },
    {
      title: 'Avg Usage Rate',
      value: '68%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Coupon Management</h1>
          <p className="text-slate-600">Create and manage discount codes and promotional offers</p>
        </div>
        <Button 
          className="bg-[#20B2AA] hover:bg-[#1a9d96]"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      {/* Coupon Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {couponStats.map((stat, idx) => (
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
                  stat.color === 'purple' ? 'text-purple-600' : 'text-slate-600'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search coupons by code or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons ({filteredCoupons.length})</CardTitle>
          <CardDescription>
            Manage discount codes, track usage, and monitor performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <code className="font-mono font-bold text-[#20B2AA] bg-slate-100 px-2 py-1 rounded">
                          {coupon.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCouponCode(coupon.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600">{coupon.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {coupon.discountType === 'percentage' ? (
                        <Percent className="w-4 h-4 text-green-600" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-green-600" />
                      )}
                      <span className="font-medium">
                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                      </span>
                      <span className="text-sm text-slate-500">off</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{coupon.usedCount} / {coupon.usageLimit}</span>
                        <span className="text-slate-500">{getUsagePercentage(coupon.usedCount, coupon.usageLimit)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-[#20B2AA] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getUsagePercentage(coupon.usedCount, coupon.usageLimit)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(coupon.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(coupon.status)}
                        <span className="ml-1 capitalize">{coupon.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">
                      {new Date(coupon.createdDate).toLocaleDateString()}
                    </div>
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
                            <DropdownMenuItem onClick={() => setSelectedCoupon(coupon)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Coupon
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyCouponCode(coupon.code)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Coupon
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Coupon Detail Modal */}
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Coupon Details</DialogTitle>
                          <DialogDescription>
                            Complete information and usage statistics for coupon "{selectedCoupon?.code}"
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCoupon && (
                          <div className="space-y-6 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Coupon Information</h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                      <code className="font-mono font-bold text-lg text-[#20B2AA] bg-slate-100 px-3 py-2 rounded">
                                        {selectedCoupon.code}
                                      </code>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyCouponCode(selectedCoupon.code)}
                                      >
                                        <Copy className="w-4 h-4 mr-1" />
                                        Copy
                                      </Button>
                                    </div>
                                    <p className="text-slate-600">{selectedCoupon.description}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Discount Details</h4>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                      {selectedCoupon.discountType === 'percentage' ? (
                                        <Percent className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                      )}
                                      <span className="text-2xl font-bold text-green-600">
                                        {selectedCoupon.discountType === 'percentage' 
                                          ? `${selectedCoupon.discountValue}%` 
                                          : `$${selectedCoupon.discountValue}`
                                        }
                                      </span>
                                      <span className="text-slate-600">discount</span>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                      {selectedCoupon.discountType === 'percentage' ? 'Percentage' : 'Fixed amount'} discount
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Usage Statistics</h4>
                                  <div className="space-y-3">
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-slate-600">Usage</span>
                                        <span className="font-medium">
                                          {selectedCoupon.usedCount} / {selectedCoupon.usageLimit}
                                        </span>
                                      </div>
                                      <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div
                                          className="bg-[#20B2AA] h-2 rounded-full"
                                          style={{ width: `${getUsagePercentage(selectedCoupon.usedCount, selectedCoupon.usageLimit)}%` }}
                                        ></div>
                                      </div>
                                      <p className="text-xs text-slate-500 mt-1">
                                        {getUsagePercentage(selectedCoupon.usedCount, selectedCoupon.usageLimit)}% used
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Status & Dates</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Status:</span>
                                      <Badge className={getStatusBadgeColor(selectedCoupon.status)}>
                                        {selectedCoupon.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Created:</span>
                                      <span>{new Date(selectedCoupon.createdDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Expires:</span>
                                      <span>{new Date(selectedCoupon.expiryDate).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-medium text-slate-900 mb-3">Quick Actions</h4>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit Coupon
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => copyCouponCode(selectedCoupon.code)}>
                                  <Copy className="w-4 h-4 mr-1" />
                                  Copy Code
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Users className="w-4 h-4 mr-1" />
                                  View Usage History
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
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

      {/* Create Coupon Modal */}
      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Create a new discount coupon for your customers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., SUMMER2024"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., Summer discount offer"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select value={newCoupon.discountType} onValueChange={(value) => setNewCoupon({ ...newCoupon, discountType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    placeholder={newCoupon.discountType === 'percentage' ? '20' : '25'}
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    placeholder="100"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newCoupon.status === 'active'}
                  onCheckedChange={(checked) => setNewCoupon({ ...newCoupon, status: checked ? 'active' : 'inactive' })}
                />
                <Label htmlFor="status">Active coupon</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCoupon} className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                  Create Coupon
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CouponManagement;