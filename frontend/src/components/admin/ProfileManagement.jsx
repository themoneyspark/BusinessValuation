import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Edit,
  Camera,
  Shield,
  Clock,
  Activity,
  Upload,
  X,
  Settings,
  Eye,
  AlertTriangle,
  CheckCircle,
  Key
} from 'lucide-react';
import TwoFactorAuth from './TwoFactorAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';

const ProfileManagement = () => {
  const [editing, setEditing] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sara Gonzalez',
    email: 'Sara.Gonzalez@kgob.cpa',
    phone: '+1 (555) 123-4567',
    title: 'Super Administrator',
    department: 'Administration',
    location: 'Miami, FL',
    timezone: 'Eastern Standard Time (EST)',
    bio: 'Experienced CPA and business advisor with over 15 years in financial consulting and business valuation. Leading the KohariGonzalez admin team.',
    joinDate: '2020-01-15',
    lastLogin: '2024-12-31 09:30:00'
  });
  const { toast } = useToast();

  // Recent activity data (last 5 activities)
  const recentActivities = [
    {
      id: 1,
      action: 'Profile Login',
      timestamp: '2024-12-31 09:30:15',
      description: 'Successful admin login',
      type: 'login',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL'
    },
    {
      id: 2,
      action: 'Settings Updated',
      timestamp: '2024-12-31 09:25:43',
      description: 'Updated notification preferences',
      type: 'settings',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL'
    },
    {
      id: 3,  
      action: 'Password Changed',
      timestamp: '2024-12-30 16:45:22',
      description: 'Successfully changed account password',
      type: 'security',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL'
    },
    {
      id: 4,
      action: 'Report Uploaded',
      timestamp: '2024-12-30 14:30:11',
      description: 'Uploaded ABC_Corp_Business_Scorecard_Dec2024.pdf',
      type: 'content',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL'
    },
    {
      id: 5,
      action: '2FA Enabled',
      timestamp: '2024-12-29 11:20:33',
      description: 'Enabled two-factor authentication',
      type: 'security',
      ipAddress: '192.168.1.100',
      location: 'Miami, FL'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return <Activity className="w-4 h-4 text-green-600" />;
      case 'security': return <Shield className="w-4 h-4 text-red-600" />;
      case 'settings': return <Settings className="w-4 h-4 text-blue-600" />;
      case 'content': return <Upload className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setProfileImagePreview(null);
    setProfileImage(null);
    // Reset form data if needed
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG, PNG, or GIF image.",
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const uploadFile = async (file) => {
    if (!validateFile(file)) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const chunkSize = 64 * 1024; // 64KB chunks
      const totalChunks = Math.ceil(file.size / chunkSize);
      
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);
        
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunk_index', i.toString());
        formData.append('total_chunks', totalChunks.toString());
        formData.append('filename', file.name);
        formData.append('user_id', 'admin');
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/upload-chunk`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        const progress = Math.round(((i + 1) / totalChunks) * 100);
        setUploadProgress(progress);
        
        // If this was the final chunk, set the uploaded image preview
        if (result.uploaded && result.file_id) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImagePreview(reader.result);
            setProfileImage(file);
          };
          reader.readAsDataURL(file);
        }
      }
      
      toast({
        title: "Upload Successful",
        description: "Profile picture uploaded successfully.",
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/picture/admin`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProfileImage(null);
        setProfileImagePreview(null);
        toast({
          title: "Profile Picture Removed",
          description: "Your profile picture has been removed successfully.",
        });
      }
    } catch (error) {
      console.error('Remove error:', error);
      toast({
        title: "Remove Failed",
        description: "Failed to remove profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load existing profile picture on component mount
  React.useEffect(() => {
    const loadProfilePicture = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/picture/admin`);
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setProfileImagePreview(imageUrl);
        }
      } catch (error) {
        // No existing profile picture, which is fine
        console.log('No existing profile picture found');
      }
    };
    
    loadProfilePicture();
  }, []);

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Two Factor Auth Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTwoFactorSetup(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4">
              <TwoFactorAuth 
                isEnabled={twoFactorEnabled}
                onClose={() => setShowTwoFactorSetup(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600">Manage your personal information and account settings</p>
        </div>
        <Button 
          onClick={() => setEditing(!editing)}
          className={editing ? "bg-slate-600 hover:bg-slate-700" : "bg-[#20B2AA] hover:bg-[#1a9d96]"}
        >
          {editing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Update your profile picture and basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {profileImagePreview ? (
                      <AvatarImage src={profileImagePreview} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-[#20B2AA] text-white text-2xl">
                        SG
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {editing && (
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-[#20B2AA] hover:bg-[#1a9d96]"
                      onClick={openFileDialog}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900">{profileData.name}</h3>
                  <p className="text-sm text-slate-600">{profileData.title}</p>
                  <p className="text-xs text-slate-500">{profileData.department}</p>
                </div>
              </div>

              {editing && (
                <div className="space-y-4">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-[#20B2AA] bg-teal-50' 
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Drop an image here, or click to browse
                    </p>
                    <p className="text-xs text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={openFileDialog}
                      disabled={isUploading}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Choose File'}
                    </Button>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-[#20B2AA] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Remove Image Button */}
                  {profileImagePreview && !isUploading && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Member Since</span>
                </div>
                <span className="text-sm font-medium">
                  {new Date(profileData.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Last Login</span>
                </div>
                <span className="text-sm font-medium">
                  {new Date(profileData.lastLogin).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Role</span>
                </div>
                <span className="text-sm font-medium text-[#20B2AA]">
                  {profileData.title}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                    disabled={!editing}
                    className={!editing ? "bg-slate-50" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!editing}
                  className={!editing ? "bg-slate-50" : ""}
                  rows={4}
                />
              </div>

              {editing && (
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
              <CardDescription>Monitor your account security and recent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Account Security</p>
                      <p className="text-sm text-green-700">Your account is secure</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowActivityLogs(true)}
                  >
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => setShowTwoFactorSetup(true)}
                  >
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Auth</p>
                      <p className="text-sm text-slate-600">
                        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <Settings className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Last Password Change</p>
                      <p className="text-sm text-slate-600">3 months ago</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#20B2AA]">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Activity</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowActivityLogs(true)}
                  className="text-[#20B2AA]"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View All
                </Button>
              </CardTitle>
              <CardDescription>Your latest account activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded-lg">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-600 truncate">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-slate-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;