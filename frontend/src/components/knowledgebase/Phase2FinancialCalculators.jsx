import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const Phase2FinancialCalculators = ({ userTier }) => {
  const [activeCalculator, setActiveCalculator] = useState('cashflow');
  const [cashFlowData, setCashFlowData] = useState({});
  const [wealthGapData, setWealthGapData] = useState({});
  const [results, setResults] = useState({});

  // Cash Flow Normalization Calculator (Based on Excel tool)
  const renderCashFlowCalculator = () => {
    const [inputs, setInputs] = useState({
      // Base Financial Data
      netIncome: '',
      depreciation: '',
      interestExpense: '',
      
      // Owner-Specific Adjustments (Add-backs)
      ownerSalaryExcess: '',
      ownerBonusesDiscretionary: '', 
      ownerBenefitsExcess: '',
      personalExpensesAuto: '',
      personalExpensesTravel: '',
      personalExpensesOther: '',
      familySalaryExcess: '',
      familyBenefitsExcess: '',
      
      // Replacement Costs (Deductions)
      managementReplacement: '',
      additionalBenefits: '',
      additionalInsurance: ''
    });

    const calculateNormalizedCashFlow = () => {
      const base = parseFloat(inputs.netIncome?.replace(/[,$]/g, '')) || 0;
      const depreciation = parseFloat(inputs.depreciation?.replace(/[,$]/g, '')) || 0;
      const interest = parseFloat(inputs.interestExpense?.replace(/[,$]/g, '')) || 0;
      
      // Add-backs
      const ownerAdjustments = [
        'ownerSalaryExcess', 'ownerBonusesDiscretionary', 'ownerBenefitsExcess',
        'personalExpensesAuto', 'personalExpensesTravel', 'personalExpensesOther',
        'familySalaryExcess', 'familyBenefitsExcess'
      ].reduce((sum, field) => sum + (parseFloat(inputs[field]?.replace(/[,$]/g, '')) || 0), 0);
      
      // Deductions 
      const replacementCosts = [
        'managementReplacement', 'additionalBenefits', 'additionalInsurance'
      ].reduce((sum, field) => sum + (parseFloat(inputs[field]?.replace(/[,$]/g, '')) || 0), 0);
      
      const adjustedCashFlow = base + depreciation + interest + ownerAdjustments - replacementCosts;
      const adjustmentPercentage = base > 0 ? ((adjustedCashFlow - base) / base) * 100 : 0;
      
      return {
        baseNetIncome: base,
        totalAddBacks: depreciation + interest + ownerAdjustments,
        totalDeductions: replacementCosts,
        adjustedCashFlow: Math.max(0, adjustedCashFlow),
        adjustmentPercentage: Math.round(adjustmentPercentage),
        qualityScore: calculateCashFlowQuality(adjustedCashFlow, base, ownerAdjustments, replacementCosts)
      };
    };

    const calculateCashFlowQuality = (adjusted, base, addBacks, deductions) => {
      if (base <= 0) return 0;
      
      const adjustmentRatio = Math.abs(addBacks - deductions) / base;
      if (adjustmentRatio < 0.1) return 95; // Excellent - minimal adjustments
      if (adjustmentRatio < 0.2) return 85; // Good - moderate adjustments  
      if (adjustmentRatio < 0.4) return 70; // Average - significant adjustments
      if (adjustmentRatio < 0.6) return 55; // Concerning - major adjustments
      return 40; // Poor - extreme adjustments
    };

    const cashFlowResults = calculateNormalizedCashFlow();

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-green-600" />
              <span>Professional Cash Flow Normalization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Financial Inputs</h3>
                
                {/* Base Financial Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Base Financial Information</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="netIncome">Net Income (from tax return)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="netIncome"
                          value={inputs.netIncome}
                          onChange={(e) => setInputs(prev => ({ ...prev, netIncome: e.target.value }))}
                          placeholder="250,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Bottom line net income from most recent tax return</p>
                    </div>

                    <div>
                      <Label htmlFor="depreciation">Depreciation & Amortization</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="depreciation"
                          value={inputs.depreciation}
                          onChange={(e) => setInputs(prev => ({ ...prev, depreciation: e.target.value }))}
                          placeholder="45,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Add back non-cash depreciation and amortization</p>
                    </div>

                    <div>
                      <Label htmlFor="interestExpense">Interest Expense</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="interestExpense"
                          value={inputs.interestExpense}
                          onChange={(e) => setInputs(prev => ({ ...prev, interestExpense: e.target.value }))}
                          placeholder="25,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Interest that may not transfer to new owner</p>
                    </div>
                  </div>
                </div>

                {/* Owner-Specific Adjustments */}
                <div className="space-y-4">
                  <h4 className="font-medium text-green-700">Owner-Specific Add-backs</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="ownerSalaryExcess">Excess Owner Compensation</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="ownerSalaryExcess"
                          value={inputs.ownerSalaryExcess}
                          onChange={(e) => setInputs(prev => ({ ...prev, ownerSalaryExcess: e.target.value }))}
                          placeholder="75,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-green-600">Amount above market rate for your position</p>
                    </div>

                    <div>
                      <Label htmlFor="personalExpensesAuto">Personal Vehicle Expenses</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="personalExpensesAuto"
                          value={inputs.personalExpensesAuto}
                          onChange={(e) => setInputs(prev => ({ ...prev, personalExpensesAuto: e.target.value }))}
                          placeholder="15,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-green-600">Personal use portion of company vehicles</p>
                    </div>

                    <div>
                      <Label htmlFor="personalExpensesOther">Other Personal Expenses</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="personalExpensesOther"
                          value={inputs.personalExpensesOther}
                          onChange={(e) => setInputs(prev => ({ ...prev, personalExpensesOther: e.target.value }))}
                          placeholder="20,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-green-600">Travel, entertainment, meals, etc.</p>
                    </div>
                  </div>
                </div>

                {/* Replacement Costs */}
                <div className="space-y-4">
                  <h4 className="font-medium text-red-700">Replacement Costs (Deductions)</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="managementReplacement">Management Replacement Cost</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="managementReplacement"
                          value={inputs.managementReplacement}
                          onChange={(e) => setInputs(prev => ({ ...prev, managementReplacement: e.target.value }))}
                          placeholder="85,000"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-red-600">Market rate salary to replace your functions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 text-center">Normalized Cash Flow Analysis</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Base Net Income:</span>
                      <span className="font-bold text-gray-900">${cashFlowResults.baseNetIncome.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Total Add-backs:</span>
                      <span className="font-bold text-green-800">+${cashFlowResults.totalAddBacks.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-700">Replacement Costs:</span>
                      <span className="font-bold text-red-800">-${cashFlowResults.totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-blue-900">Adjusted Cash Flow:</span>
                      <span className="text-2xl font-bold text-blue-900">${cashFlowResults.adjustedCashFlow.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      {cashFlowResults.adjustmentPercentage > 0 ? '+' : ''}{cashFlowResults.adjustmentPercentage}% vs. reported income
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border-2 ${
                    cashFlowResults.qualityScore >= 85 ? 'bg-green-50 border-green-300' :
                    cashFlowResults.qualityScore >= 70 ? 'bg-yellow-50 border-yellow-300' :
                    'bg-red-50 border-red-300'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Cash Flow Quality Score:</span>
                      <span className={`text-xl font-bold ${
                        cashFlowResults.qualityScore >= 85 ? 'text-green-600' :
                        cashFlowResults.qualityScore >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {cashFlowResults.qualityScore}/100
                      </span>
                    </div>
                    <p className="text-sm">
                      {cashFlowResults.qualityScore >= 85 && "Excellent - Minimal adjustments show clean financials"}
                      {cashFlowResults.qualityScore >= 70 && cashFlowResults.qualityScore < 85 && "Good - Moderate adjustments are typical"}
                      {cashFlowResults.qualityScore < 70 && "Needs improvement - High adjustments may concern buyers"}
                    </p>
                  </div>
                </div>

                {/* Valuation Estimate */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Estimated Business Value Range</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-purple-600">
                        ${(cashFlowResults.adjustedCashFlow * 2.5).toLocaleString()}
                      </div>
                      <div className="text-purple-700">Conservative (2.5x)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">
                        ${(cashFlowResults.adjustedCashFlow * 3.5).toLocaleString()}
                      </div>
                      <div className="text-purple-700">Typical (3.5x)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">
                        ${(cashFlowResults.adjustedCashFlow * 4.5).toLocaleString()}
                      </div>
                      <div className="text-purple-700">Optimistic (4.5x)</div>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    *Actual multiples depend on industry, size, growth, and risk factors
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Recommendations */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Professional Analysis & Recommendations</h4>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Cash Flow Strengths:</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• {cashFlowResults.adjustedCashFlow > cashFlowResults.baseNetIncome ? 'Positive adjustments increase value' : 'Clean reported earnings'}</li>
                      <li>• {cashFlowResults.qualityScore >= 85 ? 'High-quality earnings' : 'Reasonable earnings quality'}</li>
                      <li>• Professional normalization completed</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Improvement Opportunities:</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• {cashFlowResults.adjustmentPercentage > 30 ? 'Reduce owner-specific adjustments' : 'Optimize operational efficiency'}</li>
                      <li>• Document all adjustment justifications</li>
                      <li>• Prepare detailed normalization analysis for buyers</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Comprehensive Wealth Gap Calculator
  const renderWealthGapCalculator = () => {
    const [inputs, setInputs] = useState({
      // Current Financial Position
      currentAnnualIncome: '',
      desiredAnnualIncome: '',
      
      // Current Assets
      retirementAccounts: '',
      investmentAccounts: '', 
      realEstateEquity: '',
      cashSavings: '',
      otherAssets: '',
      
      // Current Debts
      totalPersonalDebt: '',
      
      // Post-Exit Lifestyle
      housingExpenses: '',
      lifestyleExpenses: '',
      healthcareExpenses: '',
      travelRecreation: '',
      familySupport: '',
      charitableGiving: '',
      contingencyBuffer: '',
      
      // Business Information
      estimatedBusinessValue: '',
      timeToExit: ''
    });

    const calculateWealthGap = () => {
      // Calculate total asset needs
      const desiredIncome = parseFloat(inputs.desiredAnnualIncome?.replace(/[,$]/g, '')) || 0;
      const totalExpenses = [
        'housingExpenses', 'lifestyleExpenses', 'healthcareExpenses', 
        'travelRecreation', 'familySupport', 'charitableGiving', 'contingencyBuffer'
      ].reduce((sum, field) => sum + (parseFloat(inputs[field]?.replace(/[,$]/g, '')) || 0), 0);
      
      const annualNeeds = Math.max(desiredIncome, totalExpenses);
      
      // Calculate assets available
      const currentAssets = [
        'retirementAccounts', 'investmentAccounts', 'realEstateEquity', 
        'cashSavings', 'otherAssets'
      ].reduce((sum, field) => sum + (parseFloat(inputs[field]?.replace(/[,$]/g, '')) || 0), 0);
      
      const businessValue = parseFloat(inputs.estimatedBusinessValue?.replace(/[,$]/g, '')) || 0;
      const totalDebt = parseFloat(inputs.totalPersonalDebt?.replace(/[,$]/g, '')) || 0;
      
      const netAssets = currentAssets - totalDebt;
      const totalAvailableAssets = netAssets + businessValue;
      
      // Multiple withdrawal rate scenarios
      const scenarios = [
        { name: "Conservative (4%)", rate: 0.04, riskLevel: "Low Risk" },
        { name: "Balanced (5%)", rate: 0.05, riskLevel: "Moderate Risk" },
        { name: "Growth (6%)", rate: 0.06, riskLevel: "Higher Risk" }
      ];
      
      const results = scenarios.map(scenario => {
        const capitalNeeded = annualNeeds / scenario.rate;
        const wealthGap = Math.max(0, capitalNeeded - totalAvailableAssets);
        const surplus = Math.max(0, totalAvailableAssets - capitalNeeded);
        const yearsOfSecurity = totalAvailableAssets > 0 ? totalAvailableAssets / annualNeeds : 0;
        
        return {
          ...scenario,
          capitalNeeded,
          wealthGap,
          surplus,
          yearsOfSecurity,
          hasGap: wealthGap > 0,
          adequacyRatio: capitalNeeded > 0 ? totalAvailableAssets / capitalNeeded : 0
        };
      });
      
      return {
        annualNeeds,
        currentAssets: netAssets,
        businessValue,
        totalAvailableAssets,
        scenarios: results
      };
    };

    const wealthGapResults = calculateWealthGap();
    const bestScenario = wealthGapResults.scenarios.find(s => !s.hasGap) || wealthGapResults.scenarios[0];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Comprehensive Wealth Gap Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Current Position */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Current Financial Position</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Current Annual Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.currentAnnualIncome}
                        onChange={(e) => setInputs(prev => ({ ...prev, currentAnnualIncome: e.target.value }))}
                        placeholder="200,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Retirement Accounts</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.retirementAccounts}
                        onChange={(e) => setInputs(prev => ({ ...prev, retirementAccounts: e.target.value }))}
                        placeholder="500,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Investment Accounts</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.investmentAccounts}
                        onChange={(e) => setInputs(prev => ({ ...prev, investmentAccounts: e.target.value }))}
                        placeholder="300,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Real Estate Equity</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.realEstateEquity}
                        onChange={(e) => setInputs(prev => ({ ...prev, realEstateEquity: e.target.value }))}
                        placeholder="400,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Total Personal Debt</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.totalPersonalDebt}
                        onChange={(e) => setInputs(prev => ({ ...prev, totalPersonalDebt: e.target.value }))}
                        placeholder="150,000"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Post-Exit Planning */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Post-Exit Financial Needs</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Desired Annual Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.desiredAnnualIncome}
                        onChange={(e) => setInputs(prev => ({ ...prev, desiredAnnualIncome: e.target.value }))}
                        placeholder="150,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Housing Expenses</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.housingExpenses}
                        onChange={(e) => setInputs(prev => ({ ...prev, housingExpenses: e.target.value }))}
                        placeholder="36,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Healthcare & Insurance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.healthcareExpenses}
                        onChange={(e) => setInputs(prev => ({ ...prev, healthcareExpenses: e.target.value }))}
                        placeholder="18,000"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Estimated Business Value</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        value={inputs.estimatedBusinessValue}
                        onChange={(e) => setInputs(prev => ({ ...prev, estimatedBusinessValue: e.target.value }))}
                        placeholder="3,000,000"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Multi-Scenario Analysis</h3>
                {wealthGapResults.scenarios.map((scenario, index) => (
                  <div key={index} className={`rounded-lg p-4 border-2 ${
                    !scenario.hasGap ? 'bg-green-50 border-green-300' : 
                    scenario.adequacyRatio > 0.8 ? 'bg-yellow-50 border-yellow-300' :
                    'bg-red-50 border-red-300'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">{scenario.name}</span>
                      <Badge className={
                        !scenario.hasGap ? 'bg-green-100 text-green-700' :
                        scenario.adequacyRatio > 0.8 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {scenario.riskLevel}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Capital needed:</span>
                        <span className="font-medium">${scenario.capitalNeeded.toLocaleString()}</span>
                      </div>
                      {scenario.hasGap ? (
                        <div className="flex justify-between text-red-700">
                          <span>Wealth gap:</span>
                          <span className="font-bold">-${scenario.wealthGap.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between text-green-700">
                          <span>Surplus:</span>
                          <span className="font-bold">${scenario.surplus.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Years of security:</span>
                        <span className="font-medium">{Math.round(scenario.yearsOfSecurity)} years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <Card className="bg-teal-50 border-teal-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-teal-900 mb-4">Strategic Recommendations</h4>
                {bestScenario.hasGap ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4 border border-teal-200">
                      <h5 className="font-medium text-teal-800 mb-2">Priority Actions to Close Gap:</h5>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Increase business value through operational improvements</li>
                        <li>• Consider extending exit timeline for more growth</li>
                        <li>• Explore seller financing or earnout structures</li>
                        <li>• Review and potentially reduce post-exit expenses</li>
                        <li>• Consider partial exit vs. complete sale</li>
                      </ul>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 w-full">
                      Schedule Gap Analysis Consultation
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4 border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Excellent Financial Position:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Your projected assets support desired lifestyle</li>
                        <li>• Focus on optimizing exit timing and structure</li>
                        <li>• Consider tax optimization strategies</li>
                        <li>• Plan for investment management post-exit</li>
                      </ul>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 w-full">
                      Schedule Optimization Consultation  
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Phase 2: Financial Readiness Analysis</h1>
              <p className="text-xl opacity-90">Advanced Calculators & Financial Modeling</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-80">Professional Tools</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Navigation */}
      <Tabs value={activeCalculator} onValueChange={setActiveCalculator}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cashflow">Cash Flow Normalization</TabsTrigger>
          <TabsTrigger value="wealthgap">Wealth Gap Analysis</TabsTrigger>
          <TabsTrigger value="feasibility">Exit Feasibility</TabsTrigger>
        </TabsList>

        <TabsContent value="cashflow">
          {renderCashFlowCalculator()}
        </TabsContent>

        <TabsContent value="wealthgap">
          {renderWealthGapCalculator()}
        </TabsContent>

        <TabsContent value="feasibility">
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Exit Feasibility Analysis</h3>
              <p className="text-gray-600 mb-6">
                Advanced timing and feasibility analysis tool coming soon...
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Schedule Feasibility Consultation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* KGOB Contact Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>Professional Financial Analysis by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213</div>
            <div>Phone: 1-844-599-3355 | Email: support@kgob.cpa</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase2FinancialCalculators;