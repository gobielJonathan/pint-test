import Percentage from "@/components/percentage";
import { Button } from "@/components/ui/button";
import toIDR from "@/lib/to-idr";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CurrencyDataTable } from "../../models/api-response";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<CurrencyDataTable>[] = [
  {
    accessorKey: "currencyGroup",
    header: () => <div className="text-center">CRYPTO</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Image
            src={row.original.image}
            width={32}
            height={32}
            alt={row.original.image}
            loading="lazy"
          />
          <Link
            target="_blank"
            href={`https://pintu.co.id/market/${row.original.currencyGroup}`}
          >
            <div className="ml-4">
              <div className="font-bold">{row.original.name}</div>
              <div className="text-gray-500">
                {row.getValue("currencyGroup")}
              </div>
            </div>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = toIDR(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "day",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            24 Jam
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <Percentage change={row.getValue("day")} />
        </div>
      );
    },
  },
  {
    accessorKey: "week",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1 MGG
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <Percentage change={row.getValue("week")} />
        </div>
      );
    },
  },
  {
    accessorKey: "month",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1 BLN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <Percentage change={row.getValue("month")} />
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1 THN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <Percentage change={row.getValue("year")} />
        </div>
      );
    },
  },
];
