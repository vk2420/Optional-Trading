import { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from '../services/websocket';

export default function useWebSocket() {
  const [data, setData] = useState({ option_chain: null, strategies: [], market_data: null });
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = connectWebSocket((msg) => {
      setData(msg);
    });
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return data;
} 