import React, { useState } from 'react';
import DashboardSidebar, { DashboardTab } from '../components/dashboard/DashboardSidebar';
import MortgageCalculator from '../components/dashboard/MortgageCalculator';
import InvestmentAnalysis from '../components/dashboard/InvestmentAnalysis';
import PriceTrends from '../components/dashboard/PriceTrends';
import PropertyComparison from '../components/dashboard/PropertyComparison';
import RepaymentCalculator from '../components/dashboard/RepaymentCalculator';
import InvestmentRecommendations from '../components/dashboard/InvestmentRecommendations';
import ApiDemoPage from '../components/dashboard/ApiDemoPage';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('mortgage');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mortgage':
        return <MortgageCalculator />;
      case 'investment':
        return <InvestmentAnalysis />;
      case 'pricetrends':
        return <PriceTrends />;
      case 'comparison':
        return <PropertyComparison />;
      case 'repayment':
        return <RepaymentCalculator />;
      case 'recommendations':
        return <InvestmentRecommendations />;
      case 'apiDemo':
        return <ApiDemoPage />;
      default:
        return <MortgageCalculator />;
    }
  };

  return (
    <div className="flex h-screen pt-16 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-4 md:p-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;
