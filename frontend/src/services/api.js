const API_BASE = 'http://localhost:8000';

export async function fetchOptionChain(symbol = 'SBICARD', expiry = '') {
  const url = expiry ? 
    `${API_BASE}/api/v1/option-chain?symbol=${symbol}&expiry=${expiry}` :
    `${API_BASE}/api/v1/option-chain?symbol=${symbol}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchStrategies(symbol = 'SBICARD', expiry = '') {
  const url = expiry ? 
    `${API_BASE}/api/v1/strategies?symbol=${symbol}&expiry=${expiry}` :
    `${API_BASE}/api/v1/strategies?symbol=${symbol}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchMarketData(symbol = 'SBICARD') {
  const res = await fetch(`${API_BASE}/api/v1/market-data?symbol=${symbol}`);
  return res.json();
}

export async function predictProbability(features) {
  const res = await fetch(`${API_BASE}/api/v1/predict-probability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features),
  });
  return res.json();
} 