import { Select } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
import { useEffect } from "react";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function TypeInput({ col, rowIndex, setRows }: Props) {
  useEffect(() => {
    if (col.defaultValue) {
          setRows((prev) => {
          const newRows = [...prev];
          newRows[rowIndex] = { ...newRows[rowIndex], type: col.defaultValue! };
          return newRows;
        })}
  }, [col.defaultValue]); 

  return (
    <Select.Root
      minW="125px"
      collection={col.values!}
      size="sm"
      defaultValue={col.defaultValue ? [col.defaultValue] : undefined}
      onValueChange={async (newValue) => {
        setRows((prev) => {
          const item = newValue.items?.[0];
          if (!item) return prev;
          const newRows = [...prev];
          newRows[rowIndex] = { ...newRows[rowIndex], type: item.label };
          return newRows;
        });
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
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
