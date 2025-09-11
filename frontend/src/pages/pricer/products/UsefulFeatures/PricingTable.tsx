// PricingTable.tsx
import { Input, Table, Select, VStack, Button, type ListCollection, HStack, Checkbox, CloseButton, Dialog, Portal, NumberInput, ActionBar, Text, For } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./DatePicker.css"
import moment from 'moment';


const underlyingCollection = createListCollection({
    items: ["CAC40", "S&P500", "AAPL", "NVDA"].map((label, value) => ({
        label,
        value,
    })),
});

const currencyCollection = createListCollection({
    items: ["EUR", "USD", "JPY", "GBP"].map((label, value) => ({
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

const COLUMNS = [
    { key: "underlying", label: "Underlying", type: "Select", values: underlyingCollection, defaultValue: "CAC40" },
    { key: "spot", label: "Spot", type: "Input" },
    { key: "nominal", label: "Nominal", type: "NumberInput", defaultValue: "1000000" },
    { key: "currency", label: "Currency", type: "Select", values: currencyCollection, defaultValue: "EUR" },
    { key: "barrier", label: "Barrier", type: "PercentInput", defaultValue: "1" },
    { key: "maturity", label: "Maturity", type: "NumberInput", defaultValue: "1" },
    { key: "strike date", label: "Strike Date", type: "DatePicker" },
    { key: "scheduling", label: "Scheduling", type: "SchedulingButton" },
    { key: "Price", label: "Price", type: "Input", defaultValue: "10" },
] as ColumnMeta[];

type RowData = {
    [K in typeof COLUMNS[number]["key"]]: string;
};

export default function PricingTable() {

    const [rows, setRows] = useState<RowData[]>([{} as RowData]);

    const [schedulingData, setSchedulingData] = useState<
        { [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } }
    >({});

    const addRow = () => {
        const newRow = {} as RowData;
        setRows([...rows, newRow]);
        setSelection([...selection, rows.length])
    };

    function generateInput(col: ColumnMeta, rowIndex: number) {
        const row = rows[rowIndex];
        switch (col.type) {
            case "Input":
                return <Input
                    bg="colors.bg"
                    color="colors.white"
                    size="sm"
                    maxW="130px"
                />;
            case "Select":
                return <Select.Root minW="75px" collection={col.values!} size="sm">
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
                                        <VStack>
                                            <HStack>
                                                <Text as="h2" whiteSpace="nowrap">
                                                    Number of Coupon :
                                                </Text>
                                                <NumberInput.Root
                                                    value={String(schedulingData[rowIndex]?.numberOfCoupons ?? 0)}
                                                    min={0}
                                                    onValueChange={(details) => {
                                                        const count = details.valueAsNumber || 0;
                                                        setSchedulingData((prev) => {
                                                            const newData = { ...prev };
                                                            const oldDates = newData[rowIndex]?.couponDates ?? [];
                                                            newData[rowIndex] = {
                                                                numberOfCoupons: count,
                                                                couponDates: Array.from(
                                                                    { length: count },
                                                                    (_, i) => oldDates[i] ?? ""
                                                                ),
                                                            };
                                                            return newData;
                                                        });
                                                    }}
                                                    maxW="130px"
                                                >
                                                    <NumberInput.Control />
                                                    <NumberInput.Input />
                                                </NumberInput.Root>
                                            </HStack>
                                            <VStack w="100%">
                                                <For each={schedulingData[rowIndex]?.couponDates ?? []}>
                                                    {(date, i) => (
                                                        <HStack>
                                                            <Text as="h2" whiteSpace="nowrap">Coupon Dates {i} :</Text>
                                                            <DatePicker
                                                                key={i}
                                                                wrapperClassName="datePickerWrapper"
                                                                className="datePickerInput"
                                                                selected={date ? new Date(date) : null}
                                                                onChange={(newDate) => {
                                                                    setSchedulingData((prev) => {
                                                                        const newData = { ...prev };
                                                                        const couponDates = [
                                                                            ...(newData[rowIndex]?.couponDates ?? []),
                                                                        ];
                                                                        couponDates[i] = newDate?.toISOString() ?? "";
                                                                        newData[rowIndex] = {
                                                                            ...newData[rowIndex],
                                                                            couponDates,
                                                                            numberOfCoupons:
                                                                                newData[rowIndex]?.numberOfCoupons ?? 0,
                                                                        };
                                                                        return newData;
                                                                    });
                                                                }}
                                                                minDate={moment().toDate()}
                                                            />
                                                        </HStack>
                                                    )}
                                                </For>
                                            </VStack>
                                        </VStack>
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
                    maxW="130px"
                    min={0}
                >
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>
            case "NumberInput":
                return <NumberInput.Root
                    defaultValue={col.defaultValue}
                    min={0}
                    maxW="130px"
                >
                    <NumberInput.Control />
                    <NumberInput.Input />
                </NumberInput.Root>
            case "DatePicker":
                return <DatePicker
                    wrapperClassName="datePickerWrapper"
                    className="datePickerInput"
                    selected={row[col.key] ? new Date(row[col.key] as string) : null}
                    onChange={(date) => {
                        setRows((prev) => {
                            const newRows = [...prev];
                            newRows[rowIndex] = { ...newRows[rowIndex], [col.key]: date?.toISOString() ?? "" };
                            return newRows;
                        });
                    }}
                    minDate={moment().toDate()} />
        }
    }

    const [selection, setSelection] = useState<number[]>([0])

    const hasSelection = selection.length > 0
    const indeterminate = selection.length > 0 && selection.length < rows.length

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
                        <Table.ColumnHeader fontWeight="bold" borderColor="colors.cyan"
                            borderWidth="2px" color="colors.cyan" key="main-checkbox">
                            <Checkbox.Root
                                size="sm"
                                mt="0.5"
                                aria-label="Select all rows"
                                checked={indeterminate ? "indeterminate" : selection.length > 0}
                                onCheckedChange={(changes) => {
                                    setSelection(
                                        changes.checked ? rows.map((_, rowIndex) => rowIndex) : [],
                                    )
                                }}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                            </Checkbox.Root>
                        </Table.ColumnHeader>
                        {COLUMNS.map((col) => (
                            <Table.ColumnHeader fontWeight="bold" borderColor="colors.cyan"
                                borderWidth="2px" key={col.key} color="colors.cyan">
                                {col.label}
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map((_, rowIndex) => (
                        <Table.Row key={rowIndex} >
                            <Table.Cell borderColor="colors.cyan"
                                borderWidth="2px" key="checkbox">
                                <Checkbox.Root
                                    size="sm"
                                    mt="0.5"
                                    aria-label="Select row"
                                    checked={selection.includes(rowIndex)}
                                    onCheckedChange={(changes) => {
                                        setSelection((prev) =>
                                            changes.checked
                                                ? [...prev, rowIndex]
                                                : selection.filter((name) => name !== rowIndex),
                                        )
                                    }}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                            </Table.Cell>
                            {COLUMNS.map((col) => (
                                <Table.Cell borderColor="colors.cyan"
                                    borderWidth="2px" key={col.key}>
                                    {generateInput(col, rowIndex)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <ActionBar.Root open={hasSelection}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <ActionBar.SelectionTrigger>
                                {selection.length} selected
                            </ActionBar.SelectionTrigger>
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

