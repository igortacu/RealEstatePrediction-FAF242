import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { NumberInput } from '../ui/NumberInput';
import { Slider } from '../ui/Slider';
import { InvestmentChart } from '../ui/InvestmentChart';

const InvestmentAnalysis: React.FC = () => {
  // State for investment parameters
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [rentalIncome, setRentalIncome] = useState(3000);
  const [annualAppreciation, setAnnualAppreciation] = useState(3);
  const [annualExpenses, setAnnualExpenses] = useState(6000);
  const [vacancyRate, setVacancyRate] = useState(5);

  // Calculated values
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [capRate, setCapRate] = useState(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState(0);
  const [totalReturn5yr, setTotalReturn5yr] = useState(0);
  const [totalReturn10yr, setTotalReturn10yr] = useState(0);

  // Recalculate on input change
  useEffect(() => {
    calculateInvestmentMetrics();
  }, [
    purchasePrice, 
    downPayment, 
    interestRate, 
    loanTerm, 
    rentalIncome, 
    annualAppreciation, 
    annualExpenses, 
    vacancyRate
  ]);

  const calculateInvestmentMetrics = () => {
    // Calculate loan amount
    const loanAmount = purchasePrice - downPayment;
    
    // Calculate monthly mortgage payment
    const monthlyInterest = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    // Monthly mortgage payment formula
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (loanAmount * monthlyInterest * x) / (x - 1);
    
    setMonthlyMortgage(Math.round(monthly));
    
    // Effective rental income after vacancy
    const effectiveMonthlyRent = rentalIncome * (1 - vacancyRate / 100);
    
    // Monthly expenses
    const monthlyExpenses = annualExpenses / 12;
    
    // Monthly cash flow
    const monthlyCashFlow = effectiveMonthlyRent - monthly - monthlyExpenses;
    setCashFlow(Math.round(monthlyCashFlow));
    
    // Annual cash flow
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Cap rate
    const netOperatingIncome = (effectiveMonthlyRent * 12) - annualExpenses;
    const capRateCalc = (netOperatingIncome / purchasePrice) * 100;
    setCapRate(Number(capRateCalc.toFixed(2)));
    
    // Cash on cash return
    const cashOnCashReturnCalc = (annualCashFlow / downPayment) * 100;
    setCashOnCashReturn(Number(cashOnCashReturnCalc.toFixed(2)));
    
    // Calculate 5 and 10 year returns
    let propertyValue5yr = purchasePrice;
    let propertyValue10yr = purchasePrice;
    let equity5yr = downPayment;
    let equity10yr = downPayment;
    let totalCashFlow5yr = 0;
    let totalCashFlow10yr = 0;
    
    for (let year = 1; year <= 10; year++) {
      propertyValue5yr = year <= 5 ? propertyValue5yr * (1 + annualAppreciation / 100) : propertyValue5yr;
      propertyValue10yr = propertyValue10yr * (1 + annualAppreciation / 100);
      
      // Principal reduction (simplified)
      const yearlyPrincipalReduction = loanAmount / loanTerm;
      
      equity5yr = year <= 5 ? equity5yr + yearlyPrincipalReduction : equity5yr;
      equity10yr = equity10yr + yearlyPrincipalReduction;
      
      totalCashFlow5yr = year <= 5 ? totalCashFlow5yr + annualCashFlow : totalCashFlow5yr;
      totalCashFlow10yr = totalCashFlow10yr + annualCashFlow;
    }
    
    // Total 5-year return
    const totalReturn5yrCalc = ((equity5yr + totalCashFlow5yr - downPayment) / downPayment) * 100;
    setTotalReturn5yr(Number(totalReturn5yrCalc.toFixed(2)));
    
    // Total 10-year return
    const totalReturn10yrCalc = ((equity10yr + totalCashFlow10yr - downPayment) / downPayment) * 100;
    setTotalReturn10yr(Number(totalReturn10yrCalc.toFixed(2)));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Investment Analysis</h1>
        <p className="mt-2 text-slate-300">
          Analyze the potential return on your real estate investment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Purchase Price
                  </label>
                  <NumberInput
                    value={purchasePrice}
                    onChange={setPurchasePrice}
                    min={50000}
                    max={2000000}
                    step={10000}
                    prefix="$"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Down Payment
                  </label>
                  <NumberInput
                    value={downPayment}
                    onChange={setDownPayment}
                    min={0}
                    max={purchasePrice}
                    step={5000}
                    prefix="$"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Interest Rate
                  </label>
                  <NumberInput
                    value={interestRate}
                    onChange={setInterestRate}
                    min={1}
                    max={10}
                    step={0.1}
                    suffix="%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Loan Term (Years)
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
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Monthly Rental Income
                  </label>
                  <NumberInput
                    value={rentalIncome}
                    onChange={setRentalIncome}
                    min={0}
                    max={10000}
                    step={100}
                    prefix="$"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Annual Property Appreciation
                  </label>
                  <NumberInput
                    value={annualAppreciation}
                    onChange={setAnnualAppreciation}
                    min={0}
                    max={10}
                    step={0.5}
                    suffix="%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Annual Expenses (Tax, Insurance, Maintenance)
                  </label>
                  <NumberInput
                    value={annualExpenses}
                    onChange={setAnnualExpenses}
                    min={0}
                    max={50000}
                    step={500}
                    prefix="$"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Vacancy Rate
                  </label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      min={0}
                      max={20}
                      step={1}
                      value={vacancyRate}
                      onChange={setVacancyRate}
                    />
                    <span className="text-sm text-slate-300 w-12 text-right">
                      {vacancyRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Return Projection</h3>
            <InvestmentChart 
              purchasePrice={purchasePrice}
              downPayment={downPayment}
              annualAppreciation={annualAppreciation}
              annualCashFlow={cashFlow * 12}
            />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Investment Summary</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Monthly Mortgage</div>
                <div className="text-right font-medium text-white">${monthlyMortgage}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Monthly Cash Flow</div>
                <div className={`text-right font-medium ${cashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${cashFlow}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Cap Rate</div>
                <div className="text-right font-medium text-white">{capRate}%</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">Cash on Cash Return</div>
                <div className={`text-right font-medium ${cashOnCashReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {cashOnCashReturn}%
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-700">
                <h4 className="text-md font-medium text-white mb-4">Long-term Returns</h4>
                
                <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50 mb-4">
                  <div className="text-sm text-slate-300">5-Year ROI</div>
                  <div className="text-right font-medium text-white">{totalReturn5yr}%</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-slate-800/50">
                  <div className="text-sm text-slate-300">10-Year ROI</div>
                  <div className="text-right font-medium text-white">{totalReturn10yr}%</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;