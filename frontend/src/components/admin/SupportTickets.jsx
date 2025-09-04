import React, { useState } from 'react';
import { 
  Headphones, 
  Search, 
  Plus, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  User, 
  Calendar,
  Tag,
  MessageSquare,
  MoreHorizontal,
  Eye,
  Edit,
  UserCheck,
  Send,
  Archive,
  Filter
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
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { mockTickets, mockTeamMembers } from '../../data/adminMockData';

const SupportTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState('open');
  const [replyText, setReplyText] = useState('');

  const getTicketsByStatus = (status) => {
    if (status === 'open') return mockTickets.filter(t => t.status === 'open' || t.status === 'in-progress');
    if (status === 'resolved') return mockTickets.filter(t => t.status === 'resolved');
    return mockTickets;
  };

  const filteredTickets = getTicketsByStatus(activeTab).filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'billing': return 'bg-blue-100 text-blue-800';
      case 'feature request': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ticketStats = [
    {
      title: 'Open Tickets',
      value: mockTickets.filter(t => t.status === 'open').length,
      icon: Headphones,
      color: 'blue'
    },
    {
      title: 'In Progress',  
      value: mockTickets.filter(t => t.status === 'in-progress').length,
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Resolved Today',
      value: mockTickets.filter(t => t.status === 'resolved' && t.lastUpdate === '2024-12-28').length,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'High Priority',
      value: mockTickets.filter(t => t.priority === 'high').length,
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
          <p className="text-slate-600">Manage customer support requests and team assignments</p>
        </div>
        <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticketStats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'red' ? 'text-red-600' : 'text-slate-600'
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
                  placeholder="Search tickets by title, customer, or email..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {[
            { id: 'open', name: 'Open Tickets', count: getTicketsByStatus('open').length },
            { id: 'resolved', name: 'Resolved Tickets', count: getTicketsByStatus('resolved').length },
            { id: 'all', name: 'All Tickets', count: mockTickets.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#20B2AA] text-[#20B2AA]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
          <CardDescription>
            Customer support requests with priority levels and team assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket & Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{ticket.title}</p>
                      <div className="flex items-center text-sm text-slate-500">
                        <User className="w-3 h-3 mr-1" />
                        <span>{ticket.customer}</span>
                      </div>
                      <p className="text-xs text-slate-400">{ticket.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadgeColor(ticket.priority)}>
                      <div className="flex items-center">
                        {getPriorityIcon(ticket.priority)}
                        <span className="ml-1 capitalize">{ticket.priority}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(ticket.status)}>
                      <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryBadgeColor(ticket.category)}>
                      <Tag className="w-3 h-3 mr-1" />
                      {ticket.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <UserCheck className="w-4 h-4 mr-1 text-slate-400" />
                      <span>{ticket.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(ticket.createdDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">
                      {new Date(ticket.lastUpdate).toLocaleDateString()}
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
                            <DropdownMenuItem onClick={() => setSelectedTicket(ticket)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Ticket
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Reassign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Send Update
                          </DropdownMenuItem>
                          {ticket.status !== 'resolved' && (
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Resolved
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Ticket Detail Modal */}
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Ticket Details</DialogTitle>
                          <DialogDescription>
                            Support ticket #{selectedTicket?.id} - {selectedTicket?.title}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTicket && (
                          <div className="space-y-6 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Ticket Info */}
                              <div className="md:col-span-2 space-y-4">
                                <div>
                                  <h4 className="font-semibold text-lg mb-2">{selectedTicket.title}</h4>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Badge className={getPriorityBadgeColor(selectedTicket.priority)}>
                                      {getPriorityIcon(selectedTicket.priority)}
                                      <span className="ml-1 capitalize">{selectedTicket.priority}</span>
                                    </Badge>
                                    <Badge className={getStatusBadgeColor(selectedTicket.status)}>
                                      <span className="capitalize">{selectedTicket.status.replace('-', ' ')}</span>
                                    </Badge>
                                    <Badge variant="outline" className={getCategoryBadgeColor(selectedTicket.category)}>
                                      {selectedTicket.category}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg">
                                  <h5 className="font-medium mb-2">Description</h5>
                                  <p className="text-slate-700">{selectedTicket.description}</p>
                                </div>

                                {/* Reply Section */}
                                <div className="space-y-3">
                                  <h5 className="font-medium">Add Reply</h5>
                                  <Textarea
                                    placeholder="Type your response to the customer..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                  />
                                  <div className="flex gap-2">
                                    <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                                      <Send className="w-4 h-4 mr-2" />
                                      Send Reply
                                    </Button>
                                    <Button variant="outline">
                                      <Archive className="w-4 h-4 mr-2" />
                                      Internal Note
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Customer & Assignment Info */}
                              <div className="space-y-4">
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Customer Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarFallback>
                                          {selectedTicket.customer.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{selectedTicket.customer}</p>
                                        <p className="text-sm text-slate-500">{selectedTicket.customerEmail}</p>
                                      </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <User className="w-4 h-4 mr-2" />
                                      View Profile
                                    </Button>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Assignment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <p className="text-sm text-slate-600">Assigned to</p>
                                      <p className="font-medium">{selectedTicket.assignedTo}</p>
                                    </div>
                                    <Select defaultValue={selectedTicket.assignedTo}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mockTeamMembers.map((member) => (
                                          <SelectItem key={member.id} value={member.name}>
                                            {member.name} - {member.role}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Timeline</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3 text-sm">
                                    <div>
                                      <p className="text-slate-600">Created</p>
                                      <p className="font-medium">{new Date(selectedTicket.createdDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-600">Last Update</p>
                                      <p className="font-medium">{new Date(selectedTicket.lastUpdate).toLocaleDateString()}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>

                            <div className="border-t pt-4 flex justify-between">
                              <div className="flex gap-2">
                                <Button variant="outline">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Ticket
                                </Button>
                                <Button variant="outline">
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Reassign
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                {selectedTicket.status !== 'resolved' && (
                                  <Button variant="outline" className="text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Resolved
                                  </Button>
                                )}
                                <Button variant="outline">
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
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
    </div>
  );
};

export default SupportTickets;