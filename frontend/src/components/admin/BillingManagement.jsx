import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Search, 
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  FileText,
  Calendar,
  MoreHorizontal,
  Eye,
  Send,
  Settings,
  User,
  Receipt,
  CalendarDays,
  Percent,
  ArrowUpRight
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
import { mockBillingData, mockMetrics } from '../../data/adminMockData';

const BillingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerBilling, setShowCustomerBilling] = useState(false);

  const filteredTransactions = mockBillingData.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || transaction.plan.toLowerCase().includes(filterPlan.toLowerCase());
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getCustomerBillingHistory = (customerId) => {
    return mockBillingData.filter(transaction => transaction.customerId === customerId)
      .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
  };

  const getCustomerTotalSpent = (customerId) => {
    return mockBillingData
      .filter(transaction => transaction.customerId === customerId && transaction.status === 'paid')
      .reduce((total, transaction) => total + transaction.total, 0);
  };

  const openCustomerBilling = (transaction) => {
    setSelectedCustomer({
      ...transaction,
      billingHistory: getCustomerBillingHistory(transaction.customerId),
      totalSpent: getCustomerTotalSpent(transaction.customerId)
    });
    setShowCustomerBilling(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const revenueMetrics = [
    {
      title: 'Monthly Revenue',
      value: `$${mockMetrics.monthlyRevenue.toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Subscriptions',
      value: '456',
      change: '+12%',
      trend: 'up',
      icon: CreditCard,
      color: 'blue'
    },
    {
      title: 'Failed Payments',
      value: '12',
      change: '-25%',
      trend: 'down',
      icon: XCircle,
      color: 'red'
    },
    {
      title: 'Average Revenue Per User',
      value: '$51.43',
      change: '+5.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Revenue Management</h1>
          <p className="text-slate-600">Monitor payments, subscriptions, and revenue analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
          <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueMetrics.map((metric, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  metric.color === 'red' ? 'text-red-600' :
                  metric.color === 'purple' ? 'text-purple-600' : 'text-slate-600'
                }`} />
                <div className="flex items-center">
                  {metric.trend === 'up' ? 
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" /> :
                    <div className="w-3 h-3 bg-red-500 rounded mr-1 transform rotate-180">
                      <TrendingUp className="w-3 h-3 text-red-500" />
                    </div>
                  }
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.title}</p>
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
                  placeholder="Search by customer, email, or invoice number..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              Stripe Integration
            </CardTitle>
            <CardDescription>Payment processing and subscription management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Connected & Active</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">This Month</p>
                <p className="font-semibold">${mockMetrics.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-600">Transactions</p>
                <p className="font-semibold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 bg-[#20B2AA] rounded flex items-center justify-center mr-3">
                <Mail className="w-4 h-4 text-white" />
              </div>
              Email Notifications
            </CardTitle>
            <CardDescription>Automated billing and payment notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Active & Configured</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Notifications Sent</p>
                <p className="font-semibold">1,234</p>
              </div>
              <div>
                <p className="text-slate-600">Success Rate</p>
                <p className="font-semibold">98.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>
            Complete billing history with payment status and subscription details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan & Billing Period</TableHead>
                <TableHead>Amount & Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method & Card</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#20B2AA] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{transaction.customerName}</p>
                        <p className="text-sm text-slate-500">{transaction.customerEmail}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-[#20B2AA] hover:text-[#1a9d96] p-0 h-auto"
                          onClick={() => openCustomerBilling(transaction)}
                        >
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          View Billing History
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900">{transaction.plan}</p>
                      <p className="text-sm text-slate-500">{transaction.billingPeriod}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {transaction.planType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-lg">${transaction.total.toFixed(2)}</p>
                      <div className="text-sm text-slate-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${transaction.amount.toFixed(2)}</span>
                        </div>
                        {transaction.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-${transaction.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${transaction.tax.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(transaction.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1 capitalize">{transaction.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-4 bg-blue-600 rounded mr-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium">{transaction.paymentMethod}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <CreditCard className="w-3 h-3 mr-1" />
                        <span>{transaction.cardBrand} ****{transaction.cardLast4}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </div>
                    {transaction.nextBilling && (
                      <div className="text-xs text-slate-500 mt-1">
                        Next: {new Date(transaction.nextBilling).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-[#20B2AA] hover:text-[#1a9d96]">
                      <FileText className="w-4 h-4 mr-1" />
                      {transaction.invoiceNumber}
                    </Button>
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
                            <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Resend Invoice
                          </DropdownMenuItem>
                          {transaction.status === 'failed' && (
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Transaction Detail Modal */}
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                          <DialogDescription>
                            Complete billing information for {selectedTransaction?.customerName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTransaction && (
                          <div className="space-y-6 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Customer Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">Name:</span> {selectedTransaction.customerName}</p>
                                    <p><span className="text-slate-600">Email:</span> {selectedTransaction.customerEmail}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Billing Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">Plan:</span> {selectedTransaction.plan}</p>
                                    <p><span className="text-slate-600">Amount:</span> ${selectedTransaction.amount.toFixed(2)}</p>
                                    <p><span className="text-slate-600">Payment Method:</span> {selectedTransaction.paymentMethod}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Transaction Status</h4>
                                  <Badge className={getStatusBadgeColor(selectedTransaction.status)} size="lg">
                                    <div className="flex items-center">
                                      {getStatusIcon(selectedTransaction.status)}
                                      <span className="ml-2 capitalize">{selectedTransaction.status}</span>
                                    </div>
                                  </Badge>
                                </div>

                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Dates</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">Transaction:</span> {new Date(selectedTransaction.transactionDate).toLocaleDateString()}</p>
                                    <p><span className="text-slate-600">Next Billing:</span> {new Date(selectedTransaction.nextBilling).toLocaleDateString()}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Invoice</h4>
                                  <Button variant="outline" size="sm" className="w-full">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download {selectedTransaction.invoiceNumber}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-medium text-slate-900 mb-3">Quick Actions</h4>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline">
                                  <Mail className="w-4 h-4 mr-1" />
                                  Email Customer
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Send className="w-4 h-4 mr-1" />
                                  Resend Invoice
                                </Button>
                                {selectedTransaction.status === 'failed' && (
                                  <Button size="sm" variant="outline">
                                    <RefreshCw className="w-4 h-4 mr-1" />
                                    Retry Payment
                                  </Button>
                                )}
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Cancel Subscription
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

      {/* Customer Billing History Modal */}
      {showCustomerBilling && selectedCustomer && (
        <Dialog open={showCustomerBilling} onOpenChange={setShowCustomerBilling}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#20B2AA] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span>Complete Billing History - {selectedCustomer.customerName}</span>
                  <p className="text-sm font-normal text-slate-600">{selectedCustomer.customerEmail}</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                Comprehensive billing management and transaction history for this customer
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 p-4">
              {/* Customer Billing Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        ${selectedCustomer.totalSpent.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Total Spent</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Receipt className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-600">
                        {selectedCustomer.billingHistory.length}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Total Transactions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <CalendarDays className="w-5 h-5 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">
                        {selectedCustomer.billingHistory.filter(t => t.planType === 'subscription').length}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Subscriptions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {selectedCustomer.billingHistory.filter(t => t.planType === 'one-time').length}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">One-time Purchases</p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(selectedCustomer.billingHistory.map(t => t.cardLast4)))
                      .map((cardLast4, idx) => {
                        const cardInfo = selectedCustomer.billingHistory.find(t => t.cardLast4 === cardLast4);
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="w-5 h-5 text-slate-400" />
                              <div>
                                <p className="font-medium">{cardInfo.cardBrand} ****{cardLast4}</p>
                                <p className="text-sm text-slate-500">Primary payment method</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History Grouped by Type */}
              <div className="space-y-4">
                {/* Subscriptions Group */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-purple-600" />
                      Subscription History ({selectedCustomer.billingHistory.filter(t => t.planType === 'subscription').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subscription Plan</TableHead>
                          <TableHead>Billing Period</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Invoice</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCustomer.billingHistory
                          .filter(t => t.planType === 'subscription')
                          .map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-slate-50">
                              <TableCell>
                                <div>
                                  <p className="font-medium">{transaction.plan}</p>
                                  <p className="text-sm text-slate-500">{transaction.description}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{transaction.billingPeriod}</Badge>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">${transaction.total.toFixed(2)}</p>
                                  {transaction.discount > 0 && (
                                    <p className="text-sm text-green-600">-${transaction.discount.toFixed(2)} discount</p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusBadgeColor(transaction.status)}>
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-[#20B2AA]">
                                  {transaction.invoiceNumber}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* One-time Purchases Group */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Receipt className="w-4 h-4 mr-2 text-orange-600" />
                      One-time Purchases ({selectedCustomer.billingHistory.filter(t => t.planType === 'one-time').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product/Service</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Invoice</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCustomer.billingHistory
                          .filter(t => t.planType === 'one-time')
                          .map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-slate-50">
                              <TableCell>
                                <p className="font-medium">{transaction.plan}</p>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-slate-600">{transaction.description}</p>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">${transaction.total.toFixed(2)}</p>
                                  {transaction.discount > 0 && (
                                    <p className="text-sm text-green-600">-${transaction.discount.toFixed(2)} discount</p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusBadgeColor(transaction.status)}>
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-[#20B2AA]">
                                  {transaction.invoiceNumber}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Actions */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Customer Management Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" />
                    Email Customer
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="w-4 h-4 mr-1" />
                    Send Invoice
                  </Button>
                  <Button size="sm" variant="outline">
                    <Percent className="w-4 h-4 mr-1" />
                    Apply Discount
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Retry Failed Payment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Export History
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel Subscriptions
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BillingManagement;