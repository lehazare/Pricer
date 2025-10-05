import DatePicker from "react-datepicker";
import moment from "moment";
import type { ColumnMeta, RowData } from "../types";
const apiScheduling = import.meta.env.VITE_API_SCHEDULING;

import "./DatePicker.css"
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function StrikeDateInput({ col, rowIndex, rows, setRows }: Props) {
  const row = rows[rowIndex];

  return (
    <DatePicker
      wrapperClassName="datePickerWrapper"
      className="datePickerInput"
      selected={row[col.key] ? new Date(row[col.key]) : null}
      onChange={async (dateObject) => {
        const date = dateObject?.toISOString();
        const simplifiedDate = date?.split("T")[0];
        const request = `${apiScheduling}/maturity?strikeDate=${simplifiedDate}&countryCode=FR`;
        const response = await fetch(request);
        if (!response.ok) throw new Error("Erreur API");
        const maturity = await response.json();

        setRows((prev) => {
          const newRows = [...prev];
          newRows[rowIndex] = {
            ...newRows[rowIndex],
            [col.key]: date ?? "",
            maturity: maturity ?? "",
          };
          return newRows;
        });
      }}
      minDate={moment().toDate()}
    />
  );
}
