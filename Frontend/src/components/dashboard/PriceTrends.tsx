import React from 'react';
import { Card } from '../ui/Card';
import { PriceTrendChart } from '../ui/PriceTrendChart';

const PriceTrends: React.FC = () => {
  // Sample data for price trends
  const marketTrends = [
    { name: 'San Francisco', currentPrice: 1200000, forecast: 1380000, growth: 15 },
    { name: 'New York', currentPrice: 950000, forecast: 1045000, growth: 10 },
    { name: 'Austin', currentPrice: 550000, forecast: 687500, growth: 25 },
    { name: 'Seattle', currentPrice: 780000, forecast: 874000, growth: 12 },
    { name: 'Miami', currentPrice: 620000, forecast: 713000, growth: 15 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Price Trends & Forecast</h1>
        <p className="mt-2 text-slate-300">
          Visualize real estate price trends and future projections for key markets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Market Price Forecast (5-Year)</h3>
            <PriceTrendChart />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Top Growth Markets</h3>
            <div className="space-y-4">
              {marketTrends.map((market) => (
                <div key={market.name} className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">{market.name}</h4>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                      +{market.growth}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-xs text-slate-400">Current Average</p>
                      <p className="text-sm font-medium text-white">${market.currentPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">5-Year Forecast</p>
                      <p className="text-sm font-medium text-green-400">${market.forecast.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Market Insights</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-800/50">
                <h4 className="font-medium text-blue-300 mb-2">Low Interest Rates</h4>
                <p className="text-sm text-slate-300">
                  Current low interest rates are driving increased buyer demand in suburban markets.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-800/50">
                <h4 className="font-medium text-purple-300 mb-2">Remote Work Trends</h4>
                <p className="text-sm text-slate-300">
                  Continued remote work adoption is fueling price growth in small to mid-sized cities.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-teal-900/30 border border-teal-800/50">
                <h4 className="font-medium text-teal-300 mb-2">Inventory Shortage</h4>
                <p className="text-sm text-slate-300">
                  Limited housing inventory continues to drive competitive markets and rising prices.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PriceTrends;