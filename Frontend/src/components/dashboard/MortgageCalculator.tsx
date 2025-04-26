import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Slider } from '../ui/Slider';
import { NumberInput } from '../ui/NumberInput';
import { CalculationResult } from '../ui/CalculationResult';

const MortgageCalculator: React.FC = () => {
  // State
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Calculate mortgage when inputs change
  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  // Handle down payment changes
  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    setDownPaymentPercent(Math.round((value / homePrice) * 100));
  };

  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    setDownPayment(Math.round((value / 100) * homePrice));
  };

  // Handle home price changes
  const handleHomePriceChange = (value: number) => {
    setHomePrice(value);
    setDownPayment(Math.round((downPaymentPercent / 100) * value));
  };

  // Calculate mortgage
  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    
    if (principal <= 0 || monthlyInterest <= 0 || payments <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Calculate monthly payment: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (principal * monthlyInterest * x) / (x - 1);
    
    const monthlyPaymentRounded = Math.round(monthly);
    const totalPaymentRounded = Math.round(monthly * payments);
    const totalInterestRounded = Math.round((monthly * payments) - principal);
    
    setMonthlyPayment(monthlyPaymentRounded);
    setTotalPayment(totalPaymentRounded);
    setTotalInterest(totalInterestRounded);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Mortgage Calculator</h1>
        <p className="mt-2 text-slate-300">
          Calculate your monthly mortgage payments and see the breakdown of your costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Home Price
                  </label>
                  <span className="text-sm text-slate-400">
                    ${homePrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <DollarSign className="text-slate-400" size={18} />
                  <Slider
                    min={50000}
                    max={2000000}
                    step={10000}
                    value={homePrice}
                    onChange={handleHomePriceChange}
                  />
                </div>
                <div className="mt-2">
                  <NumberInput
                    value={homePrice}
                    onChange={handleHomePriceChange}
                    min={50000}
                    max={2000000}
                    step={10000}
                    prefix="$"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Down Payment
                  </label>
                  <span className="text-sm text-slate-400">
                    ${downPayment.toLocaleString()} ({downPaymentPercent}%)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <DollarSign className="text-slate-400" size={18} />
                  <Slider
                    min={0}
                    max={homePrice}
                    step={5000}
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <NumberInput
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    min={0}
                    max={homePrice}
                    step={5000}
                    prefix="$"
                  />
                  <NumberInput
                    value={downPaymentPercent}
                    onChange={handleDownPaymentPercentChange}
                    min={0}
                    max={100}
                    step={1}
                    suffix="%"
                  />
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Loan Term
                  </label>
                  <span className="text-sm text-slate-400">
                    {loanTerm} Years
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="text-slate-400" size={18} />
                  <Slider
                    min={5}
                    max={30}
                    step={5}
                    value={loanTerm}
                    onChange={setLoanTerm}
                  />
                </div>
                <div className="flex mt-2 justify-between">
                  {[5, 10, 15, 20, 25, 30].map((term) => (
                    <button 
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`px-2 py-1 rounded text-xs ${
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

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Interest Rate
                  </label>
                  <span className="text-sm text-slate-400">
                    {interestRate}%
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Percent className="text-slate-400" size={18} />
                  <Slider
                    min={1}
                    max={10}
                    step={0.1}
                    value={interestRate}
                    onChange={setInterestRate}
                  />
                </div>
                <div className="mt-2">
                  <NumberInput
                    value={interestRate}
                    onChange={setInterestRate}
                    min={1}
                    max={10}
                    step={0.1}
                    suffix="%"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CalculationResult
            loanAmount={homePrice - downPayment}
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
          />
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;