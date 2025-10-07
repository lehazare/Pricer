from fastapi import APIRouter
from src.services.yahoo_finance import YahooFinanceService

router = APIRouter()
finance_service = YahooFinanceService()

@router.get("/volatility/{symbol}")
def get_vol(symbol: str):
    price = finance_service.get_vol(symbol)
    return {"Symbol": symbol, "vol": price}
