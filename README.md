# 📈 Options Trading Dashboard

A real-time options trading analysis platform for Indian markets (NSE) with AI-powered insights and high-probability strategy detection.

## 🌟 Features

### Core Functionality
- **Real-time Market Data**: Live option chain data for indices (NIFTY, BANKNIFTY, FINNIFTY) and stocks (RELIANCE, TCS, INFY, SBICARD, HDFCBANK, HINDUNILVR, MARUTI)
- **Calendar-based Expiry Selection**: Choose specific expiry dates using an intuitive calendar interface
- **Smart Strategy Detection**: Automatically identifies high-probability short strangle strategies
- **Advanced Filtering**: Filter strategies by profit percentage (>3%) and probability (>85%)
- **Live Updates**: WebSocket-based real-time data streaming

### Trading Intelligence
- **Short Strangle Analysis**: Identifies optimal out-of-money call and put combinations
- **Greeks Calculation**: Real-time Delta, Gamma, Theta, Vega, and IV calculations
- **Probability Analysis**: Black-Scholes model for probability of profit calculations
- **Risk Metrics**: Max profit, max loss, margin requirements, and break-even analysis

### UI/UX
- **Modern Dashboard**: Clean, responsive interface with Tailwind CSS
- **Interactive Charts**: Visual representation of market trends and strategy performance
- **Real-time Metrics**: Live market indicators and performance metrics
- **AI Insights**: Intelligent recommendations based on market conditions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/vk2420/Optional-Trading.git
cd Optional-Trading
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start Backend Server** (from `backend` directory)
```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

2. **Start Frontend Server** (from `frontend` directory)
```bash
cd frontend
npm run dev
```

3. **Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

## 📁 Project Structure

```
Optional-Trading/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes.py          # REST API endpoints
│   │   │   └── websocket.py       # WebSocket handlers
│   │   ├── models/
│   │   │   ├── market_data.py     # Data models
│   │   │   ├── option_chain.py    # Option chain models
│   │   │   └── strategies.py      # Strategy models
│   │   ├── services/
│   │   │   ├── black_scholes.py   # Options pricing
│   │   │   ├── ml_predictor.py    # ML predictions
│   │   │   ├── nse_scraper.py     # NSE data scraping
│   │   │   └── options_analyzer.py # Strategy analysis
│   │   └── main.py                # FastAPI application
│   └── requirements.txt           # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Controls/          # UI controls
│   │   │   │   ├── IndexSelector.jsx
│   │   │   │   ├── ExpiryCalendar.jsx
│   │   │   │   └── FilterControls.jsx
│   │   │   └── Dashboard/         # Dashboard components
│   │   │       ├── Dashboard.jsx
│   │   │       ├── OptionPairsTable.jsx
│   │   │       ├── MetricsCards.jsx
│   │   │       └── ChartsSection.jsx
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useOptionsData.js
│   │   │   ├── useMarketData.js
│   │   │   └── useWebSocket.js
│   │   └── services/              # API services
│   │       ├── api.js
│   │       └── websocket.js
│   └── package.json               # Node dependencies
└── docker-compose.yml             # Docker configuration
```

## 🔧 Technology Stack

### Backend
- **FastAPI**: Modern, high-performance web framework
- **Python 3.11**: Core language
- **Requests**: HTTP library for NSE data
- **NumPy/SciPy**: Mathematical computations
- **WebSockets**: Real-time data streaming

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **Recharts**: Data visualization
- **WebSocket Client**: Real-time updates

## 📊 API Endpoints

### REST API
- `GET /api/v1/option-chain?symbol={SYMBOL}&expiry={DATE}` - Fetch option chain data
- `GET /api/v1/strategies?symbol={SYMBOL}&expiry={DATE}` - Get filtered strategies
- `GET /api/v1/market-indicators?symbol={SYMBOL}` - Retrieve market indicators

### WebSocket
- `ws://localhost:8000/ws` - Real-time market data stream

## 🎯 Strategy Filtering Criteria

The system identifies high-probability strategies using:
- **Profit Threshold**: > 3% (greater than 3%)
- **Probability of Profit**: > 85%
- **Strike Selection**: Optimal OTM strikes based on Greeks
- **Risk Management**: Maximum loss and margin calculations

## 🔐 Data Sources

- **Primary**: NSE (National Stock Exchange of India) API
- **Fallback**: Realistic mock data with accurate market conditions
- **Expiry Dates**: Sept 30, Oct 31, Nov 28, Dec 26 (current market expiries)

## 🚨 Important Notes

### Data Accuracy
- The system uses real-time NSE data when available
- Fallback data is based on actual market conditions
- Strike prices are generated realistically (not below 85% of spot price)
- Premiums reflect actual market ranges

### Supported Instruments
**Indices:**
- NIFTY
- BANKNIFTY
- FINNIFTY

**Stocks:**
- RELIANCE (Reliance Industries)
- TCS (Tata Consultancy Services)
- INFY (Infosys)
- SBICARD (SBI Cards)
- HDFCBANK (HDFC Bank)
- HINDUNILVR (Hindustan Unilever)
- MARUTI (Maruti Suzuki)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This tool is for educational and research purposes only. Trading in options involves substantial risk and is not suitable for all investors. Always consult with a qualified financial advisor before making trading decisions.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the Indian trading community**

