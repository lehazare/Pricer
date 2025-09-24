import type { ListCollection } from "@chakra-ui/react";

export type ColumnMeta = {
  key: string;
  label: string;
  defaultValue?: string;
  values?: ListCollection<any>;
};

export type RowData = {
  [key: string]: string;
};

export type Coupon = {
    date: string;
    value: string;
};

export type SchedulingRow = {
    numberOfCoupons: number;
    coupons: Coupon[];
};