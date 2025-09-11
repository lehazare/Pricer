import { Input, Select, NumberInput } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./DatePicker.css"
import moment from "moment";
import type { ColumnMeta, RowData } from "./types";
import SchedulingDialog from "./SchedulingDialog";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
  schedulingData: { [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } };
  setSchedulingData: React.Dispatch<
    React.SetStateAction<{ [rowIndex: number]: { numberOfCoupons: number; couponDates: string[] } }>
  >;
};

export default function InputFactory({ col, rowIndex, rows, setRows, schedulingData, setSchedulingData }: Props) {
  const row = rows[rowIndex];

  switch (col.type) {
    case "Input":
      return <Input bg="colors.bg" color="colors.white" size="sm" maxW="130px" />;
    case "Select":
      return (
        <Select.Root minW="75px" collection={col.values!} size="sm">
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
    case "SchedulingButton":
      return <SchedulingDialog rowIndex={rowIndex} schedulingData={schedulingData} setSchedulingData={setSchedulingData} />;
    case "PercentInput":
      return (
        <NumberInput.Root
          defaultValue={col.defaultValue}
          step={0.01}
          formatOptions={{ style: "percent" }}
          maxW="130px"
          min={0}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      );
    case "NumberInput":
      return (
        <NumberInput.Root defaultValue={col.defaultValue} min={0} maxW="130px">
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      );
    case "DatePicker":
      return (
        <DatePicker
          wrapperClassName="datePickerWrapper"
          className="datePickerInput"
          selected={row[col.key] ? new Date(row[col.key]) : null}
          onChange={(date) => {
            setRows((prev) => {
              const newRows = [...prev];
              newRows[rowIndex] = { ...newRows[rowIndex], [col.key]: date?.toISOString() ?? "" };
              return newRows;
            });
          }}
          minDate={moment().toDate()}
        />
      );
  }
}
