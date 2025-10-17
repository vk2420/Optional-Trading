import React from 'react';
import '../../styles/components.css';

const OptionPairsTable = ({ strategies, symbol = 'NIFTY' }) => {
  if (!strategies) return (
    <div className="card text-center">
      <div className="loading text-2xl mb-4">⏳</div>
      <p className="text-gray-600">Loading strategies...</p>
    </div>
  );
  
  if (!strategies.length) return (
    <div className="card text-center">
      <div className="text-4xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2">No Strategies Found</h3>
      <p className="text-gray-600">Try adjusting your filters or check back later.</p>
    </div>
  );

  const getProbabilityColor = (prob) => {
    if (prob >= 90) return { bg: '#d4f7e1', color: '#1a7f37', icon: '🟢' };
    if (prob >= 85) return { bg: '#ffe6b3', color: '#b26a00', icon: '🟡' };
    return { bg: '#ffd6d6', color: '#b20000', icon: '🔴' };
  };

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <h2 className="text-2xl font-bold">Best Strangle Pairs</h2>
            <p className="text-gray-600">High probability strategies for {symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Total Strategies</div>
          <div className="text-2xl font-bold text-primary">{strategies.length}</div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Leg 1</th>
              <th>Leg 2</th>
              <th>Expiry</th>
              <th>Probability</th>
              <th>Max Profit %</th>
              <th>Net Premium</th>
              <th>Max Loss</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((s, i) => {
              const probColor = getProbabilityColor(s.probability_of_profit);
              return (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📈</span>
                      <div>
                        <div className="font-semibold">{s.strategy_type}</div>
                        <div className="text-sm text-gray-500">#{i + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <div className="font-semibold text-red-700">
                        {s.legs[0].action} {s.legs[0].type}
                      </div>
                      <div className="text-sm text-gray-600">
                        Strike: {s.legs[0].strike}
                      </div>
                      <div className="text-sm font-medium">
                        ₹{s.legs[0].premium}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <div className="font-semibold text-green-700">
                        {s.legs[1].action} {s.legs[1].type}
                      </div>
                      <div className="text-sm text-gray-600">
                        Strike: {s.legs[1].strike}
                      </div>
                      <div className="text-sm font-medium">
                        ₹{s.legs[1].premium}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-700">
                        {s.expiry_date ? new Date(s.expiry_date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: '2-digit' 
                        }) : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {s.days_to_expiry ? `${s.days_to_expiry} days` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{probColor.icon}</span>
                      <span 
                        className="chip"
                        style={{
                          background: probColor.bg,
                          color: probColor.color
                        }}
                      >
                        {Math.round(s.probability_of_profit)}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        {s.profit_percentage?.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">Max Profit</div>
                      {s.profit_percentage > 3.0 && (
                        <div className="text-xs text-green-600 font-medium">✓ High Return</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        ₹{s.net_premium?.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">Credit</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <div className="text-lg font-bold text-danger">
                        ₹{s.max_loss?.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">Risk</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <h4 className="font-semibold">Strategy Summary</h4>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          These strangle strategies offer high probability of profit with attractive returns. 
          All strategies have profit greater than 1% with probability above 85%.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Min Profit: &gt; 1%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Probability: &gt; 85%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">ℹ</span>
            <span>Real-time Market Data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">ℹ</span>
            <span>High-Quality Strategies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPairsTable; 