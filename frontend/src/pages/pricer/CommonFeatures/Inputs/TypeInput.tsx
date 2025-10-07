import { Select } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
import { useEffect, useState } from "react";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function TypeInput({ col, rowIndex, rows, setRows }: Props) {
  const defaultValue = col.values?.items?.[0]?.value ?? "";
  const [value, setValue] = useState<string[]>([defaultValue]);

  const row = rows[rowIndex]

  useEffect(() => {
      if (!row.type) {
        row.type = "Call"
      }
    });

  return (
    <Select.Root
      minW="125px"
      collection={col.values!}
      size="sm"
      value={value}
      onValueChange={async (newValue) => {
        setValue(newValue.value)
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
