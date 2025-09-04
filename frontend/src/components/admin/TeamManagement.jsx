import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone,
  Calendar,
  Award,
  Clock,
  TrendingUp,
  User,
  Settings,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  UserCheck,
  Shield
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { mockTeamMembers } from '../../data/adminMockData';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department.toLowerCase().includes(filterDepartment.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    if (role.toLowerCase().includes('manager')) return 'bg-purple-100 text-purple-800';
    if (role.toLowerCase().includes('support')) return 'bg-blue-100 text-blue-800';
    if (role.toLowerCase().includes('specialist')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getDepartmentBadgeColor = (department) => {
    switch (department.toLowerCase()) {
      case 'customer support': return 'bg-blue-100 text-blue-800';
      case 'finance': return 'bg-green-100 text-green-800';
      case 'product': return 'bg-purple-100 text-purple-800';
      case 'engineering': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const teamStats = [
    {
      title: 'Total Team Members',
      value: mockTeamMembers.length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Members',
      value: mockTeamMembers.filter(m => m.status === 'active').length,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '2.5h',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Total Tickets Resolved',
      value: mockTeamMembers.reduce((sum, m) => sum + m.ticketsResolved, 0),
      icon: Award,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-600">Manage team members, roles, and performance metrics</p>
        </div>
        <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamStats.map((stat, idx) => (
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
                  stat.color === 'orange' ? 'text-orange-600' :
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
                  placeholder="Search team members by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="customer support">Customer Support</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="specialist">Specialist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Team members with highest ticket resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeamMembers
                .sort((a, b) => b.ticketsResolved - a.ticketsResolved)
                .slice(0, 3)
                .map((member, idx) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-[#20B2AA] text-white rounded-full text-sm font-bold">
                        {idx + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{member.ticketsResolved}</p>
                      <p className="text-xs text-slate-500">tickets resolved</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Leaders</CardTitle>
            <CardDescription>Team members with fastest average response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeamMembers
                .sort((a, b) => parseFloat(a.avgResponseTime) - parseFloat(b.avgResponseTime))
                .slice(0, 3)
                .map((member, idx) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm font-bold">
                        {idx + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{member.avgResponseTime}</p>
                      <p className="text-xs text-slate-500">avg response</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          <CardDescription>
            Complete team directory with roles, departments, and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#20B2AA] text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <div className="flex items-center text-sm text-slate-500 mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          <span>{member.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {member.role}
                      </Badge>
                      <br />
                      <Badge variant="outline" className={getDepartmentBadgeColor(member.department)}>
                        {member.department}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{member.ticketsResolved}</span>
                      <span className="text-sm text-slate-500">resolved</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{member.avgResponseTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(member.joinDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      <UserCheck className="w-3 h-3 mr-1" />
                      {member.status}
                    </Badge>
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
                            <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Member Detail Modal */}
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Team Member Profile</DialogTitle>
                          <DialogDescription>
                            Complete profile and performance information for {selectedMember?.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedMember && (
                          <div className="space-y-6 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Profile Info */}
                              <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="w-16 h-16">
                                    <AvatarFallback className="bg-[#20B2AA] text-white text-lg">
                                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                                    <p className="text-slate-600">{selectedMember.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge className={getRoleBadgeColor(selectedMember.role)}>
                                        {selectedMember.role}
                                      </Badge>
                                      <Badge variant="outline" className={getDepartmentBadgeColor(selectedMember.department)}>
                                        {selectedMember.department}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <Award className="w-5 h-5 text-orange-500" />
                                      <span className="text-2xl font-bold">{selectedMember.ticketsResolved}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">Tickets Resolved</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <Clock className="w-5 h-5 text-blue-500" />
                                      <span className="text-2xl font-bold">{selectedMember.avgResponseTime}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">Avg Response Time</p>
                                  </div>
                                </div>
                              </div>

                              {/* Additional Info */}
                              <div className="space-y-4">
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Employment Info</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2 text-sm">
                                    <div>
                                      <p className="text-slate-600">Join Date</p>
                                      <p className="font-medium">{new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-600">Status</p>
                                      <Badge className={selectedMember.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {selectedMember.status}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Quick Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Mail className="w-4 h-4 mr-2" />
                                      Send Email
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Send Message
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Settings className="w-4 h-4 mr-2" />
                                      Permissions
                                    </Button>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>

                            <div className="border-t pt-4 flex justify-between">
                              <Button variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Profile
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline">
                                  <Shield className="w-4 h-4 mr-2" />
                                  Manage Roles
                                </Button>
                                <Button variant="outline" className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Member
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

export default TeamManagement;