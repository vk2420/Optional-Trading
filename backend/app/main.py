from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import json
from datetime import datetime
from typing import List

from .api.routes import router
from .services.options_analyzer import OptionsAnalyzer
from .services.ml_predictor import MLPredictor
from .services.nse_scraper import NSEScraper

app = FastAPI(
    title="Options Trading Dashboard API",
    description="Advanced options trading analysis with AI-powered insights",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
options_analyzer = OptionsAnalyzer()
ml_predictor = MLPredictor()
nse_scraper = NSEScraper()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except:
                pass

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "Options Trading Dashboard API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Include API routes under /api/v1
app.include_router(router, prefix="/api/v1")

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Send real-time market data every 5 seconds
            market_data = await get_real_time_data()
            await websocket.send_text(json.dumps(market_data))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def get_real_time_data():
    """Get real-time market data and analysis"""
    try:
        # Scrape NSE data
        nifty_data = await nse_scraper.get_option_chain("NIFTY")
        # Analyze options
        analysis = options_analyzer.analyze_option_chain(nifty_data)
        # Get ML predictions
        predictions = ml_predictor.predict_probabilities(analysis['strategies'])
        # Market indicators
        indicators = await nse_scraper.get_market_indicators()
        return {
            "timestamp": datetime.now().isoformat(),
            "option_chain": nifty_data,
            "analysis": analysis,
            "predictions": predictions,
            "indicators": indicators,
            "status": "success"
        }
    except Exception as e:
        return {
            "timestamp": datetime.now().isoformat(),
            "error": str(e),
            "status": "error"
        }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 