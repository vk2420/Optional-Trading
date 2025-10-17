from pydantic import BaseModel

class MarketData(BaseModel):
    vix: float
    pcr: float
    max_pain: float
    open_interest: float
    rsi: float
    timestamp: str 