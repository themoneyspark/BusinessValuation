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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  return (
    <div className="space-y-6">
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
                    <AvatarFallback className="bg-[#20B2AA] text-white text-2xl">
                      SG
                    </AvatarFallback>
                  </Avatar>
                  {editing && (
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-[#20B2AA] hover:bg-[#1a9d96]"
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
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload New Photo
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
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
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Auth</p>
                      <p className="text-sm text-slate-600">Enabled</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;