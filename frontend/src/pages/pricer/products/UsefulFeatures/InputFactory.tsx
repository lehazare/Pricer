import { Input, Select, NumberInput } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./DatePicker.css"
import moment from "moment";
import type { ColumnMeta, RowData, SchedulingRow } from "./types";
import SchedulingDialog from "./SchedulingDialog";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
  schedulingData: { [rowIndex: number]: SchedulingRow };
  setSchedulingData: React.Dispatch<
    React.SetStateAction<{ [rowIndex: number]: SchedulingRow }>
  >;
};

export default function InputFactory({ col, rowIndex, rows, setRows, schedulingData, setSchedulingData }: Props) {
  const row = rows[rowIndex];

  switch (col.key) {
    case "spot":
      return <Input bg="colors.bg" color="colors.white" size="sm" maxW="100px" disabled value={row[col.key]} />;
    case "price":
      return <Input bg="colors.bg" color="colors.white" size="sm" maxW="100px" disabled value={row[col.key]} />;
    case "underlying":
      return (
        <Select.Root minW="125px" collection={col.values!} size="sm" onValueChange={async (value) => {
          try {
            const equityLabel = value.items.at(0).value
            const response = await fetch(`http://localhost:5212/price/${equityLabel}`);
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
        }}>
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
    case "scheduling":
      return <SchedulingDialog rowIndex={rowIndex} schedulingData={schedulingData} setSchedulingData={setSchedulingData} />;
    case "barrier":
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
    case "nominal":
      return (
        <NumberInput.Root defaultValue={col.defaultValue} min={0} maxW="130px">
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      );    
      case "maturity":
      return (
        <NumberInput.Root defaultValue={col.defaultValue} value={row.maturity ?? ""} min={0} maxW="130px"
            onValueChange={async(maturityObject)=>{
            const maturity = maturityObject.value
            const request = `http://localhost:5021/strikeDate?maturity=${maturity}&countryCode=FR`
            const response = await fetch(request);
            if (!response.ok) throw new Error("Erreur API");
            const date = await response.json();

            setRows((prev) => {
              const newRows = [...prev];
              newRows[rowIndex] = { ...newRows[rowIndex], strikeDate: date, maturity: maturity};
              return newRows;
            });
          }}>
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      );
    case "strikeDate":
      return (
        <DatePicker
          wrapperClassName="datePickerWrapper"
          className="datePickerInput"
          selected={row[col.key] ? new Date(row[col.key]) : null}
          onChange={async(dateObject) => {
            const date = dateObject?.toISOString()
            const simplifiedDate = date?.split("T")[0]
            const request = `http://localhost:5021/maturity?strikeDate=${simplifiedDate}&countryCode=FR`
            const response = await fetch(request);
            if (!response.ok) throw new Error("Erreur API");
            const maturity = await response.json();

            console.log(maturity)

            setRows((prev) => {
              const newRows = [...prev];
              newRows[rowIndex] = { ...newRows[rowIndex], [col.key]: date ?? "", maturity: maturity ?? "" };
              return newRows;
            });
          }}
          minDate={moment().toDate()}
        />
      );
  }
}
