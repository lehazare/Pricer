import { Button, Dialog, HStack, NumberInput, Portal, Text, VStack, CloseButton, For } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import moment from "moment";

type Props = {
  rowIndex: number;
  schedulingData: { [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } };
  setSchedulingData: React.Dispatch<
    React.SetStateAction<{ [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } }>
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
                        const oldDates = newData[rowIndex]?.couponDates ?? [];
                        newData[rowIndex] = {
                          numberOfCoupons: count,
                          couponDates: Array.from({ length: count }, (_, i) => oldDates[i] ?? ""),
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
                        <Text as="h2" whiteSpace="nowrap">
                          Coupon Dates {i} :
                        </Text>
                        <DatePicker
                          key={i}
                          wrapperClassName="datePickerWrapper"
                          className="datePickerInput"
                          selected={date ? new Date(date) : null}
                          onChange={(newDate) => {
                            setSchedulingData((prev) => {
                              const newData = { ...prev };
                              const couponDates = [...(newData[rowIndex]?.couponDates ?? [])];
                              couponDates[i] = newDate?.toISOString() ?? "";
                              newData[rowIndex] = {
                                ...newData[rowIndex],
                                couponDates,
                                numberOfCoupons: newData[rowIndex]?.numberOfCoupons ?? 0,
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
  );
}
