import fetcher from "@/lib/fetcher";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import Component from "./(routes)/homepage/client";
import { CurrencyResponse, PriceChangeResponse } from "./models/api-response";
import { normalizeCurrency } from "@/normalizer/currency";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harga Crypto hari ini (IDR)",
};

export default async function Page() {
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

  const normalizedCurrencies = normalizeCurrency(currencies);

  return (
    <Component
      currencies={normalizedCurrencies}
      priceChange={priceChangeToDict}
    ></Component>
  );
}
