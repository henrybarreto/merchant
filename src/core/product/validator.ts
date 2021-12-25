import { orderFormatter } from "../../cli/validator.ts";
import SqliteActions from "../../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../../database/sqlite/SqliteDatabase.ts";
import { Cities, Qualities } from "../../types.ts";

function productValidate<T>(
  value: String,
  valuesFn: (value: String) => T[],
  defaultReturn: () => T[],
): Set<T> {
  const antiComma = (
    fn: (value: String) => T[],
    defaultReturn: () => T[],
  ): T[] => {
    const resultForSet = fn(value);

    return (resultForSet.length == 0) ? defaultReturn() : resultForSet;
  };

  return (value.length != 0)
    ? new Set(antiComma(valuesFn, defaultReturn))
    : new Set(defaultReturn());
}

export function productValidateName(name: string): boolean {
  const database = new SqliteDatabase("./merchant.db");
  const actions = new SqliteActions(database);
  const hasProduct = actions.hasProduct(name);
  database.disconnect();

  return hasProduct;
}

export function productValidateQualities(
  qualities: string,
): Set<Qualities> | undefined {
  const defaultReturn = (): Qualities[] => {
    return [1, 2, 3, 4, 5];
  };

  try {
    return productValidate<Qualities>(qualities, (qualities) => {
      return qualities
        .split(",") // TODO This is not working
        .map((quality) => Number(quality))
        .filter((quality) => !isNaN(quality) && !(quality <= 0 || quality > 5))
        .map((quality) => quality as Qualities);
    }, defaultReturn);
  } catch (error) {
    return undefined;
  }
}

export function productValidateCities(cities: string): Set<Cities> | undefined {
  const defaultReturn = (): Cities[] => {
    return [
      Cities.Thetford,
      Cities.Martlock,
      Cities.Lymhurst,
      Cities.Fortsterling,
      Cities.Bridgewatch,
    ];
  };

  try {
    return productValidate<any>(cities, (cities) => {
      return cities
        .split(",")
        .map((city) => {
          return Cities[
            (
              orderFormatter(city)
            ) as keyof typeof Cities
          ];
        })
        .filter((city) => !!city);
    }, defaultReturn);
  } catch (error) {
    return undefined;
  }
}
