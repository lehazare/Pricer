import { Button, Dialog, HStack, NumberInput, Portal, Text, VStack, CloseButton, For } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import moment from "moment";
import type { SchedulingRow } from "./types";

type Props = {
    rowIndex: number;
    schedulingData: { [rowIndex: number]: SchedulingRow };
    setSchedulingData: React.Dispatch<
        React.SetStateAction<{ [rowIndex: number]: SchedulingRow }>
    >;
};

export default function SchedulingDialog({ rowIndex, schedulingData, setSchedulingData }: Props) {
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
                                                const oldCoupons = newData[rowIndex]?.coupons ?? [];
                                                newData[rowIndex] = {
                                                    numberOfCoupons: count,
                                                    coupons: Array.from({ length: count }, (_, i) => oldCoupons[i] ?? { date: "", value: "" }),
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
                                    <For each={schedulingData[rowIndex]?.coupons ?? []}>
                                        {(coupon, i) => (
                                            <HStack>
                                                <Text as="h2" whiteSpace="nowrap">
                                                    Coupon {i + 1}
                                                </Text>
                                                <DatePicker
                                                    key={i}
                                                    wrapperClassName="datePickerWrapper"
                                                    className="datePickerInput"
                                                    selected={coupon.date ? new Date(coupon.date) : null}
                                                    onChange={(newDate) => {
                                                        setSchedulingData((prev) => {
                                                            const newData = { ...prev };
                                                            const coupons = [...(newData[rowIndex]?.coupons ?? [])];
                                                            coupons[i] = { ...coupons[i], date: newDate?.toISOString() ?? "" };
                                                            newData[rowIndex] = {
                                                                ...newData[rowIndex],
                                                                coupons,
                                                            };
                                                            return newData;
                                                        });
                                                    }}
                                                    minDate={moment().toDate()}
                                                />
                                                <Text as="h2" whiteSpace="nowrap">
                                                    | Value
                                                </Text>
                                                <NumberInput.Root
                                                    defaultValue={"0.01"}
                                                    step={0.01}
                                                    formatOptions={{ style: "percent" }}
                                                    maxW="130px"
                                                    min={0}
                                                    value={coupon.value}
                                                    onValueChange={(details) => {
                                                        setSchedulingData((prev) => {
                                                            const newData = { ...prev };
                                                            const coupons = [...(newData[rowIndex]?.coupons ?? [])];
                                                            coupons[i] = { ...coupons[i], value: details.value };
                                                            newData[rowIndex] = {
                                                                ...newData[rowIndex],
                                                                coupons,
                                                            };
                                                            return newData;
                                                        });
                                                    }}
                                                >
                                                    <NumberInput.Control />
                                                    <NumberInput.Input />
                                                </NumberInput.Root>
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
    );
}
