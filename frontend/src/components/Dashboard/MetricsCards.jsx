import React from 'react';
import '../../styles/components.css';

const MetricsCards = ({ data }) => {
  const loading = !data;
  
  const metrics = [
    {
      label: 'VIX',
      value: loading ? '...' : data.vix?.toFixed(2) ?? 'N/A',
      icon: '📊',
      color: '#667eea',
      description: 'Volatility Index'
    },
    {
      label: 'PCR',
      value: loading ? '...' : data.pcr?.toFixed(2) ?? 'N/A',
      icon: '⚖️',
      color: '#48bb78',
      description: 'Put-Call Ratio'
    },
    {
      label: 'Max Pain',
      value: loading ? '...' : data.max_pain?.toLocaleString() ?? 'N/A',
      icon: '🎯',
      color: '#ed8936',
      description: 'Maximum Pain Point'
    },
    {
      label: 'Min Profit',
      value: '&gt;1%',
      icon: '📈',
      color: '#10b981',
      description: 'Minimum Profit Threshold'
    },
    {
      label: 'Min Prob',
      value: '85%',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Probability Threshold'
    },
    {
      label: 'Risk Control',
      value: 'Active',
      icon: '🛡️',
      color: '#8b5cf6',
      description: 'Profit Limited'
    }
  ];

  return (
    <div className="grid grid-2 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{metric.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{metric.label}</h3>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div 
              className="text-3xl font-bold mb-2"
              style={{ color: metric.color }}
            >
              {metric.value}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: loading ? '0%' : `${Math.min(100, (parseFloat(metric.value) || 0) / 100)}%`,
                  backgroundColor: metric.color 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards; 