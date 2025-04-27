import React from 'react';
import { Card } from './Card';
import { PiggyBank, Calendar, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

interface CalculationResultProps {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  profitRate: number;
  riskRate: number;
  moneyEnough: boolean;
}

export const CalculationResult: React.FC<CalculationResultProps> = ({
  loanAmount,
  monthlyPayment,
  totalPayment,
  totalInterest,
  profitRate,
  riskRate,
  moneyEnough
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-white mb-6">Payment Summary</h3>
      
      <div className={`rounded-xl p-6 mb-6 ${moneyEnough ? 'bg-blue-600' : 'bg-red-600'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-200">Monthly Payment</span>
          <DollarSign className="h-5 w-5 text-slate-200" />
        </div>
        <div className="text-3xl font-bold text-white">${monthlyPayment}</div>
        {!moneyEnough && (
          <div className="mt-2 text-sm text-red-200 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Insufficient down payment
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-slate-300">Loan Amount</h4>
            <p className="text-lg font-medium text-white mt-1">${loanAmount.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-green-400">
            <PiggyBank className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-slate-300">Total Interest</h4>
            <p className="text-lg font-medium text-white mt-1">${totalInterest.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-purple-400">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-slate-300">Total Payment</h4>
            <p className="text-lg font-medium text-white mt-1">${totalPayment.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-yellow-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-slate-300">Profit Rate</h4>
            <p className="text-lg font-medium text-white mt-1">{profitRate}%</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium text-slate-300">Risk Rate</h4>
            <div className="flex items-center mt-1">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    riskRate < 50 ? 'bg-green-500' :
                    riskRate < 75 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(riskRate, 100)}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-white">{riskRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};