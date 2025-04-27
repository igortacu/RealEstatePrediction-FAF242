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
  
  const allValues = [
    ...historicalData.flatMap(d => [d.sanFrancisco, d.newYork, d.austin, d.seattle, d.miami]),
    ...forecastData.flatMap(d => [d.sanFrancisco, d.newYork, d.austin, d.seattle, d.miami])
  ];
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  
  const cities = [
    { name: 'San Francisco', key: 'sanFrancisco', color: 'bg-blue-500' },
    { name: 'New York', key: 'newYork', color: 'bg-purple-500' },
    { name: 'Austin', key: 'austin', color: 'bg-green-500' },
    { name: 'Seattle', key: 'seattle', color: 'bg-amber-500' },
    { name: 'Miami', key: 'miami', color: 'bg-rose-500' }
  ];

  // Calculate positions for the line chart
  const getYPosition = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  const getXPosition = (index: number, totalPoints: number) => {
    return (index / (totalPoints - 1)) * 100;
  };

  return (
    <div className="relative h-full">
      <div className="flex justify-end space-x-6 mb-8">
        {cities.map(city => (
          <div key={city.name} className="flex items-center">
            <div className={`w-4 h-4 rounded-sm ${city.color} mr-2`}></div>
            <span className="text-sm font-medium text-slate-300">{city.name}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-[calc(100%-100px)] pl-20 pr-8">
        {/* Y-axis labels and grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(fraction => {
          const value = minValue + (maxValue - minValue) * fraction;
          return (
            <div 
              key={fraction}
              className="absolute left-0 w-full h-px bg-slate-800/30"
              style={{ bottom: `${fraction * 100}%` }}
            >
              <span className="absolute -left-20 -translate-y-1/2 text-sm font-medium text-slate-500 whitespace-nowrap">
                ${Math.round(value).toLocaleString()}
              </span>
              <div className="absolute left-0 w-full h-px bg-slate-700/20"></div>
            </div>
          );
        })}
        
        {/* Chart area */}
        <div className="relative h-full">
          {/* Historical data lines */}
          {cities.map(city => (
            <svg
              key={`historical-${city.key}`}
              className="absolute inset-0"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polyline
                points={historicalData.map((data, i) => 
                  `${getXPosition(i, historicalData.length)},${100 - getYPosition(data[city.key as keyof typeof data] as number)}`
                ).join(' ')}
                className={`${city.color} fill-none stroke-2`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}

          {/* Forecast data lines */}
          {cities.map(city => (
            <svg
              key={`forecast-${city.key}`}
              className="absolute inset-0"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polyline
                points={forecastData.map((data, i) => 
                  `${getXPosition(i + historicalData.length - 1, historicalData.length + forecastData.length - 1)},${100 - getYPosition(data[city.key as keyof typeof data] as number)}`
                ).join(' ')}
                className={`${city.color} fill-none stroke-2 stroke-dasharray-2`}
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}

          {/* Data points */}
          {historicalData.map((data, dataIndex) => (
            <React.Fragment key={`points-${data.year}`}>
              {cities.map(city => (
                <div
                  key={`point-${city.key}-${data.year}`}
                  className={`absolute w-2 h-2 rounded-full ${city.color}`}
                  style={{
                    bottom: `${getYPosition(data[city.key as keyof typeof data] as number)}%`,
                    left: `${getXPosition(dataIndex, historicalData.length)}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                />
              ))}
            </React.Fragment>
          ))}

          {/* Forecast points */}
          {forecastData.slice(1).map((data, dataIndex) => (
            <React.Fragment key={`forecast-points-${data.year}`}>
              {cities.map(city => (
                <div
                  key={`forecast-point-${city.key}-${data.year}`}
                  className={`absolute w-2 h-2 rounded-full ${city.color} ring-2 ring-offset-1 ring-offset-slate-900`}
                  style={{
                    bottom: `${getYPosition(data[city.key as keyof typeof data] as number)}%`,
                    left: `${getXPosition(dataIndex + historicalData.length, historicalData.length + forecastData.length - 1)}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                />
              ))}
            </React.Fragment>
          ))}

          {/* X-axis labels */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-between">
            {historicalData.map((data, index) => (
              <div
                key={data.year}
                className="absolute text-sm font-medium text-slate-400"
                style={{
                  left: `${getXPosition(index, historicalData.length)}%`,
                  bottom: '-2rem',
                  transform: 'translateX(-50%)'
                }}
              >
                {data.year}
              </div>
            ))}
            {forecastData.slice(1).map((data, index) => (
              <div
                key={data.year}
                className="absolute text-sm font-medium text-slate-400"
                style={{
                  left: `${getXPosition(index + historicalData.length, historicalData.length + forecastData.length - 1)}%`,
                  bottom: '-2rem',
                  transform: 'translateX(-50%)'
                }}
              >
                {data.year}
              </div>
            ))}
          </div>

          {/* Divider line between historical and forecast */}
          <div 
            className="absolute bottom-0 h-full w-px border-l-2 border-dashed border-slate-500/50"
            style={{
              left: `${getXPosition(historicalData.length - 1, historicalData.length + forecastData.length - 1)}%`
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-center mt-12 items-center space-x-8">
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-blue-500 mr-2"></div>
          <span className="text-sm font-medium text-slate-300">Historical Data</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-blue-500 mr-2" style={{ borderTop: '2px dashed' }}></div>
          <span className="text-sm font-medium text-slate-300">AI-Powered Forecast</span>
        </div>
      </div>
    </div>
  );
};