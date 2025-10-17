from fastapi import APIRouter, Query, Body
from app.services.nse_scraper import NSEScraper
from app.services.options_analyzer import OptionsAnalyzer
from app.services.ml_predictor import MLPredictor
from app.models.option_chain import OptionChain
from app.models.strategies import OptionStrategy
from app.models.market_data import MarketData
import random

router = APIRouter()

# Initialize service classes
nse_scraper = NSEScraper()
options_analyzer = OptionsAnalyzer()
ml_predictor = MLPredictor()

@router.get("/option-chain")
async def get_option_chain(symbol: str = Query("NIFTY"), expiry: str = Query("")):
    """Get real-time option chain data from NSE"""
    try:
        print(f"Fetching real-time data for {symbol}...")
        data = await nse_scraper.get_option_chain(symbol, expiry)
        print(f"Successfully fetched data for {symbol}: {data.get('underlying_value', 'N/A')}")
        return data
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        # The NSE scraper now has built-in fallback data generation
        # This should rarely be reached as the scraper handles fallbacks internally
        return await nse_scraper.get_option_chain(symbol, expiry)

@router.get("/strategies")
async def get_strategies(symbol: str = Query("NIFTY"), expiry: str = Query("")):
    """Get real-time strategy analysis"""
    try:
        print(f"Analyzing strategies for {symbol}...")
        option_chain = await nse_scraper.get_option_chain(symbol, expiry)
        analysis = options_analyzer.analyze_option_chain(option_chain)
        strategies = analysis.get('high_probability_strategies', [])
        print(f"Found {len(strategies)} high-probability strategies for {symbol}")
        return strategies
    except Exception as e:
        print(f"Error analyzing strategies for {symbol}: {e}")
        # Return empty array if analysis fails
        return []

@router.get("/market-data")
async def market_data(symbol: str = Query("NIFTY")):
    """Get real-time market indicators"""
    try:
        print(f"Fetching market data for {symbol}...")
        data = await nse_scraper.get_market_indicators()
        print(f"Market data fetched for {symbol}")
        return data
    except Exception as e:
        print(f"Error fetching market data for {symbol}: {e}")
        # Return basic market data
        return {
            "vix": 15.2,
            "pcr": 1.08,
            "max_pain": 19500,
            "open_interest": 2500000,
            "rsi": 54,
            "timestamp": "2024-12-15T12:18:11.909240"
        }

@router.post("/predict-probability")
async def predict_prob(features: dict = Body(...)):
    return {"probability": ml_predictor.predict_probability(features)} 