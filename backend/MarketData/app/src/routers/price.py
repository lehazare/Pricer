from fastapi import APIRouter
from src.services.yahoo_finance import YahooFinanceService

router = APIRouter()
finance_service = YahooFinanceService()

@router.get("/price/{symbol}")
def get_price(symbol: str):
    price = finance_service.get_price(symbol)
    return {"Symbol": symbol, "spotPrice": price}
