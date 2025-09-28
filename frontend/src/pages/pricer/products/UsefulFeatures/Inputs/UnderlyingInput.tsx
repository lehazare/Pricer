import { Select } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
const apiMarket = import.meta.env.VITE_API_MARKETDATA;

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function UnderlyingInput({ col, rowIndex, setRows }: Props) {
  return (
    <Select.Root
      minW="125px"
      collection={col.values!}
      size="sm"
      onValueChange={async (value) => {
        try {
          const equityLabel = value.items.at(0).value;
          const response = await fetch(`${apiMarket}/price/${equityLabel}`);
          if (!response.ok) throw new Error("Erreur API");
          const data = await response.json();
          const price = data.spotPrice;

          setRows((prev) => {
            const newRows = [...prev];
            newRows[rowIndex] = { ...newRows[rowIndex], spot: price };
            return newRows;
          });
        } catch (error) {
          console.error("Impossible de récupérer le prix :", error);
        }
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={col.defaultValue} />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {col.values?.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
