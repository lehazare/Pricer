from fastapi import APIRouter
from src.services.yahoo_finance import YahooFinanceService

router = APIRouter()
finance_service = YahooFinanceService()

@router.get("/riskfreerate/{symbol}")
def get_risk_free_rate(symbol: str):
    price = finance_service.get_risk_free_rate(symbol)
    return {"Symbol": symbol, "riskFreeRate": price}
