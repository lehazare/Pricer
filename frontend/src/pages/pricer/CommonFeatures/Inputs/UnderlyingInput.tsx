import { useEffect } from "react";
import { Select } from "@chakra-ui/react";
import type { ColumnMeta, RowData } from "../types";
const apiMarket = import.meta.env.VITE_API_MARKETDATA;

type Props = {
  col: ColumnMeta;
  rowIndex: number;
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export default function UnderlyingInput({ col, rowIndex, setRows }: Props) {
  const setMarketDatas = async (equityLabel: string) => {
    try {
      const response = await fetch(`${apiMarket}/price/${equityLabel}`);
      if (!response.ok) throw new Error("Erreur API");
      const data = await response.json();
      const spot = data.spotPrice;
      
      const volatilityResponse = await fetch(`${apiMarket}/volatility/${equityLabel}`);
      if (!volatilityResponse.ok) throw new Error("Erreur API");
      const volData = await volatilityResponse.json();
      const volatility = volData.vol;

      const rateResponse = await fetch(`${apiMarket}/riskfreerate/^TNX`);
      if (!rateResponse.ok) throw new Error("Erreur API");
      const rateData = await rateResponse.json();
      const rate = rateData.riskFreeRate;

      setRows((prev) => {
        const newRows = [...prev];
        newRows[rowIndex] = { ...newRows[rowIndex], spot: spot, strike : spot, vol: volatility, rfrate: rate };
        return newRows;
      });
    } catch (error) {
      console.error("Impossible de récupérer le prix :", error);
    }
  };

  useEffect(() => {
    if (col.defaultValue) {
      setMarketDatas(col.defaultValue);
    }
  }, [col.defaultValue]); 

  return (
    <Select.Root
      minW="125px"
      collection={col.values!}
      size="sm"
      defaultValue={col.defaultValue ? [col.defaultValue] : undefined}
      onValueChange={async (value) => {
        const equityLabel = value.items.at(0)!.value;
        setMarketDatas(equityLabel); 
      }}
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
