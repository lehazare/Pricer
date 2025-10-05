import SpotInput from "./Inputs/SpotInput";
import UnderlyingInput from "./Inputs/UnderlyingInput";
import SchedulingDialog from "./Inputs/SchedulingDialog";
import MaturityInput from "./Inputs/MaturityInput";
import StrikeDateInput from "./Inputs/StrikeDateInput";
import { NumberInput } from "@chakra-ui/react";

import type { ColumnMeta, RowData, SchedulingRow } from "./types";
import TypeInput from "./Inputs/TypeInput";

type Props = { col: ColumnMeta; rowIndex: number; rows: RowData[]; setRows: React.Dispatch<React.SetStateAction<RowData[]>>; schedulingData: { [rowIndex: number]: SchedulingRow }; setSchedulingData: React.Dispatch<React.SetStateAction<{ [rowIndex: number]: SchedulingRow }>>; };

export default function InputFactory({ col, rowIndex, rows, setRows, schedulingData, setSchedulingData }: Props) {
  switch (col.key) {
    case "spot":
    case "price":
      return <SpotInput col={col} rowIndex={rowIndex} rows={rows} />;
    case "underlying":
      return <UnderlyingInput col={col} rowIndex={rowIndex} setRows={setRows} />;
    case "type":
      return <TypeInput col={col} />;
    case "scheduling":
      return <SchedulingDialog rowIndex={rowIndex} schedulingData={schedulingData} setSchedulingData={setSchedulingData} />;
    case "barrier":
      return <NumberInput.Root step={0.01} formatOptions={{ style: "percent" }} min={0} maxW="130px"><NumberInput.Control /><NumberInput.Input /></NumberInput.Root>;
    case "nominal":
      return <NumberInput.Root defaultValue={col.defaultValue} min={0} maxW="130px"><NumberInput.Control /><NumberInput.Input /></NumberInput.Root>;
    case "maturity":
      return <MaturityInput col={col} rowIndex={rowIndex} rows={rows} setRows={setRows} />;
    case "strikeDate":
      return <StrikeDateInput col={col} rowIndex={rowIndex} rows={rows} setRows={setRows} />;
    default:
      return null;
  }
}
