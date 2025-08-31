import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const IndustryNews = ({ news }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-teal-600" />
          <span>Industry News</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {news.map((item) => (
            <div 
              key={item.id}
              className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">
                    {item.headline}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryNews;