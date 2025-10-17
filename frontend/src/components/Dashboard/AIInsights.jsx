import React from 'react';
import '../../styles/components.css';

const AIInsights = ({ strategies, marketData }) => {
  if (!strategies || !marketData) return <div className="card">Loading AI Insights...</div>;
  if (!strategies.length) return <div className="card">No strategies to analyze.</div>;
  // Simulate sentiment based on PCR/RSI
  const sentiment = marketData.pcr > 1.1 ? 'Bullish' : marketData.pcr < 0.9 ? 'Bearish' : 'Neutral';
  const best = strategies[0];
  return (
    <div className="card">
      <h2>AI Insights</h2>
      <ul>
        <li>Market Sentiment: <b>{sentiment}</b></li>
        <li>Recommended Strategy: <b>{best.name}</b></li>
        <li>Success Probability: <b>{Math.round((best.probability || 0) * 100)}%</b></li>
      </ul>
    </div>
  );
};

export default AIInsights; 