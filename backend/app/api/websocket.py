from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.nse_scraper import fetch_option_chain
from app.services.options_analyzer import analyze_strategies
from app.services.market_data import get_market_data
import asyncio

router = APIRouter()

@router.websocket("/ws/updates")
async def websocket_updates(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            symbol = "NIFTY"  # Could be parameterized
            option_chain = fetch_option_chain(symbol)
            strategies = analyze_strategies(option_chain)
            market_data = get_market_data(symbol)
            await websocket.send_json({
                "option_chain": option_chain.dict(),
                "strategies": [s.dict() for s in strategies],
                "market_data": market_data.dict(),
            })
            await asyncio.sleep(30)
    except WebSocketDisconnect:
        pass 