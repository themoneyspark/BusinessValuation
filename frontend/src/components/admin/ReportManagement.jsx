import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  User,
  Calendar,
  FileUp,
  Shield,
  Trash2,
  Send,
  RefreshCw
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
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { mockReports, mockUsers } from '../../mockData';

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const [newReport, setNewReport] = useState({
    fileName: '',
    businessEntity: '',
    reportType: 'Business Scorecard',
    assignedTo: '',
    accessOverride: false,
    notes: ''
  });

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.businessEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesType = filterType === 'all' || report.reportType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length > 0) {
      setNewReport({...newReport, fileName: pdfFiles[0].name});
      toast({
        title: "File Ready",
        description: `${pdfFiles[0].name} is ready for assignment`,
      });
    }
  };

  const handleUploadReport = () => {
    toast({
      title: "Report Uploaded!",
      description: `${newReport.fileName} has been uploaded and assigned to ${newReport.assignedTo}`,
    });
    setShowUploadForm(false);
    setNewReport({
      fileName: '',
      businessEntity: '',
      reportType: 'Business Scorecard',
      assignedTo: '',
      accessOverride: false,
      notes: ''
    });
  };

  const reportStats = [
    {
      title: 'Total Reports',
      value: mockReports.length,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Delivered This Month',
      value: mockReports.filter(r => r.status === 'delivered').length,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Delivery',
      value: mockReports.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Failed Deliveries',
      value: mockReports.filter(r => r.status === 'failed').length,
      icon: XCircle,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Report Management</h1>
          <p className="text-slate-600">Upload, assign, and manage client report deliveries</p>
        </div>
        <Button 
          className="bg-[#20B2AA] hover:bg-[#1a9d96]"
          onClick={() => setShowUploadForm(true)}
        >
          <FileUp className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, idx) => (
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
                  placeholder="Search reports by filename, business entity, or assignee..."
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
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scorecard">Business Scorecard</SelectItem>
                <SelectItem value="prescore">PREScore Analysis</SelectItem>
                <SelectItem value="freedom">Freedom Point Analysis</SelectItem>
                <SelectItem value="quarterly">Quarterly Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Report Deliveries ({filteredReports.length})</CardTitle>
          <CardDescription>
            Manage client report uploads, assignments, and delivery tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Details</TableHead>
                <TableHead>Business Entity</TableHead>
                <TableHead>Assigned Client</TableHead>
                <TableHead>Upload Info</TableHead>
                <TableHead>Status & Access</TableHead>
                <TableHead>Delivery Stats</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-[#20B2AA]" />
                        <p className="font-medium text-slate-900 text-sm">{report.fileName}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.reportType}
                      </Badge>
                      <p className="text-xs text-slate-500">{report.fileSize}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-slate-900">{report.businessEntity}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900">{report.assignedTo}</p>
                        <p className="text-sm text-slate-500">{report.assignedEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">By: {report.uploadedBy}</p>
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(report.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Badge className={getStatusBadgeColor(report.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(report.status)}
                          <span className="ml-1 capitalize">{report.status}</span>
                        </div>
                      </Badge>
                      {report.accessOverride && (
                        <div className="flex items-center text-xs text-orange-600">
                          <Shield className="w-3 h-3 mr-1" />
                          Access Override
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {report.deliveryDate && (
                        <p className="text-slate-600">
                          Delivered: {new Date(report.deliveryDate).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-slate-500">
                        Downloads: {report.downloadCount}
                      </p>
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
                            <DropdownMenuItem onClick={() => setSelectedReport(report)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Resend to Client
                          </DropdownMenuItem>
                          {report.status === 'failed' && (
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retry Delivery
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Report Detail Modal */}
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Report Details</DialogTitle>
                          <DialogDescription>
                            Complete information for {selectedReport?.fileName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedReport && (
                          <div className="space-y-4 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Report Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">File:</span> {selectedReport.fileName}</p>
                                    <p><span className="text-slate-600">Type:</span> {selectedReport.reportType}</p>
                                    <p><span className="text-slate-600">Size:</span> {selectedReport.fileSize}</p>
                                    <p><span className="text-slate-600">Business:</span> {selectedReport.businessEntity}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Upload Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">Uploaded by:</span> {selectedReport.uploadedBy}</p>
                                    <p><span className="text-slate-600">Upload date:</span> {new Date(selectedReport.uploadDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Assignment & Status</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-600">Assigned to:</span> {selectedReport.assignedTo}</p>
                                    <p><span className="text-slate-600">Email:</span> {selectedReport.assignedEmail}</p>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-slate-600">Status:</span>
                                      <Badge className={getStatusBadgeColor(selectedReport.status)}>
                                        {selectedReport.status}
                                      </Badge>
                                    </div>
                                    {selectedReport.accessOverride && (
                                      <div className="flex items-center text-orange-600">
                                        <Shield className="w-4 h-4 mr-2" />
                                        <span>Access Override Active</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-slate-900 mb-2">Delivery Stats</h4>
                                  <div className="space-y-2 text-sm">
                                    {selectedReport.deliveryDate && (
                                      <p><span className="text-slate-600">Delivered:</span> {new Date(selectedReport.deliveryDate).toLocaleDateString()}</p>
                                    )}
                                    <p><span className="text-slate-600">Downloads:</span> {selectedReport.downloadCount}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-medium text-slate-900 mb-3">Actions</h4>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Send className="w-4 h-4 mr-1" />
                                  Resend
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Shield className="w-4 h-4 mr-1" />
                                  Toggle Access
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

      {/* Upload Report Modal */}
      {showUploadForm && (
        <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Report</DialogTitle>
              <DialogDescription>
                Upload and assign a client report for delivery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 p-4">
              {/* File Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-[#20B2AA] bg-[#20B2AA]/5' : 'border-slate-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {newReport.fileName ? newReport.fileName : 'Drop PDF file here'}
                </h3>
                <p className="text-slate-600 mb-4">
                  {newReport.fileName ? 'File ready for assignment' : 'or click to browse files'}
                </p>
                <Button variant="outline">
                  <FileUp className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>

              {/* Assignment Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessEntity">Business Entity</Label>
                  <Input
                    id="businessEntity"
                    placeholder="e.g., ABC Corporation"
                    value={newReport.businessEntity}
                    onChange={(e) => setNewReport({ ...newReport, businessEntity: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={newReport.reportType} onValueChange={(value) => setNewReport({ ...newReport, reportType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Scorecard">Business Scorecard</SelectItem>
                      <SelectItem value="PREScore Analysis">PREScore Analysis</SelectItem>
                      <SelectItem value="Freedom Point Analysis">Freedom Point Analysis</SelectItem>
                      <SelectItem value="Quarterly Review">Quarterly Review</SelectItem>
                      <SelectItem value="Custom Report">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign to Client</Label>
                <Select value={newReport.assignedTo} onValueChange={(value) => setNewReport({ ...newReport, assignedTo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client to assign report" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name} - {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any delivery notes or special instructions..."
                  value={newReport.notes}
                  onChange={(e) => setNewReport({ ...newReport, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="accessOverride"
                  checked={newReport.accessOverride}
                  onCheckedChange={(checked) => setNewReport({ ...newReport, accessOverride: checked })}
                />
                <Label htmlFor="accessOverride" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span>Override access restrictions (deliver without payment)</span>
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadReport} className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                  Upload & Assign Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReportManagement;