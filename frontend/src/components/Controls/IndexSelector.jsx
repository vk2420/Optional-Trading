import React from 'react';

const indices = [
  { label: 'Nifty', value: 'NIFTY', icon: '📈', type: 'Index' },
  { label: 'Bank Nifty', value: 'BANKNIFTY', icon: '🏦', type: 'Index' },
  { label: 'Fin Nifty', value: 'FINNIFTY', icon: '💰', type: 'Index' },
];

const stocks = [
  { label: 'Reliance Industries', value: 'RELIANCE', icon: '🛢️', type: 'Stock' },
  { label: 'TCS', value: 'TCS', icon: '💻', type: 'Stock' },
  { label: 'Infosys', value: 'INFY', icon: '🔧', type: 'Stock' },
  { label: 'SBI Cards', value: 'SBICARD', icon: '💳', type: 'Stock' },
  { label: 'HDFC Bank', value: 'HDFCBANK', icon: '🏛️', type: 'Stock' },
  { label: 'Hindustan Unilever', value: 'HINDUNILVR', icon: '🧴', type: 'Stock' },
  { label: 'Maruti Suzuki', value: 'MARUTI', icon: '🚗', type: 'Stock' },
];

const IndexSelector = ({ value, onChange }) => {
  const allOptions = [...indices, ...stocks];
  const currentOption = allOptions.find(opt => opt.value === value);
  
  return (
    <div className="card mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <div>
          <h3 className="text-lg font-semibold">Select Underlying</h3>
          <p className="text-sm text-gray-600">Choose the index or stock for options analysis</p>
        </div>
      </div>
      
      {/* Indices Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>📊</span> Indices
        </h4>
        <div className="flex gap-2 flex-wrap">
          {indices.map(idx => (
            <button
              key={idx.value}
              onClick={() => onChange(idx.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                value === idx.value 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <span>{idx.icon}</span>
              <span>{idx.label}</span>
              {value === idx.value && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stocks Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>🏢</span> Stocks
        </h4>
        <div className="flex gap-2 flex-wrap">
          {stocks.map(stock => (
            <button
              key={stock.value}
              onClick={() => onChange(stock.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                value === stock.value 
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <span>{stock.icon}</span>
              <span>{stock.label}</span>
              {value === stock.value && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">ℹ️</span>
          <span className="text-sm text-blue-700">
            Currently analyzing: <strong>{currentOption?.label}</strong> ({currentOption?.type})
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndexSelector; 