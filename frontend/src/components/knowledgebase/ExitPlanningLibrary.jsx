import React, { useState } from 'react';
import { 
  Target, 
  BookOpen, 
  CheckSquare, 
  Calculator,
  Users,
  TrendingUp,
  FileText,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ArticleViewer from './ArticleViewer';
import { getExitPlanningContent, getContentStats } from '../../data/kgobContentLibrary';

const ExitPlanningLibrary = ({ userTier }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const content = getExitPlanningContent(userTier);
  const stats = getContentStats();

  if (selectedArticle) {
    return (
      <ArticleViewer 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  const renderResourceCard = (resource) => {
    const getFormatIcon = (format) => {
      const icons = {
        guide: BookOpen,
        assessment: CheckSquare,
        tool: Calculator,
        framework: Target,
        masterclass: TrendingUp
      };
      return icons[format] || FileText;
    };

    const FormatIcon = getFormatIcon(resource.format);

    return (
      <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <FormatIcon className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-700">{resource.tier}</Badge>
              {resource.isPremium && (
                <Badge className="bg-yellow-100 text-yellow-700">⭐ Premium</Badge>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{resource.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{resource.excerpt}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500">
              {resource.readTime && `${resource.readTime} • `}
              {resource.downloadCount && `${resource.downloadCount} downloads`}
            </div>
          </div>

          <Button 
            onClick={() => setSelectedArticle(resource)}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {resource.format === 'tool' ? 'Open Tool' : 'Read Guide'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* KGOB Branded Header */}
      <div className="text-center py-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Exit Planning Resource Library</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive tools and guides to help business owners plan and execute successful exits, 
          developed by Kohari Gonzalez CPAs & Advisors.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-teal-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Resources</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{stats.free}</div>
          <div className="text-sm text-gray-600">Free Access</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.buyer - stats.free}</div>
          <div className="text-sm text-gray-600">Buyer Exclusive</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.subscriber - stats.buyer}</div>
          <div className="text-sm text-gray-600">Subscriber Only</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Process Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools & Assessments</TabsTrigger>
          <TabsTrigger value="templates">Templates & Checklists</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The KGOB Exit Planning Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.filter(c => c.format === 'guide' || c.format === 'framework').map(renderResourceCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Tools & Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.filter(c => c.format === 'assessment' || c.format === 'tool').map(renderResourceCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates & Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.filter(c => c.format === 'checklist' || c.format === 'template').map(renderResourceCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* KGOB Branded Footer */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to Plan Your Exit Strategy?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our experienced team has helped hundreds of business owners successfully navigate their exit planning journey. 
            Let us create a customized strategy for your unique situation.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
              Schedule Your Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
              Download Exit Planning Guide
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2024 Kohari Gonzalez CPAs & Advisors | Professional Exit Planning Services
            </p>
            <p className="text-gray-400 text-xs mt-1">
              2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | Phone: 1-844-599-3355 | support@kgob.cpa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitPlanningLibrary;