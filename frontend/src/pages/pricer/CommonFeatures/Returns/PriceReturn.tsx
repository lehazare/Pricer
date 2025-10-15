import { Box, HoverCard, Input, Portal, Text } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
import { useState, useMemo } from "react";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
};

export default function PriceReturn({ col, rowIndex, rows }: Props) {
  const row = rows[rowIndex];
  const [open, setOpen] = useState(false)
  const percent = useMemo(() => {
    const price = Number(row.price);
    const spot = Number(row.spot);

    if (!spot || isNaN(price) || isNaN(spot)) return null;

    const pct = (price / spot) * 100;
    return pct.toFixed(2);
  }, [row.price, row.spot]); return (
    <HoverCard.Root size="sm" open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{}}>
      <HoverCard.Trigger asChild>
        <Box>
          <Input
            bg="colors.bg"
            color="colors.white"
            size="sm"
            maxW="100px"
            minW="70px"
            disabled
            value={row[col.key]}
          />
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
