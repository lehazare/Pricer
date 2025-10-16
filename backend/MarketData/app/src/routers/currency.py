from fastapi import APIRouter
from src.services.yahoo_finance import YahooFinanceService

router = APIRouter()
finance_service = YahooFinanceService()

@router.get("/currency/{symbol}")
def get_currency(symbol: str):
    cur = finance_service.get_currency(symbol)
    return {"Symbol": symbol, "currency": cur}