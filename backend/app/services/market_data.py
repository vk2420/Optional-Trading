from app.models.market_data import MarketData
import random
from datetime import datetime

def get_market_data(symbol: str) -> MarketData:
    # Simulate for now; in production, parse from NSE or other APIs
    return MarketData(
        vix=random.uniform(10, 25),
        pcr=random.uniform(0.7, 1.3),
        max_pain=random.uniform(18000, 20000),
        open_interest=random.uniform(1e6, 5e6),
        rsi=random.uniform(30, 70),
        timestamp=datetime.utcnow().isoformat()
    ) 