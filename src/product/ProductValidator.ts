import SqliteActions from "../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";
import { City, Order, Qualities } from "../types.ts";

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
  public static validateQualities(qualities: string): Set<Qualities> {
    try {
      if(qualities.length == 0) {
        throw Error("Qualities can not be empty");
      }
      let qualitiesSplited: Array<string> = qualities.split(",");
      let qualitiesArray: Array<Qualities> = qualitiesSplited
        .map((quality) => Number(quality))
        .filter((quality) => !isNaN(quality) ? true : false)
        .filter((quality) => quality <= 0 || quality > 5 ? false : true)
        .map((quality) => quality as Qualities);

      if(qualitiesArray.length <= 0){
        throw Error("Qualities needs to be number from 1 to 5");
      }

      return new Set(qualitiesArray);
    } catch(error) {
      return new Set([1,2,3,4,5]);
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
