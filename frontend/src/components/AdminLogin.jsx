import React, { useState } from 'react';
import { Shield, Eye, EyeOff, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = onLogin(credentials.username, credentials.password);
      if (success) {
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. Please check username and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* KGOB Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="/kgob-logo.png"
              alt="KGOB Logo"
              className="h-16 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-16 h-16 bg-teal-500 rounded-xl items-center justify-center">
              <span className="text-white font-bold text-2xl">KG</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">KGOB Admin Portal</h1>
          <p className="text-gray-300">Kohari Gonzalez CPAs & Advisors</p>
          <p className="text-sm text-gray-400">Administrative Access Only</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-gray-700">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Administrator Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Admin Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter admin username"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter admin password"
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !credentials.username || !credentials.password}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Access Admin Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-3">Demo Admin Credentials:</h4>
              <div className="bg-gray-50 rounded p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">Sara</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Password:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">Sara@1025</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/user-login')}
                className="text-sm"
              >
                Business Owner Login →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Kohari Gonzalez CPAs & Advisors</p>
          <p>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213</p>
          <p>Phone: 1-844-599-3355 | Email: support@kgob.cpa</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;