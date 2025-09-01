import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login validation
    setTimeout(() => {
      if (credentials.email === 'Sara' && credentials.password === 'Sara@1025') {
        toast({
          title: "Login Successful",
          description: "Welcome to KGOB Admin Portal, Sara!",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#20B2AA] rounded-lg mb-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_ade93c71-5b26-473c-9a63-fa3def684fd0/artifacts/fu5a2wt2_Screen%20Shot%202025-08-31%20at%209.55.17%20AM.png" 
              alt="KohariGonzalez Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">KohariGonzalez Admin</h1>
          <p className="text-slate-600">Secure portal for platform administration</p>
        </div>

        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-[#20B2AA]" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Sara"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-[#20B2AA] hover:bg-[#1a9d96] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Admin Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Demo credentials: admin@koharigonzalez.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>© 2024 KohariGonzalez CPAs & Advisors. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;