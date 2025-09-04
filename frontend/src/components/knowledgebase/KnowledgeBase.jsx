import React, { useState } from 'react';
import { Search, Filter, Grid, List, Download, Eye, Lock, Star, Brain, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CategoryFilter from './CategoryFilter';
import ArticleCard from './ArticleCard';
import TierUpgradePrompt from './TierUpgradePrompt';
import InteractiveExitPlanning from './InteractiveExitPlanning';
import ExitPlanningLibrary from './ExitPlanningLibrary';
import ExitPlanningCenter from './ExitPlanningCenter';
import PersonalizedRecommendationEngine from './PersonalizedRecommendationEngine';
import BusinessValueTracker from './BusinessValueTracker';
import { categories, getContentByCategory, getUpgradePromptData } from '../../data/knowledgeBaseMock';

const KnowledgeBase = ({ userTier }) => {
  const [selectedCategory, setSelectedCategory] = useState('finance');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('library');
  const [userBusinessData, setUserBusinessData] = useState({
    revenue: 2500000,
    profitMargin: 12,
    employees: 25,
    industry: 'professional-services',
    ownerCentricityScore: 45,
    topCustomerPercentage: 35,
    managementLevels: 2,
    wealthGap: 400000
  });

  const handleBusinessDataUpdate = (field, value) => {
    setUserBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // FREE TIER gets NOTHING - completely locked out
  if (userTier === 'Free') {
    return (
      <div className="space-y-6">
        <div className="text-center py-20 bg-gradient-to-br from-gray-100 to-red-50 rounded-xl border-2 border-red-200">
          <div className="max-w-lg mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Knowledge Base Locked
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our professional exit planning resources are exclusively available to paying clients.
            </p>
            <div className="bg-white rounded-lg p-6 border border-red-200 mb-6">
              <h4 className="font-bold text-red-800 mb-3">What You're Missing:</h4>
              <div className="grid grid-cols-1 gap-3 text-sm text-left">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Complete 5-Meeting Exit Planning System</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Interactive Wealth Gap Calculator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Owner Centricity Assessment Tool</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Professional Templates & Checklists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Business Valuation Tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Personal Vision Development Tools</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => window.alert('Contact KGOB to discuss our professional exit planning services!')}
              >
                Schedule Paid Consultation
              </Button>
              <p className="text-sm text-gray-600">
                Professional exit planning services start at $798
              </p>
              <div className="text-xs text-gray-500 mt-4">
                <p>Contact us: 1-844-599-3355 | support@kgob.cpa</p>
                <p>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BUYER TIER gets partial access - very limited preview
  if (userTier === 'Buyer') {
    return (
      <div className="space-y-6">
        <div className="text-center py-16 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-orange-200">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Limited Knowledge Base Access
            </h3>
            <p className="text-gray-600 mb-6">
              You have basic access but our comprehensive interactive tools are Subscriber-exclusive.
            </p>
            <div className="bg-white rounded-lg p-4 border border-orange-200 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-green-700">✅ Your Access:</strong>
                  <ul className="mt-1 text-green-600">
                    <li>• Basic articles (3)</li>
                    <li>• Simple checklists</li>
                    <li>• Process overviews</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-red-700">🔒 Subscriber Only:</strong>
                  <ul className="mt-1 text-red-600">
                    <li>• Interactive calculators</li>
                    <li>• Complete 5-meeting system</li>
                    <li>• Professional tools (62+)</li>
                  </ul>
                </div>
              </div>
            </div>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
              onClick={() => window.alert('Upgrade to Subscriber tier to access the complete Knowledge Base!')}
            >
              Upgrade to Subscriber
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Get full access to our professional exit planning platform
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredContent = getContentByCategory(selectedCategory, userTier).filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const upgradeData = getUpgradePromptData(userTier, selectedCategory);
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-2">
            Professional resources, interactive tools, and guided assessments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Resource Library</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Tools</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="exit-planning">Exit Planning Suite</TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search articles, templates, and guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Navigation */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            userTier={userTier}
          />

          {/* Content Statistics */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-blue-700">
                  <strong>{filteredContent.length}</strong> resources available in {selectedCategoryData?.name}
                </div>
                {selectedCategoryData && (
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    ✅ Full Subscriber Access
                  </div>
                )}
              </div>
              <div className="text-xs text-blue-600">
                Total in category: {selectedCategoryData?.articleCount.total}
              </div>
            </div>
          </div>

          {/* Content Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredContent.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                userTier={userTier}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="interactive">
          <div className="space-y-6">
            {/* Interactive Tools Header */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h1 className="text-3xl font-bold mb-4">Interactive Business Analysis Tools</h1>
                <p className="text-xl opacity-90 mb-6">
                  Professional-grade calculators and assessment tools for comprehensive business analysis
                </p>
                <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm opacity-80">Calculators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm opacity-80">Assessment Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm opacity-80">Personalized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm opacity-80">API Dependencies</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Tools Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    AI Business Analysis Engine
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get personalized recommendations based on your specific business profile and exit planning goals
                  </p>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setActiveTab('recommendations')}
                  >
                    Analyze My Business
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 border-teal-200 bg-teal-50">
                <CardContent className="p-8 text-center">
                  <Calculator className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Real-Time Value Tracker
                  </h3>
                  <p className="text-gray-600 mb-6">
                    See how business improvements impact your estimated exit value in real-time with ROI calculations
                  </p>
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => setActiveTab('value-tracker')}
                  >
                    Track My Business Value
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Original Interactive Tools */}
            <InteractiveExitPlanning userTier={userTier} />
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <PersonalizedRecommendationEngine userTier={userTier} />
        </TabsContent>

        <TabsContent value="value-tracker">
          <BusinessValueTracker 
            userBusinessData={userBusinessData}
            onDataUpdate={handleBusinessDataUpdate}
          />
        </TabsContent>

        <TabsContent value="exit-planning">
          <ExitPlanningCenter userTier={userTier} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;