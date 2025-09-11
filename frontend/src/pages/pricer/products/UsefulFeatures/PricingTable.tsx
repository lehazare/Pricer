import { VStack, Table, Button, HStack, ActionBar, Portal } from "@chakra-ui/react";
import { useState } from "react";
import type { RowData } from "./types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function PricingTable() {
  const [rows, setRows] = useState<RowData[]>([{} as RowData]);
  const [schedulingData, setSchedulingData] = useState<{ [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } }>({});
  const [selection, setSelection] = useState<number[]>([0]);

  const hasSelection = selection.length > 0;

  const addRow = () => {
    setRows([...rows, {} as RowData]);
    setSelection([...selection, rows.length]);
  };

  return (
    <VStack>
      <Table.Root variant="outline" size="sm" bg="colors.bg" borderColor="colors.cyan" borderWidth="2px">
        <TableHeader rowsLength={rows.length} selection={selection} setSelection={setSelection} />
        <Table.Body>
          {rows.map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              rowIndex={rowIndex}
              rows={rows}
              setRows={setRows}
              selection={selection}
              setSelection={setSelection}
              schedulingData={schedulingData}
              setSchedulingData={setSchedulingData}
            />
          ))}
        </Table.Body>
      </Table.Root>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                Price
              </Button>
              <Button variant="outline" size="sm">
                Schedule
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>

      <HStack w="100%" justify="space-evenly">
        <Button bg="colors.cyan" onClick={addRow}>
          Add a row
        </Button>
      </HStack>
    </VStack>
  );
}
