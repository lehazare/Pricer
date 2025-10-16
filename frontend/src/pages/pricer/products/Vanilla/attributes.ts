import { createListCollection } from "@chakra-ui/react";
import type { ColumnMeta } from "../../CommonFeatures/types";

const tickers = [
  { value: "QQQ", label: "NASDAQ100" },
  { value: "SPY", label: "S&P500" },
  { value: "AAPL", label: "Apple" },
  { value: "NVDA", label: "NVIDIA" },
  { value: "^FCHI", label: "CAC40" },
  { value: "TSLA", label: "Tesla" },
  { value: "BNP.PA", label: "BNP" },  
];

export const underlyingCollection = createListCollection({
  items: tickers,
});

export const currencyCollection = createListCollection({
  items: ["EUR", "USD", "JPY", "GBP"].map((label, value) => ({
    label,
    value,
  })),
});

const optionType = [
  { value: "call", label: "Call" },
  { value: "put", label: "Put" },
];

export const typeCollection = createListCollection({
  items: optionType,
});


export const COLUMNS: ColumnMeta[] = [
  { key: "type", label: "Type", values: typeCollection, defaultValue: "call" },
  { key: "underlying", label: "Underlying", values: underlyingCollection, defaultValue: "BNP.PA" },
  { key: "spot", label: "Spot"},
  { key: "currency", label: "Currency", disabled: true},
  { key: "strike", label: "Strike"},
  { key: "vol", label: "Volatility"},
  { key: "rfrate", label: "RFRate"},
  { key: "maturity", label: "Maturity", defaultValue: "1" },
  { key: "strikeDate", label: "Strike Date"},
  { key: "price", label: "Price", defaultValue: "10" },
];
