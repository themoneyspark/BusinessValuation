import React, { useState } from 'react';
import { MessageCircle, Send, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const AskSara = ({ tier, history = [], queriesRemaining = 10 }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setQuestion('');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-teal-600" />
            <span>Ask Sara - Business Advisor</span>
          </div>
          {tier === 'Free' && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {queriesRemaining} queries remaining
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-48 overflow-y-auto mb-4 space-y-3">
          {history.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-800">Q: {item.question}</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">A: {item.answer}</p>
                <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          
          {history.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Ask Sara any business question</p>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            placeholder="Ask me anything about your business..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!question.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AskSara;