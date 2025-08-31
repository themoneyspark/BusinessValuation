import React from 'react';
import { Folder, Download, FileText, CheckSquare, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const ResourceLibrary = ({ resources }) => {
  const getTypeIcon = (type) => {
    const icons = {
      Template: FileText,
      Checklist: CheckSquare,
      Guide: BookOpen
    };
    return icons[type] || FileText;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Valuation: 'bg-teal-100 text-teal-700',
      Planning: 'bg-blue-100 text-blue-700',
      Process: 'bg-purple-100 text-purple-700',
      Finance: 'bg-green-100 text-green-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Folder className="w-5 h-5 text-teal-600" />
          <span>Resources & Templates</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {resources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="flex-shrink-0 w-64 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <TypeIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm leading-tight mb-1">
                      {resource.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(resource.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceLibrary;