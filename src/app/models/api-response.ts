export interface ApiResponse<T> {
  code: string;
  message: string;
  payload: T;
}

export type CurrencyResponse = ApiResponse<Currency[]>;
export type PriceChangeResponse = ApiResponse<PriceChange[]>;

export interface Currency {
  currency_id: number;
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: Wallet[];
  is_limit_order_enabled: boolean;
  is_upcoming: boolean;
}

interface Wallet {
  currency_id: number;
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  blockchainName: string;
  logo: string;
}

export interface PriceChange {
  pair: string;
  latestPrice: string;
  day: string;
  week: string;
  month: string;
  year: string;
}

export interface CurrencyDataTable {
  currencyGroup: string;
  name: string;
  price: number;
  day: number;
  week: number;
  month: number;
  year: number;
  image: string;
}
