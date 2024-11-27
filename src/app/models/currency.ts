export interface Currency {
  currency_id: number;
  currencyGroup: string;
  currencySymbol: string;
  name: string;
  logo: string;
}

export interface CurrencyPagination {
  totalPage: number;
  page: number;
  data: Currency[];
}

export type Pair = string;
