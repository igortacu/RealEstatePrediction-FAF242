import React, { useState } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  prefix,
  suffix
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue === '') return;
    
    const numericValue = Number(newValue);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    let numericValue = Number(inputValue);
    
    if (isNaN(numericValue)) {
      numericValue = value;
    }
    
    if (min !== undefined && numericValue < min) {
      numericValue = min;
    }
    
    if (max !== undefined && numericValue > max) {
      numericValue = max;
    }
    
    setInputValue(numericValue.toString());
    onChange(numericValue);
  };

  const increment = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  const decrement = () => {
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  return (
    <div className="relative flex rounded-md shadow-sm">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-slate-400">{prefix}</span>
        </div>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`block w-full rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          prefix ? 'pl-8' : 'pl-3'
        } ${suffix ? 'pr-8' : 'pr-12'} py-2`}
      />
      {suffix && (
        <div className="absolute inset-y-0 right-12 flex items-center pointer-events-none">
          <span className="text-slate-400">{suffix}</span>
        </div>
      )}
      <div className="absolute inset-y-0 right-0 flex">
        <button
          type="button"
          onClick={decrement}
          className="px-2 py-1 text-gray-400 hover:text-white focus:outline-none"
          tabIndex={-1}
        >
          <span className="sr-only">Decrease</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={increment}
          className="px-2 py-1 text-gray-400 hover:text-white focus:outline-none"
          tabIndex={-1}
        >
          <span className="sr-only">Increase</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};