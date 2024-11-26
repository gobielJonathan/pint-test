import { Currency, CurrencyResponse } from "@/app/models/api-response";

export function normalizeCurrency(currencies: CurrencyResponse) {
  const excludedCurrencies = ["IDR"];
  const currenciesFiltered = currencies.payload
    .filter((data) => !excludedCurrencies.includes(data.currencyGroup))
    .map(
      ({ currency_id, currencyGroup, currencySymbol, name, logo }) =>
        ({
          currency_id,
          currencyGroup,
          currencySymbol,
          name,
          logo,
        }) as Currency,
    );

  return currenciesFiltered;
}
