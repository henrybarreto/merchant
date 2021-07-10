import SqliteActions from "../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";
import { City, Order } from "../types.ts";

export default class ProductValidator {
  private readonly deafultOrder: Order = Order.Price;
  /**
     * @param  {string} names
     * @returns string[]
     */
  public static validateName(name: string): string {
    let database = new SqliteDatabase("./merchant.db");
    let actions = new SqliteActions(database);
    let hasProduct = actions.hasProduct(name);
    database.disconnect();
    if (hasProduct) { //TODO
      return name;
    } else {
      throw new Error("The product name is invalid!: " + name);
    }
  }
  /**
     * @param  {string|undefined} qualities
     * @returns string|undefined
     */
  public static validateQualities(qualities: string): Set<string> {
    try {
      if (qualities) {
        let qualitiesSplited: Array<string> = qualities.split(",");
        let qualitiesSet: Set<string> = new Set(qualitiesSplited);
        return qualitiesSet;
      } else {
        return new Set(["1", "2", "3", "4", "5"]);
      }
    } catch (error) {
      return new Set([qualities]);
    }
  }
  /**
     * @param  {string|undefined} city
     * @returns city[]|undefined
     */
  public static validateCity(city: string): Set<City> {
    if (city) {
      let cityQualities = city.split(",") as City[];
      let citySet: Set<City> = new Set(cityQualities);
      return citySet;
    } else {
      return new Set([
        City.Thetford,
        City.Martlock,
        City.Lymhurst,
        City.Fortsterling,
        City.Bridgewatch,
      ]);
    }
  }
}
