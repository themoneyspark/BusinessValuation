import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  Star, 
  Zap,
  BookOpen,
  CheckSquare,
  Calculator,
  Folder
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const ArticleCard = ({ article, userTier, viewMode = 'grid' }) => {
  const getFormatIcon = (format) => {
    const icons = {
      article: FileText,
      template: Download,
      guide: BookOpen,
      workbook: Calculator,
      framework: CheckSquare,
      masterclass: Star,
      checklist: CheckSquare,
      model: Calculator,
      library: Folder
    };
    return icons[format] || FileText;
  };

  const getFormatColor = (format) => {
    const colors = {
      article: 'text-blue-600 bg-blue-100',
      template: 'text-green-600 bg-green-100',
      guide: 'text-purple-600 bg-purple-100',
      workbook: 'text-orange-600 bg-orange-100',
      framework: 'text-indigo-600 bg-indigo-100',
      masterclass: 'text-yellow-600 bg-yellow-100',
      checklist: 'text-pink-600 bg-pink-100',
      model: 'text-red-600 bg-red-100',
      library: 'text-teal-600 bg-teal-100'
    };
    return colors[format] || 'text-gray-600 bg-gray-100';
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      Free: 'bg-green-100 text-green-700',
      Buyer: 'bg-blue-100 text-blue-700',
      Subscriber: 'bg-purple-100 text-purple-700'
    };
    return colors[tier] || 'bg-gray-100 text-gray-700';
  };

  const FormatIcon = getFormatIcon(article.format);
  const canAccess = true; // All content shown here is accessible to current user tier

  const handleView = () => {
    if (article.format === 'template' || article.format === 'workbook' || article.format === 'model' || article.format === 'checklist') {
      // Simulate download
      window.alert(`Downloading ${article.title}...`);
    } else {
      // Open article viewer
      window.alert(`Opening ${article.title} for reading...`);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFormatColor(article.format)}`}>
                <FormatIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{article.title}</h3>
                  {article.isPopular && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {article.isNew && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Zap className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                  {article.isPremium && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      ⭐ Premium
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {article.readTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  )}
                  {article.views && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views} views</span>
                    </div>
                  )}
                  {article.downloadCount && (
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{article.downloadCount} downloads</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getTierBadgeColor(article.tier)}>
                {article.tier}
              </Badge>
              <Button onClick={handleView} className="bg-teal-600 hover:bg-teal-700">
                {article.format === 'template' || article.format === 'workbook' || article.format === 'model' || article.format === 'checklist' ? 'Download' : 'Read'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFormatColor(article.format)}`}>
            <FormatIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center space-x-2">
            {article.isPopular && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Star className="w-3 h-3" />
              </Badge>
            )}
            {article.isNew && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Zap className="w-3 h-3" />
              </Badge>
            )}
            {article.isPremium && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                ⭐
              </Badge>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

        <div className="flex items-center justify-between mb-4">
          <Badge className={getTierBadgeColor(article.tier)}>
            {article.tier}
          </Badge>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            {article.readTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            )}
            {(article.views || article.downloadCount) && (
              <div className="flex items-center space-x-1">
                {article.views ? <Eye className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                <span>{article.views || article.downloadCount}</span>
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleView}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          {article.format === 'template' || article.format === 'workbook' || article.format === 'model' || article.format === 'checklist' ? (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download {article.format === 'template' ? 'Template' : 'File'}
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Read Article
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;