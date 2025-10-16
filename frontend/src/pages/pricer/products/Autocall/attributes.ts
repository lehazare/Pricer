import { createListCollection } from "@chakra-ui/react";
import type { ColumnMeta } from "../../CommonFeatures/types";

const tickers = [
  { value: "QQQ", label: "NASDAQ100" },
  { value: "SPY", label: "S&P500" },
  { value: "AAPL", label: "Apple" },
  { value: "NVDA", label: "NVIDIA" },
  { value: "CAC.PA", label: "CAC40" },
  { value: "TSLA", label: "Tesla" },
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

export const COLUMNS: ColumnMeta[] = [
  { key: "underlying", label: "Underlying", values: underlyingCollection, defaultValue: "SPY" },
  { key: "spot", label: "Spot"},
  { key: "nominal", label: "Nominal", defaultValue: "1000000" },
  { key: "vol", label: "Volatility"},
  { key: "rfrate", label: "RFRate"},
  { key: "currency", label: "Currency", disabled: true},
  { key: "barrier", label: "Barrier", defaultValue: "1" },
  { key: "maturity", label: "Maturity", defaultValue: "1" },
  { key: "strikeDate", label: "Strike Date"},
  { key: "scheduling", label: "Scheduling"},
  { key: "price", label: "Price", defaultValue: "10" },
];
