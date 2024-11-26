"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CurrencyDataTable,
  CurrencyResponse,
  PriceChange,
} from "./models/api-response";
import Percentage from "@/components/percentage";
import toIDR from "@/lib/to-idr";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";

type Pair = string;

export default function Component(props: {
  currencies: CurrencyResponse["payload"];
  priceChange: Record<Pair, PriceChange>;
}) {
  const toDataTable = props.currencies.map((currency) => {
    const priceChange =
      props.priceChange[currency.currencySymbol.toLowerCase()];
    return {
      currencyGroup: currency.currencyGroup,
      price: Number(priceChange?.latestPrice || 0),
      day: Number(priceChange?.day || 0),
      month: Number(priceChange?.month || 0),
      week: Number(priceChange?.week || 0),
      year: Number(priceChange?.year || 0),
    } satisfies CurrencyDataTable;
  });

  return (
    <div className="container mx-auto">
      <div className="header flex items-centerr">
        <h4 className="text-3xl font-bold">
          Harga Crypto dalam Rupiah Hari Ini
        </h4>
        <Input />
      </div>
      <DataTable columns={columns} data={toDataTable} />
    </div>
  );
}
