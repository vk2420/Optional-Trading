import React, { useState } from 'react';
import OptionPairsTable from './OptionPairsTable';
import MetricsCards from './MetricsCards';
import ChartsSection from './ChartsSection';
import AIInsights from './AIInsights';
import IndexSelector from '../Controls/IndexSelector';
import FilterControls from '../Controls/FilterControls';
import RefreshButton from '../Controls/RefreshButton';
import useOptionsData from '../../hooks/useOptionsData';
import useMarketData from '../../hooks/useMarketData';
import useWebSocket from '../../hooks/useWebSocket';
import '../../styles/components.css';

const defaultFilters = { expiry: '', risk: 0, prob: 85 };

const Dashboard = () => {
  const [symbol, setSymbol] = useState('SBICARD');
  const [filters, setFilters] = useState(defaultFilters);
  const { optionChain, strategies, loading } = useOptionsData(symbol, filters.expiry);
  const { marketData } = useMarketData(symbol);
  const wsData = useWebSocket();

  // Always use REST API data when expiry is selected, otherwise use WebSocket data
  const liveOptionChain = wsData.option_chain || optionChain;
  const liveStrategies = filters.expiry ? (strategies || []) : 
                        (wsData.strategies && wsData.strategies.length ? wsData.strategies : (strategies || []));
  const liveMarketData = wsData.market_data || marketData;

  // Expiry options for filter
  const expiries = liveOptionChain?.expiry_dates || [];

  // Filter strategies by expiry, probability
  const filteredStrategies = Array.isArray(liveStrategies) ? liveStrategies.filter(s => {
    if (!s) return false;
    const prob = (s.probability_of_profit || 0);
    const expiryMatch = !filters.expiry || s.expiry_date === filters.expiry;
    const probMatch = !filters.prob || prob >= filters.prob;
    return expiryMatch && probMatch;
  }) : [];

  // Debug logging
  console.log(`Dashboard - Selected expiry: ${filters.expiry}, Strategies count: ${filteredStrategies.length}`);
  if (filteredStrategies.length > 0) {
    console.log(`First strategy expiry: ${filteredStrategies[0].expiry_date}`);
  }

  return (
    <div className="container">
      <h1>Options Trading Dashboard</h1>
      
      {/* Risk Management Banner */}
      <div className="card mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <h3 className="font-semibold text-green-800">Risk Management Active</h3>
            <p className="text-sm text-green-700">
              All strategies have attractive profit margins (&gt;3%) with high-probability (&gt;85%) success rates. 
              Only the best risk-adjusted opportunities are shown.
            </p>
          </div>
        </div>
      </div>
      
      <IndexSelector value={symbol} onChange={setSymbol} />
      <FilterControls filters={filters} onChange={setFilters} expiries={expiries} />
      <RefreshButton onClick={() => window.location.reload()} loading={loading} />
      <MetricsCards data={liveMarketData} />
      <ChartsSection optionChain={liveOptionChain} strategies={filteredStrategies} />
      <OptionPairsTable strategies={filteredStrategies} symbol={symbol} />
      <AIInsights strategies={filteredStrategies} marketData={liveMarketData} />
    </div>
  );
};

export default Dashboard; 