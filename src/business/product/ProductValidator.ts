import SqliteActions from "../../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../../database/sqlite/SqliteDatabase.ts";
import { Cities, Order, Qualities } from "../../types.ts";
import CliValidator from "../../cli/CliValidator.ts";

export default class ProductValidator {
  private readonly deafultOrder: Order = Order.Price;
  public static validateName(name: string): string {
    let database = new SqliteDatabase("./merchant.db");
    let actions = new SqliteActions(database);
    let hasProduct = actions.hasProduct(name);
    database.disconnect();
    if (hasProduct) {
      return name;
    } else {
      throw new Error("The product name is invalid!: " + name);
    }
  }
  static validate<T>(
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
  public static validateQualities(qualities: string): Set<Qualities> {
    const defaultReturn = (): Qualities[] => {
      return [1, 2, 3, 4, 5];
    };

    return ProductValidator.validate<Qualities>(qualities, (qualities) => {
      return qualities
        .split(",")
        .map((quality) => Number(quality))
        .filter((quality) => !isNaN(quality) && !(quality <= 0 || quality > 5))
        .map((quality) => quality as Qualities);
    }, defaultReturn);
  }
  public static validateCities(cities: string): Set<Cities> {
    const defaultReturn = (): Cities[] => {
      return [
        Cities.Thetford,
        Cities.Martlock,
        Cities.Lymhurst,
        Cities.Fortsterling,
        Cities.Bridgewatch,
      ];
    };
    return ProductValidator.validate<any>(cities, (cities) => {
      return cities
        .split(",")
        .map((city) => {
          return Cities[
            (
              CliValidator.orderFormatter(city)
            ) as keyof typeof Cities
          ];
        })
        .filter((city) => !!city);
    }, defaultReturn);
  }
}
