import { Select } from "@chakra-ui/react";
import type { ColumnMeta } from "../types";

type Props = {
  col: ColumnMeta;
};

export default function TypeInput({ col }: Props) {
  return (
    <Select.Root
      minW="125px"
      collection={col.values!}
      size="sm"
      defaultValue={col.defaultValue ? [col.defaultValue] : undefined}
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
