import { NumberInput } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
import { useState } from "react";
const apiMarketData = import.meta.env.VITE_API_MARKETDATA;


type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
};

export default function SpotReturn({ col, rowIndex, rows }: Props) {
  const row = rows[rowIndex];

  console.log(row.currency)

  return (
    <NumberInput.Root
      bg="colors.bg"
      color="colors.white"
      size="sm"
      maxW="100px"
      minW="70px"
      disabled
      value={String(row[col.key])}
      formatOptions={{
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        currencySign: "standard",
      }}>
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
