import string
from fastapi import HTTPException
import numpy as np
import yfinance as yf

def get_bond_from_cur(symbol: str) -> string:
        match symbol:
            case "USD":
                return "^TNX"
            case "EUR":
                return "FR10Y.GBOND"
            case "GBP":
                return "UK10Y.GBOND"
            case _:
                return "^TNX"

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
            return round(float(vol_annual), 4)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching data for {symbol}: {e}")
        
    def get_risk_free_rate(self, symbol: str) -> float:
        try:
            bond = get_bond_from_cur(symbol)
            ticker = yf.Ticker(bond)
            data = ticker.history(period="1d")
            if data.empty:
                raise ValueError("No data found for this bond.")
            yield_last = data["Close"].iloc[-1]
            return round(float(yield_last) / 100, 4)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching risk-free rate for {bond}: {e}")
        
    def get_currency(self, symbol: str) -> str:
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            currency = info.get("currency")
            if not currency:
                raise ValueError("Currency not available for this symbol.")
            return currency
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching currency for {symbol}: {e}")