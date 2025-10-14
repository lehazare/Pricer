import { NumberInput } from "@chakra-ui/react";
import type { RowData } from "../types";


type Props = {
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function StrikeInput({ rowIndex, rows, setRows }: Props) {
  const row = rows[rowIndex];

  return (
    <NumberInput.Root
      value={row.strike}
      min={0}
      step={0.1}
      maxW="130px"
      minW="80px"
      onValueChange={async (newValue) => {
        setRows((prev) => {
        const newRows = [...prev];
        newRows[rowIndex] = { ...newRows[rowIndex], strike : newValue.value };
        return newRows;
      });
      }}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
