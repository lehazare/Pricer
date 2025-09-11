import { Table, Checkbox } from "@chakra-ui/react";
import { COLUMNS } from "./constants";

type Props = {
  rowsLength: number;
  selection: number[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function TableHeader({ rowsLength, selection, setSelection }: Props) {
  const indeterminate = selection.length > 0 && selection.length < rowsLength;

  return (
    <Table.Header bg="colors.bg">
      <Table.Row>
        <Table.ColumnHeader fontWeight="bold" borderColor="colors.cyan" borderWidth="2px" color="colors.cyan" key="main-checkbox">
          <Checkbox.Root
            size="sm"
            mt="0.5"
            aria-label="Select all rows"
            checked={indeterminate ? "indeterminate" : selection.length > 0}
            onCheckedChange={(changes) => {
              setSelection(changes.checked ? Array.from({ length: rowsLength }, (_, i) => i) : []);
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Table.ColumnHeader>
        {COLUMNS.map((col) => (
          <Table.ColumnHeader fontWeight="bold" borderColor="colors.cyan" borderWidth="2px" key={col.key} color="colors.cyan">
            {col.label}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
