import { useState, useEffect } from 'react';
import { fetchMarketData } from '../services/api';

export default function useMarketData(symbol = 'NIFTY') {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMarketData(symbol).then((data) => {
      setMarketData(data);
      setLoading(false);
    });
  }, [symbol]);

  return { marketData, loading };
} 