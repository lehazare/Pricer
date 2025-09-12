import { createListCollection } from "@chakra-ui/react";
import type { ColumnMeta } from "./types";

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
  { key: "underlying", label: "Underlying", type: "Select", values: underlyingCollection, defaultValue: "SPY" },
  { key: "spot", label: "Spot", type: "Input" },
  { key: "nominal", label: "Nominal", type: "NumberInput", defaultValue: "1000000" },
  //{ key: "currency", label: "Currency", type: "Select", values: currencyCollection, defaultValue: "EUR" },
  { key: "barrier", label: "Barrier", type: "PercentInput", defaultValue: "1" },
  { key: "maturity", label: "Maturity", type: "NumberInput", defaultValue: "1" },
  { key: "strike date", label: "Strike Date", type: "DatePicker" },
  { key: "scheduling", label: "Scheduling", type: "SchedulingButton" },
  { key: "Price", label: "Price", type: "Input", defaultValue: "10" },
];
