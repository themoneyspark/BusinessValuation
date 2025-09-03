import React, { useState } from 'react';
import { Search, Filter, Grid, List, Download, Eye, Lock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CategoryFilter from './CategoryFilter';
import ArticleCard from './ArticleCard';
import TierUpgradePrompt from './TierUpgradePrompt';
import { categories, getContentByCategory, getUpgradePromptData } from '../../data/knowledgeBaseMock';

const KnowledgeBase = ({ userTier }) => {
  const [selectedCategory, setSelectedCategory] = useState('finance');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Only Subscribers get full access
  if (userTier !== 'Subscriber') {
    return (
      <div className="space-y-6">
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Knowledge Base Access
            </h3>
            <p className="text-gray-600 mb-6">
              Access our comprehensive library of business valuation resources, templates, and guides.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Resources Available</span>
                  <span className="text-2xl font-bold text-blue-600">65+</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-blue-600 font-bold">25</div>
                  <div className="text-gray-600">Finance</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-green-600 font-bold">18</div>
                  <div className="text-gray-600">Growth</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-purple-600 font-bold">22</div>
                  <div className="text-gray-600">Exit Planning</div>
                </div>
              </div>
            </div>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 mt-6"
              onClick={() => window.alert('Upgrade to Subscriber tier to access the Knowledge Base!')}
            >
              Upgrade to Access Knowledge Base
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              {userTier === 'Free' ? 'Available with Subscriber plan' : 'Upgrade from Buyer to Subscriber'}
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
            Professional resources, templates, and guides for business growth and valuation
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

      {/* Upgrade Prompt for Additional Content */}
      {userTier !== 'Subscriber' && (
        <TierUpgradePrompt 
          upgradeData={upgradeData}
          currentTier={userTier}
          category={selectedCategoryData?.name}
        />
      )}
    </div>
  );
};

export default KnowledgeBase;