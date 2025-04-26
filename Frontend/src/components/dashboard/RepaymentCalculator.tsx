import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { NumberInput } from '../ui/NumberInput';
import { Slider } from '../ui/Slider';
import { RepaymentChart } from '../ui/RepaymentChart';

const RepaymentCalculator: React.FC = () => {
  // State
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [extraPayment, setExtraPayment] = useState(0);
  
  // Calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [timeToPayoff, setTimeToPayoff] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);
  const [repaymentSchedule, setRepaymentSchedule] = useState<any[]>([]);

  useEffect(() => {
    calculateRepayment();
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const calculateRepayment = () => {
    // Calculate standard mortgage payment
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Standard monthly payment calculation (P&I)
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyPaymentStandard = (loanAmount * monthlyInterestRate * x) / (x - 1);
    const totalPaymentStandard = monthlyPaymentStandard * numberOfPayments;
    const totalInterestStandard = totalPaymentStandard - loanAmount;
    
    setMonthlyPayment(Math.round(monthlyPaymentStandard));
    
    // Calculate with extra payment
    let balance = loanAmount;
    let month = 0;
    let totalInterestPaid = 0;
    const schedule = [];
    
    // Standard amortization variables for comparison
    let balanceStandard = loanAmount;
    let totalInterestPaidStandard = 0;
    
    while (balance > 0 && month < 50 * 12) { // max 50 years to prevent infinite loops
      month++;
      
      // Interest for this month
      const interestPayment = balance * monthlyInterestRate;
      totalInterestPaid += interestPayment;
      
      // Principal for this month (with extra payment)
      const principalPayment = Math.min(
        balance,
        monthlyPaymentStandard - interestPayment + extraPayment
      );
      
      // Update balance
      balance -= principalPayment;
      
      // Standard comparison (without extra payment)
      if (month <= numberOfPayments) {
        const interestPaymentStandard = balanceStandard * monthlyInterestRate;
        totalInterestPaidStandard += interestPaymentStandard;
        
        const principalPaymentStandard = Math.min(
          balanceStandard,
          monthlyPaymentStandard - interestPaymentStandard
        );
        
        balanceStandard -= principalPaymentStandard;
      }
      
      // Add to schedule every 12 months (yearly)
      if (month % 12 === 0 && month <= 30 * 12) {
        schedule.push({
          year: month / 12,
          balance: Math.round(balance),
          principalPaid: Math.round(loanAmount - balance),
          interestPaid: Math.round(totalInterestPaid),
        });
      }
    }
    
    setTimeToPayoff(month / 12); // In years
    setTotalInterest(Math.round(totalInterestPaid));
    setTotalCost(Math.round(loanAmount + totalInterestPaid));
    setInterestSaved(Math.round(totalInterestPaidStandard - totalInterestPaid));
    setRepaymentSchedule(schedule);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Repayment Calculator</h1>
        <p className="mt-2 text-slate-300">
          Calculate your loan repayment schedule and see how extra payments can save you money.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-6">Loan Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Loan Amount
                </label>
                <NumberInput
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={10000}
                  max={2000000}
                  step={10000}
                  prefix="$"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Interest Rate
                </label>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={0.1}
                    value={interestRate}
                    onChange={setInterestRate}
                  />
                  <span className="text-sm text-slate-300 w-12 text-right">
                    {interestRate}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Loan Term
                </label>
                <div className="flex justify-between">
                  {[15, 20, 25, 30].map((term) => (
                    <button 
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`px-4 py-2 rounded ${
                        loanTerm === term 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {term} yrs
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Extra Monthly Payment
                </label>
                <NumberInput
                  value={extraPayment}
                  onChange={setExtraPayment}
                  min={0}
                  max={5000}
                  step={50}
                  prefix="$"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Loan Summary</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Monthly Payment</div>
                <div className="text-right font-medium text-white">
                  ${monthlyPayment + extraPayment}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Time to Payoff</div>
                <div className="text-right font-medium text-white">
                  {timeToPayoff.toFixed(1)} years
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Total Interest</div>
                <div className="text-right font-medium text-white">
                  ${totalInterest.toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Total Cost</div>
                <div className="text-right font-medium text-white">
                  ${totalCost.toLocaleString()}
                </div>
              </div>
              
              {extraPayment > 0 && (
                <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-green-900/30 border border-green-700/30">
                  <div className="text-sm text-green-300">Interest Saved</div>
                  <div className="text-right font-medium text-green-300">
                    ${interestSaved.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-6">Loan Balance Over Time</h3>
            <RepaymentChart 
              repaymentSchedule={repaymentSchedule}
              loanAmount={loanAmount}
              loanTerm={loanTerm}
            />
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Amortization Schedule</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Remaining Balance</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Principal Paid</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Interest Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {repaymentSchedule.map((item) => (
                    <tr key={item.year} className="hover:bg-slate-800/50">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-200">
                        Year {item.year}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-200">
                        ${item.balance.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-200">
                        ${item.principalPaid.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-200">
                        ${item.interestPaid.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RepaymentCalculator;