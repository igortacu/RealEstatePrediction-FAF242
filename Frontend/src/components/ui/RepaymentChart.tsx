import React from 'react';

interface RepaymentScheduleItem {
  year: number;
  balance: number;
  principalPaid: number;
  interestPaid: number;
}

interface RepaymentChartProps {
  repaymentSchedule: RepaymentScheduleItem[];
  loanAmount: number;
  loanTerm: number;
}

export const RepaymentChart: React.FC<RepaymentChartProps> = ({
  repaymentSchedule,
  loanAmount,
  loanTerm
}) => {
  // Sort schedule by year
  const sortedSchedule = [...repaymentSchedule].sort((a, b) => a.year - b.year);
  
  // Generate standard amortization for comparison
  const generateStandardSchedule = () => {
    const result = [];
    for (let year = 0; year <= loanTerm; year += 5) {
      if (year === 0) {
        result.push({
          year,
          balance: loanAmount,
          principalPaid: 0,
          interestPaid: 0
        });
        continue;
      }
      
      // Simplified calculation for standard amortization
      const progress = year / loanTerm;
      // Not linear, more principal is paid later in the loan term
      const principalPaidFraction = Math.pow(progress, 0.9);
      const principalPaid = loanAmount * principalPaidFraction;
      const balance = loanAmount - principalPaid;
      
      // Using balance curve to approximate interest
      const interestRate = 0.045; // assume 4.5%
      const totalInterest = loanAmount * interestRate * loanTerm * 0.6; // simplified
      const interestPaid = totalInterest * Math.pow(progress, 1.2);
      
      result.push({
        year,
        balance: Math.round(balance),
        principalPaid: Math.round(principalPaid),
        interestPaid: Math.round(interestPaid)
      });
    }
    return result;
  };
  
  const standardSchedule = generateStandardSchedule();
  
  // Find the maximum values for scaling
  const maxYear = Math.max(
    ...repaymentSchedule.map(d => d.year),
    ...standardSchedule.map(d => d.year)
  );
  const maxBalance = loanAmount;
  
  return (
    <div>
      <div className="relative h-80">
        <div className="absolute left-0 bottom-0 w-full h-px bg-slate-700"></div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700"></div>
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map(fraction => (
          <div 
            key={fraction}
            className="absolute left-0 w-full h-px bg-slate-800/50"
            style={{ bottom: `${fraction * 100}%` }}
          >
            <span className="absolute -left-16 -translate-y-1/2 text-xs text-slate-500">
              ${Math.round(maxBalance * fraction).toLocaleString()}
            </span>
          </div>
        ))}
        
        {/* Chart area */}
        <div className="absolute inset-0 flex items-end">
          {/* Draw lines between points */}
          <svg className="absolute inset-0 overflow-visible" viewBox={`0 0 100 100`} preserveAspectRatio="none">
            {/* Standard amortization line */}
            <polyline
              points={standardSchedule.map(d => `${(d.year / maxYear) * 100},${100 - (d.balance / maxBalance) * 100}`).join(' ')}
              fill="none"
              stroke="#6b7280"
              strokeWidth="0.5"
              strokeDasharray="4 2"
            />
            
            {/* Accelerated payment line */}
            {sortedSchedule.length > 1 && (
              <polyline
                points={sortedSchedule.map(d => `${(d.year / maxYear) * 100},${100 - (d.balance / maxBalance) * 100}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            )}
          </svg>
          
          {/* Standard amortization points */}
          {standardSchedule.map((data, index) => (
            <div 
              key={`standard-${data.year}`}
              className="absolute w-2 h-2 rounded-full bg-slate-600"
              style={{ 
                bottom: `${(data.balance / maxBalance) * 100}%`,
                left: `${(data.year / maxYear) * 100}%`,
                transform: 'translate(-50%, 50%)'
              }}
            ></div>
          ))}
          
          {/* Accelerated payment points */}
          {sortedSchedule.map((data, index) => (
            <div 
              key={`accelerated-${data.year}`}
              className="absolute w-3 h-3 rounded-full bg-blue-500"
              style={{ 
                bottom: `${(data.balance / maxBalance) * 100}%`,
                left: `${(data.year / maxYear) * 100}%`,
                transform: 'translate(-50%, 50%)'
              }}
              title={`Year ${data.year}: $${data.balance.toLocaleString()}`}
            ></div>
          ))}
          
          {/* X-axis labels */}
          {[0, 5, 10, 15, 20, 25, 30].filter(year => year <= maxYear).map(year => (
            <div 
              key={`year-${year}`}
              className="absolute bottom-0 text-xs text-slate-500"
              style={{ 
                left: `${(year / maxYear) * 100}%`,
                transform: 'translateX(-50%)',
                bottom: '-20px'
              }}
            >
              Year {year}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <div className="flex items-center">
          <div className="w-3 h-1 bg-blue-500 mr-2"></div>
          <span className="text-xs text-slate-300">With Extra Payments</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-gray-500 mr-1 border-dashed border-t border-gray-500"></div>
          <span className="text-xs text-slate-300">Standard Payment</span>
        </div>
      </div>
    </div>
  );
};