import React from 'react';

export const PriceTrendChart: React.FC = () => {
  // Sample data for price trends
  const historicalData = [
    { year: 2015, sanFrancisco: 937500, newYork: 650000, austin: 262000, seattle: 520000, miami: 285000 },
    { year: 2016, sanFrancisco: 1016000, newYork: 685000, austin: 285000, seattle: 580000, miami: 305000 },
    { year: 2017, sanFrancisco: 1095000, newYork: 720000, austin: 310000, seattle: 645000, miami: 330000 },
    { year: 2018, sanFrancisco: 1130000, newYork: 788000, austin: 348000, seattle: 702000, miami: 360000 },
    { year: 2019, sanFrancisco: 1145000, newYork: 835000, austin: 395000, seattle: 728000, miami: 385000 },
    { year: 2020, sanFrancisco: 1158000, newYork: 855000, austin: 435000, seattle: 742000, miami: 400000 },
    { year: 2021, sanFrancisco: 1187000, newYork: 885000, austin: 495000, seattle: 765000, miami: 455000 },
    { year: 2022, sanFrancisco: 1200000, newYork: 925000, austin: 535000, seattle: 775000, miami: 525000 },
    { year: 2023, sanFrancisco: 1210000, newYork: 945000, austin: 550000, seattle: 780000, miami: 580000 },
  ];
  
  const forecastData = [
    { year: 2023, sanFrancisco: 1210000, newYork: 945000, austin: 550000, seattle: 780000, miami: 580000 },
    { year: 2024, sanFrancisco: 1250000, newYork: 975000, austin: 595000, seattle: 810000, miami: 625000 },
    { year: 2025, sanFrancisco: 1290000, newYork: 1005000, austin: 625000, seattle: 835000, miami: 655000 },
    { year: 2026, sanFrancisco: 1330000, newYork: 1025000, austin: 655000, seattle: 855000, miami: 682000 },
    { year: 2027, sanFrancisco: 1380000, newYork: 1045000, austin: 687500, seattle: 874000, miami: 710000 },
  ];
  
  // Find the maximum value for scaling
  const allValues = [
    ...historicalData.flatMap(d => [d.sanFrancisco, d.newYork, d.austin, d.seattle, d.miami]),
    ...forecastData.flatMap(d => [d.sanFrancisco, d.newYork, d.austin, d.seattle, d.miami])
  ];
  const maxValue = Math.max(...allValues);
  
  // Chart dimensions
  const height = 300;
  const getHeight = (value: number) => (value / maxValue) * height;

  const cities = [
    { name: 'San Francisco', key: 'sanFrancisco', color: 'bg-blue-500', borderColor: 'border-blue-500' },
    { name: 'New York', key: 'newYork', color: 'bg-purple-500', borderColor: 'border-purple-500' },
    { name: 'Austin', key: 'austin', color: 'bg-green-500', borderColor: 'border-green-500' },
    { name: 'Seattle', key: 'seattle', color: 'bg-yellow-500', borderColor: 'border-yellow-500' },
    { name: 'Miami', key: 'miami', color: 'bg-red-500', borderColor: 'border-red-500' }
  ];

  return (
    <div>
      <div className="flex justify-end space-x-4 mb-6">
        {cities.map(city => (
          <div key={city.name} className="flex items-center">
            <div className={`w-3 h-3 ${city.color} rounded-sm mr-2`}></div>
            <span className="text-xs text-slate-300">{city.name}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-80 mt-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700"></div>
        <div className="absolute left-0 bottom-0 right-0 h-px bg-slate-700"></div>
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map(fraction => (
          <div 
            key={fraction}
            className="absolute left-0 w-full h-px bg-slate-800"
            style={{ bottom: `${fraction * 100}%` }}
          >
            <span className="absolute -left-14 -translate-y-1/2 text-xs text-slate-500">
              ${Math.round(maxValue * fraction / 1000000)}M
            </span>
          </div>
        ))}
        
        {/* Chart area */}
        <div className="ml-0 h-full flex items-end">
          {/* Historical data */}
          {historicalData.map((data, index) => (
            <div 
              key={`historical-${data.year}`} 
              className="relative flex-1 flex items-end justify-center h-full group"
            >
              {cities.map((city, cityIndex) => (
                <div
                  key={`${data.year}-${city.key}`}
                  className={`absolute w-1.5 ${city.color} rounded-t-sm transition-all duration-300 ease-out group-hover:w-2.5 group-hover:brightness-125`}
                  style={{ 
                    height: `${(data[city.key as keyof typeof data] as number) / maxValue * 100}%`,
                    left: `calc(50% - ${6 - cityIndex * 3}px)`
                  }}
                  title={`${city.name} (${data.year}): $${(data[city.key as keyof typeof data] as number).toLocaleString()}`}
                ></div>
              ))}
              
              {index === historicalData.length - 1 && (
                <div className="absolute bottom-0 left-1/2 h-full w-px border-l border-dashed border-slate-500 z-10"></div>
              )}
              
              <div className="absolute bottom-0 translate-y-full mt-2 text-xs text-slate-400">
                {data.year}
              </div>
            </div>
          ))}
          
          {/* Forecast data */}
          {forecastData.slice(1).map((data, index) => (
            <div 
              key={`forecast-${data.year}`} 
              className="relative flex-1 flex items-end justify-center h-full group"
            >
              {cities.map((city, cityIndex) => (
                <div
                  key={`${data.year}-${city.key}`}
                  className={`absolute w-1.5 ${city.borderColor} bg-opacity-40 border border-dashed rounded-t-sm transition-all duration-300 ease-out group-hover:w-2.5 group-hover:brightness-125`}
                  style={{ 
                    height: `${(data[city.key as keyof typeof data] as number) / maxValue * 100}%`,
                    left: `calc(50% - ${6 - cityIndex * 3}px)`
                  }}
                  title={`${city.name} (${data.year}): $${(data[city.key as keyof typeof data] as number).toLocaleString()}`}
                ></div>
              ))}
              
              <div className="absolute bottom-0 translate-y-full mt-2 text-xs text-slate-400">
                {data.year}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8 items-center text-xs text-slate-400">
        <div className="w-3 h-1 bg-slate-400 mr-1"></div>
        Historical Data
        <div className="ml-4 w-3 h-1 border border-dashed border-slate-400 mr-1"></div>
        Forecast (Based on AI Predictions)
      </div>
    </div>
  );
};