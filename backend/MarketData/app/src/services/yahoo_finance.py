from fastapi import HTTPException
import numpy as np
import yfinance as yf

class YahooFinanceService:
    
    def get_price(self, symbol: str) -> float:
        try:
            ticker = yf.Ticker(symbol)
            data = ticker.history(period="1d")
            if data.empty:
                raise ValueError("No data found for this symbol.")
            price = data["Close"].iloc[-1]
            return round(float(price), 2)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching data for {symbol}: {e}")
        
    def get_vol(self, symbol: str) -> float:
        try:
            ticker = yf.Ticker(symbol)
            data = ticker.history(period="2y")
            if data.empty:
                raise ValueError("No data found for this symbol.")
            data["LogReturn"] = np.log(data["Close"] / data["Close"].shift(1))
            data = data.dropna()
            vol_daily = data["LogReturn"].std()
            vol_annual = vol_daily * np.sqrt(252)
            return round(float(vol_annual), 2)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching data for {symbol}: {e}")
        
    def get_risk_free_rate(self, symbol: str) -> float:
        try:
            ticker = yf.Ticker(symbol)
            data = ticker.history(period="1d")
            if data.empty:
                raise ValueError("No data found for this symbol.")
            yield_last = data["Close"].iloc[-1]
            return round(float(yield_last) / 100, 2)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching risk-free rate for {symbol}: {e}")