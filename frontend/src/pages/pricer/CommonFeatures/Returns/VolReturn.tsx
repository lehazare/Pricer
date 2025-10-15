import { NumberInput } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
};

export default function VolReturn({ col, rowIndex, rows }: Props) {
  const row = rows[rowIndex];
  const vol = Number(row[col.key]) * 100

  return (
    <NumberInput.Root
      bg="colors.bg"
      color="colors.white"
      size="sm"
      maxW="100px"
      minW="70px"
      disabled
      value={String(vol)}
      formatOptions={{
          style: "percent",
        }}>
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
