import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  AlertTriangle,
  Key,
  Clock,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { useToast } from '../../hooks/use-toast';

const PasswordChange = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { toast } = useToast();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    strength = checks.filter(Boolean).length;
    return (strength / 5) * 100;
  };

  const handleNewPasswordChange = (value) => {
    setPasswordData({...passwordData, newPassword: value});
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 20) return { text: 'Very Weak', color: 'text-red-600' };
    if (passwordStrength < 40) return { text: 'Weak', color: 'text-orange-600' };
    if (passwordStrength < 60) return { text: 'Fair', color: 'text-yellow-600' };
    if (passwordStrength < 80) return { text: 'Good', color: 'text-blue-600' };
    return { text: 'Strong', color: 'text-green-600' };
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 20) return 'bg-red-500';
    if (passwordStrength < 40) return 'bg-orange-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    if (passwordStrength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwordData.newPassword.length >= 8 },
    { text: 'One lowercase letter', met: /[a-z]/.test(passwordData.newPassword) },
    { text: 'One uppercase letter', met: /[A-Z]/.test(passwordData.newPassword) },
    { text: 'One number', met: /[0-9]/.test(passwordData.newPassword) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(passwordData.newPassword) }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation password do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordStrength < 60) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password for better security.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });

    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordStrength(0);
  };

  const recentActivity = [
    {
      action: 'Password changed',
      date: '2024-09-15',
      location: 'Miami, FL',
      device: 'Chrome on Windows'
    },
    {
      action: 'Login from new device',
      date: '2024-12-20',
      location: 'Miami, FL',
      device: 'Safari on iPhone'
    },
    {
      action: '2FA enabled',
      date: '2024-11-10',
      location: 'Miami, FL',
      device: 'Chrome on Windows'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Change Password</h1>
          <p className="text-slate-600">Update your password to keep your account secure</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Shield className="w-4 h-4" />
          <span>Last changed: 3 months ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Password Change Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
              <CardDescription>
                Choose a strong password to protect your admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="Enter your current password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      placeholder="Enter your new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Password Strength:</span>
                        <span className={`text-sm font-medium ${getPasswordStrengthText().color}`}>
                          {getPasswordStrengthText().text}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="Confirm your new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center">
                      <X className="w-3 h-3 mr-1" />
                      Passwords do not match
                    </p>
                  )}
                  {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Password Requirements & Security Info */}
        <div className="space-y-6">
          {/* Password Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Password Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    {req.met ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={`text-sm ${req.met ? 'text-green-600' : 'text-slate-600'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start space-x-2">
                  <Key className="w-4 h-4 mt-0.5 text-[#20B2AA]" />
                  <p>Use a unique password for your admin account</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 mt-0.5 text-[#20B2AA]" />
                  <p>Enable two-factor authentication for extra security</p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-[#20B2AA]" />
                  <p>Never share your admin credentials with anyone</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-2 bg-slate-50 rounded-lg">
                    <Activity className="w-4 h-4 mt-1 text-slate-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.device}</p>
                      <p className="text-xs text-slate-500">{activity.location} • {activity.date}</p>
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

export default PasswordChange;