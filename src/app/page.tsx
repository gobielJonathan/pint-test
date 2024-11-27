import { Metadata } from "next";

import fetcher from "@/lib/fetcher";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import Component from "./(routes)/homepage/client";
import { CurrencyResponse, PriceChangeResponse } from "./models/api-response";
import {
  normalizeCurrency,
  normalizeCurrencySimpleList,
  normalizeCurrencyTopMovers,
} from "@/normalizer/currency";

export const metadata: Metadata = {
  title: "Harga Crypto hari ini (IDR)",
};

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { searchParams } = props;
  const page = Number(searchParams.page || 1);

  const [currenciesResponse, priceChangeResponse] = await Promise.all([
    fetcher(`${process.env.ENDPOINT}/wallet/supportedCurrencies`),
    fetcher(`${process.env.ENDPOINT}/trade/price-changes`),
  ]);

  const currencies = currenciesResponse as CurrencyResponse;
  const priceChange = priceChangeResponse as PriceChangeResponse;

  if (currencies.code !== "success" || priceChange.code !== "success") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {currencies.message || priceChange.message}
        </AlertDescription>
      </Alert>
    );
  }

  const priceChangeToDict = priceChange.payload.reduce((acc, curr) => {
    const { pair: _pair, ...data } = curr;
    /**
     * @note in response api, the value pair is btc/idr
     * we need to get only the token name "btc"
     */
    const [pair] = _pair.split("/");
    return {
      ...acc,
      [pair]: data,
    };
  }, {});

  const normalizedCurrencies = normalizeCurrency(currencies.payload, page);

  const normalizeCurrenciesTopMovers = normalizeCurrencyTopMovers(
    currencies.payload
  );

  const normalizedCurrencySimpleList = normalizeCurrencySimpleList(
    currencies.payload
  );

  return (
    <Component
      currencies={normalizedCurrencies}
      currenciesSimpleList={normalizedCurrencySimpleList}
      topMovers={normalizeCurrenciesTopMovers}
      priceChange={priceChangeToDict}
    ></Component>
  );
}
