import React, { useState } from 'react';

interface Property {
  id: number;
  name: string;
  price: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  rentalIncome: number;
  expenses: number;
  capRate: number;
  cashFlow: number;
}

interface PropertyComparisonChartProps {
  properties: Property[];
}

export const PropertyComparisonChart: React.FC<PropertyComparisonChartProps> = ({ properties }) => {
  const [activeMetric, setActiveMetric] = useState<string>('capRate');
  
  const metrics = [
    { id: 'capRate', name: 'Cap Rate', format: (value: number) => `${value}%`, color: 'blue' },
    { id: 'cashFlow', name: 'Cash Flow', format: (value: number) => `$${value}`, color: 'green' },
    { id: 'price', name: 'Price per sqft', format: (value: number) => `$${value}`, color: 'purple' },
    { id: 'roi', name: '5-Year ROI', format: (value: number) => `${value}%`, color: 'yellow' },
  ];
  
  // Calculate derived metrics
  const getMetricValue = (property: Property, metricId: string) => {
    switch (metricId) {
      case 'capRate':
        return property.capRate;
      case 'cashFlow':
        return property.cashFlow;
      case 'price':
        return Math.round(property.price / property.sqft);
      case 'roi':
        // Simple ROI calculation - this is just an example
        return Math.round((property.cashFlow * 12 * 5 / property.price) * 100 + property.capRate * 2);
      default:
        return 0;
    }
  };
  
  // Get the maximum value for the current metric
  const maxValue = Math.max(...properties.map(p => getMetricValue(p, activeMetric)));
  
  // Calculate whether a higher value is better for this metric
  const isHigherBetter = (metricId: string) => {
    return metricId !== 'price'; // Higher is better for all metrics except price
  };
  
  // Get color class based on value
  const getColorClass = (value: number, max: number, metricId: string) => {
    const percentage = value / max;
    const better = isHigherBetter(metricId);
    
    if (better) {
      if (percentage > 0.8) return 'bg-green-500';
      if (percentage > 0.6) return 'bg-green-400';
      if (percentage > 0.4) return 'bg-yellow-400';
      if (percentage > 0.2) return 'bg-yellow-300';
      return 'bg-red-400';
    } else {
      if (percentage < 0.2) return 'bg-green-500';
      if (percentage < 0.4) return 'bg-green-400';
      if (percentage < 0.6) return 'bg-yellow-400';
      if (percentage < 0.8) return 'bg-yellow-300';
      return 'bg-red-400';
    }
  };

  return (
    <div>
      {/* Metric selection */}
      <div className="mb-6 flex flex-wrap gap-2">
        {metrics.map(metric => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeMetric === metric.id
                ? `bg-${metric.color}-600 text-white`
                : `bg-slate-700 text-slate-300 hover:bg-slate-600`
            }`}
          >
            {metric.name}
          </button>
        ))}
      </div>
      
      {/* Chart */}
      <div className="space-y-6">
        {properties.map(property => {
          const value = getMetricValue(property, activeMetric);
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
          const metric = metrics.find(m => m.id === activeMetric);
          const colorClass = getColorClass(value, maxValue, activeMetric);
          
          return (
            <div key={property.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-white">{property.name}</div>
                <div className="text-sm font-medium text-slate-300">
                  {metric?.format(value)}
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className={`${colorClass} h-2.5 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Property details */}
      <div className="mt-10 pt-6 border-t border-slate-700">
        <h4 className="text-md font-medium text-white mb-4">Property Details Comparison</h4>
        <div className="grid grid-cols-2 gap-4">
          {properties.map(property => (
            <div key={property.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h5 className="font-medium text-white mb-3">{property.name}</h5>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Price:</span>
                  <span className="text-slate-200">${property.price.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Size:</span>
                  <span className="text-slate-200">{property.sqft} sqft</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Price/sqft:</span>
                  <span className="text-slate-200">${Math.round(property.price / property.sqft)}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Beds/Baths:</span>
                  <span className="text-slate-200">{property.bedrooms}bd / {property.bathrooms}ba</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Year Built:</span>
                  <span className="text-slate-200">{property.yearBuilt}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-400">Monthly Rent:</span>
                  <span className="text-slate-200">${property.rentalIncome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};