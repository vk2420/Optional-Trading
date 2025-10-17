const WS_URL = 'ws://localhost:8000/ws';

export function connectWebSocket(onMessage) {
  const ws = new WebSocket(WS_URL);
  ws.onopen = () => console.log('WebSocket connected');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
  ws.onerror = (err) => console.error('WebSocket error', err);
  ws.onclose = () => console.log('WebSocket closed');
  return ws;
} 