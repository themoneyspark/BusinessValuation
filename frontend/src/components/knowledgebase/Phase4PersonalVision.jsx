import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Home, 
  Briefcase,
  Target,
  CheckSquare,
  ArrowRight,
  Award,
  MapPin,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Phase4PersonalVision = ({ onComplete, savedData = {} }) => {
  const [currentVisionArea, setCurrentVisionArea] = useState(0);
  const [visionData, setVisionData] = useState(savedData);
  const [showResults, setShowResults] = useState(false);

  const visionAreas = [
    {
      category: "Financial Lifestyle & Security",
      icon: Home,
      color: "green",
      weight: 25,
      description: "Post-exit financial planning and lifestyle goals",
      questions: [
        {
          id: "desired_annual_income",
          label: "Desired Annual Income Post-Exit",
          type: "currency",
          required: true,
          placeholder: "150000",
          helpText: "What annual income do you need to live comfortably after exiting?"
        },
        {
          id: "lifestyle_changes",
          label: "Planned Lifestyle Changes",
          type: "multiselect",
          required: true,
          options: [
            { value: "maintain", label: "Maintain current lifestyle" },
            { value: "upgrade", label: "Upgrade lifestyle (nicer home, more travel)" },
            { value: "simplify", label: "Simplify lifestyle (smaller home, less expenses)" },
            { value: "relocate", label: "Relocate to different area" },
            { value: "travel", label: "Extensive travel and experiences" },
            { value: "family", label: "More time with family" },
            { value: "hobbies", label: "Pursue hobbies and interests" },
            { value: "giving", label: "Increase charitable giving" }
          ],
          helpText: "Select all lifestyle changes you're planning"
        },
        {
          id: "risk_tolerance",
          label: "Investment Risk Tolerance Post-Exit",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select risk tolerance..." },
            { value: "conservative", label: "Very Conservative - Preserve capital above all" },
            { value: "moderate-conservative", label: "Moderate Conservative - Some growth with safety" },
            { value: "balanced", label: "Balanced - Growth and security balance" },
            { value: "moderate-aggressive", label: "Moderate Aggressive - Growth focused" },
            { value: "aggressive", label: "Aggressive - Maximum long-term returns" }
          ],
          helpText: "How comfortable are you with investment risk using your exit proceeds?"
        }
      ]
    },
    {
      category: "Activity & Engagement",
      icon: Briefcase,
      color: "blue",
      weight: 25,
      description: "Work involvement and daily activity planning",
      questions: [
        {
          id: "work_involvement_level",
          label: "Desired Work Involvement Level",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select involvement level..." },
            { value: "none", label: "Complete retirement - no work involvement" },
            { value: "consulting", label: "Occasional consulting/advisory work" },
            { value: "part-time", label: "Regular part-time work in same field" },
            { value: "new-venture", label: "Start new business or venture" },
            { value: "boards", label: "Board positions with other companies" },
            { value: "teaching", label: "Teaching, speaking, or mentoring" }
          ],
          helpText: "What level of work activity appeals to you post-exit?"
        },
        {
          id: "daily_activities",
          label: "Planned Daily/Weekly Activities",
          type: "multiselect",
          required: true,
          options: [
            { value: "fitness", label: "Health and fitness activities" },
            { value: "travel", label: "Travel and exploration" },
            { value: "learning", label: "Continued learning and education" },
            { value: "creative", label: "Arts, creativity, and hobbies" },
            { value: "volunteer", label: "Volunteering and community service" },
            { value: "family", label: "Family time and relationships" },
            { value: "outdoors", label: "Outdoor activities and recreation" },
            { value: "investing", label: "Investment management and research" }
          ],
          helpText: "How do you want to spend your time?"
        },
        {
          id: "intellectual_stimulation",
          label: "Sources of Intellectual Challenge",
          type: "multiselect", 
          required: true,
          options: [
            { value: "consulting", label: "Business consulting and advisory work" },
            { value: "investing", label: "Investment research and management" },
            { value: "teaching", label: "Teaching or mentoring others" },
            { value: "writing", label: "Writing books, articles, or blogs" },
            { value: "speaking", label: "Speaking at conferences or events" },
            { value: "learning", label: "Formal education or skill development" },
            { value: "volunteering", label: "Volunteer leadership roles" },
            { value: "creative", label: "Creative projects and endeavors" }
          ],
          helpText: "What will provide intellectual stimulation and challenge?"
        }
      ]
    },
    {
      category: "Identity & Purpose",
      icon: User,
      color: "purple",
      weight: 30,
      description: "Identity transition and life purpose development",
      questions: [
        {
          id: "identity_transition_concerns",
          label: "Concerns About Identity Change",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select concern level..." },
            { value: "very-concerned", label: "Very concerned - major worry about identity loss" },
            { value: "somewhat-concerned", label: "Somewhat concerned - some worry" },
            { value: "moderately-concerned", label: "Moderately concerned - manageable" },
            { value: "slightly-concerned", label: "Slightly concerned - minor issue" },
            { value: "not-concerned", label: "Not concerned - excited for change" }
          ],
          helpText: "How concerned are you about losing your identity as a business owner?"
        },
        {
          id: "new_identity_vision",
          label: "How You Want to Be Known Post-Exit",
          type: "textarea",
          required: true,
          placeholder: "I want to be known as someone who... I'll introduce myself as...",
          helpText: "How do you want to introduce yourself and be known after selling your business?"
        },
        {
          id: "life_purpose_post_exit",
          label: "What Will Give Your Life Purpose and Meaning?",
          type: "textarea",
          required: true,
          placeholder: "My life will have meaning through... I'll find purpose in...",
          helpText: "Think deeply about what will motivate and fulfill you long-term"
        },
        {
          id: "skills_to_continue_using",
          label: "Business Skills You Want to Continue Using",
          type: "multiselect",
          required: true,
          options: [
            { value: "leadership", label: "Leadership and team management" },
            { value: "strategic", label: "Strategic thinking and planning" },
            { value: "problem-solving", label: "Complex problem solving" },
            { value: "relationships", label: "Relationship building and networking" },
            { value: "financial", label: "Financial analysis and management" },
            { value: "industry", label: "Industry expertise and knowledge" },
            { value: "mentoring", label: "Teaching and mentoring others" },
            { value: "innovation", label: "Innovation and creative thinking" }
          ],
          helpText: "Which business skills do you want to continue using in your next phase?"
        },
        {
          id: "legacy_goals",
          label: "Legacy You Want to Create",
          type: "multiselect",
          required: true,
          options: [
            { value: "family-wealth", label: "Family wealth and financial security" },
            { value: "community", label: "Community impact and development" },
            { value: "industry", label: "Industry advancement and innovation" },
            { value: "education", label: "Educational contributions and scholarships" },
            { value: "charity", label: "Charitable causes and philanthropy" },
            { value: "environment", label: "Environmental stewardship" },
            { value: "mentoring", label: "Mentoring next generation of leaders" },
            { value: "culture", label: "Cultural contributions and arts" }
          ],
          helpText: "What legacy do you want to create beyond business success?"
        }
      ]
    },
    {
      category: "Relationships & Family",
      icon: Heart,
      color: "teal",
      weight: 20,
      description: "Family relationships and social connections planning",
      questions: [
        {
          id: "family_time_importance",
          label: "Importance of Increased Family Time",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select importance level..." },
            { value: "extremely", label: "Extremely important - top priority" },
            { value: "very", label: "Very important - major factor in exit decision" },
            { value: "moderately", label: "Moderately important" },
            { value: "somewhat", label: "Somewhat important" },
            { value: "minimal", label: "Not a major factor in exit decision" }
          ],
          helpText: "How important is spending more time with family?"
        },
        {
          id: "family_relationship_goals",
          label: "Family Relationship Goals Post-Exit",
          type: "textarea",
          required: true,
          placeholder: "I want to spend more time with... I plan to be more involved in...",
          helpText: "Describe how you want to change your family relationships and involvement"
        },
        {
          id: "social_network_importance",
          label: "Professional Network Maintenance",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select network importance..." },
            { value: "maintain-all", label: "Maintain all current professional connections" },
            { value: "maintain-most", label: "Maintain most important connections" },
            { value: "selective", label: "Be selective - maintain key relationships only" },
            { value: "quality", label: "Focus on quality over quantity" },
            { value: "new", label: "Ready for completely new social circle" }
          ],
          helpText: "How important is maintaining your current professional network?"
        }
      ]
    }
  ];

  const renderQuestion = (question) => {
    const value = visionData[question.id] || (question.type === 'multiselect' ? [] : '');

    switch (question.type) {
      case 'currency':
        return (
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                value={value}
                onChange={(e) => setVisionData(prev => ({ ...prev, [question.id]: e.target.value }))}
                placeholder={question.placeholder}
                className="pl-8"
              />
            </div>
            {question.helpText && <p className="text-xs text-gray-500">{question.helpText}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              value={value}
              onChange={(e) => setVisionData(prev => ({ ...prev, [question.id]: e.target.value }))}
              placeholder={question.placeholder}
              rows={4}
            />
            {question.helpText && <p className="text-xs text-gray-500">{question.helpText}</p>}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <select
              value={value}
              onChange={(e) => setVisionData(prev => ({ ...prev, [question.id]: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {question.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {question.helpText && <p className="text-xs text-gray-500">{question.helpText}</p>}
          </div>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
              {question.options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter(v => v !== option.value);
                      setVisionData(prev => ({ ...prev, [question.id]: newValues }));
                    }}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            {question.helpText && <p className="text-xs text-gray-500">{question.helpText}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  const currentArea = visionAreas[currentVisionArea];
  const totalAreas = visionAreas.length;
  const overallProgress = Math.round(((currentVisionArea + 1) / totalAreas) * 100);

  const handleNextArea = () => {
    if (currentVisionArea < totalAreas - 1) {
      setCurrentVisionArea(currentVisionArea + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousArea = () => {
    if (currentVisionArea > 0) {
      setCurrentVisionArea(currentVisionArea - 1);
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl font-bold mb-4">Your Personal Vision Summary</h1>
            <p className="text-xl opacity-90">
              Comprehensive plan for life after business ownership
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          {visionAreas.map((area, index) => {
            const AreaIcon = area.icon;
            const completedQuestions = area.questions.filter(q => visionData[q.id]).length;
            const completionRate = Math.round((completedQuestions / area.questions.length) * 100);

            return (
              <Card key={index}>
                <CardHeader className={`${
                  area.color === 'green' ? 'bg-green-50 border-green-200' :
                  area.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                  area.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                  'bg-teal-50 border-teal-200'
                }`}>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      area.color === 'green' ? 'bg-green-500' :
                      area.color === 'blue' ? 'bg-blue-500' :
                      area.color === 'purple' ? 'bg-purple-500' :
                      'bg-teal-500'
                    } text-white`}>
                      <AreaIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{area.category}</h3>
                      <p className="text-sm font-normal text-gray-600">{completionRate}% Complete</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {area.questions.map(question => {
                      const response = visionData[question.id];
                      if (!response) return null;

                      return (
                        <div key={question.id} className="text-sm">
                          <div className="font-medium text-gray-700">{question.label}:</div>
                          <div className="text-gray-600 mt-1">
                            {Array.isArray(response) ? response.join(', ') : response}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-teal-900 mb-4">Your Vision Development Complete!</h3>
            <p className="text-teal-700 mb-6">
              You've created a comprehensive vision for life after business ownership. 
              This foundation will guide your exit planning and ensure personal satisfaction post-exit.
            </p>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => onComplete?.(visionData)}
            >
              Continue to Phase 5: Action Planning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Phase 4: Personal Vision Development
              </h1>
              <p className="text-gray-600 text-lg">
                Design your ideal life and identity after business ownership
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={overallProgress} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* Current Vision Area */}
      <Card>
        <CardHeader className={`bg-gradient-to-r ${
          currentArea.color === 'green' ? 'from-green-50 to-green-100' :
          currentArea.color === 'blue' ? 'from-blue-50 to-blue-100' :
          currentArea.color === 'purple' ? 'from-purple-50 to-purple-100' :
          'from-teal-50 to-teal-100'
        }`}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                currentArea.color === 'green' ? 'bg-green-500' :
                currentArea.color === 'blue' ? 'bg-blue-500' :
                currentArea.color === 'purple' ? 'bg-purple-500' :
                'bg-teal-500'
              }`}>
                <currentArea.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentArea.category}</h2>
                <p className="text-gray-600">{currentArea.description}</p>
              </div>
            </div>
            <Badge className={`text-white ${
              currentArea.color === 'green' ? 'bg-green-500' :
              currentArea.color === 'blue' ? 'bg-blue-500' :
              currentArea.color === 'purple' ? 'bg-purple-500' :
              'bg-teal-500'
            }`}>
              {currentArea.weight}% Weight
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {currentArea.questions.map(question => (
              <div key={question.id}>
                {renderQuestion(question)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousArea}
              disabled={currentVisionArea === 0}
            >
              Previous Area
            </Button>

            <div className="text-sm text-gray-600">
              Vision Area {currentVisionArea + 1} of {totalAreas}
            </div>

            <Button
              onClick={handleNextArea}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!currentArea.questions.every(q => visionData[q.id])}
            >
              {currentVisionArea === totalAreas - 1 ? 'Complete Vision' : 'Next Area'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KGOB Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>Personal Vision Development by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase4PersonalVision;