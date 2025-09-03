import React, { useState, useEffect } from 'react';
import { 
  Building, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle,
  Save,
  Download,
  ArrowRight,
  Users,
  DollarSign,
  TrendingUp,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const Phase1BusinessBaseline = ({ onComplete, savedData = {} }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState(savedData);
  const [validationErrors, setValidationErrors] = useState({});
  const [sectionProgress, setSectionProgress] = useState({});

  const assessmentSections = [
    {
      title: "Business Identity & Structure",
      weight: 10,
      icon: Building,
      color: "blue",
      description: "Legal structure, formation details, and business identity information",
      questions: [
        {
          id: "legal_name",
          label: "Legal Business Name",
          type: "text",
          required: true,
          placeholder: "ABC Corporation",
          validation: (value) => value?.length > 2 ? null : "Business name is required",
          helpText: "Enter the exact legal name as shown on formation documents"
        },
        {
          id: "dba_names",
          label: "Doing Business As (DBA) Names",
          type: "text",
          required: false,
          placeholder: "ABC Services, ABC Solutions",
          helpText: "List any DBA names or trade names you use"
        },
        {
          id: "legal_structure",
          label: "Legal Business Structure",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select structure..." },
            { value: "c-corp", label: "C Corporation" },
            { value: "s-corp", label: "S Corporation" },
            { value: "llc-multi", label: "LLC (Multi-member)" },
            { value: "llc-single", label: "LLC (Single-member)" },
            { value: "partnership-general", label: "General Partnership" },
            { value: "partnership-limited", label: "Limited Partnership" },
            { value: "sole-prop", label: "Sole Proprietorship" }
          ],
          validation: (value) => value ? null : "Please select your legal structure",
          helpText: "This affects exit options and tax implications significantly"
        },
        {
          id: "tax_id",
          label: "Federal Tax ID (EIN)",
          type: "text",
          required: true,
          placeholder: "12-3456789",
          validation: (value) => {
            if (!value) return "EIN is required";
            const einRegex = /^\d{2}-\d{7}$/;
            return einRegex.test(value) ? null : "EIN format should be XX-XXXXXXX";
          },
          helpText: "Federal Employer Identification Number"
        },
        {
          id: "state_registration",
          label: "State of Incorporation/Registration",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select state..." },
            { value: "NC", label: "North Carolina" },
            { value: "DE", label: "Delaware" },
            { value: "other", label: "Other State" }
          ],
          helpText: "State where business is legally formed"
        },
        {
          id: "formation_date",
          label: "Date Business Was Formed",
          type: "date",
          required: true,
          validation: (value) => {
            if (!value) return "Formation date is required";
            const date = new Date(value);
            const now = new Date();
            return date < now ? null : "Formation date cannot be in the future";
          },
          helpText: "Original formation/incorporation date"
        },
        {
          id: "fiscal_year_end",
          label: "Fiscal Year End Date",
          type: "date",
          required: true,
          helpText: "When does your business year end for accounting purposes?"
        }
      ]
    },
    {
      title: "Operational Metrics & Workforce",
      weight: 15,
      icon: Users,
      color: "green", 
      description: "Employee count, management structure, and operational characteristics",
      questions: [
        {
          id: "total_employees",
          label: "Total Number of Employees (including owners)",
          type: "number",
          required: true,
          min: 1,
          max: 10000,
          validation: (value) => {
            const num = parseInt(value);
            if (!num || num < 1) return "Must have at least 1 employee";
            return null;
          },
          helpText: "Include all owners, full-time, and part-time employees"
        },
        {
          id: "fulltime_employees",
          label: "Number of Full-Time Employees",
          type: "number",
          required: true,
          min: 0,
          validation: (value) => {
            const total = parseInt(formData.total_employees) || 0;
            const fullTime = parseInt(value) || 0;
            if (fullTime > total) return "Cannot exceed total employees";
            return null;
          },
          helpText: "Employees working 30+ hours per week"
        },
        {
          id: "parttime_employees",
          label: "Number of Part-Time Employees",
          type: "number", 
          required: true,
          min: 0,
          helpText: "Employees working less than 30 hours per week"
        },
        {
          id: "contractor_count",
          label: "Number of Regular Contractors/Consultants",
          type: "number",
          required: false,
          min: 0,
          helpText: "Independent contractors you use regularly"
        },
        {
          id: "management_levels",
          label: "Management Structure",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select management structure..." },
            { value: "1", label: "1 Level (Owner only)" },
            { value: "2", label: "2 Levels (Owner + Supervisors)" },
            { value: "3", label: "3 Levels (Owner + Middle Management + Supervisors)" },
            { value: "4+", label: "4+ Levels (Multiple management layers)" }
          ],
          helpText: "Number of management levels in your organization"
        },
        {
          id: "locations_count",
          label: "Number of Business Locations",
          type: "number",
          required: true,
          min: 1,
          helpText: "Total number of facilities or locations you operate"
        }
      ]
    },
    {
      title: "Financial Performance Analysis",
      weight: 25,
      icon: DollarSign,
      color: "purple",
      description: "Revenue, profitability, and financial performance metrics",
      questions: [
        {
          id: "annual_revenue",
          label: "Annual Revenue (Most Recent Complete Year)",
          type: "currency",
          required: true,
          placeholder: "2500000",
          validation: (value) => {
            const num = parseFloat(value?.replace(/[,$]/g, ''));
            if (!num || num <= 0) return "Annual revenue is required and must be positive";
            return null;
          },
          helpText: "Total revenue from most recent complete fiscal year"
        },
        {
          id: "revenue_trend",
          label: "Revenue Trend Over Past 3 Years",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select trend..." },
            { value: "growth-high", label: "Consistent growth >15% annually" },
            { value: "growth-moderate", label: "Moderate growth 5-15% annually" },
            { value: "stable", label: "Stable revenue +/- 5%" },
            { value: "declining-minor", label: "Minor decline 5-15%" },
            { value: "declining-major", label: "Significant decline >15%" }
          ],
          helpText: "Overall revenue trend over the past 3 years"
        },
        {
          id: "gross_profit_margin",
          label: "Gross Profit Margin (%)",
          type: "percentage",
          required: true,
          placeholder: "35",
          validation: (value) => {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0 || num > 100) return "Must be between 0% and 100%";
            return null;
          },
          helpText: "Gross profit as percentage of revenue"
        },
        {
          id: "net_profit_margin", 
          label: "Net Profit Margin (%)",
          type: "percentage",
          required: true,
          placeholder: "12",
          validation: (value) => {
            const grossMargin = parseFloat(formData.gross_profit_margin) || 0;
            const netMargin = parseFloat(value) || 0;
            if (netMargin > grossMargin) return "Net margin cannot exceed gross margin";
            if (netMargin < 0 || netMargin > 100) return "Must be between 0% and 100%";
            return null;
          },
          helpText: "Net profit as percentage of revenue"
        },
        {
          id: "ebitda_amount",
          label: "EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)",
          type: "currency",
          required: true,
          placeholder: "500000",
          validation: (value) => {
            const num = parseFloat(value?.replace(/[,$]/g, ''));
            if (isNaN(num)) return "EBITDA amount is required";
            return null;
          },
          helpText: "Primary metric used for business valuation"
        },
        {
          id: "working_capital",
          label: "Working Capital Requirements",
          type: "currency",
          required: true,
          placeholder: "200000",
          helpText: "Cash needed to support day-to-day operations"
        },
        {
          id: "capex_annual",
          label: "Annual Capital Expenditure Requirements",
          type: "currency", 
          required: true,
          placeholder: "100000",
          helpText: "Typical annual investment in equipment, facilities, technology"
        },
        {
          id: "debt_total",
          label: "Total Business Debt",
          type: "currency",
          required: true,
          helpText: "All business loans, lines of credit, and debt obligations"
        }
      ]
    },
    {
      title: "Market Position & Strategy",
      weight: 15,
      icon: TrendingUp,
      color: "teal",
      description: "Market position, competitive advantages, and growth opportunities",
      questions: [
        {
          id: "industry_classification",
          label: "Primary Industry (NAICS Code if known)",
          type: "text",
          required: true,
          placeholder: "Professional Services, Manufacturing, Retail, etc.",
          helpText: "This helps determine appropriate valuation multiples"
        },
        {
          id: "market_position",
          label: "Market Position Description",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select market position..." },
            { value: "leader", label: "Market leader in our area" },
            { value: "strong", label: "Strong competitor with significant market share" },
            { value: "established", label: "Established player with stable position" },
            { value: "growing", label: "Growing entrant gaining market share" },
            { value: "niche", label: "Niche specialist with focused market" }
          ],
          helpText: "How would you describe your competitive position?"
        },
        {
          id: "competitive_advantages",
          label: "Key Competitive Advantages",
          type: "multiselect",
          required: true,
          options: [
            { value: "technology", label: "Proprietary technology/processes" },
            { value: "relationships", label: "Exclusive supplier/vendor relationships" },
            { value: "brand", label: "Strong brand recognition" },
            { value: "geographic", label: "Geographic market dominance" },
            { value: "customers", label: "Customer loyalty/long-term relationships" },
            { value: "cost", label: "Cost advantages" },
            { value: "regulatory", label: "Regulatory advantages/licenses" },
            { value: "workforce", label: "Skilled/specialized workforce" },
            { value: "unique", label: "Unique market position" }
          ],
          helpText: "Select all competitive advantages that apply"
        },
        {
          id: "growth_opportunities",
          label: "Primary Growth Opportunities",
          type: "multiselect",
          required: false,
          options: [
            { value: "geographic", label: "Geographic expansion" },
            { value: "products", label: "New product/service lines" },
            { value: "market-share", label: "Market share growth" },
            { value: "acquisition", label: "Acquisition opportunities" },
            { value: "technology", label: "Technology advancement" },
            { value: "efficiency", label: "Operational efficiency improvements" },
            { value: "partnerships", label: "Strategic partnerships" },
            { value: "digital", label: "E-commerce/digital transformation" }
          ],
          helpText: "Select your most promising growth opportunities"
        }
      ]
    },
    {
      title: "Ownership & Exit Preferences",
      weight: 15,
      icon: Target,
      color: "orange",
      description: "Ownership structure, exit strategy preferences, and timeline",
      questions: [
        {
          id: "ownership_percentage",
          label: "Your Ownership Percentage",
          type: "percentage",
          required: true,
          placeholder: "100",
          validation: (value) => {
            const num = parseFloat(value);
            if (isNaN(num) || num <= 0 || num > 100) return "Must be between 0% and 100%";
            return null;
          },
          helpText: "Your current ownership percentage in the business"
        },
        {
          id: "other_owners_exist",
          label: "Are there other owners?",
          type: "yesno",
          required: true,
          followUp: {
            condition: "yes",
            questions: [
              {
                id: "other_owners_details",
                label: "Other Owners Details",
                type: "textarea",
                placeholder: "John Smith - 25% (COO), Mary Jones - 15% (CFO)",
                helpText: "List other owners, their ownership percentages, and roles"
              }
            ]
          }
        },
        {
          id: "buy_sell_agreement",
          label: "Current Buy-Sell Agreement",
          type: "yesno",
          required: true,
          criticalFlag: true,
          helpText: "Existing agreement governing ownership transfers"
        },
        {
          id: "preferred_exit_method",
          label: "Preferred Exit Method",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select exit method..." },
            { value: "family", label: "Sale to family member" },
            { value: "employees", label: "Sale to employees (ESOP/Management buyout)" },
            { value: "strategic", label: "Sale to strategic buyer (competitor/industry player)" },
            { value: "financial", label: "Sale to financial buyer (private equity)" },
            { value: "merger", label: "Merger with another company" },
            { value: "ipo", label: "Initial public offering (IPO)" },
            { value: "liquidation", label: "Liquidation of assets" },
            { value: "unsure", label: "Not sure yet - need guidance" }
          ],
          helpText: "Your current preferred exit strategy"
        },
        {
          id: "exit_timeline",
          label: "Planned Exit Timeline",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select timeline..." },
            { value: "immediate", label: "Within 1-2 years" },
            { value: "short", label: "2-5 years" },
            { value: "medium", label: "5-10 years" },
            { value: "long", label: "10+ years" },
            { value: "flexible", label: "No specific timeline - flexible" }
          ],
          helpText: "When do you plan to exit the business?"
        },
        {
          id: "exit_goals",
          label: "Primary Exit Goals",
          type: "multiselect",
          required: true,
          options: [
            { value: "maximize", label: "Maximize sale proceeds" },
            { value: "continuity", label: "Ensure business continuity" },
            { value: "employees", label: "Protect employee jobs" },
            { value: "family", label: "Maintain family control" },
            { value: "taxes", label: "Minimize tax impact" },
            { value: "quick", label: "Quick/easy transaction" },
            { value: "culture", label: "Maintain company culture" },
            { value: "freedom", label: "Personal freedom/retirement" }
          ],
          helpText: "Select all important goals for your exit"
        }
      ]
    }
  ];

  const currentSectionData = assessmentSections[currentSection];
  const totalSections = assessmentSections.length;
  const overallProgress = Math.round(((currentSection + (sectionProgress[currentSection] || 0)) / totalSections) * 100);

  const handleInputChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[questionId]) {
      setValidationErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  const validateCurrentSection = () => {
    const errors = {};
    let hasErrors = false;

    currentSectionData.questions.forEach(question => {
      if (question.required) {
        const value = formData[question.id];
        const error = question.validation?.(value) || (!value ? `${question.label} is required` : null);
        if (error) {
          errors[question.id] = error;
          hasErrors = true;
        }
      }
    });

    setValidationErrors(errors);
    return !hasErrors;
  };

  const handleNextSection = () => {
    if (validateCurrentSection()) {
      if (currentSection < totalSections - 1) {
        setSectionProgress(prev => ({
          ...prev,
          [currentSection]: 100
        }));
        setCurrentSection(currentSection + 1);
      } else {
        // Assessment complete
        setSectionProgress(prev => ({
          ...prev,
          [currentSection]: 100
        }));
        onComplete?.(formData);
      }
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderQuestion = (question) => {
    const value = formData[question.id] || '';
    const error = validationErrors[question.id];

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
              {question.criticalFlag && <AlertTriangle className="w-4 h-4 text-orange-500" />}
            </Label>
            <Input
              id={question.id}
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className={error ? 'border-red-300' : ''}
            />
            {question.helpText && (
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <HelpCircle className="w-3 h-3" />
                <span>{question.helpText}</span>
              </p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'currency':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id={question.id}
                value={value}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^\d]/g, '');
                  handleInputChange(question.id, numericValue);
                }}
                placeholder={question.placeholder}
                className={`pl-8 ${error ? 'border-red-300' : ''}`}
              />
            </div>
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={question.id}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              min={question.min}
              max={question.max}
              className={error ? 'border-red-300' : ''}
            />
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'percentage':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={question.id}
                type="number"
                value={value}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                min="0"
                max="100"
                className={`pr-8 ${error ? 'border-red-300' : ''}`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <select
              id={question.id}
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`w-full p-2 border rounded-md ${error ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            >
              {question.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div key={question.id} className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
              {question.options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? value : [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      handleInputChange(question.id, newValues);
                    }}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case 'yesno':
        return (
          <div key={question.id} className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>{question.label}</span>
              {question.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value="yes"
                  checked={value === 'yes'}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="text-blue-600"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value="no"
                  checked={value === 'no'}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="text-blue-600"
                />
                <span>No</span>
              </label>
            </div>
            {question.helpText && (
              <p className="text-xs text-gray-500">{question.helpText}</p>
            )}
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Business Baseline Assessment</h2>
              <p className="text-gray-600">Section {currentSection + 1} of {totalSections}: {currentSectionData.title}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card>
        <CardHeader className={`bg-gradient-to-r from-${currentSectionData.color}-50 to-${currentSectionData.color}-100`}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${currentSectionData.color}-500 rounded-lg flex items-center justify-center`}>
                <currentSectionData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{currentSectionData.title}</h3>
                <p className="text-sm text-gray-600">{currentSectionData.description}</p>
              </div>
            </div>
            <Badge className={`bg-${currentSectionData.color}-500 text-white`}>
              {currentSectionData.weight}% Weight
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6">
            {currentSectionData.questions.map(question => renderQuestion(question))}
            
            {/* Follow-up questions */}
            {currentSectionData.questions.map(question => {
              if (question.followUp && formData[question.id] === question.followUp.condition) {
                return question.followUp.questions.map(followUpQ => renderQuestion({
                  ...followUpQ,
                  id: `${question.id}_${followUpQ.id}`
                }));
              }
              return null;
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                Previous Section
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  // Auto-save functionality
                  console.log('Auto-saving data...', formData);
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Section {currentSection + 1} of {totalSections}
              </div>
              <Button
                onClick={handleNextSection}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentSection === totalSections - 1 ? 'Complete Assessment' : 'Next Section'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KGOB Professional Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/kgob-logo.png"
                alt="KGOB Logo"
                className="h-8 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="text-sm">
                <div className="font-semibold">Kohari Gonzalez CPAs & Advisors</div>
                <div className="text-gray-400">Professional Exit Planning Services</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div>2740 East WT Harris Blvd, Suite 200</div>
              <div>Charlotte, NC 28213 | 1-844-599-3355</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase1BusinessBaseline;