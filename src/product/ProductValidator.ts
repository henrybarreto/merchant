import SqliteActions from "../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";
import { Cities, Order, Qualities } from "../types.ts";

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
  public static validateQualities(qualities: string): Set<Qualities> {
    try {
      if (qualities.length == 0) {
        throw Error("Qualities can not be empty");
      }
      let qualitiesSplited: Array<string> = qualities.split(",");
      let qualitiesArray: Array<Qualities> = qualitiesSplited
        .map((quality) => Number(quality))
        .filter((quality) => !isNaN(quality) ? true : false)
        .filter((quality) => quality <= 0 || quality > 5 ? false : true)
        .map((quality) => quality as Qualities);

      if (qualitiesArray.length <= 0) {
        throw Error("Qualities needs to be number from 1 to 5");
      }

      return new Set(qualitiesArray);
    } catch (error) {
      return new Set([1, 2, 3, 4, 5]);
    }
  }
  public static validateCities(cities: string): Set<Cities> {
    try {
      if (cities.length == 0) {
        throw Error("Ciites can not be empty");
      }
      let citiesSplited: Array<string> = cities.split(",")
        .filter((city) => {
          return city ? true : false;
        })
        .map((cities) => {
          return cities.charAt(0).toUpperCase() + cities.slice(1);
        }); // TODO Remove this little hack in all lines

      let citiesArray: Array<Cities> = citiesSplited
        .map((city) => Cities[city as keyof typeof Cities])
        .filter((city) => city ? true : false);

      if (citiesArray.length <= 0) {
        throw Error("Cities are not valid!");
      }

      return new Set(citiesArray);
    } catch (error) {
      return new Set([
        Cities.Thetford,
        Cities.Martlock,
        Cities.Lymhurst,
        Cities.Fortsterling,
        Cities.Bridgewatch,
      ]);
    }
  }
}
