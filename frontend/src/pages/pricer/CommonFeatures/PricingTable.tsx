import { VStack, Table, Button, HStack, ActionBar, Portal } from "@chakra-ui/react";
import { useState } from "react";
import type { ColumnMeta, RowData, SchedulingRow } from "./types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
const apiPricing = import.meta.env.VITE_API_PRICING;


type Props = {
  columns: ColumnMeta[];
}

export default function PricingTable({ columns }: Props) {
  const [rows, setRows] = useState<RowData[]>([{} as RowData]);
  const [schedulingData, setSchedulingData] = useState<{ [rowIndex: number]: SchedulingRow }>({});
  const [selection, setSelection] = useState<number[]>([0]);

  const hasSelection = selection.length > 0;

  const handlePrice = async () => {
    try {
      if (selection.length === 0) return;

      const newRows = [...rows];

      for (const idx of selection) {
        const row = rows[idx];

        const payload = {
          S0: row.spot,
          K: Number(row.strike),
          T: parseFloat(row.maturity),
          R: row.rfrate,
          Sigma: row.vol,
          IsCall: row.type == "call",
          type: "vanilla",
        };

        const response = await fetch(`${apiPricing}/PriceWithMonteCarlo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API pricing failed for row ${idx}`);
        }

        const data = await response.json();
  
        newRows[idx] = { ...row, price: data.value.price };
      }

      setRows(newRows);
    } catch (error) {
      console.error("Error pricing rows:", error);
    }
  };

  const addRow = () => {
    setRows([...rows, {} as RowData]);
    setSelection([...selection, rows.length]);
  };

  return (
    <VStack>
      <Table.ScrollArea borderWidth="0" maxW="100%">
        <Table.Root variant="outline" size="sm" bg="colors.bg" borderColor="colors.cyan" borderWidth="2px">
          <TableHeader rowsLength={rows.length} selection={selection} setSelection={setSelection} columns={columns} />
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
                columns={columns}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>


      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content bg={"colors.purple"}>
              <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm" onClick={handlePrice}>
                Price
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
