import { Table, Checkbox } from "@chakra-ui/react";
import type { RowData, SchedulingRow } from "./types";
import InputFactory from "./InputFactory";
import type { ColumnMeta } from "../CommonFeatures/types";

type Props = {
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
  selection: number[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
  schedulingData: { [rowIndex: number]: SchedulingRow };
  setSchedulingData: React.Dispatch<
    React.SetStateAction<{ [rowIndex: number]: SchedulingRow }>
  >;
  columns: ColumnMeta[];
};

export default function TableRow({ rowIndex, rows, setRows, selection, setSelection, schedulingData, setSchedulingData, columns }: Props) {
  return (
    <Table.Row key={rowIndex}>
      <Table.Cell borderColor="colors.cyan" borderWidth="2px" key="checkbox">
        <Checkbox.Root
          size="sm"
          mt="0.5"
          aria-label="Select row"
          checked={selection.includes(rowIndex)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked ? [...prev, rowIndex] : prev.filter((idx) => idx !== rowIndex),
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      {columns.map((col) => (
        <Table.Cell borderColor="colors.cyan" borderWidth="2px" key={col.key}>
          <InputFactory
            col={col}
            rowIndex={rowIndex}
            rows={rows}
            setRows={setRows}
            schedulingData={schedulingData}
            setSchedulingData={setSchedulingData}
          />
        </Table.Cell>
      ))}
    </Table.Row>
  );
}
