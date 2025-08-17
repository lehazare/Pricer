// PricingTable.tsx
import { Input, Table, Select, VStack, Button, type ListCollection, HStack, Checkbox, CloseButton, Dialog, Portal, NumberInput } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { useState } from "react";

const underlyingCollection = createListCollection({
    items: ["CAC40", "S&P500", "AAPL", "NVDA"].map((label, value) => ({
        label,
        value,
    })),
});

type ColumnMeta = {
    key: string;
    label: string;
    type: "Input" | "Select" | "Checkbox" | "SchedulingButton" | "PercentInput" | "NumberInput" | "DatePicker";
    defaultValue?: string;
    values?: ListCollection<any>;
};

const COLUMNS: ColumnMeta[] = [
    { key: "select", label: "", type: "Checkbox", defaultValue: "CAC40" },
    { key: "underlying", label: "Asset", type: "Select", values: underlyingCollection, defaultValue: "CAC40" },
    { key: "nominal", label: "Nominal", type: "NumberInput", defaultValue: "1000000" },
    { key: "barrier", label: "PDI", type: "PercentInput", defaultValue: "1" },
    { key: "maturity", label: "Maturity", type: "NumberInput", defaultValue: "1" },
    { key: "strike date", label: "Strike Date", type: "Input", defaultValue: "10" },
    { key: "scheduling", label: "Scheduling", type: "SchedulingButton" },
    { key: "Price", label: "Price", type: "Input", defaultValue: "10" },
];

type RowData = {
    [K in typeof COLUMNS[number]["key"]]: string;
};

export default function PricingTable() {

    const [rows, setRows] = useState<RowData[]>([
        COLUMNS.reduce((acc) => {
            return acc;
        }, {} as RowData),
    ]);

    const addRow = () => {
        const newRow = COLUMNS.reduce((acc) => {
            return acc;
        }, {} as RowData);
        setRows([...rows, newRow]);
    };

    const updateCell = (index: number, field: keyof RowData, value: string) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    function generateInput(col: ColumnMeta, rowIndex: number, row: RowData) {
        switch (col.type) {
            case "Input":
                return <Input
                    value={row[col.key]}
                    onChange={(e) =>
                        updateCell(rowIndex, col.key, e.target.value)
                    }
                    bg="colors.bg"
                    color="colors.white"
                    size="sm"
                />;
            case "Select":
                return <Select.Root collection={col.values!} size="sm">
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText
                                placeholder={col.defaultValue}
                            />
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
            case "Checkbox":
                return <Checkbox.Root defaultChecked variant="subtle">
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
            case "SchedulingButton":
                return (
                    <Dialog.Root size="lg" placement="center">
                        <Dialog.Trigger asChild>
                            <Button variant="outline" size="sm">
                                Settings
                            </Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Scheduling Settings</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Button>Save</Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                )
            case "PercentInput":
                return <NumberInput.Root
                    defaultValue={col.defaultValue}
                    step={0.01}
                    formatOptions={{
                        style: "percent",
                    }}
                >
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>
            case "NumberInput":
                return <NumberInput.Root
                    defaultValue={col.defaultValue}
                >
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>

        }
    }

    return (
        <VStack>
            <Table.Root
                variant="outline"
                size="sm"
                bg="colors.bg"
                borderColor="colors.cyan"
                borderWidth="2px"
            >
                <Table.Header bg="colors.bg">
                    <Table.Row>
                        {COLUMNS.map((col) => (
                            <Table.ColumnHeader fontWeight="bold" borderColor="colors.cyan"
                                borderWidth="2px" key={col.key} color="colors.cyan">
                                {col.label}
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map((row, rowIndex) => (
                        <Table.Row key={rowIndex}>
                            {COLUMNS.map((col) => (
                                <Table.Cell borderColor="colors.cyan"
                                    borderWidth="2px" key={col.key}>
                                    {generateInput(col, rowIndex, row)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <HStack w="100%" justify="space-evenly">
                <Button bg="colors.cyan" onClick={addRow}>
                    Add a row
                </Button>
                <Button bg="colors.cyan">
                    Price
                </Button>
                <Button bg="colors.cyan">
                    Price All
                </Button>
            </HStack>
        </VStack>
    );
}
