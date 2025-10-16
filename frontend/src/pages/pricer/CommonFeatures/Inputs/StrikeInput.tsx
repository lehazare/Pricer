import { Box, HoverCard, NumberInput, Portal, Text } from "@chakra-ui/react";
import type { RowData } from "../types";
import { useMemo, useState } from "react";


type Props = {
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function StrikeInput({ rowIndex, rows, setRows }: Props) {
  const row = rows[rowIndex];
  const [open, setOpen] = useState(false)
  const percent = useMemo(() => {
    const strike = Number(row.strike);
    const spot = Number(row.spot);

    if (!spot || isNaN(strike) || isNaN(spot)) return null;

    const pct = (strike / spot) * 100;
    return pct.toFixed(2);
  }, [row.strike, row.spot]);

  if (!row.currency) {
    return <NumberInput.Root size="sm" maxW="100px" minW="70px" disabled><NumberInput.Input /></NumberInput.Root>
  }

  return (
    <HoverCard.Root size="sm" open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{}}>
      <HoverCard.Trigger asChild>
        <Box>
          <NumberInput.Root
            value={String(row.strike)}
            min={0}
            step={0.1}
            maxW="130px"
            minW="80px"
            formatOptions={{
              style: "currency",
              currency: row.currency,
              currencyDisplay: "symbol",
              currencySign: "standard",
            }}
            onValueChange={async (newValue) => {
              setRows((prev) => {
                const newRows = [...prev];
                newRows[rowIndex] = { ...newRows[rowIndex], strike: String(newValue.valueAsNumber) };
                return newRows;
              });
            }}
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        </Box>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content maxWidth="240px" bg={"colors.cyan"}>
            <Box>
              {percent !== null ? (
                <Text>{percent} %</Text>
              ) : (
                <Text>-</Text>
              )}
            </Box>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
}
