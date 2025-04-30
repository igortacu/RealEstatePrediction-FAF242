import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Slider } from '../ui/Slider';
import { NumberInput } from '../ui/NumberInput';
import { CalculationResult } from '../ui/CalculationResult';
import type { ApiInput, ApiOutput } from '../../types/api';

const MortgageCalculator: React.FC = () => {
  const [houseNumber, setHouseNumber] = useState(1);
  const [houses, setHouses] = useState<ApiInput['Houses']>([{
    "Money Available": 100000,
    "House Price": 500000,
    "Tax Rate": 5,
    "Yearly Effective Tax Rate": 4,
    "Term": 30
  }]);

 

  const [calculationResult, setCalculationResult] = useState<ApiOutput>({
    "Monthly Payment": 0,
    "Yearly Payment": 0,
    "Money Enough": false,
    "Repayment Time": 0,
    "Profit Rate": 0,
    "Repayment Graph": [],
    "Risk Rate": 0
  });

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch('https://api.mrfaf.info/api/mock', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        const jobj = await response.json();
        // Use the mock data if needed
        console.log('Mock data:', jobj);
      } catch (error) {
        console.error('Error fetching mock data:', error);
      }
    };
    
    fetchMockData();
  }, []);


  useEffect(() => {
    calculateMortgage();
  }, [houses, houseNumber]);

  const calculateMortgage = () => {
    //! Here we would normally make an API call with the input data
    const apiInput: ApiInput = {
      "House Number": houseNumber,
      "Houses": houses
    };

    const fetchMockData = async () => {
      try {
        const response = await fetch('https://api.mrfaf.info/api/mock', {
          method: 'GET',
          headers: {
            'Accept': 'application/json', 
          },
        });
        
        const jobj = await response.json();
        // Use the mock data if needed
        console.log('Mock data:', jobj);
        return jobj
      } catch (error) {
        console.error('Error fetching mock data:', error);
        return null
      }
    };

    // Temporary calculation logic until API is integrated
    const currentHouse = houses[0];
    const principal = currentHouse["House Price"] - currentHouse["Money Available"];
    const monthlyInterest = currentHouse["Yearly Effective Tax Rate"] / 100 / 12;
    const payments = currentHouse["Term"] * 12;
    
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (principal * monthlyInterest * x) / (x - 1);
    
    setCalculationResult({
      "Monthly Payment": Math.round(monthly),
      "Yearly Payment": Math.round(monthly * 12),
      "Money Enough": currentHouse["Money Available"] >= currentHouse["House Price"] * 0.2,
      "Repayment Time": currentHouse["Term"],
      "Profit Rate": Math.round((currentHouse["House Price"] * 0.03) / monthly * 100),
      "Repayment Graph": Array.from({ length: currentHouse["Term"] }, (_, i) => 
        Math.round(principal * (1 - (i / currentHouse["Term"])))
      ),
      "Risk Rate": Math.round((monthly / (currentHouse["House Price"] * 0.005)) * 100)
    });
  };

  const updateHouse = (index: number, field: keyof ApiInput['Houses'][0], value: number) => {
    const newHouses = [...houses];
    newHouses[index] = {
      ...newHouses[index],
      [field]: value
    };
    setHouses(newHouses);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Mortgage Calculator</h1>
        <p className="mt-2 text-slate-300">
          Calculate your mortgage payments and analyze investment potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  House Price
                </label>
                <NumberInput
                  value={houses[0]["House Price"]}
                  onChange={(value) => updateHouse(0, "House Price", value)}
                  min={50000}
                  max={2000000}
                  step={10000}
                  prefix="$"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Money Available (Down Payment)
                </label>
                <NumberInput
                  value={houses[0]["Money Available"]}
                  onChange={(value) => updateHouse(0, "Money Available", value)}
                  min={0}
                  max={houses[0]["House Price"]}
                  step={5000}
                  prefix="$"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Term (Years)
                </label>
                <div className="flex justify-between">
                  {[15, 20, 25, 30].map((term) => (
                    <button 
                      key={term}
                      onClick={() => updateHouse(0, "Term", term)}
                      className={`px-4 py-2 rounded ${
                        houses[0]["Term"] === term 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Yearly Effective Tax Rate
                </label>
                <NumberInput
                  value={houses[0]["Yearly Effective Tax Rate"]}
                  onChange={(value) => updateHouse(0, "Yearly Effective Tax Rate", value)}
                  min={1}
                  max={10}
                  step={0.1}
                  suffix="%"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CalculationResult
            loanAmount={houses[0]["House Price"] - houses[0]["Money Available"]}
            monthlyPayment={calculationResult["Monthly Payment"]}
            totalPayment={calculationResult["Yearly Payment"] * houses[0]["Term"]}
            totalInterest={(calculationResult["Yearly Payment"] * houses[0]["Term"]) - 
              (houses[0]["House Price"] - houses[0]["Money Available"])}
            profitRate={calculationResult["Profit Rate"]}
            riskRate={calculationResult["Risk Rate"]}
            moneyEnough={calculationResult["Money Enough"]}
          />
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;