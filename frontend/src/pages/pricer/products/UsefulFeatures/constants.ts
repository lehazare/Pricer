import { createListCollection } from "@chakra-ui/react";
import type { ColumnMeta } from "./types";

export const underlyingCollection = createListCollection({
  items: ["CAC40", "S&P500", "AAPL", "NVDA"].map((label, value) => ({
    label,
    value,
  })),
});

export const currencyCollection = createListCollection({
  items: ["EUR", "USD", "JPY", "GBP"].map((label, value) => ({
    label,
    value,
  })),
});

export const COLUMNS: ColumnMeta[] = [
  { key: "underlying", label: "Underlying", type: "Select", values: underlyingCollection, defaultValue: "CAC40" },
  { key: "spot", label: "Spot", type: "Input" },
  { key: "nominal", label: "Nominal", type: "NumberInput", defaultValue: "1000000" },
  { key: "currency", label: "Currency", type: "Select", values: currencyCollection, defaultValue: "EUR" },
  { key: "barrier", label: "Barrier", type: "PercentInput", defaultValue: "1" },
  { key: "maturity", label: "Maturity", type: "NumberInput", defaultValue: "1" },
  { key: "strike date", label: "Strike Date", type: "DatePicker" },
  { key: "scheduling", label: "Scheduling", type: "SchedulingButton" },
  { key: "Price", label: "Price", type: "Input", defaultValue: "10" },
];
