import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  DollarSign, 
  TrendingUp, 
  User,
  CheckSquare,
  Calculator,
  FileText,
  Award,
  ArrowRight,
  Clock,
  Star,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EnhancedPhase1 from './EnhancedPhase1';
import Phase2FinancialCalculators from './Phase2FinancialCalculators';
import Phase3OwnerCentricity from './Phase3OwnerCentricity';
import Phase4PersonalVision from './Phase4PersonalVision';
import Phase5ActionPlanning from './Phase5ActionPlanning';

const ExitPlanningCenter = ({ userTier }) => {
  const [activePhase, setActivePhase] = useState(1);
  const [activeModule, setActiveModule] = useState('overview');
  const [userProgress, setUserProgress] = useState({});
  const [completedAssessments, setCompletedAssessments] = useState({});

  const phases = [
    {
      id: 1,
      title: "Foundation & Discovery",
      subtitle: "Stakeholder Mapping & Business Baseline",
      icon: Users,
      color: "blue",
      duration: "90-120 min",
      status: completedAssessments.phase1 ? 'completed' : 'available',
      tools: ["47-Point Business Assessment", "Stakeholder Impact Analysis", "Documentation System"],
      outcomes: ["Complete business profile", "Stakeholder risk map", "Documentation roadmap"]
    },
    {
      id: 2, 
      title: "Financial Readiness",
      subtitle: "Cash Flow Analysis & Wealth Gap Calculation", 
      icon: DollarSign,
      color: "green",
      duration: "90-120 min",
      status: completedAssessments.phase2 ? 'completed' : (completedAssessments.phase1 ? 'available' : 'locked'),
      tools: ["Cash Flow Normalization", "Wealth Gap Calculator", "Exit Feasibility Analysis"],
      outcomes: ["Normalized cash flow", "Precise wealth gap", "Financial readiness score"]
    },
    {
      id: 3,
      title: "Business Readiness",
      subtitle: "Owner Centricity & Management Assessment",
      icon: TrendingUp,
      color: "purple", 
      duration: "90-120 min",
      status: completedAssessments.phase3 ? 'completed' : (completedAssessments.phase2 ? 'available' : 'locked'),
      tools: ["Owner Centricity Assessment", "Management Depth Analysis", "Value Enhancement Planning"],
      outcomes: ["Owner dependency score", "Management gaps", "Value improvement plan"]
    },
    {
      id: 4,
      title: "Personal Readiness", 
      subtitle: "Vision Development & Identity Planning",
      icon: User,
      color: "teal",
      duration: "90-120 min", 
      status: completedAssessments.phase4 ? 'completed' : (completedAssessments.phase3 ? 'available' : 'locked'),
      tools: ["Personal Vision Builder", "Identity Transition Planner", "Lifestyle Designer"],
      outcomes: ["Personal vision", "Identity plan", "Lifestyle blueprint"]
    },
    {
      id: 5,
      title: "Action Planning",
      subtitle: "Implementation Strategy & Timeline",
      icon: Target,
      color: "orange",
      duration: "90-120 min",
      status: completedAssessments.phase5 ? 'completed' : (completedAssessments.phase4 ? 'available' : 'locked'),
      tools: ["SMART Goals Generator", "Priority Matrix", "Implementation Tracker"],
      outcomes: ["Action plan", "SMART goals", "Timeline"]
    }
  ];

  const renderPhaseNavigation = () => {
    return (
      <div className="grid grid-cols-5 gap-4 mb-8">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          const isCompleted = phase.status === 'completed';
          const isLocked = phase.status === 'locked';
          const progress = userProgress[phase.id] || (isCompleted ? 100 : 0);
          
          return (
            <Card 
              key={phase.id}
              className={`cursor-pointer transition-all duration-300 ${
                isLocked ? 'opacity-50 cursor-not-allowed' :
                isActive ? (
                  phase.color === 'blue' ? 'ring-2 ring-blue-500 shadow-lg scale-105' :
                  phase.color === 'green' ? 'ring-2 ring-green-500 shadow-lg scale-105' :
                  phase.color === 'purple' ? 'ring-2 ring-purple-500 shadow-lg scale-105' :
                  phase.color === 'teal' ? 'ring-2 ring-teal-500 shadow-lg scale-105' :
                  phase.color === 'orange' ? 'ring-2 ring-orange-500 shadow-lg scale-105' :
                  'ring-2 ring-blue-500 shadow-lg scale-105'
                ) : 'hover:shadow-md hover:scale-102'
              }`}
              onClick={() => !isLocked && setActivePhase(phase.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  isCompleted ? 'bg-green-500 text-white' : 
                  isLocked ? 'bg-gray-300 text-gray-500' :
                  isActive ? (
                    phase.color === 'blue' ? 'bg-blue-500 text-white' :
                    phase.color === 'green' ? 'bg-green-500 text-white' :
                    phase.color === 'purple' ? 'bg-purple-500 text-white' :
                    phase.color === 'teal' ? 'bg-teal-500 text-white' :
                    phase.color === 'orange' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  ) : (
                    phase.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    phase.color === 'green' ? 'bg-green-100 text-green-600' :
                    phase.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    phase.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    phase.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  )
                }`}>
                  {isCompleted ? <CheckSquare className="w-8 h-8" /> : 
                   isLocked ? <Star className="w-8 h-8" /> : 
                   <Icon className="w-8 h-8" />}
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Phase {phase.id}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {phase.subtitle}
                  </p>
                  <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{phase.duration}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {isCompleted ? 'Completed' : isLocked ? 'Locked' : `${progress}% Done`}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const handlePhaseCompletion = (phaseId, data) => {
    setCompletedAssessments(prev => ({
      ...prev,
      [`phase${phaseId}`]: data
    }));
    setUserProgress(prev => ({
      ...prev,
      [phaseId]: 100
    }));
    
    // Auto-advance to next phase
    if (phaseId < 5) {
      setActivePhase(phaseId + 1);
    }
  };

  const renderPhaseContent = () => {
    const currentPhase = phases.find(p => p.id === activePhase);
    
    if (currentPhase?.status === 'locked') {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Complete Previous Phases to Unlock
            </h3>
            <p className="text-gray-600">
              You must complete Phase {activePhase - 1} before accessing this content.
            </p>
          </CardContent>
        </Card>
      );
    }

    switch(activePhase) {
      case 1:
        return <EnhancedPhase1 onComplete={(data) => handlePhaseCompletion(1, data)} savedData={completedAssessments.phase1} />;
      case 2:
        return <Phase2FinancialCalculators userTier={userTier} />;
      case 3:
        return <Phase3OwnerCentricity onComplete={(data) => handlePhaseCompletion(3, data)} savedData={completedAssessments.phase3} />;
      case 4:
        return <Phase4PersonalVision onComplete={(data) => handlePhaseCompletion(4, data)} savedData={completedAssessments.phase4} />;
      case 5:
        return <Phase5ActionPlanning onComplete={(data) => handlePhaseCompletion(5, data)} savedData={completedAssessments.phase5} />;
      default:
        return <div>Loading phase content...</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* KGOB Professional Header */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden relative">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="/kgob-logo.png"
                  alt="KGOB Logo"
                  className="h-12 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <div>
                  <h1 className="text-3xl font-bold">Professional Exit Planning System</h1>
                  <p className="text-gray-300">5-Phase Comprehensive Methodology for Business Transitions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-6 max-w-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">47</div>
                  <div className="text-sm text-gray-300">Assessment Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">12</div>
                  <div className="text-sm text-gray-300">Interactive Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$2.3M</div>
                  <div className="text-sm text-gray-300">Avg. Transaction</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <div className="text-sm text-gray-400">
              2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | Phone: 1-844-599-3355 | support@kgob.cpa
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Navigation */}
      {renderPhaseNavigation()}

      {/* Main Content Area */}
      {renderPhaseContent()}

      {/* Professional CTA */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Professional Exit Planning?</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Schedule a consultation with our certified exit planning advisors to get started with this proven methodology.
          </p>
          <Button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Schedule Your Initial Consultation
          </Button>
          <p className="text-sm opacity-80 mt-3">
            Initial consultation includes preliminary assessment and personalized strategy recommendations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitPlanningCenter;