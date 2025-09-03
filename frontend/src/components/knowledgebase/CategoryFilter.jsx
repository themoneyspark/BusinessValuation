import React from 'react';
import { DollarSign, TrendingUp, Target } from 'lucide-react';
import { Button } from '../ui/button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, userTier }) => {
  const getIcon = (iconName) => {
    const icons = {
      DollarSign,
      TrendingUp,
      Target
    };
    return icons[iconName] || DollarSign;
  };

  const getColorClasses = (color, isSelected) => {
    const baseClasses = 'transition-all duration-200';
    
    if (isSelected) {
      const colors = {
        blue: 'bg-blue-500 text-white border-blue-500',
        green: 'bg-green-500 text-white border-green-500',
        purple: 'bg-purple-500 text-white border-purple-500'
      };
      return `${baseClasses} ${colors[color]}`;
    } else {
      const colors = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
        green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
        purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      };
      return `${baseClasses} ${colors[color]}`;
    }
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = getIcon(category.icon);
        const isSelected = selectedCategory === category.id;
        const userAccessCount = category.articleCount[userTier.toLowerCase()] || 0;
        
        return (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => onCategoryChange(category.id)}
            className={`${getColorClasses(category.color, isSelected)} min-w-[200px] h-auto p-4 flex-col items-start`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {userAccessCount}
              </div>
            </div>
            <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-600'} text-left leading-relaxed`}>
              {category.description}
            </p>
            <div className={`text-xs mt-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
              {userAccessCount} of {category.articleCount.total} resources
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;