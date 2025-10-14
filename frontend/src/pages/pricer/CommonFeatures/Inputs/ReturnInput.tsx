import { Input } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
};

export default function ReturnInput({ col, rowIndex, rows }: Props) {
  const row = rows[rowIndex];
  return (
    <Input
      bg="colors.bg"
      color="colors.white"
      size="sm"
      maxW="100px"
      minW="70px"
      disabled
      value={row[col.key]}
    />
  );
}
