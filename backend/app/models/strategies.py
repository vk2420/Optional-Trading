from pydantic import BaseModel
from typing import List

class OptionLeg(BaseModel):
    strike: float
    type: str  # 'CE' or 'PE'
    action: str  # 'BUY' or 'SELL'
    premium: float
    delta: float
    iv: float

class OptionStrategy(BaseModel):
    name: str
    legs: List[OptionLeg]
    probability: float
    risk_reward: float
    max_profit: float
    max_loss: float
    expiry: str 