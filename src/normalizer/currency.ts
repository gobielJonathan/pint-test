import { Currency, CurrencyResponse } from "@/app/models/api-response";
import { CurrencyPagination } from "@/app/models/currency";

const ITEMS_PER_PAGE = 20;
const excludedCurrencies = ["IDR"];

/**
 * @note convert the data into chunk/pagination, because we want to make it more light response into client
 */
export function normalizeCurrency(
  currencies: CurrencyResponse["payload"],
  page: number
) {
  const currenciesFiltered = currencies
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    .filter((data) => !excludedCurrencies.includes(data.currencyGroup))
    .map(
      ({ currency_id, currencyGroup, currencySymbol, name, logo }) =>
        ({
          currency_id,
          currencyGroup,
          currencySymbol,
          name,
          logo,
        } as Currency)
    );

  return {
    data: currenciesFiltered,
    page: page,
    totalPage: Math.ceil(currencies.length / ITEMS_PER_PAGE),
  } satisfies CurrencyPagination;
}

export function normalizeCurrencyTopMovers(
  currencies: CurrencyResponse["payload"]
) {
  const currenciesFiltered = currencies
    .filter((data) => !excludedCurrencies.includes(data.currencyGroup))
    .slice(0, 5)
    .map(
      ({ currency_id, currencyGroup, currencySymbol, name, logo }) =>
        ({
          currency_id,
          currencyGroup,
          currencySymbol,
          name,
          logo,
        } as Currency)
    );

  return currenciesFiltered;
}
