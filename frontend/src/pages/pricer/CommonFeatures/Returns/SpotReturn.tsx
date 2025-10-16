import { NumberInput } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";


type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
};

export default function SpotReturn({ col, rowIndex, rows }: Props) {
  const row = rows[rowIndex];

  if (!row.currency) {
    return <NumberInput.Root size="sm" maxW="100px" minW="70px" disabled><NumberInput.Input /></NumberInput.Root>
  }

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
        currency: row.currency,
        currencyDisplay: "symbol",
        currencySign: "standard",
      }}>
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
