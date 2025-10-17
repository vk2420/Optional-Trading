from pydantic import BaseModel
from typing import List, Optional

class OptionContract(BaseModel):
    strike: float
    type: str  # 'CE' or 'PE'
    last_price: float
    bid: float
    ask: float
    iv: float
    delta: float
    gamma: float
    theta: float
    vega: float
    oi: int
    volume: int
    expiry: str

class OptionChain(BaseModel):
    symbol: str
    expiry: str
    contracts: List[OptionContract] 