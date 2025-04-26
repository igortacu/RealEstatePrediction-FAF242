import React from 'react';
import { Card } from '../ui/Card';
import { Star, ChevronRight, TrendingUp, DollarSign, PiggyBank, AlertTriangle } from 'lucide-react';

const InvestmentRecommendations: React.FC = () => {
  // Sample recommendation data
  const recommendations = [
    {
      id: 1,
      type: 'Market',
      name: 'Austin, TX',
      description: 'Strong tech sector growth is driving demand for both residential and commercial real estate.',
      growthRate: 18.4,
      riskLevel: 'Medium',
      returnPotential: 'High',
      score: 92,
      bestFor: ['Tech professionals', 'Young families', 'Growth investors'],
      insights: [
        'Tech company relocations continue to drive population growth',
        '5-year price appreciation forecast is 25-30%',
        'Rental demand remains strong with 98% occupancy rates'
      ]
    },
    {
      id: 2,
      type: 'Market',
      name: 'Raleigh, NC',
      description: 'Emerging tech hub with strong fundamentals and affordability compared to larger markets.',
      growthRate: 14.2,
      riskLevel: 'Low',
      returnPotential: 'Medium-High',
      score: 88,
      bestFor: ['First-time investors', 'Buy and hold strategy', 'Steady income investors'],
      insights: [
        'Research Triangle Park expansion adding thousands of jobs',
        'University presence provides stable rental market',
        'Housing affordability attracting millennials from expensive coastal markets'
      ]
    },
    {
      id: 3,
      type: 'Strategy',
      name: 'Multi-family Value-Add',
      description: 'Acquire underperforming multi-family properties, renovate units, and increase rents.',
      growthRate: 12.5,
      riskLevel: 'Medium',
      returnPotential: 'High',
      score: 85,
      bestFor: ['Experienced investors', 'Active managers', 'Equity builders'],
      insights: [
        'Current 20-30% rent increases possible after strategic renovations',
        'Economies of scale with property management',
        'Potential for significant appreciation after repositioning'
      ]
    },
  ];
  
  const riskLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-500/20 text-green-400';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'High':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };
  
  const returnPotentialColor = (potential: string) => {
    switch (potential) {
      case 'Low':
        return 'bg-slate-500/20 text-slate-400';
      case 'Medium':
        return 'bg-blue-500/20 text-blue-400';
      case 'Medium-High':
        return 'bg-indigo-500/20 text-indigo-400';
      case 'High':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Investment Recommendations</h1>
        <p className="mt-2 text-slate-300">
          Personalized investment recommendations based on market trends and your investment profile.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6">Your Investment Profile</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                <h4 className="font-medium text-white">Risk Tolerance</h4>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="ml-2 text-sm text-slate-300">Medium</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[250px] p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <h4 className="font-medium text-white">Investment Horizon</h4>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="ml-2 text-sm text-slate-300">Long-term</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[250px] p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center mb-2">
                <PiggyBank className="w-5 h-5 text-purple-400 mr-2" />
                <h4 className="font-medium text-white">Investment Goals</h4>
              </div>
              <p className="text-sm text-slate-300 mt-2">
                Income generation with moderate growth potential
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="p-0 overflow-hidden">
              <div className="relative">
                <div className="absolute top-6 right-6 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="text-sm font-bold text-white">{recommendation.score}</span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 mb-2">
                      {recommendation.type}
                    </span>
                    <h3 className="text-xl font-bold text-white">{recommendation.name}</h3>
                  </div>
                  
                  <p className="text-slate-300 mb-6">
                    {recommendation.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm text-slate-300">Growth Rate:</span>
                      <span className="ml-1 text-sm font-medium text-white">{recommendation.growthRate}%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-sm text-slate-300">Risk Level:</span>
                      <span className={`ml-1 text-sm font-medium px-2 py-0.5 rounded-full ${riskLevelColor(recommendation.riskLevel)}`}>
                        {recommendation.riskLevel}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-sm text-slate-300">Return Potential:</span>
                      <span className={`ml-1 text-sm font-medium px-2 py-0.5 rounded-full ${returnPotentialColor(recommendation.returnPotential)}`}>
                        {recommendation.returnPotential}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-200 mb-2">Best For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.bestFor.map((item, index) => (
                        <span 
                          key={index}
                          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 mb-2">Key Insights:</h4>
                    <ul className="space-y-2">
                      {recommendation.insights.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/50">
                  <button className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300">
                    View detailed analysis
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;