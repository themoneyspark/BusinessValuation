import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Eye,
  EyeOff,
  UserCheck,
  Settings,
  Search,
  MoreHorizontal,
  Edit,
  Save,
  X,
  AlertTriangle,
  LogOut,
  Crown,
  User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
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
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '../../hooks/use-toast';
import { mockTeamMembers, mockUsers } from '../../mockData';

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [impersonationMode, setImpersonationMode] = useState(null);
  const [editingPermissions, setEditingPermissions] = useState(false);
  const { toast } = useToast();

  const [permissions, setPermissions] = useState({
    viewFinancials: false,
    manageUsers: false,
    uploadReports: false,
    impersonateUsers: false,
    manageAI: false,
    auditLogs: false,
    systemSettings: false
  });

  const filteredMembers = mockTeamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startImpersonation = (user) => {
    setImpersonationMode(user);
    toast({
      title: "Impersonation Started",
      description: `Now viewing as ${user.name}. Click 'Exit Impersonation' to return.`,
      duration: 5000,
    });
  };

  const exitImpersonation = () => {
    const userName = impersonationMode?.name;
    setImpersonationMode(null);
    toast({
      title: "Impersonation Ended",
      description: `Returned to admin view from ${userName}`,
    });
  };

  const updatePermissions = (member) => {
    setSelectedMember({...member, permissions});
    toast({
      title: "Permissions Updated",
      description: `Role permissions updated for ${member.name}`,
    });
    setEditingPermissions(false);
    setShowPermissionModal(false);
  };

  const openPermissionModal = (member) => {
    setSelectedMember(member);
    setPermissions(member.permissions);
    setShowPermissionModal(true);
  };

  const getRoleBadgeColor = (role) => {
    if (role.toLowerCase().includes('admin')) return 'bg-red-100 text-red-800';
    if (role.toLowerCase().includes('manager')) return 'bg-purple-100 text-purple-800';
    if (role.toLowerCase().includes('support')) return 'bg-blue-100 text-blue-800';
    if (role.toLowerCase().includes('specialist')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const permissionsList = [
    {
      key: 'viewFinancials',
      label: 'View Financial Data',
      description: 'Access billing, revenue, and financial reports'
    },
    {
      key: 'manageUsers',
      label: 'Manage Users',
      description: 'Create, edit, and manage user accounts'
    },
    {
      key: 'uploadReports',
      label: 'Upload Reports',
      description: 'Upload and assign client reports'
    },
    {
      key: 'impersonateUsers',
      label: 'Impersonate Users',
      description: 'View platform as any user for support'
    },
    {
      key: 'manageAI',
      label: 'Manage AI Features',
      description: 'Control AI limits and usage'
    },
    {
      key: 'auditLogs',
      label: 'View Audit Logs',
      description: 'Access security and activity logs'
    },
    {
      key: 'systemSettings',
      label: 'System Settings',
      description: 'Modify platform configuration'
    }
  ];

  const roleStats = [
    {
      title: 'Total Team Members',
      value: mockTeamMembers.length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Admin Roles',
      value: mockTeamMembers.filter(m => m.role.toLowerCase().includes('admin')).length,
      icon: Crown,
      color: 'red'
    },
    {
      title: 'Support Staff',
      value: mockTeamMembers.filter(m => m.role.toLowerCase().includes('support')).length,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Active Impersonations',
      value: mockTeamMembers.filter(m => m.lastImpersonation).length,
      icon: Eye,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impersonation Banner */}
      {impersonationMode && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">
                    Impersonating: {impersonationMode.name}
                  </p>
                  <p className="text-sm text-orange-700">
                    You are viewing the platform as this user. All actions will be logged.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exitImpersonation}
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Exit Impersonation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Role & Permission Management</h1>
          <p className="text-slate-600">Manage team roles, permissions, and user impersonation</p>
        </div>
        <Button className="bg-[#20B2AA] hover:bg-[#1a9d96]">
          <UserCheck className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roleStats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'orange' ? 'text-orange-600' : 'text-slate-600'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search team members by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members & Permissions ({filteredMembers.length})</CardTitle>
          <CardDescription>
            Manage team roles, permissions, and user impersonation capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Key Permissions</TableHead>
                <TableHead>Impersonation</TableHead>
                <TableHead>Last Activity</TableHead>
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
                        <p className="text-sm text-slate-500">{member.email}</p>
                        <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} size="sm">
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {member.role}
                      </Badge>
                      <p className="text-sm text-slate-600">{member.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.viewFinancials && (
                        <Badge variant="outline" size="sm">Financials</Badge>
                      )}
                      {member.permissions.manageUsers && (
                        <Badge variant="outline" size="sm">Users</Badge>
                      )}
                      {member.permissions.uploadReports && (
                        <Badge variant="outline" size="sm">Reports</Badge>
                      )}
                      {member.permissions.impersonateUsers && (
                        <Badge variant="outline" size="sm">Impersonate</Badge>
                      )}
                      {member.permissions.manageAI && (
                        <Badge variant="outline" size="sm">AI</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {member.permissions.impersonateUsers ? (
                        <div className="space-y-1">
                          <Badge className="bg-orange-100 text-orange-800" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                          {member.lastImpersonation && (
                            <p className="text-xs text-slate-500">
                              Last: {new Date(member.lastImpersonation).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" size="sm">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Disabled
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">
                      <p>Joined: {new Date(member.joinDate).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500">
                        {member.ticketsResolved} tickets resolved
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openPermissionModal(member)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Permissions
                        </DropdownMenuItem>
                        {member.permissions.impersonateUsers && (
                          <DropdownMenuItem onClick={() => startImpersonation(member)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Start Impersonation
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Impersonation Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Impersonation</CardTitle>
          <CardDescription>
            Impersonate platform users for support and troubleshooting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUsers.slice(0, 6).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role} - {user.tier}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => startImpersonation(user)}
                  disabled={!!impersonationMode}
                >
                  <User className="w-3 h-3 mr-1" />
                  View as User
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Modal */}
      {showPermissionModal && selectedMember && (
        <Dialog open={showPermissionModal} onOpenChange={setShowPermissionModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Permissions - {selectedMember.name}</DialogTitle>
              <DialogDescription>
                Manage role-based permissions and access controls
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#20B2AA] text-white text-lg">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{selectedMember.name}</p>
                    <p className="text-sm text-slate-600">{selectedMember.role} - {selectedMember.department}</p>
                  </div>
                </div>
                <Button
                  variant={editingPermissions ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingPermissions(!editingPermissions)}
                >
                  {editingPermissions ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {editingPermissions ? 'Save Changes' : 'Edit Permissions'}
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-4">Permission Matrix</h4>
                <div className="space-y-4">
                  {permissionsList.map((permission) => (
                    <div key={permission.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">{permission.label}</p>
                            <p className="text-sm text-slate-600">{permission.description}</p>
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={permissions[permission.key]}
                        onCheckedChange={(checked) => setPermissions({...permissions, [permission.key]: checked})}
                        disabled={!editingPermissions}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowPermissionModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => updatePermissions(selectedMember)} 
                  className="bg-[#20B2AA] hover:bg-[#1a9d96]"
                  disabled={!editingPermissions}
                >
                  Update Permissions
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RoleManagement;