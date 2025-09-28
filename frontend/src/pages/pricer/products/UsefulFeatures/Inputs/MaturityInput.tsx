import { NumberInput } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
const apiScheduling = import.meta.env.VITE_API_SCHEDULING;

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function MaturityInput({ col, rowIndex, rows, setRows }: Props) {
  const row = rows[rowIndex];

  return (
    <NumberInput.Root
      defaultValue={col.defaultValue}
      value={row.maturity ?? ""}
      min={0}
      maxW="130px"
      onValueChange={async (maturityObject) => {
        const maturity = maturityObject.value;
        const request = `${apiScheduling}/strikeDate?maturity=${maturity}&countryCode=FR`;
        const response = await fetch(request);
        if (!response.ok) throw new Error("Erreur API");
        const date = await response.json();

        setRows((prev) => {
          const newRows = [...prev];
          newRows[rowIndex] = { ...newRows[rowIndex], strikeDate: date, maturity };
          return newRows;
        });
      }}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
}
