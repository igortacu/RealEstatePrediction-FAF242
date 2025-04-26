import React from 'react';
import { Card } from './Card';
import { PiggyBank, Calendar, DollarSign } from 'lucide-react';

interface CalculationResultProps {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export const CalculationResult: React.FC<CalculationResultProps> = ({
  loanAmount,
  monthlyPayment,
  totalPayment,
  totalInterest
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-white mb-6">Payment Summary</h3>
      
      <div className="bg-blue-600 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-200">Monthly Payment</span>
          <DollarSign className="h-5 w-5 text-blue-200" />
        </div>
        <div className="text-3xl font-bold text-white">${monthlyPayment}</div>
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
      </div>
    </Card>
  );
};