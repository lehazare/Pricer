from fastapi import HTTPException
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