import React from 'react';
import { 
  Home,
  LineChart,
  TrendingUp,
  Calculator,
  BarChart4,
  Lightbulb,
  Server
} from 'lucide-react';

// Extend tab names to include API Demo
export type DashboardTab = 
  | 'mortgage' 
  | 'investment' 
  | 'pricetrends' 
  | 'comparison' 
  | 'repayment' 
  | 'recommendations'
  | 'apiDemo';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

const sidebarItems: { id: DashboardTab; name: string; icon: React.ReactNode }[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    icon: <Home size={20} />,
  },
  {
    id: 'investment',
    name: 'Investment Analysis',
    icon: <BarChart4 size={20} />,
  },
  {
    id: 'pricetrends',
    name: 'Price Trends',
    icon: <TrendingUp size={20} />,
  },
  {
    id: 'comparison',
    name: 'Property Comparison',
    icon: <LineChart size={20} />,
  },
  {
    id: 'repayment',
    name: 'Repayment Calculator',
    icon: <Calculator size={20} />,
  },
  {
    id: 'recommendations',
    name: 'Recommendations',
    icon: <Lightbulb size={20} />,
  },
  {
    id: 'apiDemo',
    name: 'API Demo',
    icon: <Server size={20} />,
  },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 hidden md:block bg-slate-900 border-r border-slate-800 shadow-xl overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8">Dashboard</h2>
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
