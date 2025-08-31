import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const BusinessQuotes = ({ quotes }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [liked, setLiked] = useState(false);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    setLiked(false);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    setLiked(false);
  };

  const quote = quotes[currentQuote];

  return (
    <Card className="bg-gradient-to-r from-teal-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Daily Inspiration</h3>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? 'text-red-500' : 'text-gray-500'}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={prevQuote}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={nextQuote}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <blockquote className="text-center mb-6">
          <p className="text-xl italic text-gray-700 mb-4 leading-relaxed">
            "{quote.text}"
          </p>
          <footer className="text-right">
            <cite className="text-sm font-semibold text-gray-600">— {quote.author}</cite>
          </footer>
        </blockquote>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentQuote ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessQuotes;