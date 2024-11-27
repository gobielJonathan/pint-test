"use client";

import { useState } from "react";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CurrencyDataTable, PriceChange } from "../../models/api-response";
import { Currency, CurrencyPagination, Pair } from "../../models/currency";

import { DataTable } from "./components/data-table";
import MoverCard from "./components/mover-card";
import { columns } from "./columns";

import fetcher from "@/lib/fetcher";

export default function Component(props: {
  currencies: CurrencyPagination;
  topMovers: Currency[];
  priceChange: Record<Pair, PriceChange>;
}) {
  const { data: _priceChange, refetch } = useQuery({
    queryKey: ["price-change"],
    queryFn: () => fetcher(`${process.env.ENDPOINT}/trade/price-changes`),
    initialData: props.priceChange,
    /**
     * @note to simulate realtime, update the price change per 3s
     */
    refetchIntervalInBackground: true,
    refetchInterval: 5_000,
  });

  const toDataTable = props.currencies.data.map((currency) => {
    const priceChange = _priceChange[currency.currencySymbol.toLowerCase()];
    return {
      currencyGroup: currency.currencyGroup,
      name: currency.name,
      image: currency.logo,
      price: Number(priceChange?.latestPrice || 0),
      day: Number(priceChange?.day || 0),
      month: Number(priceChange?.month || 0),
      week: Number(priceChange?.week || 0),
      year: Number(priceChange?.year || 0),
    } satisfies CurrencyDataTable;
  });

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="header flex flex-col lg:flex-row items-center my-8">
        <h4 className="text-3xl font-bold">
          Harga Crypto dalam Rupiah Hari Ini
        </h4>
        <div className="lg:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="inline-flex items-center rounded-md border py-2 px-4 my-4 lg:my-0">
                <Search size={14} />
                <span className="ml-2">Cari aset di Pintu</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-y-auto max-h-72">
              {props.topMovers.map((currency) => (
                <Link
                  target="_blank"
                  href={`https://pintu.co.id/market/${currency.currencyGroup}`}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <Image
                      alt={currency.currencyGroup}
                      src={currency.logo}
                      width={32}
                      height={32}
                    />
                    <span>{currency.currencyGroup}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h5 className="text-xl font-bold">🔥 Top Movers (24 Jam)</h5>
      <div className="flex mt-4 my-6 gap-4 overflow-x-auto">
        {props.topMovers.map((top) => {
          const priceChange = _priceChange[top.currencySymbol.toLowerCase()];

          return (
            <div key={top.currency_id} className="flex-1 lg:w-1/5">
              <Link
                target="_blank"
                href={`https://pintu.co.id/market/${top.currencyGroup}`}
              >
                <MoverCard
                  change={+priceChange.day}
                  currency={top.currencyGroup}
                  image={top.logo}
                  price={+priceChange.latestPrice}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <DataTable
        columns={columns}
        data={toDataTable}
        totalPage={props.currencies.totalPage}
      />
    </div>
  );
}
