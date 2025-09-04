import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const AdminDashboard = ({ userRole }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  // Admin access control
  if (userRole !== 'admin') {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Admin Access Required
          </h3>
          <p className="text-gray-600 mb-6">
            This area is restricted to KGOB administrators and staff members only.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const adminStats = {
    totalUsers: 1247,
    activeSubscribers: 89,
    completedAssessments: 156,
    totalRevenue: 287450,
    averageBusinessValue: 2300000,
    consultationsScheduled: 23
  };

  const renderAdminOverview = () => {
    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <Card className="bg-gradient-to-r from-blue-900 to-gray-800 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="/kgob-logo.png"
                    alt="KGOB Logo"
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-12 h-12 bg-teal-500 rounded-lg items-center justify-center">
                    <span className="text-white font-bold text-lg">KG</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">KGOB Admin Dashboard</h1>
                    <p className="text-gray-300">Business Valuation Platform Administration</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 max-w-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-400">{adminStats.totalUsers.toLocaleString()}</div>
                    <div className="text-sm text-gray-300">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{adminStats.activeSubscribers}</div>
                    <div className="text-sm text-gray-300">Active Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{adminStats.completedAssessments}</div>
                    <div className="text-sm text-gray-300">Completed Assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">${(adminStats.totalRevenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-300">Monthly Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Revenue This Month</h3>
                  <div className="text-3xl font-bold text-green-600">${adminStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-green-700">+12% vs last month</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Average Business Value</h3>
                  <div className="text-3xl font-bold text-blue-600">${(adminStats.averageBusinessValue / 1000000).toFixed(1)}M</div>
                  <p className="text-sm text-blue-700">Across all assessments</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">Consultations Scheduled</h3>
                  <div className="text-3xl font-bold text-purple-600">{adminStats.consultationsScheduled}</div>
                  <p className="text-sm text-purple-700">This week</p>
                </div>
                <Clock className="w-12 h-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'assessment', user: 'John Smith', action: 'Completed Phase 1 Assessment', time: '2 hours ago', status: 'completed' },
                { type: 'consultation', user: 'Mary Johnson', action: 'Scheduled Exit Planning Consultation', time: '4 hours ago', status: 'scheduled' },
                { type: 'upgrade', user: 'Robert Davis', action: 'Upgraded to Subscriber tier', time: '6 hours ago', status: 'completed' },
                { type: 'analysis', user: 'Linda Wilson', action: 'Generated Business Value Analysis', time: '8 hours ago', status: 'completed' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                      activity.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'assessment' ? <CheckCircle className="w-5 h-5" /> :
                       activity.type === 'consultation' ? <Clock className="w-5 h-5" /> :
                       activity.type === 'upgrade' ? <TrendingUp className="w-5 h-5" /> :
                       <BarChart3 className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{activity.user}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{activity.time}</div>
                    <Badge className={
                      activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                      activity.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // const renderClientManagement = () => {
  //   return (
  //     <div className="space-y-6">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle className="flex items-center space-x-2">
  //             <Users className="w-5 h-5 text-blue-600" />
  //             <span>Client Management</span>
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="text-center py-12">
  //             <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
  //             <h3 className="text-xl font-semibold text-gray-700 mb-4">
  //               Admin Interface Integration Ready
  //             </h3>
  //             <p className="text-gray-600 mb-6">
  //               This section will integrate your existing admin interface components from the admindashboard branch.
  //             </p>
  //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  //               <h4 className="font-semibold text-blue-900 mb-2">Integration Status:</h4>
  //               <div className="space-y-2 text-sm text-blue-700">
  //                 <div className="flex items-center space-x-2">
  //                   <CheckCircle className="w-4 h-4" />
  //                   <span>Admin framework established</span>
  //                 </div>
  //                 <div className="flex items-center space-x-2">
  //                   <AlertTriangle className="w-4 h-4" />
  //                   <span>Awaiting admin components from admindashboard branch</span>
  //                 </div>
  //                 <div className="flex items-center space-x-2">
  //                   <Target className="w-4 h-4" />
  //                   <span>Role-based access control configured</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </CardContent>
  //         </Card>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="space-y-6">
      {/* Admin Navigation */}
      <Tabs value={activeAdminTab} onValueChange={setActiveAdminTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Client Management</TabsTrigger>
          <TabsTrigger value="assessments">Assessment Review</TabsTrigger>
          <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          <TabsTrigger value="settings">Admin Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderAdminOverview()}
        </TabsContent>

        <TabsContent value="clients">
          {renderClientManagement()}
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Assessment Review System
              </h3>
              <p className="text-gray-600 mb-6">
                Review and manage client business assessments and exit planning progress.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Configure Assessment Review
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                System Analytics & Reporting
              </h3>
              <p className="text-gray-600 mb-6">
                Comprehensive analytics dashboard for platform performance and business insights.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Configure Analytics Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Admin Settings & Configuration
              </h3>
              <p className="text-gray-600 mb-6">
                System configuration, user management, and platform settings.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Configure Admin Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* KGOB Admin Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>KGOB Administration Panel | Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
            <div className="text-xs">Admin Access | Internal Use Only</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;