from fastapi import APIRouter
from src.services.yahoo_finance import YahooFinanceService

router = APIRouter()
finance_service = YahooFinanceService()

@router.get("/currency/{symbol}")
def get_vol(symbol: str):
    cur = finance_service.get_currency(symbol)
    return {"Symbol": symbol, "vol": cur}