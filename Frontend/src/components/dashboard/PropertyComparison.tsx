import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Plus, X, Home } from 'lucide-react';
import { PropertyComparisonChart } from '../ui/PropertyComparisonChart';

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

const initialProperties: Property[] = [
  {
    id: 1,
    name: "Property A",
    price: 550000,
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 3.5,
    yearBuilt: 2005,
    rentalIncome: 3800,
    expenses: 1000,
    capRate: 6.2,
    cashFlow: 800,
  },
  {
    id: 2,
    name: "Property B",
    price: 450000,
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1998,
    rentalIncome: 3000,
    expenses: 850,
    capRate: 5.7,
    cashFlow: 650,
  },
];

const PropertyComparison: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    name: "",
    price: 0,
    sqft: 0,
    bedrooms: 0,
    bathrooms: 0,
    yearBuilt: 0,
    rentalIncome: 0,
    expenses: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: name === 'name' ? value : Number(value),
    });
  };

  const addProperty = () => {
    if (!newProperty.name) return;
    
    // Calculate capRate and cashFlow
    const annualRentalIncome = (newProperty.rentalIncome || 0) * 12;
    const annualExpenses = (newProperty.expenses || 0) * 12;
    const netOperatingIncome = annualRentalIncome - annualExpenses;
    const capRate = ((netOperatingIncome / (newProperty.price || 1)) * 100).toFixed(1);
    const mortgagePayment = calculateMortgage(newProperty.price || 0);
    const cashFlow = (newProperty.rentalIncome || 0) - (newProperty.expenses || 0) - mortgagePayment;
    
    const property: Property = {
      id: Date.now(),
      name: newProperty.name || '',
      price: newProperty.price || 0,
      sqft: newProperty.sqft || 0,
      bedrooms: newProperty.bedrooms || 0,
      bathrooms: newProperty.bathrooms || 0,
      yearBuilt: newProperty.yearBuilt || 0,
      rentalIncome: newProperty.rentalIncome || 0,
      expenses: newProperty.expenses || 0,
      capRate: parseFloat(capRate),
      cashFlow: cashFlow,
    };
    
    setProperties([...properties, property]);
    setNewProperty({
      name: "",
      price: 0,
      sqft: 0,
      bedrooms: 0,
      bathrooms: 0,
      yearBuilt: 0,
      rentalIncome: 0,
      expenses: 0,
    });
    setShowAddForm(false);
  };

  const calculateMortgage = (price: number) => {
    // Assuming 20% down payment, 30-year fixed at 5% interest
    const principal = price * 0.8;
    const monthlyInterest = 5 / 100 / 12;
    const payments = 30 * 12;
    
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (principal * monthlyInterest * x) / (x - 1);
    
    return Math.round(monthly);
  };

  const removeProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Property Comparison</h1>
        <p className="mt-2 text-slate-300">
          Compare different properties side by side to make informed investment decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Properties</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center px-3 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-400 bg-transparent hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showAddForm ? (
                <>
                  <X size={16} className="mr-2" /> Cancel
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-2" /> Add Property
                </>
              )}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-slate-800/50 p-4 rounded-lg mb-6 border border-slate-700/50">
              <h4 className="text-md font-medium text-white mb-4">Add New Property</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Property Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProperty.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Property Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProperty.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Square Feet</label>
                  <input
                    type="number"
                    name="sqft"
                    value={newProperty.sqft}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sq Ft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={newProperty.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bedrooms"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={newProperty.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bathrooms"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Year Built</label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={newProperty.yearBuilt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Year Built"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Monthly Rent ($)</label>
                  <input
                    type="number"
                    name="rentalIncome"
                    value={newProperty.rentalIncome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Monthly Rent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Monthly Expenses ($)</label>
                  <input
                    type="number"
                    name="expenses"
                    value={newProperty.expenses}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Monthly Expenses"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={addProperty}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Property
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Beds/Baths</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Monthly Rent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Cap Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Cash Flow</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Home size={16} className="text-blue-500 mr-2" />
                        <span className="text-white">{property.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                      ${property.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                      {property.sqft.toLocaleString()} sqft
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                      {property.bedrooms} bd / {property.bathrooms} ba
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                      ${property.rentalIncome.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.capRate >= 6 ? 'bg-green-500/20 text-green-400' : 
                        property.capRate >= 5 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {property.capRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        property.cashFlow >= 500 ? 'text-green-400' : 
                        property.cashFlow >= 0 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        ${property.cashFlow}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => removeProperty(property.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6">Comparative Analysis</h3>
          <PropertyComparisonChart properties={properties} />
        </Card>
      </div>
    </div>
  );
};

export default PropertyComparison;