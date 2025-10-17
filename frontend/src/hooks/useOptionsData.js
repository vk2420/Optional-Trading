import { useState, useEffect } from 'react';
import { fetchOptionChain, fetchStrategies } from '../services/api';

export default function useOptionsData(symbol = 'NIFTY', expiry = '') {
  const [optionChain, setOptionChain] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log(`Fetching data for symbol: ${symbol}, expiry: ${expiry}`);
    Promise.all([
      fetchOptionChain(symbol, expiry),
      fetchStrategies(symbol, expiry)
    ]).then(([chain, strats]) => {
      console.log(`Received ${strats.length} strategies for ${symbol} with expiry ${expiry}`);
      setOptionChain(chain);
      setStrategies(strats);
      setLoading(false);
    });
  }, [symbol, expiry]);

  return { optionChain, strategies, loading };
} 