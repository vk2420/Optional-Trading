import numpy as np
from scipy.stats import norm
from typing import Optional
import math

class BlackScholesCalculator:
    """
    Advanced Black-Scholes calculator for options pricing and Greeks
    """
    def __init__(self):
        self.risk_free_rate = 0.065  # 6.5% risk-free rate

    def call_price(self, S: float, K: float, T: float, r: float, sigma: float) -> float:
        if T <= 0:
            return max(S - K, 0)
        d1 = self._d1(S, K, T, r, sigma)
        d2 = self._d2(d1, sigma, T)
        call_price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        return max(call_price, 0)

    def put_price(self, S: float, K: float, T: float, r: float, sigma: float) -> float:
        if T <= 0:
            return max(K - S, 0)
        d1 = self._d1(S, K, T, r, sigma)
        d2 = self._d2(d1, sigma, T)
        put_price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        return max(put_price, 0)

    def calculate_greeks(self, S: float, K: float, T: float, r: float, sigma: float, option_type: str = 'call') -> dict:
        if T <= 0:
            return self._zero_greeks()
        d1 = self._d1(S, K, T, r, sigma)
        d2 = self._d2(d1, sigma, T)
        greeks = {}
        # Delta
        if option_type.lower() == 'call':
            greeks['delta'] = norm.cdf(d1)
        else:
            greeks['delta'] = norm.cdf(d1) - 1
        # Gamma
        greeks['gamma'] = norm.pdf(d1) / (S * sigma * np.sqrt(T))
        # Theta
        if option_type.lower() == 'call':
            greeks['theta'] = (
                -(S * norm.pdf(d1) * sigma) / (2 * np.sqrt(T))
                - r * K * np.exp(-r * T) * norm.cdf(d2)
            ) / 365
        else:
            greeks['theta'] = (
                -(S * norm.pdf(d1) * sigma) / (2 * np.sqrt(T))
                + r * K * np.exp(-r * T) * norm.cdf(-d2)
            ) / 365
        # Vega
        greeks['vega'] = S * norm.pdf(d1) * np.sqrt(T) / 100
        # Rho
        if option_type.lower() == 'call':
            greeks['rho'] = K * T * np.exp(-r * T) * norm.cdf(d2) / 100
        else:
            greeks['rho'] = -K * T * np.exp(-r * T) * norm.cdf(-d2) / 100
        return greeks

    def implied_volatility(self, market_price: float, S: float, K: float, T: float, r: float, option_type: str = 'call', max_iterations: int = 100, tolerance: float = 1e-6) -> Optional[float]:
        if T <= 0:
            return None
        sigma = 0.2
        for i in range(max_iterations):
            if option_type.lower() == 'call':
                price = self.call_price(S, K, T, r, sigma)
            else:
                price = self.put_price(S, K, T, r, sigma)
            diff = market_price - price
            if abs(diff) < tolerance:
                return sigma
            vega = self.calculate_greeks(S, K, T, r, sigma, option_type)['vega'] * 100
            if vega == 0:
                break
            sigma += diff / vega
            sigma = max(0.001, min(5.0, sigma))
        return sigma if sigma > 0.001 else None

    def _d1(self, S: float, K: float, T: float, r: float, sigma: float) -> float:
        return (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))

    def _d2(self, d1: float, sigma: float, T: float) -> float:
        return d1 - sigma * np.sqrt(T)

    def _zero_greeks(self) -> dict:
        return {
            'delta': 0.0,
            'gamma': 0.0,
            'theta': 0.0,
            'vega': 0.0,
            'rho': 0.0
        } 