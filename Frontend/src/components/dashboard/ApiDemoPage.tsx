import React, { useState } from 'react';
import { HouseInput, ApiInput, ApiOutput } from '../../types/api';
import * as Recharts from 'recharts';

// TS workaround for Recharts
const ResponsiveContainer: React.ComponentType<any> = Recharts.ResponsiveContainer as any;
const LineChart: React.ComponentType<any> = Recharts.LineChart as any;
const Line: React.ComponentType<any> = Recharts.Line as any;
const XAxis: React.ComponentType<any> = Recharts.XAxis as any;
const YAxis: React.ComponentType<any> = Recharts.YAxis as any;
const CartesianGrid: React.ComponentType<any> = Recharts.CartesianGrid as any;
const Tooltip: React.ComponentType<any> = Recharts.Tooltip as any;

type ExtendedHouseInput = HouseInput & {
  "Initial Rent": number;
  "Down Payment": number;
};

const ApiDemoPage: React.FC = () => {
  const [houseNumber, setHouseNumber] = useState<number>(1);
  const [input, setInput] = useState<ExtendedHouseInput>({
    "Money Available": 0,
    "House Price": 500000,
    "Tax Rate": 5,
    "Yearly Effective Tax Rate": 4,
    "Term": 30,
    "Initial Rent": 2000,
    "Down Payment": 50000,
  });
  const [output, setOutput] = useState<ApiOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: Number(value) }));
  };

  const fetchData = async () => {
    setError(null);
    const payload: ApiInput = { "House Number": houseNumber, Houses: [input] };
    try {
      const response = await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data: ApiOutput = await response.json();
      setOutput(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const graphValues: number[] = output ? (output as any)["Profit Graph"] || [] : [];
  const graphData = graphValues.map((v, i) => ({ period: i + 1, value: v }));

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">API Input/Output Demo</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Request</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">House Number</label>
              <input
                type="number"
                value={houseNumber}
                onChange={e => setHouseNumber(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-blue-500"
              />
            </div>
            {(Object.keys(input) as (keyof ExtendedHouseInput)[]).map(key => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={(input as any)[key]}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={fetchData}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Send to API
            </button>
            {error && <p className="text-red-400 mt-2">Error: {error}</p>}
          </div>
        </div>

        {/* Response Panel */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Response</h2>
          {output ? (
            <ul className="space-y-2">
              <li>Monthly Payment: <span className="font-medium">{output["Monthly Payment"].toFixed(2)} MDL</span></li>
              <li>Repayment Time: <span className="font-medium">{(output["Repayment Time"] / 4).toFixed(0)} Years</span></li>
              <li>Profit Rate: <span className="font-medium">{output["Profit Rate"].toFixed(2)}%</span></li>
            </ul>
          ) : (
            <p className="text-gray-500">No data yet. Click "Send to API".</p>
          )}
        </div>
      </div>

      {/* Graph Section Below */}
      <div className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Profit Graph</h2>
        {output ? (
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="period" tick={{ fill: '#E5E7EB' }} domain={['auto', 'auto']} />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }} 
                  domain={['auto', 'auto']} 
                />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#E5E7EB' }} />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500">Graph will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default ApiDemoPage;