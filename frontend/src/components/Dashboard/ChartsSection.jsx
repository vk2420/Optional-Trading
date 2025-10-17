import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import '../../styles/components.css';

const COLORS = ['#4caf50', '#f44336'];

const ChartsSection = ({ optionChain, strategies }) => {
  // IV Smile data
  const ivSmileData = (optionChain?.contracts || [])
    .filter(c => c.iv && c.strike)
    .map(c => ({ strike: c.strike, iv: c.iv }));

  // P/L Curve for best strategy (simulate for now)
  const best = strategies && strategies[0];
  const plCurveData = best ? [
    { price: best.legs[0].strike - 200, pl: -best.max_loss },
    { price: best.legs[0].strike, pl: 0 },
    { price: best.legs[0].strike + 200, pl: best.max_profit },
  ] : [];

  // Risk Distribution
  const riskData = best ? [
    { name: 'Max Profit', value: best.max_profit },
    { name: 'Max Loss', value: best.max_loss },
  ] : [];

  return (
    <div style={{display:'flex', gap:'24px', marginBottom:'24px'}}>
      <div className="card" style={{flex:2}}>
        <h3>IV Smile</h3>
        {ivSmileData.length ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={ivSmileData}>
              <XAxis dataKey="strike" />
              <YAxis dataKey="iv" />
              <Tooltip />
              <Line type="monotone" dataKey="iv" stroke="#0070f3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : <div style={{height:'180px', background:'#f0f2f5', borderRadius:'8px', display:'flex',alignItems:'center',justifyContent:'center'}}>No Data</div>}
      </div>
      <div className="card" style={{flex:2}}>
        <h3>P/L Curve</h3>
        {plCurveData.length ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={plCurveData}>
              <XAxis dataKey="price" />
              <YAxis dataKey="pl" />
              <Tooltip />
              <Line type="monotone" dataKey="pl" stroke="#4caf50" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : <div style={{height:'180px', background:'#f0f2f5', borderRadius:'8px', display:'flex',alignItems:'center',justifyContent:'center'}}>No Data</div>}
      </div>
      <div className="card" style={{flex:1}}>
        <h3>Risk Distribution</h3>
        {riskData.length ? (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {riskData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : <div style={{height:'180px', background:'#f0f2f5', borderRadius:'8px', display:'flex',alignItems:'center',justifyContent:'center'}}>No Data</div>}
      </div>
    </div>
  );
};

export default ChartsSection; 