import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Bookmark, 
  CheckSquare,
  Clock,
  User,
  Calendar,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const ArticleViewer = ({ article, onBack }) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});

  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const handleAssessmentAnswer = (questionIndex, value) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const calculateAssessmentScore = () => {
    const answers = Object.values(assessmentAnswers);
    return answers.reduce((total, answer) => total + (parseInt(answer) || 0), 0);
  };

  const getScoreInterpretation = (score) => {
    if (score >= 12) return { level: 'Excellent', color: 'text-green-600', description: 'Your business shows strong exit readiness' };
    if (score >= 8) return { level: 'Good', color: 'text-blue-600', description: 'Some areas need attention before exit' };
    if (score >= 4) return { level: 'Developing', color: 'text-yellow-600', description: 'Significant preparation required' };
    return { level: 'Early Stage', color: 'text-red-600', description: 'Substantial value-building needed' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Knowledge Base</span>
        </Button>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          {article.format === 'tool' && (
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Download className="w-4 h-4 mr-2" />
              Download Tool
            </Button>
          )}
        </div>
      </div>

      {/* Article Header */}
      <Card>
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className="bg-purple-100 text-purple-700">{article.tier}</Badge>
                <Badge variant="outline">{article.format}</Badge>
                {article.isPremium && (
                  <Badge className="bg-yellow-100 text-yellow-700">⭐ Premium</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
              <p className="text-lg text-gray-600">{article.excerpt}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                {article.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Kohari Gonzalez CPAs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated Dec 2024</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20 bg-teal-100 rounded-xl flex items-center justify-center">
              <Target className="w-10 h-10 text-teal-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Body */}
      <Card>
        <CardContent className="p-8">
          {/* Overview Section */}
          {article.content.overview && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{article.content.overview}</p>
            </div>
          )}

          {/* Assessment Content */}
          {article.format === 'assessment' && article.content.questions && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-900">Assessment Questions</h2>
              {article.content.questions.map((q, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-gray-900 mb-3">{q.category}</h3>
                    <p className="text-gray-700 mb-4">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex + 1}
                            onChange={(e) => handleAssessmentAnswer(index, e.target.value)}
                            className="text-teal-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Assessment Results */}
              {Object.keys(assessmentAnswers).length > 0 && (
                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Results</h3>
                    <div className="space-y-4">
                      {(() => {
                        const score = calculateAssessmentScore();
                        const interpretation = getScoreInterpretation(score);
                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Total Score:</span>
                              <span className={`text-2xl font-bold ${interpretation.color}`}>
                                {score} / {article.content.questions.length * 4}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Exit Readiness Level:</span>
                                <span className={`font-semibold ${interpretation.color}`}>
                                  {interpretation.level}
                                </span>
                              </div>
                              <p className="text-gray-600">{interpretation.description}</p>
                            </div>
                            <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                              Schedule Your Exit Planning Consultation
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Process Steps */}
          {article.content.process && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">The Process</h2>
              {article.content.process.map((step, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-600 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{step.phase}</h3>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Checklist Content */}
          {article.content.categories && (
            <div className="space-y-6">
              {article.content.categories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{category.name}</span>
                      {category.required && (
                        <Badge variant="destructive">Required</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <label key={itemIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                          <input
                            type="checkbox"
                            onChange={() => toggleStepCompletion(`${categoryIndex}-${itemIndex}`)}
                            className="text-teal-600"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Start Your Exit Planning Journey?</h3>
          <p className="text-gray-600 mb-6">
            Schedule a consultation with our expert team to create your personalized exit strategy.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="px-8 py-3">
              Download Complete Guide
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Kohari Gonzalez CPAs & Advisors | Professional Exit Planning Services
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleViewer;