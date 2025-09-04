import React, { useState } from 'react';
import { User, Eye, EyeOff, LogIn, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ onLogin }) => {
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
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please check username and password.');
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
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center p-6">
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
            <div className="hidden w-16 h-16 bg-white rounded-xl items-center justify-center">
              <span className="text-teal-600 font-bold text-2xl">KG</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Valuation Platform</h1>
          <p className="text-blue-100">Kohari Gonzalez CPAs & Advisors</p>
          <p className="text-sm text-blue-200">Professional Exit Planning Services</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-blue-300">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Business Owner Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your username"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
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
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-3">Demo Credentials:</h4>
              <div className="bg-teal-50 rounded p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">Rob</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Password:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">Rabi@126</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-6 text-center space-y-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin-login')}
                className="text-sm"
              >
                KGOB Staff Login →
              </Button>
              <p className="text-xs text-gray-500">
                For business valuation and exit planning services
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <div className="mt-8 text-center text-blue-100 text-sm">
          <p>Kohari Gonzalez CPAs & Advisors</p>
          <p>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213</p>
          <p>Phone: 1-844-599-3355 | Email: support@kgob.cpa</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;