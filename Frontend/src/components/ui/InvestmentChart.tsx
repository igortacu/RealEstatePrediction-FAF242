import React from 'react';

interface InvestmentChartProps {
  purchasePrice: number;
  downPayment: number;
  annualAppreciation: number;
  annualCashFlow: number;
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({
  purchasePrice,
  downPayment,
  annualAppreciation,
  annualCashFlow
}) => {
  // Generate 10-year projection data
  const generateProjectionData = () => {
    const data = [];
    let currentValue = purchasePrice;
    let currentEquity = downPayment;
    let totalCashFlow = 0;
    
    for (let year = 0; year <= 10; year++) {
      // Calculate property value with appreciation
      if (year > 0) {
        currentValue = currentValue * (1 + annualAppreciation / 100);
        totalCashFlow += annualCashFlow;
      }
      
      // Mortgage principal reduction (simplified)
      const loanAmount = purchasePrice - downPayment;
      const principalReduction = year > 0 ? (loanAmount / 30) * year : 0;
      
      // Total equity = down payment + principal reduction + appreciation + cash flow
      currentEquity = downPayment + principalReduction + (currentValue - purchasePrice) + totalCashFlow;
      
      data.push({
        year,
        propertyValue: Math.round(currentValue),
        equity: Math.round(currentEquity),
        cashFlow: Math.round(totalCashFlow)
      });
    }
    
    return data;
  };

  const projectionData = generateProjectionData();
  
  // Find the maximum values for scaling
  const maxPropertyValue = Math.max(...projectionData.map(d => d.propertyValue));
  const maxEquity = Math.max(...projectionData.map(d => d.equity));
  const maxCashFlow = Math.max(...projectionData.map(d => d.cashFlow));
  
  // Chart dimensions
  const width = 100;
  const height = 60;
  
  return (
    <div className="relative h-80">
      <div className="absolute left-0 top-0 text-xs text-slate-400">Property Value / Equity ($)</div>
      <div className="absolute right-0 top-0 text-xs text-green-400">Cash Flow ($)</div>
      
      <div className="mt-6 h-64 flex items-end">
        {projectionData.map((data, index) => (
          <div 
            key={data.year} 
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            <div className="relative w-full flex flex-col items-center">
              {/* Cash flow line */}
              <div 
                className="absolute top-0 w-1 bg-green-500 rounded-t-sm" 
                style={{ 
                  height: `${(data.cashFlow / maxCashFlow) * 100}%`,
                  maxHeight: '90%',
                  right: '25%'
                }}
              ></div>
              
              {/* Equity bar */}
              <div 
                className="w-4 bg-blue-500 rounded-t-sm" 
                style={{ height: `${(data.equity / maxPropertyValue) * 100}%` }}
              ></div>
              
              {/* Property value outline */}
              <div 
                className="absolute bottom-0 w-8 h-full border-2 border-white/30 rounded-t-sm"
                style={{ height: `${(data.propertyValue / maxPropertyValue) * 100}%` }}
              ></div>
            </div>
            
            <div className="mt-2 text-xs text-slate-400">Year {data.year}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
          <span className="text-xs text-slate-300">Equity</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 border-2 border-white/30 rounded-sm mr-2"></div>
          <span className="text-xs text-slate-300">Property Value</span>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-3 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-xs text-slate-300">Cash Flow</span>
        </div>
      </div>
    </div>
  );
};